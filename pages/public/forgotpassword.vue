<template>
  <v-layout align-center justify-center>
    <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>

    <v-flex xs10 sm8 md6 ref="flex" v-else>
      <v-container>
        <v-row>
          <v-col cols="12" class="relative-col">
            <v-btn class="btn-back" text icon @click="gotoLogin">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h2 class="page-title">Perdeu a senha?</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="15">
            <div class="logo-center">
              <img src="~/assets/forgout.svg" alt="castor" />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="15">
            <a class="page-text">Digite seu email registrado para redefinir sua senha</a>
          </v-col>
        </v-row>
        <v-row>
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="15">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Email *"
                name="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn color="#60c" dark block depressed large @click="submit">Redefinir senha</v-btn>
            </v-col>
          </v-form>
          <v-col cols="12" class="text-center">
            <a class="login-link" @click="gotoLogin">Voltar para o Login</a>
          </v-col>
          <v-snackbar
            v-model="snackbar"
            :color="snackbarStatus"
            :timeout="5000"
            :top="true"
            :right="true"
          >
            {{ snackbarText }}
            <v-btn color="#FFF" text @click="snackbar = false">Fechar</v-btn>
          </v-snackbar>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<router>
{
  path : '/esqueci-minha-senha'
}
</router>

<script scoped>
import auth from '../../services/http/auth'
import StackUtils from 'stack-utils'
export default {
  data() {
    return {
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      token: '',
      form: {
        email: '',
      },
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true)
        auth
          .forgotPassword(this.form)
          .then(res => {
            this.loading = false
            this.confirmSnackbar('O link foi pro seu email! ;)', 'success')
            setTimeout(() => {
              this.gotoLogin()
            }, 2500)
          })
          .catch(err => {
            this.confirmSnackbar('E-mail inválido.', 'error')
            setTimeout(() => {
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
      document.querySelector('html').style.overflow = 'scroll'
    },

    gotoLogin() {
      $nuxt._router.push('/login')
    },
    confirmSnackbar(text, status) {
      this.snackbarText = text
      this.snackbarStatus = status
      this.snackbar = true
    },
  },

  loadClientCredentials() {
    utils
      .getExternalCredentials()
      .then(res => {
        console.log(res)
        this.token = res.data.accessToken
      })
      .catch(() => {
        $$nuxt._router.push('/login')
      })
  },
}
</script>

<style scoped>
/* Global */
* {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
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

.logo-center {
  text-align: center;
}

/* Form */
.v-form {
  width: 100%;
}
.theme--light.v-label {
  font-weight: 600;
  color: #aa56ff !important;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #aa56ff !important;
}
.theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #6600cc !important;
}
.theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600cc !important;
}
.v-input__slot {
  margin-top: 20px !important;
  padding-left: 5px !important;
  width: 100%;
  border-radius: unset !important;
  background-color: #fff !important;
  box-shadow: none !important;
}
.v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
  color: #6600cc;
}
.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600cc;
}
.v-icon.v-icon.v-icon--link {
  color: #aa56ff;
  padding-right: 5px;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
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
  color: #ff5252 !important;
  font-size: 12px !important;
  margin-left: 5px;
}
/* Snackbar */
.v-snack__content {
  border-radius: 5px;
}

::v-deep .theme--light.v-label,
::v-deep .theme--light.v-icon {
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  color: #aa56ff;
}

::v-deep .btn-back {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
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
  box-shadow: 0 4px 5px gray !important;
}
</style>
