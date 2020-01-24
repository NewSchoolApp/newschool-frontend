<template>
  <div id="app" class="full__height">
    <router-view></router-view>
    <client-only>
      <navigation-bar />
    </client-only>
    <modal />
  </div>
</template>

<script>
import NavigationBar from "~/components/NavigationBar.vue";
import Modal from "~/components/Modal.vue";
export default {
  components: {
    NavigationBar,
    Modal
  }
};
</script>

<style scoped>
.full__height {
  height: 100%;
}
</style>
