<template>
  <div v-if="auth">
    <side-menu v-show="viewMenu" class="intro-transition"></side-menu>

    <v-bottom-navigation
      scroll-target="#page"
      fixed
      scroll-threshold="500"
      color="write"
      horizontal
    >
      <v-btn
        v-for="item in menu"
        :key="item.id"
        class="btn-fixed menu__bottom"
        :to="item.link"
        :class="item.class"
        @click="viewMenu = false"
      >
        <span>{{ item.name }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>

      <v-btn id="menu-btn" class="btn-fixed" @click="setViewMenu">
        <span>Outros</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import SideMenu from '~/components/SideMenu.vue';
import auth from '~/services/http/auth';

export default {
  components: {
    SideMenu,
  },
  data: () => ({
    viewMenu: false,
    auth: false,
    menu: [
      { id: 1, name: 'Início', icon: 'mdi-home-outline', link: '/aluno/home' },
      {
        id: 2,
        name: 'Perfil',
        icon: 'mdi-account-outline',
        link: '/aluno/perfil',
      },
      {
        id: 3,
        name: 'Meus Cursos',
        icon: 'mdi-library',
        link: '/aluno/meus-cursos',
      },
      {
        id: 4,
        name: 'Certificados',
        icon: 'mdi-school-outline',
        link: '/aluno/certificados',
        class: '',
      },
    ],
  }),
  mounted() {
    // this.menu[1].addEventLiestener('click', () => {
    //   alert('oi');
    // });
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
      if (this.$store.state.user.data.role === 'ADMIN') {
        this.menu[0].link = '/admin/home';
        this.menu[1].link = '/admin/perfil';
        this.menu[2].link = '/admin/listar-cursos';
        this.menu[3].link = '/admin/certificados';
      }
    },
  },
};
</script>

<style scoped>
>>> .v-item-group.v-bottom-navigation--horizontal .v-btn > .v-btn__content {
  flex-direction: column-reverse !important;
}
.v-icon {
  margin-right: 0 !important;
  padding-top: 5px;
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
  color: var(--primary);
}
.mdi-library::before {
  content: url('https://api.iconify.design/ic:outline-local-library.svg?color=rgb(112%2C112%2C112)&height=24');
  vertical-align: -0.125em;
}
>>> .v-item-group.v-bottom-navigation
  .v-btn.v-btn--active
  .v-btn__content
  .mdi-library::before {
  content: url('https://api.iconify.design/ic:outline-local-library.svg?color=rgb(102%2C0%2C204)&height=24');
  vertical-align: -0.125em;
}

span {
  font-size: 8px;
  font-weight: 400;
  color: rgb(115, 115, 115);
  margin-top: 5px;
}
>>> .v-item-group.v-bottom-navigation
  .v-btn.v-btn--active
  .v-btn__content
  span {
  color: var(--primary);
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
.remove-certificates {
  display: none;
}
</style>
