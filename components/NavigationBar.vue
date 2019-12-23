<template>
  <div>
    <v-bottom-navigation
      scroll-target="#page"
      fixed
      scroll-threshold="500"
      color="write"
      horizontal
    >
      <v-btn>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn>
        <span>Perfil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn>
        <span>Meus Cursos</span>
        <v-icon>mdi-library</v-icon>
      </v-btn>
      <v-btn>
        <span>Certificados</span>
        <v-icon>mdi-school</v-icon>
      </v-btn>
      <v-btn>
        <span>Outros</span>
        <v-icon>mdi-drag</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
  
<script>
export default {};
</script>

<style>
.v-btn__content {
  flex-direction: column-reverse !important;
}
.v-icon {
  margin-right: 0 !important;
}
.v-application .overflow-y-auto {
  margin-bottom: 3rem;
}
</style>