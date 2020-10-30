<template>
  <div id="page">
    <HeaderBar :title="'Meu Perfil'" :backPage="true"></HeaderBar>
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
              <p>Administrador</p>
            </v-col>
            <v-col cols="12">
              <v-btn
              class="btn-block btn-white"
              @click="goToChangePassword"
              >
                Alterar Senha<v-icon right>mdi-key</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn
              class="btn-block btn-white"
              @click="goToChangeData"
              >
                Alterar Dados<v-icon right>mdi-pencil</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn 
              class="btn-block btn-white btn-alert"
              @click="goToExit">
                Sair<v-icon right>mdi-exit-to-app</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<router>
  {
    path: '/admin/perfil'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue";
import HeaderBar from '~/components/Header.vue';
import Avatar from 'vue-avatar';

export default {
  components: {
    HeaderBar,
    Avatar,
    NavigationBar,
  },
  methods: {
    goToChangePassword() {
      $nuxt._router.push('/admin/alterar-senha');
    },
    goToChangeData() {
      $nuxt._router.push('/admin/alterar');
    },
    goToExit() {
      localStorage.clear();
      $nuxt._router.push('/login');
      this.clearInfoUser();
    },
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
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
};
</script>

<style scoped>
#page h1,
#page p {
  color: var(--primary);
  text-transform: uppercase;
}
::v-deep .btn-alert{
  color: #f44336 !important;
  border-color: #f44336;
}
</style>
