<template>
  <div>
    <div id="page"></div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<router>
  {
    path: '/aluno/home'
  }
</router>

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
