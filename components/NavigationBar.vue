<template>
  <div>
    <side-menu class="intro-transition" v-show="viewMenu"></side-menu>

    <v-bottom-navigation
      scroll-target="#page"
      fixed
      scroll-threshold="500"
      color="write"
      horizontal
    >
      <v-btn class="btn-fixed" v-for="item in menu" v-bind:key="item.id" :to="item.link">
        <span>{{item.name}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>

      <v-btn class="btn-fixed" @click="setViewMenu" id="menu-btn">
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
    viewMenu: false,

    menu: [
      { id: 1, name: "Home", icon: "mdi-home", link: "/aluno/home" },
      { id: 2, name: "Perfil", icon: "mdi-account", link: "/aluno/perfil" },
      {
        id: 3,
        name: "Meus Cursos",
        icon: "mdi-library",
        link: "/admin/meus-cursos"
      },
      {
        id: 4,
        name: "Certificados",
        icon: "mdi-school",
        link: "/aluno/certificados"
      }
    ]
  }),
  components: {
    SideMenu
  },
  methods: {
    setViewMenu() {
      this.viewMenu = !this.viewMenu;
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
#page {
  margin-bottom: 5rem !important;
}
.btn-fixed {
  height: 100% !important;
}
.intro-transition {
  animation-name: intro;
  animation-duration: 0.2s;
}
.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content {
  color: #6600cc;
}

@media (max-width: 375px) {
  .v-btn {
    min-width: 55px !important;
    font-size: 0.6rem !important;
  }
}
</style>