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
      <v-flex xs12 sm8 md4 ref="flex" v-else>
        <div class="bg-symbol">
          <img src="../assets/logo.svg" alt="castor" />
        </div>
        <v-container>
          <v-row>
            <v-col cols="12">
            </v-col>
            <v-form ref="form" v-model="status" lazy-validation>
              <v-col cols="12">
                <v-text-field
                  placeholder="Email"
                  class="shadow-input"
                  v-model="email"
                  :rules="emailRules"
                  solo
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  placeholder="Senha"
                  class="shadow-input"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  solo
                  required
                ></v-text-field>
                
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="btn-block btn-primary"
                  depressed
                  large
                  @click="submit"
                  >Login</v-btn
                >
              </v-col>
            </v-form>
            <v-col cols="12">
              <v-btn class="btn-block btn-secondary" depressed large
                >Cadastrar</v-btn
              >
            </v-col>
            <v-col cols="12">
              <a>
                Esqueceu sua senha?
              </a>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </div>
  </v-layout>
</template>

<style>
.bg {
  width: 100%;
  height: 100%;
  opacity: 0.3;
  position: fixed;
  background: url("../assets/bg-login.jpg");
  background-size: cover;
  background-position: center;
}
.v-form {
  width: 100%;
}

.v-text-field{
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
  background: #6600CC !important;
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

@keyframes intro {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  70% {
    transform: translateX(5);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
}

@keyframes nono {
  0% {
    transform: translateX(0);
  }
  35% {
    transform: translateX(-15%);
  }
  70% {
    transform: translateX(15%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<script>

import auth from "../services/http/auth";

export default {
  data: () => ({
    status: true,
    loading: false,

    email: "",
    emailRules: [
      v => !!v || "Digite o e-mail",
      v => /.+@.+\..+/.test(v) || "E-mail inválido"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Digite a senha",
      v => (v && v.length >= 6) || "A senha deve ter no mínimo 6 caracteres"
    ]
  }),

  methods: {

    submit() {
      if(this.$refs.form.validate()){
        auth.login(this.email, this.password)
        this.animateForm(true)
      }else{
        this.animateForm(false)
      }
    },
    
    animateForm(status){
      if(status){
        this.$refs.flex.classList.add("hide-form");
        document.querySelector("html").style.overflow = "hidden";
        setTimeout(() => {
          this.loading = true;  
        }, 500);

      }else{  
        this.$refs.flex.classList.add("error-form");
        setTimeout(() => {
          this.$refs.flex.classList.remove("error-form");
        }, 500);
      }
    },

    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
