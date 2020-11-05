<template>
  <div>
    <HeaderBar :title="'Notificação'" :back-page="true" />
    <div v-show="!loading" id="page">
      <div v-if="notifications.length">
        <div
          v-infinite-scroll="getUserList"
          class="cards"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="limit"
        >
          <client-only>
            <notification-card
              v-for="notification of slicedNotifications"
              :key="notification.id"
              :notification="notification"
            />
          </client-only>
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
import NotificationCard from '~/components/NotificationCard';

export default {
  transition: 'bounce',
  components: {
    NavigationBar,
    HeaderBar,
    NothingToShow,
    NotificationCard,
  },

  data: () => ({
    loading: true,
    limit: 100,
    busy: false,
    slicedNotifications: [],
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
    getNotifications() {
      http
        .getAll(`${process.env.endpoints.NOTIFICATIONS}/${this.user.id}`)
        .then(response => {
          this.notifications = response.data;
          this.getUserList();
        });
    },
    getUserList() {
      this.busy = true;
      this.loading = true;

      setTimeout(() => {
        const append = this.notifications.slice(
          this.slicedNotifications.length,
          this.slicedNotifications.length + this.limit,
        );
        console.log(append);
        if (!append.length) {
          return (this.loading = false);
        }
        this.slicedNotifications = this.slicedNotifications.concat(append);
        console.log(this.slicedNotifications);
        this.busy = false;
        this.loading = false;
      }, 400);
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
#continue__text {
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  text-align: right;
  color: #737373;
  text-transform: none;
  letter-spacing: 0em;
}
</style>
