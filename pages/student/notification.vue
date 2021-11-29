<template>
  <div>
    <HeaderBar :title="'Notificação'" :back-page="true" />

    <div id="filters">
      <img
        class="collapse-button clear__button"
        color="primary"
        dark
        src="../../assets/more_vert_24px.svg"
        @click.stop="dialog = true"
      />
      <v-dialog v-model="dialog" max-width="290">
        <v-card class="filter-modal">
          <v-list-item
            class="item-list"
            @click="
              clearNotifications();
              dialog = false;
            "
            >Excluir todas</v-list-item
          >
          <v-list-item
            class="item-list"
            @click="
              filterImportants = false;
              dialog = false;
            "
            >Ver todas</v-list-item
          >
          <v-list-item
            class="item-list"
            @click="
              filterImportants = true;
              dialog = false;
            "
            >Ver importantes
          </v-list-item>
        </v-card>
      </v-dialog>
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
    <div v-else id="page">
      <div v-if="notificationsToShow.length" id="total-cards">
        <div
          v-infinite-scroll="getUserList"
          class="cards"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="limit"
        >
          <transition-group name="fade">
            <div
              v-for="notification of notificationsToShow"
              :key="notification.id"
            >
              <NotificationCard
                v-if="notification.type === 'GAMEFICATION'"
                :primary-message="notification.content.badge.badgeDescription"
                :date="checkDate(notification.createdAt)"
                @closeClick="removeNotification(notification)"
              ></NotificationCard>
              <div v-else-if="notification.type === 'MARKETPLACE'">
                <NotificationCard
                  v-if="notification.content.status === 'CANCELED'"
                  :primary-message="
                    mktNotificationMessage[notification.content.status].message
                  "
                  :secoundary-message="`Ref: ${notification.content.item.name}`"
                  :date="checkDate(notification.createdAt)"
                  :special="true"
                  :handoff-message="
                    canceledReasons[notification.content.cancelation.reason]
                  "
                  :img="notification.content.item.photo"
                  @closeClick="removeNotification(notification)"
                ></NotificationCard>
                <NotificationCard
                  v-else
                  :primary-message="
                    mktNotificationMessage[notification.content.status].message
                  "
                  :secoundary-message="`Ref: ${notification.content.item.name}`"
                  :date="checkDate(notification.createdAt)"
                  :handoff-message="
                    mktNotificationMessage[notification.content.status].handoff
                  "
                  :img="
                    notification.content.item.type === 'PRODUCT'
                      ? notification.content.item.photo
                      : false
                  "
                  :icon="
                    notification.content.item.type === 'SERVICE'
                      ? 'mdi-check-circle-outline'
                      : false
                  "
                  @closeClick="removeNotification(notification)"
                ></NotificationCard>
              </div>
              <NotificationCard
                v-else-if="notification.type === 'OTHER'"
                primary-message="Toque para acessar o site do parceiro."
                :date="checkDate(notification.createdAt)"
                :special="true"
                @closeClick="removeNotification(notification)"
                @bodyClick="goToNotification"
              ></NotificationCard>
            </div>
          </transition-group>
        </div>
      </div>
      <div v-else class="nothing">
        <div class="nothing-message">
          Eita, Man@... Você ainda não tem nenhuma notificação{{
            filterImportants ? ' importante' : ''
          }}. :(
        </div>
        <v-img :src="require('~/assets/nothing.svg')" />
      </div>
    </div>

    <navigation-bar />
  </div>
</template>
<router>
  path: "/aluno/notificacao"
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import NotificationCard from '~/components/NotificationCard.vue';

import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    NotificationCard,
  },
  transition: 'bounce',

  data: () => ({
    loading: true,
    notifications: [],
    dialog: false,
    filterImportants: false,
    notificationType: {
      OTHER: 'OTHER',
      GAMEFICATION: 'GAMEFICATION',
      MARKETPLACE: 'MARKETPLACE',
    },
    mktNotificationMessage: {
      SEPARATING: {
        message: 'Aí sim hein! Recebemos seu pedido.',
        handoff:
          'Fique atento que vamos te dar um salve pra fazer sua entrega.',
      },
      SENT: {
        message: 'Da hora! Seu pedido está a caminho.',
        handoff: 'Fica tranquilo, você vai receber seu pedido em breve.',
      },
      WAITING_FOR_WITHDRAWAL: {
        message: 'Tudo certo com o seu pedido.',
        handoff:
          'Seu pedido estará disponível na New School no horário agendado.',
      },
      NOTIFYING_COMPANY: {
        message: 'Daremos um salve sobre seu serviço.',
        handoff: 'Te daremos um salve assim que nosso parceiro for contactado.',
      },
      COMPANY_NOTIFIED: {
        message: 'Já demos um salve sobre seu serviço.',
        handoff:
          'Nosso parceiro vai te dar um toque sobre o seu serviço. Ele já está confirmado.',
      },
      DONE: { message: 'Seu pedido foi finalizado com sucesso.', handoff: '' },
      CANCELED: { message: 'Que zica! Seu pedido foi cancelado.', handoff: '' },
    },
    canceledReasons: {
      NOT_IN_STOCK: 'Não tinhamos esse produto em estoque.',
      DOES_NOT_EXISTS: 'Esse produto não existe.',
      NOT_ENOUGH_POINTS: 'Você não tinha Newcoins suficientes.',
    },
  }),
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    notificationsToShow() {
      if (this.filterImportants) {
        return this.notifications.filter(notification => {
          return notification.important;
        });
      } else {
        return this.notifications;
      }
    },
  },
  async mounted() {
    await this.getNotifications();
    this.loading = false;
  },
  methods: {
    checkDate(date) {
      const [hours, minutes] = date.slice(11, 16).split(':');
      const notificationDateHourAndMinute = `${this.convertHour(
        Number(hours),
      )}:${minutes}`;
      const notificationMonthAndDay = date.slice(5, 10);
      const today = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const [dateMonth, dateDay] = notificationMonthAndDay.split('-');

      if (dateDay < today || dateMonth < month) {
        if (today - dateDay === 1) {
          return `Ontem - ${notificationDateHourAndMinute}`;
        } else {
          return `${dateDay}/${dateMonth} - ${notificationDateHourAndMinute}`;
        }
      } else {
        return notificationDateHourAndMinute;
      }
    },
    async clearNotifications() {
      this.loading = true;
      for (const notification of this.notifications) {
        await this.removeNotification(notification);
      }
      this.loading = false;
    },
    removeNotification(notification) {
      this.loading = true;
      http
        .putByURL(
          `${process.env.endpoints.NOTIFICATIONS}/${notification.id}/see`,
        )
        .then(() => {
          const index = this.notifications.indexOf(notification);
          this.notifications.splice(index, 1);
        });
      this.loading = false;

      // setTimeout(async () => {
      //   await this.getNotifications();
      // }, 500);
      // setTimeout(() => {
      //   this.loading = false;
      // }, 700);
    },
    async getNotifications() {
      this.notifications = (
        await http.getAll(
          `${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`,
        )
      ).data;
    },
    convertHour(hour) {
      if (hour >= 0 && hour < 3) {
        const HOUR_INCREMENT = 21;
        return hour + HOUR_INCREMENT;
      }
      return hour - 3;
    },
    goToNotification(link) {
      this.loading = true;
      // window.location = link;  <- uncomment to use notification link
      $nuxt._router.push(`/aluno/semear`);
    },
  },
};
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}

::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--secondary);
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
  text-transform: none;
  border-bottom: 4px solid #f5f5f5;
}
::v-deep .v-tabs {
  max-height: 32px;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.special {
  border-left: 5px solid #f24e1e;
  cursor: pointer;
}

#page {
  height: 100%;
}
h1 {
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  min-width: 208px;
  color: rgb(26, 26, 26);
  max-width: 70%;
}
.container__list {
  margin-bottom: 5rem;
}
.fade-leave-active {
  transition: all 0.4s;
}
.fade-leave-to {
  opacity: 0;
}
.card {
  margin: 0.3rem 0.9rem;
  position: relative;
  padding: 0.9rem;
  background: #fff;
  box-shadow: 0px 0px 3px 1px #adadad26;
  border-radius: 4px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 62px;
}
.btn-back {
  width: unset !important;
}
.header__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .v-btn--icon.v-size--default {
  height: unset;
  color: var(--primary);
}
.cross__button {
  position: absolute;
  right: 20px;
  top: 10px;
}
.clear__button {
  position: absolute;
  width: 25px;
  font-size: 10px;
  height: 20px;
  border-radius: 5px;
  text-transform: uppercase;
  top: 25px;
  right: 15px;
}

::v-deep .v-progress-linear {
  margin-bottom: 35px;
}
::v-deep .v-progress-linear__background {
  opacity: 100%;
  background-color: #cecece !important;
}

#continue__text {
  min-width: 55px;
  color: rgb(63, 61, 86);
  position: absolute;
  top: 40px;
  right: 20px;
  font-family: Montserrat;
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  line-height: 10px;
  letter-spacing: 0em;
  text-align: right;
}

@media (min-width: 768px) {
  #page {
    display: flex;
    justify-content: center;
  }
  #total-cards {
    width: 700px;
    max-width: 700px;
  }
}
.filter-modal {
  position: absolute;
  right: 40px;
  top: 35px;
  width: 151px;
  height: 135px;
}
.item-list {
  font-size: 12px;
  padding: 0 0 0 15px;
  margin-top: 5px;
  font-weight: 500;
  min-height: 38px;
}
.nothing {
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
  color: #484848;
  padding: 124px 44px;
}
.nothing-message {
  padding-bottom: 64px;
}
</style>
