<template>
  <div class="container-page">
    <main>
      <section id="info">
        <div id="avatar">
          <div class="flex-center border-profile-photo">
            <div class="flex-center profile-container">
              <avatar :username="user.name | simplifyName" :size="90"></avatar>
            </div>
          </div>
        </div>
        <div id="flex-info-user" class="flex-center">
          <h1>{{ user.name }}</h1>
          <p>{{ user.type }}</p>
          <v-btn
            id="btnLogout"
            small
            outlined
            color="error"
            width="80px"
            @click="logout"
            >Sair</v-btn
          >
        </div>
      </section>
      <div id="close">
        <v-icon id="close-btn" color="primary" @click="closeMenu()"
          >mdi-close-circle</v-icon
        >
      </div>
    </main>
    <section class="menu-list">
      <router-link
        v-for="item in menu"
        :key="item.id"
        tag="div"
        class="item-menu"
        :to="item.link"
        @click.native="closeMenu()"
      >
        <div>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </div>
        <p class="text-menu">{{ item.label }}</p>
      </router-link>
    </section>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
import { mapActions } from 'vuex';
import auth from '~/services/http/auth';

export default {
  data: () => ({
    menu: [
      {
        id: 1,
        label: 'Meu Perfil',
        icon: 'mdi-account',
        link: '/aluno/perfil',
      },
      {
        id: 2,
        label: 'Meus Cursos',
        icon: 'mdi-library',
        link: '/aluno/meus-cursos',
      },
      {
        id: 3,
        label: 'Meus Certificados',
        icon: 'mdi-school',
        link: '/aluno/certificados',
      },
      {
        id: 4,
        label: 'Cola com Nóix',
        icon: 'mdi-gesture-double-tap',
        link: '/contribua',
      },
      {
        id: 5,
        label: 'O que é a new school?',
        icon: 'mdi-book-multiple',
        link: '/sobre',
      },
      // { id: 6, label: "Ajuda", icon: "mdi-hand-right", link: "/ajuda" },
      {
        id: 7,
        label: 'Fale com a gente',
        icon: 'mdi-phone-message-outline',
        link: '/contato',
      },
      {
        id: 8,
        label: 'Apoie a new school',
        icon: 'mdi-volume-high',
        link: '/construindo',
      },
    ],
  }),
  methods: {
    ...mapActions('user', ['clearInfoUser']),
    /**
     * Método para fechar o side-menu
     */
    closeMenu() {
      document.getElementById('menu-btn').click();
    },
    logout() {
      this.logoutSocial().then(() => {
        $nuxt._router.push('/login');
        localStorage.clear();
        this.clearInfoUser();
      });
    },
    pushAdminOnlyOptions() {
      if (this.$store.state.user.data.role === 'ADMIN') {
        this.menu[1].link = '/admin/listar-cursos';
        this.menu.push({
          id: 9,
          label: 'Dashboard',
          icon: 'mdi-chart-bar',
          link: '/admin/dashboard',
        });
      }
    },
    logoutSocial() {
      if (!this.$auth.loggedIn) {
        return Promise.resolve();
      }
      return this.$auth.logout();
    },
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
  mounted() {
    const { status } = auth.isTokenValid();
    if (status) {
      this.auth = true;
      this.pushAdminOnlyOptions();
    }
  },
  filters: {
    simplifyName(name) {
      if (!name) {
        return '';
      }
      const regex = /^(\S*\s+\S+).*/; // Regex para remover todos os caracteres após o segundo espaço em branco
      const numberOfNames = name.split(' ').length;
      if (numberOfNames > 2) {
        return regex.exec(name)[1];
      }
      return name;
    },
  },
  components: {
    Avatar,
  },
};
</script>

<style lang="scss" scoped>
.container-page {
  z-index: 2;
}
#btnLogout {
  margin-top: 5px;
}

.container-page > main {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
}
#info {
  display: flex;
}

#avatar {
  margin-right: 1rem;
}
.text-menu {
  text-transform: uppercase;
}

h1 {
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
}

.container-page {
  background-color: #fff;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.row {
  margin-left: 0;
}
#close-btn {
  cursor: pointer;
  font-size: 30px;
}

#flex-info-user {
  justify-content: flex-start;
  flex-direction: column;
  align-items: baseline;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-profile-photo {
  height: 95px;
  width: 95px;
  border: solid 1px #6600cc;
  border-radius: 50px;
}
.profile-container {
  width: 85px;
  height: 85px;
  border-radius: 50px;
  overflow: hidden;

  img {
    width: 100%;
  }
}

.item-menu {
  display: -webkit-box;
  display: flex;
  width: 100%;
  padding: 13px;
  border-bottom: solid 1px #e8e8e8;
  -webkit-box-align: center;
  align-items: center;
  color: #6600cc !important;
  cursor: pointer;
  div {
    width: 50px;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    margin-right: 2rem;
  }
}

.item-menu:hover {
  background-color: rgb(232, 209, 255);
}

.col-flex-center {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

p {
  margin-bottom: 0 !important;
}
h4 {
  font-weight: 600;
}
@media (max-width: 320px) {
  .item-menu {
    height: 42px;
  }
}
</style>
