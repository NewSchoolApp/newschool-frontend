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
                color="#60c"
                label="Qual é o seu nome?"
                name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                placeholder="Digite seu e-mail"
                color="#60c"
                :rules="emailRules"
                label="E o seu e-mail?"
                name="email"
                required
              ></v-text-field>
              <v-select
                v-model="form.profile"
                placeholder="Selecione o seu perfil!"
                :items="profile"
                label="Qual é o seu perfil?"
                required
              ></v-select>
              <v-text-field
                v-if="this.form.profile === 'Aluno'"
                v-model="form.institutionName"
                :items="schools"
                placeholder="Digite o nome da sua escola"
                label="Onde estuda?"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                placeholder="Digite sua senha"
                color="#60c"
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
                style=" margin-top:-15px !important; margin-bottom:20px;"
                placeholder="Confirme sua senha"
                color="#60c"
                :rules="confirmPasswordRules"
                :type="showConfirmPass ? 'password' : 'text'"
                :append-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showConfirmPass = !showConfirmPass)"
              ></v-text-field>
              <v-btn
                class="btn__content"
                color="#60c"
                dark
                block
                depressed
                large
                @click="submit"
                >Cadastrar</v-btn
              >
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
        'Aluno',
        'Ex-Aluno',
        'Universitário',
        'Pai',
        'Investidor',
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
          Aluno: 'STUDENT',
          'Ex-Aluno': 'EX_STUDENT',
          Universitário: 'UNIVERSITY',
          Pai: 'FATHER',
          Investidor: 'INVESTOR',
          Outros: 'OTHERS',
        };
        const { profile } = postObject;
        postObject.profile = profileEnum[profile];

        delete postObject.confirmPassword;
        this.animateForm(true);
        this.loadClientCredentials()
          .then(res => {
            const token = res.data.accessToken;
            auth
              .signUp(postObject, token)
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
    // searchTimeOut(school) {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //   }
    //   this.timer = setTimeout(() => {
    //     this.getSchool(school);
    //   }, 800);
    // },

    // async getSchool(school) {
    //   if (this.isLoading) return;

    //   this.isLoading = true;

    //   const response = await fetch(
    //     `https://api-newschool.herokuapp.com/school?nome=${school}`,
    //   )
    //     .then(res => res.text())
    //     .then(res => res)
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     .finally(() => (this.isLoading = false));
    //   // this.schools.push(response)
    //   JSON.parse(response)[1].forEach(item => this.schools.push(item.nome));
    //   this.schools.unshift(school.toUpperCase());
    // },

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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap');

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
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  text-transform: uppercase;
  color: #6600cc;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
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
  /* inputs */
}

::v-deep .theme--light.v-text-field {
  margin-top: 0;
}

::v-deep .v-input {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

::v-deep .theme--light.v-input:not(.v-input--is-disabled) input {
  font-size: 13px;
  color: #60c;
}

::v-deep .theme--light.v-select .v-select__selection--comma {
  font-size: 14px;
  font-weight: 200;
  color: #6600cc !important;
}

::v-deep
  .theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #60c;
}

.theme--light.v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #6600cc !important;
}
::v-deep .theme--light.v-label,
::v-deep .theme--light.v-icon {
  font-size: 17px !important;
  font-weight: 650;
  line-height: 15px;
  color: #6600cc;
}

.theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600cc !important;
  font-size: 16px;
}
::v-deep .theme--light.v-icon {
  font-size: 20px;
}

::v-deep .v-btn {
  margin-top: 15px;
}

::v-deep .v-radio {
  margin-left: -14px;
}

.btn__content {
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  line-height: 15px;
}
::v-deep .v-text-field--is-booted {
  font-size: 16px !important;
  padding-top: 0 !important;
  margin-top: 5% !important;
  color: #6600cc;
}
.employee__text {
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  color: #6600cc;
  margin-left: 3%;
}
::v-deep .v-date-picker-table {
  height: 280px !important;
}

::v-deep .v-card__actions {
  padding: 0;
}

::v-deep
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot::before {
  border-color: #aa56ff;
}
.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #6600cc;
}
::v-deep .v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitl {
  color: #6600cc;
  font-size: 14px;
}

::v-deep
  .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252; /* cor da borda quando der estado de erro */
}
::v-deep ::placeholder {
  line-height: 15px;
  color: #aa56ff !important;
}
::v-deep .v-messages__message {
  color: #ff5252;
  font-size: 14px;
  margin-left: 5px;
}

.login-link {
  font-size: 14px;
  color: #6600cc;
}

.hide-form {
  animation: down 300ms forwards;
}

.error-form {
  animation: nono 300ms, intro paused;
}
</style>
