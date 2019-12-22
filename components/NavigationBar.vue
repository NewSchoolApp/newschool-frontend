<template>
  <div>
    <v-bottom-navigation
      scroll-target="#scroll-area-2"
      hide-on-scroll
      scroll-threshold="500"
      absolute
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

    <v-sheet id="scroll-area-2" class="overflow-y-auto" max-height="600">
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
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
</style>