<template>
  <v-layout justify-space-around flex column>
    <v-btn depressed large dark color="#6600cc" @click="change('success')"
      >TESTE</v-btn
    >
    <v-btn depressed large dark color="#6600cc" @click="change('error')"
      >TESTE</v-btn
    >
    <v-btn depressed large dark color="#6600cc" @click="change('warning')"
      >TESTE</v-btn
    >
    <v-btn depressed large dark color="#6600cc" @click="change('custom', 'oi')"
      >TESTE</v-btn
    >
    <alert :status="status" :info="info" :show="isActive" />
  </v-layout>
  <router>
    { path: '/snack' }
  </router>
</template>
<script>
import Alert from '../../components/Alert';
export default {
  components: {
    Alert,
  },
  data: () => ({
    status: '',
    info: '',
    isActive: false,
  }),
  methods: {
    change(status, info) {
      this.isActive = true;
      this.status = status;
      this.info = info;
      setTimeout(() => {
        this.isActive = false;
      }, 100);
    },
  },
};
</script>

<style></style>
