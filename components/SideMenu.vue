<template>
  <div class="container-page">
    <main v-if="flagdisplayInfoUser">
      <section id="info">
        <div id="avatar">
          <div class="flex-center border-profile-photo">
            <div class="flex-center profile-container">
              <avatar :username="this.user.name" :size="90"></avatar>
            </div>
          </div>
        </div>
        <div class="flex-center" id="flex-info-user">
          <h1>{{user.name}}</h1>
          <p>{{user.type}}</p>
        </div>
      </section>
      <div id="close">
        <v-icon id="close-btn" color="primary" @click="closeMenu()">mdi-close-circle</v-icon>
      </div>
    </main>
    <section class="menu-list">
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
    </section>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  data: () => ({
    flagdisplayInfoUser: false,

    user: {
      name: "",
      type: ""
    },
    menu: [
      {
        id: 1,
        label: "Meu Perfil",
        icon: "mdi-account",
        link: "/aluno/perfil"
      },
      {
        id: 2,
        label: "Meus Cursos",
        icon: "mdi-library",
        link: "/aluno/meus-cursos"
      },
      {
        id: 3,
        label: "Meus Certificados",
        icon: "mdi-school",
        link: "/aluno/certificados"
      },
      {
        id: 4,
        label: "Contribua",
        icon: "mdi-source-fork",
        link: "/contribua"
      },
      { id: 5, label: "Sobre", icon: "mdi-file-document-box", link: "/sobre" },
      { id: 6, label: "Ajuda", icon: "mdi-help-circle", link: "/ajuda" },
      { id: 7, label: "Contato", icon: "mdi-cellphone", link: "/contato" },
      { id: 8, label: "Imprensa", icon: "mdi-camcorder", link: "/imprensa" },
      { id: 9, label: "Investidores", icon: "mdi-coin", link: "/investidores" }
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
      if (userStorage) {
        this.user = userStorage;
        this.simplifyName();
        this.flagdisplayInfoUser = true;
      }
    },
    /*
     * Método responsável por simplificar o nome com: primeiro_nome segundo_nome
     */
    simplifyName() {
      let regex = /^(\S*\s+\S+).*/; // Regex para remover todos os caracteres após o segundo espaço em branco
      let numberOfNames = this.user.name.split(" ").length;
      if (numberOfNames > 2) this.user.name = regex.exec(this.user.name)[1];
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
</style>