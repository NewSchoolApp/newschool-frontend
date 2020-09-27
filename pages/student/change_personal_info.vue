<template>
  <div>
    <HeaderBar :title="'Alterar Dados'" :back-page="true"></HeaderBar>
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
            <v-form ref="form" v-model="status" lazy-validation>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  :rules="nameRules"
                  placeholder="Nome"
                  name="name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  placeholder="E-mail"
                  name="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.urlFacebook"
                  placeholder="URL do Facebook"
                  name="urlFacebook"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.urlInstagram"
                  type="text"
                  placeholder="URL do Instagram"
                  name="urlInstagram"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="btn-block btn-submit btn-primary"
                  depressed
                  large
                  @click="submit"
                  >Alterar</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="btn-block btn-submit btn-second"
                  depressed
                  large
                  to="/aluno/alterar-senha"
                  >Alterar Senha</v-btn
                >
              </v-col>
            </v-form>
            <v-snackbar
              v-model="snackbar"
              :color="snackbarStatus"
              :timeout="5000"
              :top="true"
              :right="true"
            >
              {{ snackbarText }}
              <v-btn color="#FFF" text @click="snackbar = false">
                Fechar
              </v-btn>
            </v-snackbar>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
    <navigation-bar />
  </div>
</template>
<router>
{
  path : '/aluno/alterar',
  name: 'alterar'
}

</router>

<router>
{
  path : '/aluno/alterar'
}
</router>

<script scoped>
import auth from '../../services/http/auth';
import users from '../../services/http/users';
import http from '~/services/http/generic';
import utils from '~/utils/index';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
  data() {
    return {
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      form: {
        id: '',
        name: '',
        email: '',
        urlFacebook: '',
        urlInstagram: '',
      },
      nameRules: [v => !!v || 'Digite seu nome'],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
    };
  },
  mounted() {
    http.getAll(process.env.endpoints.USER_ME).then(res => {
      this.form = {
        id: res.data.id || '',
        name: res.data.name || '',
        email: res.data.email || '',
        urlFacebook: res.data.urlFacebook || '',
        urlInstagram: res.data.urlInstagram || '',
        role: {
          id: res.data.role.id || '',
          name: res.data.role.name || '',
        },
      };
    });
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        // let payload = utils(this.form)
        users
          .update(this.form)
          .then(res => {
            this.loading = false;
            this.confirmSnackbar('Dados alterados com sucesso', 'success');
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

    gotoHome() {
      $nuxt._router.push('/aluno/home');
    },

    goBack() {
      $nuxt._router.push('/aluno/perfil');
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

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

/* Spinner */
.spiner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

/* Placeholder */
::v-deep ::placeholder {
  color: #6600cc !important;
}

/* Page */
.page-title {
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 19px;
  text-align: center;
  color: #6600cc;
}

.relative-col {
  position: relative;
}
/* Form */
.v-form {
  width: 100%;
}

::v-deep .theme--light.v-label {
  font-weight: 600;
  color: #6600cc !important;
}

::v-deep
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border: 1px solid #6600cc !important;
}

::v-deep
  .theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #6600cc !important;
}

::v-deep .theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600cc !important;
}

::v-deep .v-input__slot {
  margin-top: 20px !important;
  padding-left: 5px !important;
  width: 100%;
  border-radius: unset !important;
  background-color: #fff !important;
  box-shadow: none !important;
}

::v-deep .v-text-field {
  padding-top: 0 !important;
  margin: 0 6% 0 6% !important;
  color: #6600cc;
}

::v-deep .v-text-field input {
  font-size: 12px;
  line-height: 15px;
}

::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 25px;
}

::v-deep .v-icon.v-icon.v-icon--link {
  color: #aa56ff;
  padding-right: 5px;
}

::v-deep
  .btn-primary.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #6600cc !important;
  border-radius: 0 !important;
  box-shadow: 0 4px 5px gray !important;
  color: #fff !important;
  font-weight: bold !important;
}
::v-deep
  .btn-second.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #fff !important;
  border: 1px solid #6600cc !important;
  color: #6600cc !important;
  font-weight: bold !important;
}

::v-deep .login-link {
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
</style>
