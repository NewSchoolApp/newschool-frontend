<template>
  <div class="flex-container">
    <main id="page">
      <h3>New School</h3>
      <p>Front-end</p>
      <v-btn class="ma-2" tile outlined color="primary" to="/contribua">Contribua</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/login">Login</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/aluno/home">home</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/sobre">Quem Somos</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/contato">Fale Conosco</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/invista">Investidores</v-btn>
    </main>
  </div>
</template>

<router>
  {
    path: '/index'
  }
</router>

<script>
export default {};
</script>
<style scoped>
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
