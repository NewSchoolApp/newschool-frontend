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
  <div v-else id="main-div">
    <div v-if="currentStep === stepEnum.PRODUCT_INFO" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="
            `background-image: url(https://elgstore.vteximg.com.br/arquivos/ids/159105/MGSS_elg_04.jpg?v=636882566685830000);`
          "
        />
        <v-row id="price-row">
          <div>Por:</div>
          <div>{{ productInfo.points }} NC</div>
        </v-row>
        <div id="description">
          <div>Detalhes do produto:</div>
          <div>{{ productInfo.description }}</div>
        </div>
      </div>

      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.PACKAGE_INFO"
        >
          Trocar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.PACKAGE_INFO" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="
            `background-image: url('https://elgstore.vteximg.com.br/arquivos/ids/159105/MGSS_elg_04.jpg?v=636882566685830000');`
          "
        />
        <v-row id="price-row">
          <div>Por:</div>
          <div>{{ productInfo.points }} NC</div>
        </v-row>
        <div class="select-label">
          Quantidade:
        </div>
        <v-text-field
          class="primary-text-field input"
          filled
          type="number"
          placeholder="Digite a quantidade"
          :hide-details="true"
        />
        <div class="select-label">Retirada:</div>
        <v-select
          class="primary-select input"
          filled
          :items="sendOptions"
          placeholder="Selecione"
          :hide-details="true"
        />
      </div>

      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.SET_DATE"
        >
          continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.SET_DATE" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <div id="header-row" justify="space-between">
          <div id="header-msg">Qual o melhor dia pra você ir buscar?</div>
        </div>

        <v-date-picker
          v-model="date"
          :allowed-dates="allowedDates"
          :weekday-format="weekDays"
          first-day-of-week="1"
          no-title
          locale="pt-BR"
        >
        </v-date-picker>
      </div>
      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.SET_TIME"
        >
          continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.SET_TIME" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <div id="header-row" justify="space-between">
          <div id="header-msg">Agora é só escolher a hora:</div>
        </div>
        <div id="time-group">
          <toggle
            :value="10"
            label="10:00"
            :model="time"
            @toggle="time = $event"
          />
          <toggle
            :value="11"
            label="11:00"
            :model="time"
            @toggle="time = $event"
          />
          <toggle
            :value="12"
            label="14:00"
            :model="time"
            @toggle="time = $event"
          />
          <toggle
            :value="13"
            label="16:00"
            :model="time"
            @toggle="time = $event"
          />
        </div>
      </div>
      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.CHECKOUT"
        >
          continuar
        </v-btn>
      </div>
    </div>

    <div v-if="currentStep === stepEnum.CHECKOUT" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="
            `background-image: url(https://elgstore.vteximg.com.br/arquivos/ids/159105/MGSS_elg_04.jpg?v=636882566685830000);`
          "
        />
        <v-row id="price-row">
          <div>Por:</div>
          <div>{{ productInfo.points }} NC</div>
        </v-row>
        <div id="shipping-info">
          <div>Informações sobre agendamento</div>
          <div>Data: {{ dateToShow }}</div>
          <div>Hora: {{ time }}:00</div>
        </div>
      </div>

      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.FINISHED"
        >
          Finalizar
        </v-btn>
      </div>
    </div>

    <div v-if="currentStep === stepEnum.FINISHED" id="wrapper">
      <div id="content">
        <header-bar title="Produto" :back-page="true"></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="header-msg">Mandou bem, agora é só ir lá!</div>
        </v-row>
        <div class="mapouter">
          <div id="gmap_canvas">
            <v-progress-circular
              :size="70"
              :width="5"
              indeterminate
              color="#6600cc"
            />
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Rua%20Carlos%20Faria,%20273%20%20Jd%20Rapouso%20Tavares&t=&z=17&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
          <div id="finished-info">
            <div id="paraisopolis" />
            <div id="infos">
              <div id="top">
                <div>New School</div>
                <v-icon>mdi-map-marker-outline</v-icon>
              </div>
              <div id="body">
                Rua Carlos Faria, 273 Jd Rapouso Tavares - Zona Oeste Butantã -
                São Paulo - Brasil
              </div>
              <v-divider></v-divider>

              <div id="bottom">
                <div>
                  <v-icon>mdi-calendar</v-icon>
                  {{ dateToShow }}
                </div>
                <div>
                  <v-icon>mdi-clock-outline</v-icon>
                  {{ time }}:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="currentStep = stepEnum.PACKAGE_INFO"
        >
          Voltar ao Início
        </v-btn>
      </div>
    </div>

    <navigation-bar />
  </div>
</template>
<router>
  {
    path: '/aluno/marketplace/product/:slug?'
  }
</router>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import Toggle from '~/components/Toggle.vue';
import market from '~/services/http/market_place';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    Toggle,
  },
  data: () => ({
    userPoints: 0,
    loading: true,
    productInfo: {},
    stepEnum: {
      PRODUCT_INFO: 'PRODUCT_INFO',
      PACKAGE_INFO: 'PACKAGE_INFO',
      SET_DATE: 'SET_DATE',
      SET_TIME: 'SET_TIME',
      CHECKOUT: 'CHECKOUT',
      FINISHED: 'FINISHED',
    },
    currentStep: 'PRODUCT_INFO',
    sendOptions: ['Retirar na New School', 'Receber em casa'],
    date: '',
    time: '',
  }),
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    dateToShow() {
      return this.date
        .split('-')
        .reverse()
        .join('/');
    },
  },
  async mounted() {
    this.getUserScore();
    await this.getProductInfo();
    this.loading = false;
  },
  methods: {
    async getProductInfo() {
      this.productInfo = (
        await market.getAll(
          `${process.env.endpoints.MARKETPLACE.ITENS}/slug/${this.$route.params.slug}`,
        )
      ).data;
    },
    async getUserScore() {
      this.userPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.idUser}?timeRange=YEAR`,
        )
      ).data.points;
    },
    weekDays(dateString) {
      const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      const newDate = new Date(dateString + 'T00:00:00');
      return weekDays[newDate.getDay()];
    },
    allowedDates(dateString) {
      const newDate = new Date(dateString + 'T00:00:00');
      return newDate > new Date(Date.now());
    },
  },
};
</script>
<style scoped>
* {
  font-family: Roboto;
}
.row {
  margin: initial;
  padding: initial;
}
.col {
  margin: initial;
  padding: initial;
}
::v-deep #header {
  margin: 24px 0;
}
#main-div {
  margin: 0 24px 100px;
}
#wrapper {
  position: relative;
}
#content {
  min-height: calc(100vh - 150px);
  padding-bottom: 100px;
}
#base {
  width: 100%;
  position: relative;
  bottom: 0px;
}
#header-row {
  margin-bottom: 18px;
  display: flex;
}
#product-title {
  max-width: 50%;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: #585858;
}
#balance {
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: var(--primary);
}
#header-msg {
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: #585858;
}
#price-row {
  margin-bottom: 24px;
}
#price-row :nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  line-height: 150%;
  color: #737373;
  margin-right: 8px;
}
#price-row :nth-child(2) {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  color: #6600cc;
}
#img-viewport {
  width: 100%;
  height: 30vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 8px;
}
#description :nth-child(1) {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: var(--primary);
  margin-bottom: 8px;
}
#description :nth-child(2) {
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: flex-end;
  color: #737373;
}
.select-label {
  font-weight: normal;
  font-size: 14px;
  color: var(--primary);
  margin-bottom: 4px;
}
.input {
  margin-bottom: 16px;
}
::v-deep .v-picker {
  width: 100%;
}
::v-deep .v-picker .v-btn__content {
  color: rgba(0, 0, 0, 0.8);
  font-weight: normal;
  font-size: 16px;
}
::v-deep .v-picker .accent--text button {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
}
::v-deep .v-picker tr {
  height: 35px !important;
}
::v-deep .v-picker .accent {
  background-color: #b380e6 !important;
  -webkit-box-shadow: 0px 5px 5px -7px #000000, 5px 5px 5px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 5px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
::v-deep .v-picker .accent .v-btn__content {
  color: white;
}
#time-group {
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
}
#shipping-info {
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #484848;
}
#shipping-info :nth-child(1) {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #585858;
  margin-bottom: 16px;
}
#gmap_canvas {
  width: 100%;
  height: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.v-progress-circular {
  position: absolute !important;
}
#finished-info {
  margin-top: 16px;
  width: 100%;
  height: 137px;
  border: 1px solid #dadada;
  padding: 8px;
  display: flex;
}
#finished-info #infos {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#finished-info #infos * {
  display: flex;
  justify-content: space-between;
}
#finished-info #top {
  font-size: 16px;
  color: #585858;
}
#finished-info #body {
  font-size: 12px;
  color: #666666;
}
#finished-info #bottom * {
  font-size: 12px;
  color: #666666;
  display: flex;
  align-items: center;
}
#finished-info #bottom :nth-child(2),
#finished-info #bottom :nth-child(2) .mdi {
  font-weight: 900;
  color: var(--primary);
}
#finished-info #top .mdi {
  color: #dadada;
}
#finished-info #bottom .mdi {
  color: #737373;
  font-size: 22px;
  margin-right: 8px;
}
#paraisopolis {
  height: 100%;
  min-width: 100px;
  background: url('../../../assets/paraisopolis-default.jpg');
  background-size: cover;
  background-position: 50%;
}
</style>
