<template>
  <div>
    <HeaderBar :title="'ALTERAR A SENHA'" :back-page="true" />

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
                  v-model="form.oldPassword"
                  label="Senha antiga *"
                  name="password"
                  :rules="passwordRules"
                  :type="showPass ? 'password' : 'text'"
                  :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                  required
                  @click:append="() => (showPass = !showPass)"
                ></v-text-field>
                <v-text-field
                  v-model="form.newPassword"
                  label="Nova senha *"
                  :rules="passwordRules"
                  :type="showNewPass ? 'password' : 'text'"
                  :append-icon="showNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                  required
                  @click:append="() => (showNewPass = !showNewPass)"
                ></v-text-field>
                <v-text-field
                  v-model="form.confirmNewPassword"
                  label="Confirmar nova senha *"
                  :rules="confirmPasswordRules"
                  :type="showConfirmNewPass ? 'password' : 'text'"
                  :append-icon="showConfirmNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                  required
                  @click:append="
                    () => (showConfirmNewPass = !showConfirmNewPass)
                  "
                ></v-text-field>
                <v-btn class="btn-block btn-primary" @click="switchPassword"
                  >Alterar Senha
                </v-btn>
              </v-form>

              <div v-else>
                <p class="change-status">Senha Alterada!</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
    <navigation-bar />
  </div>
</template>

<router>
{
  path : '/aluno/alterar-senha',
  name: 'alterar-senha'
}

</router>

<script scoped>
import auth from '../../services/http/auth';
import users from '../../services/http/users';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  name: 'ChangePassword',
  components: {
    HeaderBar,
    NavigationBar,
  },
  data() {
    return {
      status: true,
      loading: false,
      showPass: String,
      showNewPass: String,
      showConfirmNewPass: String,
      isChanged: false,
      token: '',
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      nameRules: [v => !!v || 'Digite seu nome'],
      passwordRules: [
        v => !!v || 'Digite a senha',
        v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caractéres',
      ],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
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

  methods: {
    switchPassword() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);

        users
          .updatePass(this.form, this.$store.state.user.data.id)
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
            }, 500);
            if (err.response.status === 400) {
              this.$notifier.showMessage({
                type: 'error',
                message: 'Senha antiga incorreta.',
              });
            } else {
              this.$notifier.showMessage({
                type: 'error',
              });
            }
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
      this.$router.back();
    },
    gotoHome() {
      $nuxt._router.push('/aluno/home');
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

::v-deep .btn-primary {
  margin-bottom: 50px;
}

@media (max-width: 320px) {
  * {
    margin-top: -5px;
  }
  ::v-deep .h1__theme {
    font-size: 20px;
  }
}
</style>
