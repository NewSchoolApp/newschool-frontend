<template>
  <div>
    <div id="page">
      <!-- HTML aqui! -->
    </div>
      <navigation-bar />
  </div>
</template>

<router>
  {
    path: '/aluno/meus-cursos',
    name: 'aluno-meus-cursos'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  components: {
    NavigationBar,
  },
}
</script>

<style scoped></style>
