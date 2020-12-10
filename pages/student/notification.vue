<template>
  <div>
    <HeaderBar :title="'Notificação'" :back-page="true" />
    <button
      v-if="notifications.length"
      @click="clearNotifications"
      class="btn-primary clear__button"
    >
      limpar
    </button>

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
              v-for="notification of notifications"
              :key="notification.id"
              class="card"
              :class="notification.type === 'OTHER' ? 'special' : ''"
              @click="
                notification.content.semearSiteUrl
                  ? goToNotification(notification.content.semearSiteUrl)
                  : ''
              "
            >
              <div class="header__info">
                <img src="~/assets/gabs-small.svg" />
                <img
                  class="cross__button"
                  src="~/assets/cross-button.svg"
                  alt=""
                  @click="removeNotification(notification)"
                />

                <h1>
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
      <NothingToShow
        v-else
        title="Vixe :/"
        message="Você não tem nenhuma notificação."
      />
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
import NothingToShow from '~/components/NothingToShow';

export default {
  transition: 'bounce',
  components: {
    NavigationBar,
    HeaderBar,
    NothingToShow,
  },

  data: () => ({
    loading: true,
    notifications: [],
  }),
  computed: {
    user() {
      return this.$store.state.user.data;
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
      const notificationDateHourAndMinute = notification.createdAt.slice(
        11,
        16,
      );
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
      window.location = link;
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
  border-left: 5px solid red;
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
  box-shadow: 2px 2px 2px 0px #00000026;
  border-radius: 4px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
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
  z-index: 999;
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
  font-size: 8px;
  font-weight: 300;
  min-width: 55px;
  line-height: 9px;
  text-align: right;
  color: rgb(63, 61, 86);
  text-transform: none;
  letter-spacing: 0em;
  position: absolute;
  top: 40px;
  right: 20px;
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
</style>
