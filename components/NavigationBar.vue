<template>
  <div v-if="auth">
    <side-menu class="intro-transition" v-show="viewMenu"></side-menu>

    <v-bottom-navigation
      scroll-target="#page"
      fixed
      scroll-threshold="500"
      color="write"
      horizontal
    >
      <v-btn
        class="btn-fixed menu__bottom"
        v-for="item in menu"
        v-bind:key="item.id"
        :to="item.link"
      >
        <span>{{ item.name }}</span>
        <v-icon>{{ item.icon }}</v-icon>
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
import auth from "~/services/http/auth";

export default {
  data: () => ({
    viewMenu: false,
    auth: false,
    menu: [
      { id: 1, name: "Home", icon: "mdi-home", link: "home" },
      { id: 2, name: "Perfil", icon: "mdi-account", link: "perfil" },
      {
        id: 3,
        name: "Meus Cursos",
        icon: "mdi-library",
        link: "meus-cursos"
      },
      {
        id: 4,
        name: "Certificados",
        icon: "mdi-school",
        link: "certificados"
      }
    ]
  }),
  components: {
    SideMenu
  },
  mounted() {
    const { status } = auth.isTokenValid();
    if (status) {
      this.auth = true;
      this.changeRoutingIfAdmin();
    }
  },
  methods: {
    setViewMenu() {
      this.viewMenu = !this.viewMenu;
    },
    changeRoutingIfAdmin() {
      if (this.$store.state.user.data.role === "ADMIN") {
        this.menu[0].link = "/admin/home";
        this.menu[2].link = "/admin/listar-cursos";
      }
    }
  }
};
</script>

<style scoped>
>>> .v-item-group.v-bottom-navigation--horizontal .v-btn > .v-btn__content {
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
>>> .v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content {
  color: #6600cc;
}

@media (max-width: 375px) {
  .v-btn {
    min-width: 55px !important;
    font-size: 0.6rem !important;
  }
}
@media (max-width: 415px) {
  .v-btn {
    font-size: 0.65rem !important;
  }
}
</style>