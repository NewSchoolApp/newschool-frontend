<template>
  <v-layout align-center justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>

  

    <v-flex v-else ref="flex" xs10 sm8 md6>
      <HeaderBar :title="'Perdeu a senha?'" :back-page="true" />
      <v-container>        
        <v-row>
          <v-col cols="15">
            <div class="logo-center">
              <img src="~/assets/forgout.svg" alt="castor" />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="15">
            <a class="page-text"
              >Digite seu email registrado para redefinir sua senha</a
            >
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
              <v-btn
              class="btn-block btn-primary"
              @click="submit">
                Redefinir senha
              </v-btn>
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

import auth from '../../services/http/auth';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    HeaderBar,
  },

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
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        auth
          .forgotPassword(this.form)
          .then(res => {
            this.loading = false;
            this.confirmSnackbar('O link foi pro seu email! ;)', 'success');
            setTimeout(() => {
              this.gotoLogin();
            }, 2500);
          })
          .catch(err => {
            this.confirmSnackbar('E-mail inválido.', 'error');
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

    gotoLogin() {
      $nuxt._router.push('/login');
    },
    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },

  loadClientCredentials() {
    utils
      .getExternalCredentials()
      .then(res => {
        console.log(res);
        this.token = res.data.accessToken;
      })
      .catch(() => {
        $$nuxt._router.push('/login');
      });
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
</style>
