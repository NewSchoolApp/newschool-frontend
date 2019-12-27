<template>
  <div>
    
    <side-menu class="intro-transition" v-if="viewMenu"></side-menu>

    <v-bottom-navigation
      scroll-target="#page"
      fixed
      scroll-threshold="500"
      color="write"
      horizontal
    >
      <v-btn class="btn-fixed">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn class="btn-fixed">
        <span>Perfil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn class="btn-fixed">
        <span>Meus Cursos</span>
        <v-icon>mdi-library</v-icon>
      </v-btn>
      <v-btn class="btn-fixed">
        <span>Certificados</span>
        <v-icon>mdi-school</v-icon>
      </v-btn>
      <v-btn class="btn-fixed" @click="setViewMenu">
        <span>Outros</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
  
<script>
import SideMenu from "~/components/SideMenu.vue";
export default {
  data: () => ({
    viewMenu: false
  }),
  components: {
    SideMenu
  },
  methods : {
    setViewMenu(){
      this.viewMenu = !this.viewMenu
    }
  }
  
};
</script>

<style>
.v-btn__content {
  flex-direction: column-reverse !important;
}
.v-icon {
  margin-right: 0 !important;
}
.v-application .overflow-y-auto {
  margin-bottom: 3rem;
}
.btn-fixed {
  height: 100% !important;
}
.intro-transition{
  animation-name: intro; 
  animation-duration: .2s;
}
</style>