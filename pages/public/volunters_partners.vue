<template>
  <div>
    <div v-show="!loading" id="page" ref="flex">
      <HeaderBar :title="'Cola com Nóix'" :back-page="true" />
      <v-tabs v-model="selectedTab" fixed-tabs height="35px">
        <v-tab>
          Seja um Voluntário
        </v-tab>
        <v-tab>
          Seja um Parceiro
        </v-tab>
      </v-tabs>
      <div v-if="selectedTab === 0">
        <v-col>
          <v-col class="px-0 pb-5">
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
          <v-col class="px-0 pb-5">
            <div class="input-label">Linkedin</div>
            <v-text-field
              v-model="form.linkedin"
              name="linkedin"
              :rules="linkedinRules"
              placeholder="Link do seu perfil"
              filled
            />
          </v-col>
          <v-col class="px-0 pb-5">
            <div class="input-label">
              Como você acha que pode somar para New School?
            </div>
            <v-textarea
              v-model="form.message"
              name="message"
              :rules="nameRules"
              placeholder="Escreve aqui o que você acredita que pode agregar para o time da New School"
              filled
            />
          </v-col>
          <v-row class="mx-1 button__position">
            <button class="btn-primary btn-block" @click="send">SÓ VAMO</button>
          </v-row>
        </v-col>
      </div>
      <div v-else>
        <v-col>
          <v-col class="px-0 pb-5">
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
          <v-col class="px-0 pb-5">
            <div class="input-label">Nome da Empresa/Cargoin</div>
            <v-text-field
              v-model="form.company"
              name="company"
              :rules="nameRules"
              placeholder="Escreve aqui"
              filled
            />
          </v-col>

          <!-- <v-col class="px-0 pb-5">
              <div class="input-label">Endereço completo</div>
              <v-text-field v-model="form.address" filled />
            </v-col> -->
          <v-col class="px-0 pb-5">
            <div class="input-label">
              Como você enxerga essa parceria?
            </div>
            <v-textarea
              v-model="form.message"
              name="message"
              :rules="nameRules"
              placeholder="Escreve aqui o que você acredita que essa parceria pode agregar para o time da New School"
              filled
            />
          </v-col>
          <v-row class="mx-1 button__position">
            <button class="btn-primary btn-block" @click="send">SÓ VAMO</button>
          </v-row>
        </v-col>
      </div>
    </div>
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
      token: '',
      selectedTab: 0,
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
      this.loading = true;
      if (this.form.company && !this.form.linkedin) {
        this.form.linkedin = 'null';
      }
      if (this.form.linkedin && !this.form.company) {
        this.form.company = 'null';
      }

      const idValidform = this.checkForm();

      if (idValidform) {
        this.animateForm(true);
        contactUs
          .submit(this.form, this.token)
          .then(res => {
            this.loading = false;
            this.$notifier.showMessage({
              type: 'success',
              message: 'Deu bom!',
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
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep .v-input__control {
  flex-direction: initial;
  height: 40px;
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
::v-deep .v-text-field__details {
  padding: 0 !important;
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

.button__position {
  margin-top: 35%;
  cursor: pointer;
}

#page {
  margin-bottom: 60px;
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
::v-deep .v-tabs {
  max-height: 32px;
}
@media (min-width: 992px) {
  #page-window {
    display: flex;
    justify-content: center;
  }
  #page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto 60px;
    width: 700px;
    max-width: 700px;
  }
}
</style>
