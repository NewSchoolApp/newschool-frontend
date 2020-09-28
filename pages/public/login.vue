<template>
  <v-layout align-center justify-center>
    <div class="bg" />

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate color="#fff" />
      </div>
    </div>

    <v-flex v-else ref="flex" role="main" xs10 sm8 md4>
      <div class="bg-symbol">
        <img src="../../assets/logo.svg" alt="New Schoool logo" />
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" />
          <v-form ref="form" v-model="status" lazy-validation>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                dark
                color="#fff"
                :rules="emailRules"
                label="Email"
                data-vv-name="email"
                required
                @keyup.enter="submit()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                dark
                color="#fff"
                :rules="passwordRules"
                label="Senha"
                data-vv-name="password"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="() => (showPass = !showPass)"
                @keyup.enter="submit()"
              ></v-text-field>
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
                >Entrar</v-btn
              >
            </v-col>
          </v-form>
          <v-col cols="12">
            <v-btn
              dark
              block
              depressed
              large
              to="/cadastro"
              class="btn-transparent"
              >Cadastrar</v-btn
            >
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn text color="white" @click="loginSocial('facebook')">
              <v-icon dark left>mdi-facebook</v-icon>Entrar com Facebook
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn text color="white" @click="loginSocial('google')">
              <v-icon dark left>mdi-google-glass</v-icon>Entrar com Google
            </v-btn>
          </v-col>
          <!-- <v-col cols="12" class="text-center">
            <v-btn text color="white">
              <v-icon left>mdi-instagram</v-icon>Entrar com Instagram
            </v-btn>
          </v-col>-->
          <v-col cols="12" class="text-center">
            <v-btn text small color="#fff" to="/esqueci-minha-senha"
              >Esqueceu sua senha?</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card-title class="headline">Ops!</v-card-title>
      <v-card-text>{{ dialogMessage }}</v-card-text>
      <v-btn color="primary" text @click="dialog = false">Ok</v-btn>
    </v-dialog>
  </v-layout>
</template>

<router>
  {
    path: '/login',
    name : 'login'
  }
</router>

<script>
import auth from '~/services/http/auth';

export default {
  data: () => ({
    // flags
    status: true,
    loading: true,
    dialog: false,
    dialogMessage: '',
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
  mounted() {
    this.loginSocialReturn();
  },

  methods: {
    submit() {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        auth
          .login(this.email, this.password)
          .then(() => {
            $nuxt._router.push('/loading/login');
          })
          .catch(err => {
            setTimeout(() => {
              this.dialogMessage = 'Usuário ou senha incorretos!';
              this.dialog = true;
              this.loading = false;
            }, 500);
            console.error(err);
          });
      } else {
        this.animateForm(false);
      }
    },

    head() {
      return {
        title: this.title,
      };
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
    },

    async loginSocialReturn() {
      if (!this.$auth.loggedIn) {
        this.loading = false;
        return;
      }
      const provider = this.$auth.strategy.name;
      try {
        if (provider === 'facebook') {
          const facebookCredentials = this.getFacebookCredentials();
          await auth.loginFacebook(facebookCredentials);
        } else if (provider === 'google') {
          const googleCredentials = this.getGoogleCredentials();
          await auth.loginGoogle(googleCredentials);
        }
        $nuxt._router.push('/loading/login');
      } catch (error) {
        setTimeout(() => {
          this.dialogMessage =
            'Falha ao realizar login utilizando ' + provider + '.';
          this.dialog = true;
          this.loading = false;
        }, 500);
        console.error(error);
      }
    },
    loginSocial(provider) {
      this.loading = true;
      this.$auth.loginWith(provider);
    },

    getFacebookCredentials() {
      return {
        id: this.$store.state.auth.user.id,
        email: this.$store.state.auth.user.email,
        name: this.$store.state.auth.user.name,
        birthday: this.$store.state.auth.user.birthday,
      };
    },

    getGoogleCredentials() {
      return {
        email: this.$store.state.auth.user.email,
        email_verified: this.$store.state.auth.user.email_verified.toString(),
        family_name: this.$store.state.auth.user.family_name,
        given_name: this.$store.state.auth.user.given_name,
        locale: this.$store.state.auth.user.locale,
        name: this.$store.state.auth.user.name,
        picture: this.$store.state.auth.user.picture,
        sub: this.$store.state.auth.user.sub,
      };
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
            'Entre no aplicativo da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
};
</script>

<style scoped>
.theme--light.v-icon {
  color: #d6adff;
}
.theme--light.v-icon {
  color: #d6adff;
}
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
