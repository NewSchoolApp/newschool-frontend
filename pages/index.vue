<template>
  <div class="flex-container" >
    <main id="page">
      <h3>New School</h3>
      <p>Front-end</p>
      <v-btn class="ma-2" tile outlined color="primary" to="/login">Login</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/contribua">Contribua</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/dashboard">Dashboard</v-btn>
    </main>
    <navigation-bar />
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
main {
  color: #000;
  text-align: center;
}
.flex-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>