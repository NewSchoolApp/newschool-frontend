<template>
  <div id="app" class="full__height">
    <router-view></router-view>
    <modal />
  </div>
</template>

<script>
import Modal from '~/components/Modal.vue';
export default {
  components: {
    Modal,
  },
};
</script>

<style scoped>
.full__height {
  height: 100%;
}
</style>
