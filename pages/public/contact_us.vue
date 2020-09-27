<template>
  <div>
    <HeaderBar :title="'Fale com a gente'" :back-page="true"></HeaderBar>
    <div class="align-global">
      <div v-if="loading">
        <div class="container-spinner" style="z-index: 9999999;">
          <v-progress-circular
            :size="70"
            :width="5"
            indeterminate
            color="#000"
          />
        </div>
      </div>
      <v-layout mt-1 flat class="container">
        <v-flex ref="flex">
          <v-container flat>
            <v-row>
              <v-col cols="12" mt-5>
                <v-row>
                  <img
                    class="banner"
                    src="../../assets/contact-us.svg"
                    alt="imagem contato"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-form ref="form" v-model="status" lazy-validation>
                <v-col cols="12">
                  <v-text-field
                    ref="name"
                    v-model="form.name"
                    autofocus
                    :rules="nameRules"
                    label="Nome"
                    name="name"
                    requiredv-model="form.name"
                    @blur="focusName($event.target.value)"
                  ></v-text-field>
                  <v-text-field
                    ref="cellphone"
                    v-model="form.cellphone"
                    v-mask="'(##) #####-####'"
                    type="tel"
                    :rules="cellphoneRules"
                    label="Whatsapp"
                    name="cellphone"
                    required
                    @blur="focusCellphone($event.target.value)"
                  ></v-text-field>
                  <v-textarea
                    ref="message"
                    v-model="form.message"
                    :rules="messageRules"
                    label="Passa a visão!"
                    name="message"
                    rows="3"
                    required
                    @blur="focusMessage($event.target.value)"
                  ></v-textarea>
                  <v-card>
                    <v-btn
                      class="btn-block btn-submit"
                      depressed
                      large
                      @click="submit"
                      >Enviar</v-btn
                    >
                  </v-card>
                </v-col>
              </v-form>
              <!-- <v-snackbar
                v-model="snackbar"
                :color="snackbarStatus"
                :timeout="5000"
                :top="true"
                :right="true"
              >
                {{ snackbarText }}
                <v-btn color="#FFF" text @click="snackbar = false"
                  >Fechar</v-btn
                >
              </v-snackbar> -->
              <navigation-bar v-if="!isActive"></navigation-bar>
            </v-row>
            <alert
              style="z-index: 99999;"
              :status="alertStatus"
              :info="info"
              :show="isActive"
            />
          </v-container>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<router>
  {
    path: '/contato'
  }
</router>

<script scoped>
import { mask } from 'vue-the-mask';
import auth from '../../services/http/auth';
import contactUs from '../../services/http/contact_us';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';
import Alert from '~/components/Alert.vue';
import utils from '~/utils/index';

export default {
  transition: 'bounce',
  components: {
    HeaderBar,
    NavigationBar,
    Alert,
  },
  directives: { mask },
  data() {
    return {
      alertStatus: '',
      info: '',
      isActive: false,
      status: true,
      loading: false,
      token: '',
      form: {
        name: '',
        message: '',
        cellphone: '',
      },
      nameRules: [v => !!v || 'Digite seu nome'],
      messageRules: [v => !!v || 'Digite uma mensagem'],
      cellphoneRules: [
        v => !!v || 'Digite seu celular com o DDD',
        v =>
          /^\(\d{2}\) \d{5}-\d{3,4}$/.test(v) ||
          'Complete seu celular com o DDD',
      ],
    };
  },
  mounted() {
    utils
      .getExternalCredentials()
      .then(res => {
        const { data } = res;
        this.token = data.accessToken;
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.animateForm(true);
        contactUs
          .submit(this.form, this.token)
          .then(res => {
            this.loading = false;
            this.isActive = true;
            this.alertStatus = 'success';
            this.info = 'Você passou a visão!';
            setTimeout(() => {
              this.gotoHome();
              this.isActive = false;
            }, 4000);
          })
          .catch(err => {
            this.isActive = true;
            this.alertStatus = 'error';
            setTimeout(() => {
              this.isActive = false;
              this.loading = false;
            }, 800);
            console.error(err);
          });
      } else {
        console.log();
        this.animateForm(false);
      }
    },
    focusName(data) {
      if (!data) {
        this.$refs.name.focus();
      }
    },
    focusCellphone(data) {
      if (!data) {
        this.$refs.cellphone.focus();
      }
    },
    focusMessage(data) {
      if (!data) {
        this.$refs.message.focus();
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
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap');

.align-global {
  width: 100%;
  max-width: 400px;
  justify-content: center;
  background: #ffffff;
}
@media (min-width: 400px) {
  .align-global {
    margin: 0 auto;
  }
}
@media (max-width: 320px) {
  ::v-deep.v-input input {
    max-height: 25px !important;
  }
  .container {
    padding: 0px 12px 0 12px !important;
  }
  ::v-deep .h1__theme {
    font-size: 20px;
  }
}
.container-spinner,
.flex {
  z-index: 1;
  text-align: center;
  margin-top: -55px;
}
.container {
  z-index: -1;
  padding: 20px 12px 0 12px;
}
.page-title {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  color: #6600cc;
  text-align: center;
}
.banner {
  width: 90%;
  margin: 5% 5% -5% 5%;
}

h2 {
  width: 100%;
}
::v-deep .v-text-field {
  padding-top: 0;
  margin-top: 0;
  color: #6600cc;
  padding-top: 0;
  color: #6600cc;
  margin: 3.5% 4.5%;
}

::v-deep .v-form {
  width: 100%;
  color: #6600cc;
  margin: 0 4%;
}
::v-deep .theme--light.v-label {
  font-weight: 500;
  color: #aa56ff;
}

::v-deep
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border-color: #aa56ff !important;
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
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #6600cc !important;
  border-radius: 0 !important;
  color: #fff;
  font-weight: 600;
  width: 100%;
}
::v-deep .theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #6600cc;
}

::v-deep .v-card {
  box-shadow: 0px 5px 10px gray;
  margin: 4% 4% 0 4%;
}
</style>
