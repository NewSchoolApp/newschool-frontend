<template>
  <v-layout align-center justify-center>
    <div class="bg"></div>

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular
          :size="70"
          :width="5"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <v-flex role="main" xs10 sm8 md4 ref="flex" v-else >
      <div class="bg-symbol">
        <img src="../assets/logo.svg" alt="New Schoool logo" />
      </div>
      <v-container>
        <v-row>
          <v-col cols="12"> </v-col>
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="12">
              <v-text-field
                class="shadow-input"
                v-model="email"
                :rules="emailRules"
                solo
                required
              ><template v-slot:label>Email</template>
              </v-text-field>
              <v-text-field
                class="shadow-input"
                type="password"
                v-model="password"
                :rules="passwordRules"
                solo
                required
              ><template v-slot:label>Senha</template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="btn-block btn-primary btn-white"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                depressed
                large
                @click="submit"
                >Login</v-btn
              >
            </v-col>
          </v-form>
          <v-col cols="12" class="text-center">
            <a class="text-white">
              Esqueceu sua senha?
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import auth from "../services/http/auth";

export default {
  data: () => ({
    status: true,
    loading: false,

    title: "Entrar",

    email: "",
    emailRules: [
      v => !!v || "Digite o e-mail",
      v => /.+@.+\..+/.test(v) || "E-mail inválido"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Digite a senha",
      v => (v && v.length >= 6) || "A senha deve ter no mínimo 6 caractéres"
    ]
  }),

  head () {
    return {
      title: this.title
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        auth
          .login(this.email, this.password)
          .then(() => {
            $nuxt._router.push("/index");
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
    }
  }
};
</script>

<style>
.v-messages__message {
  color: #d6adff !important;
}
::placeholder {
  color: #aa56ff !important;
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../assets/paraisopolis.png");
  background-size: cover;
  background-position: center;
}
.v-form {
  width: 100%;
}

.v-input__slot {
  padding: 10px;
  width: 100%;
  border-radius: unset !important;
  border: solid 0.5px #aa56ff;
  background-color: #3e0675de !important;
  box-shadow: none !important;
}
.v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.container-spinner,
.flex {
  z-index: 2;
}

.flex {
  animation: intro 300ms backwards;
  animation-delay: 350ms;
}
.layout {
  background: #6600cc !important;
}
.bg-symbol {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.bg-symbol img {
  width: 40%;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
