<template>
  <div class="container-page">
    <main>
      <v-row>
        <v-col cols="4" sm="2" md="3">
          <div class="flex-center border-profile-photo">
            <div class="flex-center profile-container">
              <avatar :username="this.user.name" :size="90"></avatar>
            </div>
          </div>
        </v-col>
        <v-col cols="6" sm="8" md="8">
          <div class="flex-center" id="flex-info-user">
            <h4>{{user.name}}</h4>
            <p>{{user.email}}</p>
            <router-link to="/aluno/perfil">Ver meu perfil</router-link>
          </div>
        </v-col>
        <v-col sm="2" md="1" cols="2" class="col-flex-center">
          <v-icon id="close-btn" color="primary" @click="closeMenu()">mdi-close-circle</v-icon>
        </v-col>
      </v-row>
    </main>
    <section class="menu-list">
      <v-row>
        <v-col cols="12">
          <router-link
            tag="div"
            class="item-menu"
            v-for="item in menu"
            v-bind:key="item.id"
            :to="item.link"
          >
            <div>
              <v-icon color="primary">{{item.icon}}</v-icon>
            </div>
            <p>{{item.label}}</p>
          </router-link>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  data: () => ({
    user: {
      id: "",
      name: "Anônimo",
      email: "Anônimo",
      urlFacebook: "",
      urlInstagram: ""
    },
    menu: [
      {
        id: 1,
        label: "Meus Cursos",
        icon: "mdi-library",
        link: "/aluno/meus-cursos"
      },
      {
        id: 2,
        label: "Meus Certificados",
        icon: "mdi-school",
        link: "/aluno/certificados"
      },
      {
        id: 3,
        label: "Contribua",
        icon: "mdi-source-fork",
        link: "/contribua"
      },
      { id: 4, label: "Sobre", icon: "mdi-file-document-box", link: "/sobre" },
      { id: 5, label: "Ajuda", icon: "mdi-help-circle", link: "/ajuda" },
      { id: 6, label: "Contato", icon: "mdi-cellphone", link: "/contato" },
      { id: 7, label: "Imprensa", icon: "mdi-camcorder", link: "/imprensa" },
      { id: 8, label: "Investidores", icon: "mdi-coin", link: "/investidores" }
    ]
  }),
  methods: {
    /**
     * Método para fechar o side-menu
     */
    closeMenu() {
      document.getElementById("menu-btn").click();
    },
    /**
     * Método para recuperar as informações do usuário no local storage
     */
    getInforUser() {
      let userStorage = JSON.parse(localStorage.getItem("user"));
      if (userStorage != null) {
        this.user = userStorage;
      }
    }
  },
  mounted() {
    this.getInforUser();
  },
  components: {
    Avatar
  }
};
</script>

<style lang="scss">
.container-page {
  background-color: #fff;
  position: fixed;
  width: 100%;
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
  display: flex;
  width: 100%;
  padding: 15px;
  margin-left: -6px;
  border-bottom: solid 1px #d9d9d9;
  align-items: center;
  color: #6600cc !important;
  cursor: pointer;

  div {
    width: 70px;
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
</style>