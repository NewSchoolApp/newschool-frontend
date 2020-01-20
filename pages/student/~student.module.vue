<template>
  <div id="app">
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

<style>
</style>