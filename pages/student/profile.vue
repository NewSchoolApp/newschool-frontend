<template>
  <div id="page">
    <HeaderBar :title="'Meu Perfil'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex
        ref="flex"
        role="main"
        xs10
        sm8
        md4
        style="text-align: -webkit-center;"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <avatar :username="user.name | simplifyName" :size="150"></avatar>
            </v-col>
            <v-col cols="12">
              <h1>{{ user.name }}</h1>
              <p>Aluno</p>
            </v-col>
            <v-col cols="12">
              <v-btn
                large
                color="#6600cc"
                outlined
                block
                @click="goToChangePassword"
              >
                Alterar Senha<v-icon right>mdi-key</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn
                large
                color="#6600cc"
                outlined
                block
                @click="goToChangeData"
              >
                Alterar Dados<v-icon right>mdi-pencil</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn large color="red" outlined block @click="goToExit">
                Sair<v-icon right>mdi-exit-to-app</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    HeaderBar,
    Avatar,
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
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
  methods: {
    goToChangePassword() {
      $nuxt._router.push('/aluno/alterar-senha');
    },
    goToChangeData() {
      $nuxt._router.push('/aluno/alterar');
    },
    goToExit() {
      localStorage.clear();
      $nuxt._router.push('/login');
      this.clearInfoUser();
    },
  },
};
</script>

<style scoped>
#page h1,
#page p {
  color: #6600cc;
  text-transform: uppercase;
}
</style>
