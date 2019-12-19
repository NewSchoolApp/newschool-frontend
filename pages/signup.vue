<template>
  <v-layout align-center justify-center>
    <!-- <div class="bg"></div> -->

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular
          :size="70"
          :width="5"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <v-flex xs10 sm8 md4 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="bg-symbol">
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
              <v-file-input prepend-icon="mdi-camera" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Nome"
                class="shadow-input"
                v-model="form.nome"
                :rules="nameRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Email"
                class="shadow-input"
                v-model="form.email"
                :rules="emailRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Senha"
                class="shadow-input"
                type="password"
                v-model="form.password"
                :rules="passwordRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Confirmar senha"
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
                v-model="form.userFacebook"
                :rules="facebookRules"
                solo
                required
              ></v-text-field>
              <v-text-field
                placeholder="Instagram"
                class="shadow-input"
                type="text"
                v-model="form.userInstagram"
                :rules="instagramRules"
                solo
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="btn-block btn-submit"
                depressed
                large
                @click="submit"
                >Cadastrar</v-btn
              >
            </v-col>
          </v-form>
          <v-col cols="12" class="text-center">
            <v-btn
                class="btn-block btn-reset"
                depressed
                large
                @click="clearFields"
                >Limpar campos</v-btn
              >
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import http from "../services/http/generic";

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
        userFacebook: "",
        userInstagram: "",  
        roles : {}
      },
      nameRules: [
        v => !!v || "Digite seu nome",
        v => (v && v.legth >= 3) || "Seu nome deve ter pelo menos 3 caractéres"
      ],
      passwordRules: [
        v => !!v || "Digite a senha",
        v => (v && v.length >= 6) || "A senha deve ter no mínimo 6 caractéres"
      ],
      emailRules: [
        v => !!v || "Digite o e-mail",
        v => /.+@.  +\..+/.test(v) || "E-mail inválido"
      ],
      facebookRules: [
        v => !!v || "Cole o link do seu Facebook",
        v => (v.includes('facebook.com/')) || "ex: https://facebook.com/newschool"
      ],
      instagramRules: [
        v => !!v || "Cole o link do seu Instagram",
        v => (v.includes('instagram.com/')) || "ex: https://instagram.com/newschool"
      ],
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        http
          .post("api/v1/user", this.form)
          .then(() => {
            // invoke de modal confirmação.
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
    },
    
    clearFields() {
      this.form.nome = "",
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.form.userFacebook = "";
      this.form.userInstagram = "";
    }
  },


  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || "Confirme a senha",
        () => (this.form.password === this.form.confirmPassword) || "As senhas devem ser idênticas."
      ]
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,900&display=swap');

* {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

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
  background-color: #fff !important;
  box-shadow: none !important;
}

.v-text-field {
  padding-top: 0;
  margin-top: 0;
  color: #6600CC;
}

.v-file-input {
  position: relative;
  width: 150px;
  margin: 0 auto;
}

.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600CC;
}

.v-file-input .v-input {
  margin: 0!important;
  color: #6600CC!important;
}

.v-file-input .v-input__slot {
  width: 150px!important;
  height: 150px!important;
  border-radius: 50%!important;
  border: none;
  background: #6600CC!important;
}

.v-file-input .v-input__slot::before {
  display: none;
}

.v-input__icon .v-input__prepend {
  background: red!important;
}


.v-file-input .v-input__icon,
.v-input__icon .v-input__prepend-outer {
  position: absolute;
  top: 65px;
  left: 72px;
  transform: scale(3);
  opacity: .3;
  z-index: 1;
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
  background: #fff !important;
}

.page-title {
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #6600CC;
}

.bg-symbol {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
}

.bg-symbol img {
  width: 20%;
}

.btn-submit {
  background: #6600CC!important;
  border-radius: 0!important;
  color: #fff!important;
  font-weight: bold!important;
}

.btn-reset {
  background: #fff!important;
  border: 1px solid #6600CC!important;
  border-radius: 0!important;
  color: #6600CC!important;
  font-weight: bold!important;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
