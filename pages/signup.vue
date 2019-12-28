<template>
  <v-layout align-center justify-center>

    <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>


    <v-flex xs10 sm8 md6 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="logo-container">
              <img src="../assets/purple-logo.svg" alt="castor" />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="page-title">Cadastro</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="12">
              <v-text-field
                v-model="form.name"
                label="Nome *"
                name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Email *"
                name="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Senha *"
                name="password"
                :rules="passwordRules"
                :type="showPass ? 'password' : 'text'"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showPass = !showPass)"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.confirmPassword"
                label="Confirmar senha *"
                :rules="confirmPasswordRules"
                :type="showConfirmPass ? 'password' : 'text'"
                :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showConfirmPass = !showConfirmPass)"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.urlFacebook"
                label="Facebook"
                name="urlFacebook"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="form.urlInstagram"
                label="Instagram"
                name="urlInstagram"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn class="btn-block btn-submit" depressed large @click="submit">Cadastrar</v-btn>
            </v-col>
          </v-form>
          <v-col cols="12" class="text-center">
            <a class="login-link" @click="gotoLogin">Ops, já tenho conta</a>
          </v-col>
          <v-snackbar
            v-model="snackbar"
            :color="snackbarStatus"
            :timeout="5000"
            :bottom="true"
            :right="true"
          >
            {{ snackbarText }}
            <v-btn
              color="#FFF"
              text
              @click="snackbar = false"
            >
              Fechar
            </v-btn>
          </v-snackbar>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script scoped>
import auth from "../services/http/auth";

export default {
  data() {
    return {
      status: true,
      loading: false,
      showPass: String,
      showConfirmPass: String,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        urlFacebook: "",
        urlInstagram: "",
        role: 'STUDENT'
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
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        auth
          .signUp(this.form, this.token)
          .then(res => {     
            this.loading = false;  
            this.confirmSnackbar('Cadastro efetuado! ;)', 'success');
            setTimeout(() => {
              this.gotoLogin();
            }, 2500); 
          })
          .catch(err => {
            this.confirmSnackbar('Ocorreu um erro.', 'error');
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

    showPassword() {
      this.eyeIcon === 'mdi-eye' ? this.eyeIcon = 'mdi-eye-off' : this.eyeIcon = 'mdi-eye'
    },

    showConfirmPassword() {
      this.eyeIcon2 === 'mdi-eye' ? this.eyeIcon2 = 'mdi-eye-off' : this.eyeIcon2 = 'mdi-eye'
    },

    gotoLogin() {
      $nuxt._router.push("/login");
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    }

  },

  mounted() {
    auth.getExternalCredentials().then(res => {      
        const { data } = res;
        this.token = data.accessToken;   
      })
      .catch(err => {            
        console.error(err);
      });
  },
  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || "Confirme a senha",
        () =>
          this.form.password === this.form.confirmPassword ||
          "As senhas devem ser idênticas."
      ];
    }
  }
};
</script>

<style>

/* Global */
* {
  font-family: "Montserrat", Helvetica, Arial, sans-serif !important;
  font-size: 14px;
}

.flex {
  animation: intro 300ms backwards;
  animation-delay: 350ms;
}

.layout {
  background: #fff;
}

/* Page */
.page-title {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  color: #6600cc;
}

/* Logo */
.logo-container {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
}

.logo-container img {
  width: 80px;
}

/* Form */
.v-form {
  width: 100%;
}

.theme--light.v-label {
  font-weight: 500;
  color: #aa56ff;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #aa56ff;
}

.theme--light.v-text-field:not(.v-input--has-state) > .v-input__control > .v-input__slot:hover:before {
  border-color: #6600CC;
}

.theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600CC;
}

.v-input__slot {
  margin-top: 20px;
  padding-left: 5px;
  width: 100%;
  border-radius: unset;
  background-color: #fff;
  box-shadow: none;
}

.v-text-field {
  padding-top: 0;
  margin-top: 0;
  color: #6600CC;
}

.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600CC;
}

.v-icon.v-icon.v-icon--link {
  color: #aa56ff;
  padding-right: 5px;
}

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #6600cc;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
}

.login-link {
  color: #6600cc;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}

/* Error messages */
.v-messages__message {
  color: #ff5252;
  font-size: 12px;
  margin-left: 5px;
}

/* Snackbar */
.v-snack__content {
  border-radius: 5px;
}
</style>
