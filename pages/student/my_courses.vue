<template>
  <div>
    <HeaderBar :title="'Meus Cursos'" :backPage="true"></HeaderBar>
    <div id="page">
      <!-- HTML aqui! -->
    </div>
  </div>
</template>

<script>
import HeaderBar from "~/components/Header.vue";

export default {
  components: {
    HeaderBar
  }
};
</script>

<style scoped></style>
