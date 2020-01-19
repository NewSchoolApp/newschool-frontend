<template>
  <div id="app">
    <router-view></router-view>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import NavigationBar from "~/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar
  }
};
</script>

<style>
</style>