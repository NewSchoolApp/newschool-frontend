<template>
  <v-layout>
    <div v-if="isOpen" class="share-container">
      <social-sharing
      :url="url"
      :title="title"
      :description="description"
      :quote="quote"
      :hashtags="hashtags"
      :twitter-user="twitterUser"
      :media="media"
      inline-template
    >
      <div>
          <network network="facebook">
            <v-icon color="#fff" size="30">mdi-facebook</v-icon>
          </network>
           <network network="twitter">
            <v-icon color="#fff" size="30">mdi-twitter</v-icon>
          </network>
          <network network="linkedin">
            <v-icon color="#fff" size="30">mdi-linkedin</v-icon>
          </network>
      </div>
    </social-sharing>
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
    color: {
      default: '#CCC'
    },
    url: String,
    title: String,
    description: String,
    quote: String,
    hashtags: String,
    twitterUser: String,
    media: String

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
