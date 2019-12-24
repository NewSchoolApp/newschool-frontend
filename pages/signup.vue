<template>
  <v-layout align-center justify-center>
    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate></v-progress-circular>
      </div>
    </div>

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
              <v-text-field class="shadow-input" v-model="form.nome" label="Nome" required></v-text-field>
              <v-text-field
                placeholder="Email *"
                class="shadow-input"
                v-model="form.email"
                :rules="emailRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Senha *"
                class="shadow-input"
                type="password"
                v-model="form.password"
                :rules="passwordRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Confirmar senha *"
                class="shadow-input"
                type="password"
                v-model="form.confirmPassword"
                :rules="confirmPasswordRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Facebook"
                class="shadow-input"
                type="text"
                v-model="form.urlFacebook"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Instagram"
                class="shadow-input"
                type="text"
                v-model="form.urlInstagram"
                solo
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
      form: {
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
        urlFacebook: "",
        urlInstagram: "",
        roles: {}
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
          .signUp(this.form)
          .then(res => {
            console.log(res);
            // MODAL CONFIRM
          })
          .catch(err => {
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
    },

    gotoLogin() {
      $nuxt._router.push("/login");
    },

    signUp(token, form) {
      auth
        .signUp(form)
        .then(() => {})
        .catch(err => {
          this.error(err);
        });
    },
    confirmationModal() {},
    error(err) {
      console.error(err);

      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
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
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap");

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
  background: #fff !important;
}

/* Page */
.page-title {
  font-size: 24px;
  font-weight: 500;
  color: #6600cc;
}

/* Load spinner */
.container-spinner,
.flex {
  z-index: 2;
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
  width: 12%;
}

/* Form */
.v-form {
  width: 100%;
}

::placeholder {
  color: #aa56ff !important;
}

.v-input__slot {
  padding-left: 5px !important;
  width: 100%;
  border-radius: unset !important;
  border-bottom: solid 1.5px #6600cc;
  background-color: #fff !important;
  box-shadow: none !important;
}

.v-text-field {
  padding-top: 0;
  margin-top: 0;
  color: #6600cc;
}

.v-file-input {
  position: relative;
  width: 150px;
  margin: 0 auto;
}

.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600cc;
}

.btn-submit {
  background: #6600cc !important;
  border-radius: 5px !important;
  color: #fff !important;
  font-weight: bold !important;
}

.login-link {
  color: #6600cc !important;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}

/* Error messages */
.v-messages__message {
  color: red !important;
}
</style>
