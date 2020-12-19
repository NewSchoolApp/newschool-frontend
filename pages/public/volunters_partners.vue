<template>
  <div>
    <div v-show="!loading" id="page">
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
              :rules="nameRules"
              placeholder="Link do seu perfil"
              filled
            />
          </v-col>

          <!-- <v-col class="px-0 pb-5">
              <div class="input-label">Endereço completo</div>
              <v-text-field v-model="form.address" filled />
            </v-col> -->
          <v-col class="px-0 pb-5">
            <div class="input-label">
              Como você acha que pode somar para New School?
            </div>
            <v-textarea
              v-model="form.text"
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
              v-model="form.text"
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
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    HeaderBar,
  },

  data() {
    return {
      loading: true,
      selectedTab: 0,
      form: {
        name: '',
        linkedin: '',
        text: '',
        company: '',
      },
      nameRules: [v => !!v || 'O campo não pode estar em branco'],
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    send() {
      alert(`Enviar para o back ${JSON.stringify(this.form)}`);
      this.$notifier.showMessage({ type: 'success', message: 'Deu bom!' });
      this.$router.replace('/aluno/home');
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
