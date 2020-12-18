<template>
  <div class="mural-card">
    <div class="card-header">
      <v-avatar ref="avatar" class="mr-2" size="25">
        <img
          v-if="challengeData.user.photoPath"
          :src="challengeData.user.photoPath"
        />
        <img v-else :src="require(`~/assets/person.svg`)" />
      </v-avatar>
      {{ challengeData.user.name }}
    </div>
    <template>
      <div
        ref="cardText"
        :class="'card-text ' + (textHidden ? 'text-hidden' : {})"
      >
        {{ challengeData.challenge }}
      </div>

      <div
        v-if="textOverflow && textHidden"
        v-ripple
        class="read-more"
        @click="textHidden = !textHidden"
      >
        Ver mais
      </div>
      <div
        v-if="!textHidden"
        v-ripple
        class="read-more"
        @click="textHidden = !textHidden"
      >
        Ver menos
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MuralCard',
  props: {
    challengeData: {
      types: Object,
      required: true,
    },
  },
  data: () => ({
    userPhoto: '',
    textOverflow: false,
    textHidden: false,
  }),
  computed: {
    cardTextLineCount() {
      // dom element divided by the line height of the text
      return this.$refs.cardText.offsetHeight / 16;
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.cardTextLineCount > 7) {
        this.textOverflow = true;
      }
      this.textHidden = true;
    }, 10);
  },
};
</script>

<style scoped>
.mural-card {
  position: relative;
  border-radius: 4px;
  border: solid #dadada 1px;
  margin-bottom: 16px;
  box-shadow: 0px 3px 2px 0px rgba(158, 158, 158, 0.8);
  min-height: 213px;
}
.height-limit {
  max-height: 213px;
}
.card-header {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: -1px !important;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  background-color: var(--primary);
  justify-content: flex-start;
  border-radius: 4px;
  border: solid #dadada 1px;
}
.card-text {
  margin: 10px;
  margin-bottom: 50px;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
}
.text-hidden {
  display: -webkit-box;
  -webkit-line-clamp: 7 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden;
  text-overflow: ellipsis;
}
.read-more {
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  justify-content: center;
  color: #4976ef;
  position: absolute;
  bottom: 5px;
  transform: translate(-50%);
  left: 50%;
  padding: 5px;
}
</style>
