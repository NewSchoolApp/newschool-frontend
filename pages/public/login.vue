<template>
  <v-layout align-center justify-center>
    <div class="bg" />

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate color="#fff" />
      </div>
    </div>

    <v-flex role="main" xs10 sm8 md4 ref="flex" v-else>
      <div class="bg-symbol">
        <img src="../../assets/logo.svg" alt="New Schoool logo" />
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" />
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="12">
              <v-text-field
                dark
                color="#fff"
                v-model="email"
                :rules="emailRules"
                label="Email"
                data-vv-name="email"
                required
              ></v-text-field>
              <v-text-field
                dark
                color="#fff"
                v-model="password"
                :rules="passwordRules"
                label="Senha"
                data-vv-name="password"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (showPass = !showPass)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="btn-block btn-transparent"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                depressed
                large
                to="/cadastro"
              >Cadastrar</v-btn>
            </v-col>
          </v-form>
          <v-col cols="12">
            <v-btn
              class="btn-block btn-primary btn-white"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              depressed
              large
              @click="submit"
            >Login</v-btn>
          </v-col>
          <v-col cols="12" class="text-center">
            <a class="text-white">Esqueceu sua senha?</a>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card-title class="headline">Ops!</v-card-title>
      <v-card-text>Usuário ou senha incorretos!</v-card-text>
      <v-btn color="primary" text @click="dialog = false">Ok</v-btn>
    </v-dialog>
  </v-layout>
</template>

<router>
  {
    path: '/login'
  }
</router>

<script>
import auth from '../../services/http/auth'

export default {
  data: () => ({
    //flags
    status: true,
    loading: false,
    dialog: false,
    showPass: false,

    title: 'Entrar',

    email: '',
    emailRules: [
      v => !!v || 'Digite o e-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail inválido',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Digite a senha',
      v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caracteres',
    ],
  }),

  head() {
    return {
      title: this.title,
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true)
        auth
          .login(this.email, this.password)
          .then(() => {
            auth.getInfoUser()
            $nuxt._router.push('/aluno/home')
          })
          .catch(err => {
            setTimeout(() => {
              this.dialog = true
              this.loading = false
            }, 500)
            console.error(err)
          })
      } else {
        this.animateForm(false)
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add('hide-form')
        document.querySelector('html').style.overflow = 'hidden'
        setTimeout(() => {
          this.loading = true
        }, 300)
      } else {
        this.$refs.flex.classList.add('error-form')
        setTimeout(() => {
          this.$refs.flex.classList.remove('error-form')
        }, 500)
      }
    },
  },
}
</script>

<style scoped>
::placeholder {
  color: #aa56ff !important;
}

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url('../../assets/paraisopolis.png');
  background-size: cover;
  background-position: center;
}

::v-deep .v-dialog {
  background: #fff;
  text-align: center;
}

.v-card__title {
  justify-content: center;
}

.v-form {
  width: 100%;
}

.v-input__slot:before,
.v-input__slot::before {
  border-color: #c58aff !important;
}

.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #fff !important;
}

.v-label {
  color: #c58aff !important;
}

.primary--text {
  color: #c58aff !important;
  caret-color: #c58aff !important;
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

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #c58aff;
}

.theme--light.v-label {
  color: #c58aff;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #c58aff;
}

::v-deep .v-dialog {
  background-color: #fff;
}

::v-deep .v-card__title + .v-card__text {
  text-align: center;
}
</style>
