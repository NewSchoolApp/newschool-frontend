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
                  <v-btn class="btn-block btn-primary" @click="submit">
                    Enviar
                  </v-btn>
                </v-col>
              </v-form>
              <navigation-bar />
            </v-row>
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
import utils from '~/utils/index';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
  directives: { mask },
  transition: 'bounce',
  data() {
    return {
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
            this.$notifier.showMessage({
              type: 'success',
            });
            setTimeout(() => {
              this.gotoHome();
            }, 4000);
          })
          .catch(err => {
            this.$notifier.showMessage({ type: 'error' });
            setTimeout(() => {
              this.loading = false;
            }, 800);
            console.error(err);
          });
      } else {
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
.align-global {
  width: 100%;
  max-width: 400px;
  justify-content: center;
  background: #ffffff;
  padding-bottom: 50px;
}
@media (min-width: 400px) {
  .align-global {
    margin: 0 auto;
  }
}
@media (max-width: 320px) {
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
.banner {
  width: 90%;
  margin: 5% 5% -5% 5%;
}
::v-deep .v-form {
  width: 100%;
  margin: 0 4%;
}
</style>
