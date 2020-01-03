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
        <div class="info-text">
        <h1>Matemática na Prática</h1>
        <p>Andrews, O Fera</p>
        </div>
      </v-card>
      <v-card class="photo">
        <img src="~/assets/photo.svg" alt />
        <h4>Fotografica na Raça</h4>
        <p>Tai, A Grandiosa</p>
      </v-card>
      <v-card class="contablie">
        <img src="~/assets/contablie.svg" alt />
        <h4>Contabilidade Pura</h4>
        <p>JP, O Mestre</p>
      </v-card>
      <v-card>
        <img src="~/assets/matematic.svg" alt=/>
        <h4>O Hulmide programmer</h4>
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
.container h4 {
  position: absolute;
  text-align: center;
  left: 128px;
  top: 15px;
}
.container p {
  position: absolute;
  top: 45px;
  text-align: center;
  left: 34%;
}
.mascara {
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mascara img {
  width: 100%;
}
.info-text {
  display: flex;
    padding: 13px;
}
</style>