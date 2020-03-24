<template>
  <v-layout align-center justify-center>
    <v-progress-circular v-if="loading" :size="70" :width="5" indeterminate></v-progress-circular>

    <v-flex xs10 sm8 md6 ref="flex" v-else>
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
              <div class="image-upload">
                <label for="file-input">
                  <v-img class="input" v-model="form.image" @click="pickFile()">
                    <img src="~/assets/retangle.svg" alt="Retangulo" />
                    <img class="camera" src="~/assets/Camera.svg" alt="Camera" />
                  </v-img>
                </label>
                <input
                  id="file-input"
                  type="file"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </div>
              <div class="text-user">
                <h1>Escolha uma foto para seu perfil</h1>
              </div>
              <v-text-field color="#60c" v-model="form.name" label="Nome *" name="name" required></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.email"
                :rules="emailRules"
                label="Email *"
                name="email"
                required
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.password"
                label="Senha *"
                name="password"
                :rules="passwordRules"
                :type="showPass ? 'password' : 'text'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (showPass = !showPass)"
                required
              ></v-text-field>
              <v-text-field color="#60c" v-model="form.nickname" label="Apelido" name="nickname"></v-text-field>
              <v-text-field
                color="#60c"
                class="nasc"
                type="date"
                v-model="form.birthDate"
                label="Data de nascimento"
                name="birthDate"
                required
              ></v-text-field>
              <v-select
                color="#60c"
                name="birthDate"
                v-model="form.genero"
                :items="items"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Gênero"
              ></v-select>
              <v-select
                color="#60c"
                name="birthDate"
                v-model="form.perfil"
                :items="items"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Qual é o seu perfil?"
              ></v-select>
              <v-text-field color="#60c" v-model="form.pais" label="País" name="pais" required></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.estado"
                label="Estado"
                name="estado"
                required
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.cidade"
                label="Cidade"
                name="cidade"
                required
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.bairro"
                label="Bairro"
                name="bairro"
                required
              ></v-text-field>
              <v-select
                color="#60c"
                name="birthDate"
                v-model="form.educationalLevel"
                :items="items"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Grau de escolaridade"
              ></v-select>
              <v-col cols="12">
                <p class="job">Empregado?</p>
                <v-radio-group :readonly="false" :mandatory="true" :multiple="false" color="#60c">
                  <v-radio label="Sim"></v-radio>
                  <v-radio label="Não"></v-radio>
                </v-radio-group>
              </v-col>
              <v-text-field
                color="#60c"
                v-model="form.profession"
                label="Profissão"
                name="profession"
              ></v-text-field>
              <v-text-field
                color="#60c"
                v-model="form.urlFacebook"
                label="Facebook"
                name="urlFacebook"
              ></v-text-field>
              <v-text-field
                color="#60c"
                type="text"
                v-model="form.urlInstagram"
                label="Instagram"
                name="urlInstagram"
              ></v-text-field>
              <v-btn color="#60c" dark block depressed large @click="submit">Cadastrar</v-btn>
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
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      title: 'Cadastro',
      status: true,
      loading: false,
      showPass: String,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      form: {
        name: '',
        email: '',
        password: '',
        urlFacebook: '',
        iamge: '',
        urlInstagram: '',
        role: 'STUDENT',
      },

      nameRules: [v => !!v || 'Digite seu nome'],
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

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const postObject = Object.assign({}, this.form);
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
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      }
      console.log(this.imageName);
      console.log(this.imageUrl);
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
.camera {
  left: 17px;
  top: 17px;
  position: absolute;
  z-index: 999999;
}
.job {
  color: #aa56ff;
  font-weight: 600;
  margin: 0 0 0 5px;
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
  font-size: 12px;
  color: #60c;
}
.image-upload > input {
  display: none;
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
  /* font-size: 12px; */
  font-weight: 600;
  line-height: 15px;
  color: #aa56ff;
}
::v-deep .v-text-field .v-label {
  font-size: 16px !important;
}
.theme--light.v-input:not(.v-input--is-disabled) input {
  color: #6600cc !important;
}

::v-deep .v-btn {
  margin-top: 15px;
}

::v-deep .v-btn__content {
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  line-height: 15px;
}
.v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
  color: #6600cc;
}
.input {
  width: 60%;
  margin: 0 40%;
}
.text-user h1 {
  color: #aa56ff;
  text-align: center;
  font-size: 12px;
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

::v-deep
  .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252; /* cor da borda quando der estado de erro */
}

::v-deep .v-messages__message {
  color: #ff5252;
  font-size: 12px;
  margin-left: 5px;
}

.login-link {
  font-size: 12px;
  color: #6600cc;
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


