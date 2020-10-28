<template>
  <div>
    <HeaderBar :title="'Alterar Dados'" :back-page="true" />
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
                class="btn-block btn-primary"
                @click="submit">
                  Alterar
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                class="btn-block btn-white"
                to="/aluno/alterar-senha">
                  Alterar Senha
                </v-btn>
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
</style>
