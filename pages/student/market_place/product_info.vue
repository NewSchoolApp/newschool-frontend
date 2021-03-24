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
        <header-bar
          title="Produto"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="`background-image: url(${productInfo.photo});`"
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
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          Trocar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.PACKAGE_INFO" id="wrapper">
      <div id="content">
        <header-bar
          title="Item Escolhido"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="`background-image: url('${productInfo.photo}');`"
        />
        <v-row id="price-row">
          <div>Por:</div>
          <div>{{ productInfo.points }} NC</div>
        </v-row>
        <div class="input-label">
          Quantidade:
        </div>
        <v-form ref="form">
          <v-select
            v-model="quantity"
            class="primary-text-field input"
            filled
            :items="quantitySelect"
            placeholder="Selecione a quantidade"
            :rules="notNull"
          />
          <div class="input-label">Retirada:</div>
          <v-select
            v-model="shippingType"
            class="primary-select input"
            filled
            :items="shippingOptions"
            placeholder="Selecione"
            :rules="notNull"
          />
        </v-form>
      </div>

      <div id="base">
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          continuar
        </v-btn>
      </div>
    </div>

    <!-- withdraw -->

    <div v-else-if="currentStep === stepEnum.SET_DATE" id="wrapper">
      <div id="content">
        <header-bar
          title="Retirada"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
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
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.SET_TIME" id="wrapper">
      <div id="content">
        <header-bar
          title="Retirada"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
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
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.WITHDRAW_CHECKOUT" id="wrapper">
      <div id="content">
        <header-bar
          title="Confirmação"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="`background-image: url(${productInfo.photo});`"
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
          @click="createOrder(orderTypeEnum.WITHDRAW)"
        >
          Finalizar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.WITHDRAW_FINISHED" id="wrapper">
      <div id="content">
        <header-bar
          title="Localização"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
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
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          Voltar ao Início
        </v-btn>
      </div>
    </div>

    <!-- mail -->

    <div v-else-if="currentStep === stepEnum.PRE_CONTACT" id="wrapper">
      <div id="content">
        <header-bar
          title="Receber em Casa"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="header-msg">
            {{
              productInfo.type === 'SERVICE'
                ? 'Completa aí, que o time da New School vai entrar em contato.'
                : 'Para receber em casa, completa aí, que o time da New School vai entrar em contato.'
            }}
          </div>
        </v-row>
        <img src="~/assets/greetings.svg" alt="Salve" />
      </div>
      <div id="base">
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          Continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.CONTACT" id="wrapper">
      <div id="content">
        <header-bar
          title="Receber em Casa"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="header-msg">Completa aí:</div>
        </v-row>

        <v-form ref="form">
          <div class="input-label">
            Nome
          </div>
          <v-text-field
            ref="contactInfoName"
            v-model="contactInfo.name"
            class="primary-text-field input"
            filled
            placeholder="Digite seu nome completo"
            :rules="notNull"
          />
          <div class="input-label">
            Whatsapp
          </div>
          <v-text-field
            ref="contactInfoWhatsapp"
            v-model="contactInfo.whatsapp"
            class="primary-text-field input"
            filled
            placeholder="Digite telefone para contato ou Whatsapp"
            type="number"
            :rules="phoneRules"
          />
          <div class="input-label">
            Email
          </div>
          <v-text-field
            ref="contactInfoEmail"
            v-model="contactInfo.email"
            class="primary-text-field input"
            filled
            placeholder="Digite seu email"
            :rules="emailRules"
          />
          <div class="input-label">
            Contato para recado
          </div>
          <v-text-field
            ref="contactInfoContact"
            v-model="contactInfo.contact"
            class="primary-text-field input"
            filled
            placeholder="Digite um segundo número para contato"
            type="number"
            :rules="phoneRules"
          />
        </v-form>
      </div>
      <div id="base">
        <v-btn class="btn-block btn-primary" @click="advanceStep">
          Continuar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.MAIL_CHECKOUT" id="wrapper">
      <div id="content">
        <header-bar
          title="Confirmação"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="product-title">{{ productInfo.name }}</div>
          <div id="balance">Saldo: {{ userPoints }}NC</div>
        </v-row>
        <div
          id="img-viewport"
          :style="`background-image: url(${productInfo.photo});`"
        />
        <v-row id="price-row">
          <div>Por:</div>
          <div>{{ productInfo.points }} NC</div>
        </v-row>
        <div id="shipping-info">
          <div>Dados pessoais</div>
          <div>{{ contactInfo.name }}</div>
          <div>{{ contactInfo.whatsapp }}</div>
          <div>{{ contactInfo.email }}</div>
          <div>{{ contactInfo.contact }}</div>
        </div>
      </div>

      <div id="base">
        <v-btn
          class="btn-block btn-primary"
          @click="createOrder(orderTypeEnum.MAIL)"
        >
          Finalizar
        </v-btn>
      </div>
    </div>

    <div v-else-if="currentStep === stepEnum.MAIL_FINISHED" id="wrapper">
      <div id="content">
        <header-bar
          title="Finalizado"
          :back-page="true"
          :back-func="rewindStep"
        ></header-bar>
        <v-row id="header-row" justify="space-between">
          <div id="header-msg">
            Tudo certo. Agora é só aguardar, a New School entrar em contato.
          </div>
        </v-row>
        <img class="px-6" src="~/assets/wellDone.svg" alt="Finalizado" />
      </div>
      <div id="base">
        <v-btn class="btn-block btn-primary" @click="advanceStep">
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
      WITHDRAW_CHECKOUT: 'WITHDRAW_CHECKOUT',
      WITHDRAW_FINISHED: 'WITHDRAW_FINISHED',
      PRE_CONTACT: 'PRE_CONTACT',
      CONTACT: 'CONTACT',
      MAIL_CHECKOUT: 'MAIL_CHECKOUT',
      MAIL_FINISHED: 'MAIL_FINISHED',
    },
    currentStep: 'PRODUCT_INFO',
    shippingOptions: ['Retirar na New School', 'Receber em casa'],
    shippingType: '',
    quantitySelect: [],
    quantity: '',
    date: '',
    time: '',
    contactInfo: {
      name: '',
      whatsapp: '',
      email: '',
      contact: '',
    },
    orderTypeEnum: {
      WITHDRAW: 'WITHDRAW',
      MAIL: 'MAIL',
    },
    emailRules: [
      v => !!v || 'Digite o e-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail inválido',
    ],
    notNull: [v => !!v || 'Esse campo não pode estar em branco'],
    phoneRules: [
      v => !!v || 'Esse campo não pode estar em branco',
      v => (v && v.length >= 10) || 'Deve ter no mínimo 8 caracteres + DDD',
    ],
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
    await this.getUserScore();
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

      // only show the quantity that the user is able to get with current score
      const MIN = 1;
      const MAX = this.productInfo.quantity;
      const parsed = parseInt(this.userPoints / this.productInfo.points);

      this.generateQuantitySelect(Math.min(Math.max(parsed, MIN), MAX));
    },
    generateQuantitySelect(quantity) {
      for (let index = 1; index <= quantity; index++) {
        this.quantitySelect.push(index);
      }
    },
    async getUserScore() {
      const totalPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.idUser}/total-points`,
        )
      ).data.points;

      const spentPoints = (
        await market.getAll(
          `${process.env.endpoints.MARKETPLACE.ORDER}/user/${this.idUser}/used-points`,
        )
      ).data.usedPoints;

      this.userPoints = totalPoints - spentPoints;
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
    advanceStep() {
      switch (this.currentStep) {
        case this.stepEnum.PRODUCT_INFO:
          if (this.userPoints >= this.productInfo.points) {
            if (this.productInfo.type === 'SERVICE') {
              this.currentStep = this.stepEnum.PRE_CONTACT;
            } else {
              this.currentStep = this.stepEnum.PACKAGE_INFO;
            }
          } else {
            this.$notifier.showMessage({
              type: 'error',
              message: 'Você não tem pontos suficiente para essa troca',
            });
          }

          break;

        case this.stepEnum.PACKAGE_INFO:
          if (this.$refs.form.validate()) {
            if (!this.userPoints >= this.productInfo.points * this.quantity) {
              this.$notifier.showMessage({
                type: 'error',
                message: `Você não tem pontos o suficiente`,
              });
            } else if (this.shippingType === 'Retirar na New School') {
              this.currentStep = this.stepEnum.SET_DATE;
            } else {
              this.currentStep = this.stepEnum.PRE_CONTACT;
            }
          }

          break;

        case this.stepEnum.SET_DATE:
          if (this.date) {
            this.currentStep = this.stepEnum.SET_TIME;
          } else {
            this.$notifier.showMessage({
              type: 'error',
              message: `Escolha alguma data.`,
            });
          }

          break;

        case this.stepEnum.SET_TIME:
          if (this.time) {
            this.currentStep = this.stepEnum.WITHDRAW_CHECKOUT;
          } else {
            this.$notifier.showMessage({
              type: 'error',
              message: `Escolha algum horário.`,
            });
          }

          break;

        case this.stepEnum.WITHDRAW_CHECKOUT:
          this.currentStep = this.stepEnum.WITHDRAW_FINISHED;

          break;

        case this.stepEnum.PRE_CONTACT:
          this.currentStep = this.stepEnum.CONTACT;

          break;

        case this.stepEnum.CONTACT:
          if (this.$refs.form.validate()) {
            this.currentStep = this.stepEnum.MAIL_CHECKOUT;
          }

          break;

        case this.stepEnum.MAIL_CHECKOUT:
          this.currentStep = this.stepEnum.MAIL_FINISHED;

          break;

        case this.stepEnum.MAIL_FINISHED:
        case this.stepEnum.WITHDRAW_FINISHED:
          $nuxt._router.replace('/aluno/marketplace');

          break;
      }
    },
    async createOrder(orderType) {
      this.loading = true;

      let content;

      if (orderType === this.orderTypeEnum.MAIL) {
        content = {
          orderType: this.orderTypeEnum.MAIL,
          contactInfo: this.contactInfo,
        };
      } else if (orderType === this.orderTypeEnum.WITHDRAW) {
        content = {
          orderType: this.orderTypeEnum.WITHDRAW,
          withdrawalDate: `${this.date}T${this.time}:00:00Z`,
        };
      } else {
        this.$notifier.showMessage({
          type: 'error',
          message: 'Tipo de pedido inválido',
        });
      }

      const post = await market
        .post(process.env.endpoints.MARKETPLACE.ORDER, {
          itemId: this.productInfo.id,
          userId: this.idUser,
          quantity:
            this.productInfo.type === 'SERVICE' ? 1 : parseInt(this.quantity),
          content,
        })
        .catch(() => {
          this.$notifier.showMessage({
            type: 'error',
            message: 'Houve algum problema com o nosso serviço de troca',
          });
          return false;
        });

      if (!post) {
        this.currentStep = this.stepEnum.PRODUCT_INFO;
      } else {
        this.advanceStep();
      }
      this.loading = false;
    },
    rewindStep() {
      switch (this.currentStep) {
        case this.stepEnum.PRODUCT_INFO:
          $nuxt._router.replace('/aluno/marketplace');

          break;

        case this.stepEnum.PACKAGE_INFO:
          this.currentStep = this.stepEnum.PRODUCT_INFO;

          break;

        case this.stepEnum.SET_DATE:
        case this.stepEnum.PRE_CONTACT:
          if (this.productInfo.type === 'SERVICE') {
            this.currentStep = this.stepEnum.PRODUCT_INFO;
          } else {
            this.currentStep = this.stepEnum.PACKAGE_INFO;
          }

          break;

        case this.stepEnum.SET_TIME:
          this.currentStep = this.stepEnum.SET_DATE;

          break;

        case this.stepEnum.WITHDRAW_CHECKOUT:
          this.currentStep = this.stepEnum.SET_TIME;

          break;

        case this.stepEnum.CONTACT:
          this.currentStep = this.stepEnum.PRE_CONTACT;

          break;

        case this.stepEnum.MAIL_CHECKOUT:
          this.currentStep = this.stepEnum.CONTACT;

          break;

        case this.stepEnum.MAIL_FINISHED:
        case this.stepEnum.WITHDRAW_FINISHED:
          $nuxt._router.replace('/aluno/marketplace');

          break;
      }
    },
  },
};
</script>
<style scoped lang="scss">
* {
  font-family: Roboto;
}
img {
  width: 100%;
  height: 100%;
  margin-top: 48px;
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
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;

  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
.input-label {
  font-weight: normal;
  font-size: 14px;
  color: var(--primary);
  margin-bottom: 4px;
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
  z-index: 2 !important;
}
::v-deep .v-progress-circular {
  position: absolute !important;
  z-index: 1 !important;
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
