<template>
  <div v-if="loading">
    <div class="container-spinner">
      <v-progress-circular
        :size="70"
        :width="5"
        indeterminate
        color="#6600cc"
      />
    </div>
  </div>

  <div v-else-if="contactThanks" class="thanks-modal">
    <div class="content-wrap">
      <v-icon
        class="thanks-close"
        color="primary"
        @click="contactThanks = false"
        >mdi-close-circle</v-icon
      >
      <img
        class="thanks-img"
        :src="require('~/assets/contact-congrats.jpg')"
        alt=""
      />
      <h3 class="thanks-h3">Obrigado!!!</h3>
      <div class="thanks-message">
        Contamos com o seu apoio... Em breve entraremos em contato!!!
      </div>
    </div>
    <v-row class="mx-1 button__position">
      <button class="btn-primary btn-block" @click="gotoHome()">
        finalizar
      </button>
    </v-row>
  </div>

  <div v-else id="main-col" :class="bindedClass">
    <div class="content-wrap">
      <HeaderBar :title="'Cola com Nóix'" :back-page="true" />
      <v-tabs v-model="selectedTab" class="pb-10" fixed-tabs height="35px">
        <v-tab>
          Seja um Voluntário
        </v-tab>
        <v-tab>
          Seja um Parceiro
        </v-tab>
      </v-tabs>
      <div v-if="selectedTab === 0">
        <v-col class="px-6 py-0">
          <v-col class="pa-0 pb-4">
            <div class="input-label">Nome</div>
            <v-text-field
              v-model="form.name"
              name="name"
              :rules="nameRules"
              placeholder="Seu nome"
              type="text"
              filled
            />
          </v-col>
          <v-col class="pa-0 pb-4">
            <div class="input-label">Linkedin</div>
            <v-text-field
              v-model="form.linkedin"
              name="linkedin"
              :rules="linkedinRules"
              placeholder="Link do seu perfil"
              filled
            />
          </v-col>
          <v-col class="pa-0">
            <div class="input-label">
              Como você acha que pode somar para New School?
            </div>
            <v-textarea
              v-model="form.message"
              name="message"
              rows="3"
              :rules="nameRules"
              placeholder="Escreve aqui o que você acredita que pode agregar para o time da New School"
              filled
            />
          </v-col>
        </v-col>
      </div>
      <div v-else>
        <v-col class="px-6 py-0">
          <v-col class="pa-0 pb-4">
            <div class="input-label">Nome</div>
            <v-text-field
              v-model="form.name"
              name="name"
              :rules="nameRules"
              placeholder="Seu nome"
              type="text"
              filled
            />
          </v-col>
          <v-col class="pa-0 pb-4">
            <div class="input-label">Nome da Empresa/Cargoin</div>
            <v-text-field
              v-model="form.company"
              name="company"
              :rules="nameRules"
              placeholder="Escreve aqui"
              filled
            />
          </v-col>
          <v-col class="pa-0 pb-4">
            <div class="input-label">
              Como você enxerga essa parceria?
            </div>
            <v-textarea
              v-model="form.message"
              name="message"
              :rules="nameRules"
              rows="3"
              auto-grow
              placeholder="Escreve aqui o que você acredita que essa parceria pode agregar para o time da New School"
              filled
            />
          </v-col>
        </v-col>
      </div>
    </div>
    <v-row class="mx-1 button__position">
      <button class="btn-primary btn-block" @click="send">SÓ VAMO</button>
    </v-row>
  </div>
</template>

<router>
  {
    path: '/voluntarios'
  }
</router>

<script>
import contactUs from '../../services/http/contact_us';
import HeaderBar from '~/components/Header.vue';
import utils from '~/utils/index';

export default {
  components: {
    HeaderBar,
  },

  data() {
    return {
      loading: true,
      contactThanks: false,
      token: '',
      selectedTab: 0,
      bindedClass: '',
      form: {
        name: '',
        linkedin: '',
        message: '',
        company: '',
        cellphone: '0',
      },
      nameRules: [v => !!v || 'O campo não pode estar em branco'],
      linkedinRules: [
        v => !!v || 'O campo não pode estar em branco',
        v => /.+linkedin\.+/.test(v) || 'URL inválida',
      ],
    };
  },
  mounted() {
    this.loading = false;
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
    send() {
      if (this.form.company && !this.form.linkedin) {
        this.form.linkedin = 'null';
      }
      if (this.form.linkedin && !this.form.company) {
        this.form.company = 'null';
      }

      const idValidform = this.checkForm();

      if (idValidform) {
        this.loading = true;
        contactUs
          .submit(this.form, this.token)
          .then(res => {
            this.loading = false;
            this.contactThanks = true;
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
        this.bindedClass = 'error-form';
        setTimeout(() => {
          this.bindedClass = '';
        }, 300);
      }
    },
    checkForm() {
      if (
        this.form.name &&
        this.form.linkedin &&
        this.form.message &&
        this.form.company
      ) {
        return true;
      }
    },
    gotoHome() {
      $nuxt._router.push('/aluno/home');
    },
  },
};
</script>

<style lang="scss" scoped>
#main-col {
  position: relative;
  min-height: 100vh !important;
}
.thanks-modal {
  position: relative;
  min-height: 100vh !important;
}
.content-wrap {
  padding-bottom: 148px;
  margin-bottom: 104px;
}
.button__position {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 !important;
  width: 100%;
  padding: 0 24px;
  padding-bottom: 90px;
}

* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}

::v-deep .v-tab {
  min-width: 0 !important;
}
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  text-transform: none;
  border-bottom: 4px solid #d8bff2;
}
::v-deep .v-tab--active {
  color: transparent;
}
::v-deep .v-tab--active .v-icon {
  color: var(--primary);
}
::v-deep .v-tab:not(.v-tab--active) .v-icon {
  color: #d8bff2 !important;
}
::v-deep .mdi-chevron-right,
::v-deep .mdi-chevron-left {
  font-size: 35px;
  outline: none;
}
.input-label {
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  color: var(--primary);
}
::v-deep .v-text-field {
  border-color: transparent !important;
}
::v-deep .v-messages,
::v-deep .v-text-field__details {
  display: none !important;
}
::v-deep .v-input__slot {
  border-radius: 5px !important;
  min-height: 48px !important;
  margin: 0 0 3px;
}
::v-deep .v-input input,
::v-deep .v-select__selection--comma,
::v-deep ::placeholder {
  color: #767676 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
}
::v-deep .mdi-menu-down {
  font-size: 40px;
  padding-bottom: 8px;
}
::v-deep .v-input--radio-group--row {
  padding-top: 0;
  margin-top: 0;
  align-items: flex-start;
}
::v-deep .v-radio {
  padding: 0 70px 0 10px;
}
::v-deep .v-list {
  background-color: #f5f5f5;
}

.base {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
}
.btn-connect {
  width: 111px !important;
  height: 23px !important;

  border-radius: 3px !important;
}
::v-deep .btn-connect .v-btn__content {
  font-size: 9px;
}
h1 {
  font-size: 0.8rem;
  font-weight: 600;
  width: 55%;
}
.container__list {
  margin-bottom: 5rem;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
::v-deep .v-btn--icon.v-size--default {
  height: unset;
  color: #6600cc;
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
  text-transform: none;
  border-bottom: 4px solid #f5f5f5;
}
::v-deep .v-tab--active {
  border-bottom: 4px solid var(--primary-light);
}
.thanks-img {
  width: 100%;
  padding-bottom: 16px;
}
.thanks-h3 {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
  color: #1a1a1a;
  padding-bottom: 8px;
}
.thanks-message {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.08em;
  text-align: center;
}
.thanks-close {
  position: absolute;
  top: 16px;
  right: 20px;
}

@media (min-width: 992px) {
  #page-window {
    display: flex;
    justify-content: center;
  }
  #main-col {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto 60px;
    width: 700px;
    max-width: 700px;
  }
}
.error-form {
  animation: nono 300ms, intro paused;
}
</style>
