<template>
  <div>
    <div id="page">
      <!-- HTML aqui! -->
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<router>
  {
    path: '/aluno/meus-cursos'
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