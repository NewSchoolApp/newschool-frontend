<template>
  <v-layout>
    <div v-if="isOpen" class="share-container">
      <v-icon :color="iconColor">mdi-facebook</v-icon>
      <v-icon :color="iconColor">mdi-twitter</v-icon>
      <v-icon :color="iconColor">mdi-instagram</v-icon>
    </div>
     
    <v-btn
      v-if="!isOpen"
      class="ma-2"
      tile
      large
      icon
      :color="color"
      @click="isOpen = !isOpen"
    >
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import SocialSharing from 'vue-social-sharing';

export default {
  components: {
    SocialSharing
  },

  props: {
    color: String,
    iconColor: String
  },

  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style>
.share-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  background: #60C;
}
</style>