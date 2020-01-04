<template>
  <div>
    <header class="title">
      <h1>MEUS CURSOS</h1>

      <div class="add">
        <img src="~/assets/add.svg" alt />
      </div>
    </header>
    <v-container>
      <v-card class="matematic">
        <div class="mascara">
          <img src="~/assets/matematic.svg" alt />
        </div>
        
          <h1>Matemática na Prática</h1>
          <p>Andrews, O Fera</p>
      </v-card>
      <v-card class="photo">
        <div class="camera">
          <img src="~/assets/photo.svg" alt />
        </div>
        <h1>Fotografica na Raça</h1>
        <p>Tai, A Grandiosa</p>
      </v-card>
      <v-card class="contablie">
        <div class="contas">
          <img src="~/assets/contablie.svg" alt />
        </div>
        <h1>Contabilidade Pura</h1>
        <p>JP, O Mestre</p>
      </v-card>
      <v-card class="course">
        <div class="top"><img src="~/assets/matematic.svg" alt=/></div>
        <h1>O Hulmide programmer</h1>
        <p>Jonathan,3 cachorro hulmide e foda.</p>
      </v-card>

      <navigation-bar />
    </v-container>
  </div>
</template>
<router>
{
    path: '/course_list'
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
.title {
  background: white;
  padding: 23px;
}
.title h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 25px;
  color: #6600cc;
}
.container {
  width: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.add {
  margin-left: 80%;
  margin-top: -30px;
}
.container p {
  font-family: "Montserrat", sans-serif;
}
.v-card {
  width: 100%;
  border-radius: 3px;
  margin: 11px;
  box-shadow: 0px 13px 18px #00000069;
}
.container h1 {
  position: absolute;
  text-align: center;
  left: 128px;
  top: 15px;
  font-size: 110%
}
.container p {
  position: absolute;
  top: 45px;
  text-align: center;
  left: 34%;
}

.container img {
  width: 33%;
  display: flex;
}
</style>