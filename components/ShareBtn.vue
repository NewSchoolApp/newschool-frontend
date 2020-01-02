<template>
  <v-layout>
    <div v-if="isOpen" class="share-container">
      <social-sharing
      @open="isOpen = !isOpen"
      :url="url"
      :title="title"
      :description="description"
      :hashtags="hashtags"
      :twitter-user="twitterUser"
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
    hashtags: {
      default: 'MissaoNewSchoolApp'
    },
    twitterUser: {
      default: 'NewSchoolApp'
    },
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
  padding: 5px 10px;
  background: #60C;
}
</style>
