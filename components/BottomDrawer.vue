<template>
  <div v-if="active" id="bottom-drawer" :style="fadeAnimation">
    <div id="drawer-overlay" @click="toggleDrawer()" />
    <div id="drawer-body" :style="slideAnimation">
      <div id="drawer-toolbar">
        <div>Loja</div>
        <v-icon @click="toggleDrawer()">mdi-close-circle</v-icon>
      </div>
      <div id="slot">
        <slot />
      </div>
      <div id="drawer-bottom"></div>
      <div id="drawer-handle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'price', 'img'],
  data: () => ({
    active: false,
    fadeAnimation: '',
    slideAnimation: '',
  }),
  methods: {
    toggleDrawer() {
      if (this.active) {
        this.fadeAnimation = 'opacity: 0%';
        this.slideAnimation = 'bottom: -100%';
        setTimeout(() => {
          this.active = false;
        }, 500);
      } else {
        this.active = true;
        setTimeout(() => {
          this.fadeAnimation = 'opacity: 100%';
          this.slideAnimation = 'bottom: 0';
        }, 1);
      }

      this.$emit('toggle');
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto';
}
#bottom-drawer {
  opacity: 0%;
  transition: opacity 0.3s, bottom 0.3s;
}
#drawer-overlay {
  background-color: black;
  opacity: 50%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
#drawer-body {
  background-color: white;
  position: fixed;
  width: 100%;
  bottom: -100%;
  left: 0;
  z-index: 999;
  padding: 16px 16px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  transition: bottom 0.3s;
  max-height: 90%;
  overflow: scroll;
}
#drawer-toolbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  color: #1a1a1a;
  margin-bottom: 16px;
}
#drawer-bottom {
  width: 100%;
  height: 75px;
  position: fixed;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
}
#drawer-handle {
  width: 50%;
  height: 7px;
  background-color: #494949;
  border-radius: 4px;
  margin-top: 16px;
  position: fixed;
  bottom: 10px;
}
#slot {
  width: 100%;
  margin-bottom: 50px;
}
</style>
