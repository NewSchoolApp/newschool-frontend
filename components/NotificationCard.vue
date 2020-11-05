<template>
  <div class="card">
    <div class="header__info">
      <img src="~/assets/gabs-small.svg" />
      <h1>{{ notification.content.badge.badgeDescription }}</h1>
      <p id="continue__text">{{ notificationDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationCard',
  props: ['notification'],

  data: () => ({
    notificationDate: '',
  }),
  mounted() {
    this.checkDate();
  },
  methods: {
    checkDate() {
      const notificationDateHourAndMinute = this.notification.createdAt.slice(
        11,
        16,
      );
      const notificationMonthAndDay = this.notification.createdAt.slice(5, 10);
      const today = new Date().getDay() + 1;
      const month = new Date().getMonth() + 1;
      const dateSplited = notificationMonthAndDay.split('-');
      if (dateSplited[1] < today || dateSplited[0] < month) {
        this.notificationDate =
          today - dateSplited[1] === 1
            ? `Ontem - ${notificationDateHourAndMinute}`
            : `${dateSplited[1]}/${dateSplited[0]} - ${notificationDateHourAndMinute}`;
      } else {
        this.notificationDate = notificationDateHourAndMinute;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto;
  transition: 0.2 ease-in;
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
  min-width: 185px;
  color: rgb(26, 26, 26);
  max-width: 70%;
}
.container__list {
  margin-bottom: 5rem;
}
.card {
  margin: 1.3rem;
  padding: 0.9rem;
  background: #fff;
  box-shadow: 0px 12px 20px 0px #00000026;
  border-radius: 2px;
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
  margin-top: -23px;
}
</style>
