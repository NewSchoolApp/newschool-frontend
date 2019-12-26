<template>
  <div class="flex-container">
    <main id="page">
      <h3>New School</h3>
      <p>Front-end</p>
      <v-btn class="ma-2" tile outlined color="primary" to="/contribua">Contribua</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/login">Login</v-btn>
      <v-btn class="ma-2" tile outlined color="primary" to="/dashboard">Dashboard</v-btn>
            <v-btn class="ma-2" tile outlined color="primary" to="/quem_somos">Quem Somos</v-btn>

    </main>
    <navigation-bar />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
