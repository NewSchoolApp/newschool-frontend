<template>
  <div>
    <div id="page">
      <!-- HTML aqui! -->
      <p>course page</p>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  }
}
</script>

<style>

</style>