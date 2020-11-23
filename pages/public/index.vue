<template>
  <div class="flex-container">
    <main id="page">
      <h3>New School</h3>
      <p>Front-end</p>
      <v-btn class="btn-white" to="/contribua">Contribua</v-btn>
      <v-btn class="btn-white" to="/login">Login</v-btn>
      <v-btn class="btn-white" to="/aluno/home">home</v-btn>
      <v-btn class="btn-white" to="/sobre">Quem Somos</v-btn>
      <v-btn class="btn-white" to="/contato">Fale Conosco</v-btn>
      <v-btn class="btn-white" to="/invista">Investidores</v-btn>
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

.btn-white {
  margin: 5px;  
}
</style>