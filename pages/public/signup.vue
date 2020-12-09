<template>
  <v-layout align-center justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>

    <v-flex v-else ref="flex" xs10 sm8 md6>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="logo-container">
              <img src="~/assets/purple-logo.svg" alt="castor" />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h1 class="page-title">Cadastro</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-form ref="form" v-model="status" lazy-validation>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Digite seu nome"
                label="Qual é o seu nome?"
                name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                placeholder="Digite seu e-mail"
                :rules="emailRules"
                label="E o seu e-mail?"
                name="email"
                required
              ></v-text-field>
              <v-select
                v-model="form.profile"
                placeholder="Selecione o seu perfil!"
                :items="profile"
                label="Quem é você fora do app?"
                required
                hide-no-data
                hide-selected
              ></v-select>
              <!-- <v-text-field
                v-if="this.form.profile === 'Aluno'"
                v-model="form.institutionName"
                :items="schools"
                placeholder="Digite o nome da sua escola"
                label="Onde estuda?"
              ></v-text-field> -->
              <v-autocomplete
                v-if="this.form.profile === 'Aluno'"
                v-model="form.institutionName"
                :items="schools"
                hide-no-data
                hide-selected
                :loading="isLoading"
                placeholder="Digite o nome da sua escola"
                label="Onde estuda?"
                @keyup="searchTimeOut($event.target.value)"
              ></v-autocomplete>
              <v-text-field
                v-model="form.password"
                placeholder="Digite sua senha"
                label="Crie sua senha"
                name="password"
                :rules="passwordRules"
                :type="showPass ? 'password' : 'text'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showPass = !showPass)"
              ></v-text-field>
              <v-text-field
                v-model="form.confirmPassword"
                placeholder="Confirme sua senha"
                :rules="confirmPasswordRules"
                :type="showConfirmPass ? 'password' : 'text'"
                :append-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showConfirmPass = !showConfirmPass)"
              ></v-text-field>
              <v-btn class="btn-block btn-primary" @click="submit">
                Cadastrar
              </v-btn>
            </v-form>
          </v-col>
          <v-col cols="12" class="text-center">
            <a class="login-link" @click="gotoLogin">Ops, já tenho conta</a>
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
  path : '/cadastro'
}
</router>

<script scoped>
import auth from '../../services/http/auth';
import utils from '~/utils/index';
import { http } from '~/services/http/config';

export default {
  data() {
    return {
      title: 'Cadastro',
      status: true,
      loading: false,
      isLoading: false,
      showPass: String,
      showConfirmPass: String,
      snackbar: false,
      snackbarText: '',
      schools: [],
      snackbarStatus: '',
      profile: [
        'Aluno de escola',
        'Pai de aluno',
        'Professor',
        'Estudante de faculdade',
        'Parceiro/Investidor',
        'Parei de estudar',
        'Outros',
      ],
      form: {
        name: '',
        email: '',
        password: '',
        profile: '',
        confirmPassword: '',
        schooling: '',
        institutionName: '',
        role: 'STUDENT',
      },

      nameRules: [v => !!v || 'O campo não pode estar em branco'],
      passwordRules: [
        v => !!v || 'Digite a senha',
        v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caractéres',
      ],
      emailRules: [
        v => !!v || 'Digite o e-mail',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
    };
  },
  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || 'Confirme a senha',
        () =>
          this.form.password === this.form.confirmPassword ||
          'As senhas devem ser idênticas.',
      ];
    },
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const postObject = Object.assign({}, this.form);
        const profileEnum = {
          'Aluno de escola': 'STUDENT',
          'Parei de estudar': 'EX_STUDENT',
          'Estudante de faculdade': 'UNIVERSITY',
          'Pai de aluno': 'FATHER',
          'Parceiro/Investidor': 'INVESTOR',
          Outros: 'OTHERS',
          Professor: 'OTHERS',
        };
        const { profile } = postObject;
        postObject.profile = profileEnum[profile];
        const inviteKey = this.$route.params.inviteKey
          ? this.$route.params.inviteKey
          : null;
        delete postObject.confirmPassword;
        this.animateForm(true);
        this.loadClientCredentials()
          .then(res => {
            const token = res.data.accessToken;
            auth
              .signUp(postObject, token, inviteKey)
              .then(res => {
                this.loading = false;
                this.confirmSnackbar('Cadastro efetuado! ;)', 'success');
                setTimeout(() => {
                  this.gotoLogin();
                }, 2500);
              })
              .catch(err => {
                setTimeout(() => {
                  this.loading = false;
                }, 500);
                console.error(err);
              });
          })
          .catch(() => {
            $nuxt._router.push('/login');
          });
      } else {
        this.animateForm(false);
      }
    },
    searchTimeOut(school) {
      if (!school) {
        this.schools = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getSchool(school);
      }, 800);
    },

    async getSchool(school) {
      if (!school) {
        this.schools = [];
        return;
      }
      if (this.isLoading) return;

      this.isLoading = true;
      this.loadClientCredentials().then(res => {
        const token = res.data.accessToken;
        const response = http
          .get(`${process.env.endpoints.SCHOOL}?name=${school}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
            if (!res.data.length) {
              this.isLoading = false;
              this.schools.unshift(school.toUpperCase());
            }
            res.data.forEach(school => this.schools.push(school.nome));
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
          });
      });
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

    showPassword() {
      this.eyeIcon === 'mdi-eye'
        ? (this.eyeIcon = 'mdi-eye-off')
        : (this.eyeIcon = 'mdi-eye');
    },

    showConfirmPassword() {
      this.eyeIcon2 === 'mdi-eye'
        ? (this.eyeIcon2 = 'mdi-eye-off')
        : (this.eyeIcon2 = 'mdi-eye');
    },

    gotoLogin() {
      $nuxt._router.push('/login');
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
    loadClientCredentials() {
      return utils.getExternalCredentials();
    },
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Cadastra-se no aplicativo da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
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

/* Page */
.page-title {
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;
  color: var(--primary);
  width: 100%;
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
  width: 48px;
}

/* Form */
.v-form {
  width: 100%;
}

::v-deep .theme--light.v-icon {
  color: var(--primary);
}

::v-deep .v-btn {
  margin-top: 15px;
}

::v-deep .v-card__actions {
  padding: 0;
}

::v-deep .v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitl {
  color: var(--primary);
  font-size: 14px;
}

::v-deep .v-messages__message {
  color: #ff5252;
  font-size: 14px;
  margin-left: 5px;
}

.login-link {
  font-size: 14px;
  color: var(--primary);
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
