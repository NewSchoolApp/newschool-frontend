<template>
  <div>
    <div class="notidicationCard" :class="special ? 'special' : ''">
      <div class="notificationBody">
        <div
          v-if="img"
          id="img-viewport"
          :style="`background-image: url(${img});`"
        />
        <v-icon v-else-if="icon" id="cardIcon">{{ icon }}</v-icon>
        <img v-else id="img-viewport" src="~/assets/gabs-small.svg" />

        <div class="notificationMessages" @click="bodyClick">
          <div id="primaryMessage">{{ primaryMessage }}</div>
          <div id="secoundaryMessage">{{ secoundaryMessage }}</div>
        </div>

        <div id="btn-container">
          <v-icon id="closeBtn" @click="closeClick"> mdi-close-circle</v-icon>
          <div v-if="!handoffMessage" id="dateText">{{ date }}</div>
          <v-icon
            v-else
            id="handoffBtn"
            :class="handoff ? 'rotate180' : false"
            @click="handoff = !handoff"
            >mdi-chevron-down</v-icon
          >
        </div>
      </div>
    </div>
    <div v-if="handoff" id="notificationHandoff">
      <div></div>
      <div>
        {{ handoffMessage }}
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import http from '~/services/http/generic';
export default {
  name: 'NotificationCard',
  props: [
    'primaryMessage',
    'date',
    'secoundaryMessage',
    'handoffMessage',
    'img',
    'icon',
    'special',
  ],

  data: () => ({
    notificationDate: '',
    handoff: false,
  }),
  mounted() {},
  methods: {
    bodyClick() {
      this.$emit('bodyClick');
    },
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
    closeClick() {
      this.$emit('closeClick');
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto;
  transition: 0.2 ease-in;
  outline: none;
}
.rotate180 {
  transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
}
.notificationMessages {
  flex: 16;
}
#primaryMessage {
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: rgb(26, 26, 26);
}
#secoundaryMessage {
  font-size: 12px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #737373;
}
.container__list {
  margin-bottom: 5rem;
}
.notidicationCard {
  margin: 8px 16px;
  padding: 8px 0;
  background: #fff;
  box-shadow: 0px 4px 12px 0px #00000026;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.notidicationCard div {
  padding: 0 8px;
}
.notificationBody {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.special {
  border-left: 5px solid red;
}
#dateText {
  font-size: 8px;
  font-weight: 300;
  color: rgb(63, 61, 86);
  text-align: center;
}
#btn-container {
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#handoffBtn {
  color: var(--primary);
  padding: 8px;
}
#closeBtn {
  color: #67d4c7;
  font-size: 20px;
  padding: 8px;
}
#notificationHandoff {
  margin: -8px 16px 0;
  padding: 16px;
  font-size: 12px;
  line-height: 16px;
  color: #1a1a1a;
  background-color: #f5f5f5;
  display: flex;
}
#notificationHandoff div {
  padding: 0 8px;
}
#notificationHandoff :nth-child(1) {
  flex: 2;
}
#notificationHandoff :nth-child(2) {
  flex: 15;
}
#notificationHandoff :nth-child(3) {
  flex: 2;
}
#img-viewport {
  height: 40px;
  flex: 2;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#cardIcon {
  padding: 0 8px;
  color: var(--primary);
  flex: 2;
  font-size: 24px;
}
</style>
