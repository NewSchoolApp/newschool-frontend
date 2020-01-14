<template>
  <div>
    <v-card>
      <v-img :src="require('~/assets/new_school.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/missao.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/aplicativo.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/projeto.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/projeto-1.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/projeto-2.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <v-card>
      <v-img :src="require('~/assets/equipe.jpg')" height="100%" class="grey darken-4" />
    </v-card>
    <navigation-bar />
  </div>
</template>
<router>
  {
    path: '/sobre'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  }
}
</script>
<style scoped>
  .div{
  overflow-y: auto!important;
  overflow-x: hidden!important;
}
</style>
