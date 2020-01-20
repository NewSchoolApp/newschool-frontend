<template>
  <v-layout justify-center>

    <div v-if="loading" class="spiner-container">  
      <v-progress-circular :size="70" :width="5" indeterminate></v-progress-circular>
    </div>

    <v-flex xs10 sm8 md6 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12" class="relative-col">
            <v-btn
              class="btn-back"
              text
              icon
              @click="goBack"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h2 class="page-title">Alterar Senha</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <img src="~/assets/security.svg" class="img-fluid" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-form ref="form" v-model="status" lazy-validation v-if="!isChanged">
              <v-text-field
                color="#60c"
                v-model="form.password"
                label="Senha antiga *"
                name="password"
                :rules="passwordRules"
                :type="showPass ? 'password' : 'text'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (showPass = !showPass)"
                required
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.newPassword"
                label="Nova senha *"
                :rules="passwordRules"
                :type="showNewPass ? 'password' : 'text'"
                :append-icon="showNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (showNewPass = !showNewPass)"
                required
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.confirmNewPassword"
                label="Confirmar nova senha *"
                :rules="confirmPasswordRules"
                :type="showConfirmNewPass ? 'password' : 'text'"
                :append-icon="showConfirmNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (showConfirmNewPass = !showConfirmNewPass)"
                required
              ></v-text-field>
              <v-btn
                class="change-btn"
                color="#60c"
                dark
                block
                depressed
                large
                @click="switchPassword"
              >Alterar Senha</v-btn>
            </v-form>
            
            <div v-else>
              <p class="change-status">Senha alterada com sucesso!</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<router>
{
  path : '/aluno/alterar-senha',
  name: 'alterar-senha'
}

</router>

<script scoped>
import auth from "../../services/http/auth";
import users from "../../services/http/users";

export default {
  name: 'changePassword',
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
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      nameRules: [v => !!v || "Digite seu nome"],
      passwordRules: [
        v => !!v || "Digite a senha",
        v => (v && v.length >= 6) || "A senha deve ter no mínimo 6 caractéres"
      ],
      emailRules: [
        v => !!v || "Digite o e-mail",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ]
    };
  },

  methods: {
    switchPassword() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);

        users.updatePass(this.form)
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
          console.error(err);
        });
      } else {
        this.animateForm(false);
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add("hide-form");
        document.querySelector("html").style.overflow = "hidden";
        setTimeout(() => {
          this.loading = true;
        }, 300);
      } else {
        this.$refs.flex.classList.add("error-form");
        setTimeout(() => {
          this.$refs.flex.classList.remove("error-form");
        }, 500);
      }
      document.querySelector("html").style.overflow = "scroll";
    },

    goBack() {
      this.$router.back();
    },

    gotoHome() {
      $nuxt._router.push("/aluno/home");
    },
  },

  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || "Confirme a senha",
        () =>
          this.form.confirmNewPassword === this.form.newPassword ||
          "As senhas devem ser idênticas."
      ];
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap");

/* Global */
* {
  font-family: "Montserrat", Helvetica, Arial, sans-serif !important;
}

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
  color: #6600cc;
}

.relative-col {
  position: relative;
}

::v-deep .btn-back {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
}

.img-fluid {
  display: block;
  margin: 0 auto;
  width: 375px;
  max-width: 100%;
}

::v-deep .theme--light.v-btn::before {
  background-color: transparent;
}

/* inputs */
::v-deep .theme--light.v-text-field {
  margin-top: 0;
}


::v-deep .theme--light.v-input:not(.v-input--is-disabled) input {
  font-size: 12px;
  color: #60c;
}

::v-deep .theme--light.v-text-field:not(.v-input--has-state)>.v-input__control>.v-input__slot:hover:before {
  border-color: #60c;
}

::v-deep .theme--light.v-label,
::v-deep .theme--light.v-icon {
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  color: #aa56ff;
}

::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 25px;
}

::v-deep .theme--light.v-icon {
  font-size: 20px;
}

::v-deep .change-btn {
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 4px 5px gray!important;
}
::v-deep .v-text-field {
  margin: 0 6% 0 6% !important;
 }

::v-deep .v-btn__content {
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  line-height: 15px;
}

::v-deep .theme--light.v-text-field > .v-input__control > .v-input__slot::before {
  border-color: #aa56ff;
}


::v-deep .v-text-field.v-input--has-state>.v-input__control>.v-input__slot:before {
  border-color: #ff5252; /* cor da borda quando der estado de erro */
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
  color: #60c;
}
</style>
