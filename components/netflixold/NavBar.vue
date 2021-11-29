<template>
  <div>
    <v-app-bar color="#111" dark elevate-on-scroll fixed>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          min-width="100"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          transition="scale-transition"
          width="120"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/neymarjimoh/vueflix"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    showBlack: false,
  }),
};
</script>

<style scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
