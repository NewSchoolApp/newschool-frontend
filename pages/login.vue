<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm8
      md4
    >
      <v-card flat class="logo-container">
        <img src="~/assets/logo.jpg"/>
      </v-card>
      <v-card class="login-container">
        <v-toolbar
          color="secondary"
          dark
          flat
        >
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="handleSubmit()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'empty',
  methods: {
    handleSubmit (event) {
      console.log('submit')
    }
  }
}
</script>

<style scoped>
  .logo-container
  {
    text-align: center;
    background-color: transparent;
    margin-bottom: 30px;
  }
  .logo-container img
  {
    width: 150px;
    height: auto;
  }
  .login-container .secondary
  {
    background-color: #992588 !important;
  }
</style>
