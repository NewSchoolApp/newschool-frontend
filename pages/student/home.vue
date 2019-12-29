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
import auth from "../../services/http/auth";
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  },
  mounted() {
    auth.getInfoUser();
  }
};
</script>

<style>
</style>
