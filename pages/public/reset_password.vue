<template>
  <v-layout justify-center>
    <div v-if="loading" class="spiner-container">
      <v-progress-circular
        :size="70"
        :width="5"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-flex v-else ref="flex" xs10 sm8 md6>
      <v-container>
        <v-row>
          <v-col cols="12" class="relative-col">
            <HeaderBar :title="'Alterar Senha'" :back-page="true"></HeaderBar>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <img src="~/assets/security.svg" class="img-fluid" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-form
              v-if="!isChanged"
              ref="form"
              v-model="status"
              lazy-validation
            >
              <v-text-field
                v-model="form.newPassword"
                color="#60c"
                label="Nova senha *"
                :rules="passwordRules"
                :type="showNewPass ? 'password' : 'text'"
                :append-icon="showNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showNewPass = !showNewPass)"
              ></v-text-field>
              <v-text-field
                v-model="form.confirmNewPassword"
                color="#60c"
                label="Confirmar nova senha *"
                :rules="confirmPasswordRules"
                :type="showConfirmNewPass ? 'password' : 'text'"
                :append-icon="showConfirmNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showConfirmNewPass = !showConfirmNewPass)"
              ></v-text-field>
              <v-btn
                class="change-btn"
                color="#60c"
                dark
                block
                depressed
                large
                @click="switchPassword"
                >Alterar Senha</v-btn
              >
            </v-form>

            <div v-else>
              <p class="change-status">Senha alterada com sucesso!</p>
            </div>
            <v-snackbar>
              <v-btn color="#FFF" text @click="snackbar = false">Fechar</v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import auth from '../../services/http/auth';
import HeaderBar from '~/components/Header.vue';

export default {
  name: 'ChangePassword',
  components: {
    HeaderBar
},
  data() {
    return {
      status: true,
      loading: false,
      showNewPass: String,
      showConfirmNewPass: String,
      isChanged: false,
      snackbar: false,
      token: '',
      form: {
        newPassword: '',
        confirmNewPassword: '',
      },
      passwordRules: [
        v => !!v || 'Digite a senha',
        v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caractéres',
      ],
    };
  },

  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || 'Confirme a senha',
        () =>
          this.form.confirmNewPassword === this.form.newPassword ||
          'As senhas devem ser idênticas.',
      ];
    },
  },

  mounted() {
    this.token = this.$route.params.token;

    auth.changePasswordRequestValidate(this.token).catch(() => {
      setTimeout(() => {
        this.loading = false;
        this.snackbar = true;
      }, 500);
      this.goBack();
    });
  },

  methods: {
    switchPassword() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        auth
          .changePassword(this.form, this.token)
          .then(res => {
            this.loading = false;
            this.isChanged = true;
            setTimeout(() => {
              this.gotoHome();
            }, 1500);
          })
          .catch(err => {
            setTimeout(() => {
              this.loading = false;
              this.snackbar = true;
            }, 500);
            console.error(err);
          });
      } else {
        this.animateForm(false);
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add('hide-form');
        document.querySelector('html').style.overflow = 'hidden';
        setTimeout(() => {
          this.loading = true;
        }, 300);
      } else {
        this.$refs.flex.classList.add('error-form');
        setTimeout(() => {
          this.$refs.flex.classList.remove('error-form');
        }, 500);
      }
      document.querySelector('html').style.overflow = 'scroll';
    },

    goBack() {
      $nuxt._router.push('/login');
    },
  },
};
</script>

<style scoped>
.flex {
  animation: intro 300ms backwards;
  animation-delay: 350ms;
}

.layout {
  background: #fff !important;
}

/* Spinner */
.spiner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

/* Page */
.page-title {
  font-size: 16px;
  font-weight: 900;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  color: var(--primary);
}

.relative-col {
  position: relative;
}

.img-fluid {
  display: block;
  margin: 0 auto;
  width: 375px;
  max-width: 100%;
}


::v-deep .v-messages__message {
  color: #ff5252;
  font-size: 12px;
  margin-left: 5px;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}

.change-status {
  margin-top: 60px;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: var(--primary);
}
</style>
