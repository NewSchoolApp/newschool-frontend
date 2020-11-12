<template>
  <v-layout column>
    <HeaderBar class="mb-7" :title="'Perfil'" :back-page="true"></HeaderBar>

    <v-col align="center">
      <avatar-uploader v-model="avatar" />
    </v-col>

    <v-col>
      <v-divider />
      <div v-for="btn in menu" :key="btn.id">
        <v-row class="py-3" @click="goToTab(btn.link)">
          <v-icon class="px-6" color="primary">{{ btn.icon }}</v-icon>
          <div class="btn-name">{{ btn.name }}</div>
        </v-row>
        <v-divider />
      </div>
      <v-row class="py-3" @click="goToCourses">
        <v-icon class="px-6" color="primary">mdi-view-compact-outline</v-icon>
        <div class="btn-name">Meus Cursos</div>
      </v-row>
      <v-divider />
      <v-row class="py-3" @click="goToCertificates">
        <v-icon class="px-6" color="primary">mdi-school-outline</v-icon>
        <div class="btn-name">Meus Certificados</div>
      </v-row>
      <v-divider />
      <v-row class="py-3" @click="goToChangePassword">
        <v-icon class="px-6" color="primary">mdi-key-outline</v-icon>
        <div class="btn-name">Alterar Senha</div>
      </v-row>
      <v-divider />
      <v-row class="py-3" @click="goToShareUrl">
        <v-icon class="px-6" color="primary">mdi-share-outline</v-icon>
        <div class="btn-name">Indicar App</div>
      </v-row>
      <v-divider />
      <v-row class="py-3" @click="goToExit">
        <v-icon class="px-6" color="#C78282">mdi-location-exit</v-icon>
        <div class="btn-alert">Sair</div>
      </v-row>
      <v-divider />
    </v-col>

    <v-row cols="12">
      <v-icon></v-icon>
    </v-row>
  </v-layout>
</template>

<script>
import Avatar from 'vue-avatar';
import HeaderBar from '~/components/Header.vue';
import AvatarUploader from '~/components/AvatarUploader.vue';

export default {
  components: {
    HeaderBar,
    Avatar,
    AvatarUploader,
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
  data() {
    return {
      menu: [
        { name: 'Minhas Info', icon: 'mdi-information-outline', link: '0' },
        { name: 'Quem Sou', icon: 'mdi-account-outline', link: '1' },
        { name: 'Minha Quebrada', icon: 'mdi-domain', link: '2' },
        { name: 'Estudos e Trampo', icon: 'mdi-monitor', link: '3' },
        { name: 'Me Adiciona Aí', icon: 'mdi-account-plus-outline', link: '4' },
      ],
    };
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
    goToShareUrl() {
      $nuxt._router.push('/aluno/indicar-app');
    },
    goToExit() {
      localStorage.clear();
      $nuxt._router.push('/login');
      this.clearInfoUser();
    },
    goToShareUrl() {
      $nuxt._router.push('/aluno/indicar-app');
    },
    goToCertificates() {
      $nuxt._router.push('/aluno/certificados');
    },
    goToCourses() {
      $nuxt._router.push('/aluno/meus-cursos');
    },
    goToTab(tab) {
      $nuxt._router.push(`/aluno/cadastro-completo/${tab}`);
    },
  },
};
</script>

<style scoped>
* {
  letter-spacing: 0em;
}
.layout {
  padding-bottom: 100px;
}
.col {
  padding: 0;
  height: 100%;
  width: 100%;
}
.row {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.btn-name {
  font-family: Roboto;
  text-transform: uppercase;
  font-size: 16px;
  color: #737373;
}
.btn-alert {
  color: #c78282;
}
.sub-purple {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  color: var(--primary);
}
.padding__card {
  padding-top: 0;
}
</style>
