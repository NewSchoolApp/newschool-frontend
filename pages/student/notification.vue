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

    <div v-show="!loading" id="page">
      <div v-if="notifications.length" id="total-cards">
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
              class="card"
              :class="notification.type === 'OTHER' ? 'special' : ''"
            >
              <div class="header__info">
                <img
                  src="~/assets/gabs-small.svg"
                  @click="
                    notification.content.semearSiteUrl
                      ? goToNotification(notification.content.semearSiteUrl)
                      : ''
                  "
                />
                <img
                  class="cross__button"
                  src="~/assets/cross-button.svg"
                  alt=""
                  @click="removeNotification(notification)"
                />

                <h1
                  @click="
                    notification.content.semearSiteUrl
                      ? goToNotification(notification.content.semearSiteUrl)
                      : ''
                  "
                >
                  {{
                    notification.content.badge
                      ? notification.content.badge.badgeDescription
                      : 'Clique e acesse o site do Parceiro'
                  }}
                </h1>
                <div>
                  <p id="continue__text">{{ checkDate(notification) }}</p>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <div v-else class="nothing">
        <div class="nothing-message">
          Eita, Man@... Você ainda não tem nenhuma notificação. :(
        </div>
        <v-img :src="require('~/assets/nothing.svg')" />
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
    <navigation-bar />
  </div>
</template>
<router>
  path: "/aluno/notificacao"
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  transition: 'bounce',

  data: () => ({
    loading: true,
    notifications: [],
    dialog: false,
    filterImportants: false
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
    setTimeout(() => {
      this.loading = false;
    }, 400);
  },
  methods: {
    checkDate(notification) {
      const hourAndMinute = notification.createdAt.slice(11, 16).split(':');
      const notificationDateHourAndMinute = `${Number(hourAndMinute[0]) - 3}:${
        hourAndMinute[1]
      }`;
      const notificationMonthAndDay = notification.createdAt.slice(5, 10);
      const today = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const dateSplited = notificationMonthAndDay.split('-');

      if (dateSplited[1] < today || dateSplited[0] < month) {
        if (today - dateSplited[1] === 1) {
          return `Ontem - ${notificationDateHourAndMinute}`;
        } else {
          return `${dateSplited[1]}/${dateSplited[0]} - ${notificationDateHourAndMinute}`;
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
    getNotifications() {
      this.notifications = [];
      http
        .getAll(`${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`)
        .then(response => {
          this.notifications = response.data;
        });
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
  color: var(--primary-light);
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
  width: 50px;
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
