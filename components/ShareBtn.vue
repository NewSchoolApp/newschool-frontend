<template>
  <v-layout>
    <div v-if="isOpen" class="share-container">
      <social-sharing
        :url="url"
        :title="title"
        :description="description"
        :hashtags="hashtags"
        :twitter-user="twitterUser"
        inline-template
        @open="isOpen = !isOpen"
      >
        <div class="icons">
          <network network="facebook">
            <img src="~/assets/facebook.png" alt="">
          </network>
          <network network="twitter">
            <img src="~/assets/twitter.png" alt="">
          </network>
          <network network="linkedin">
            <img src="~/assets/linkedin.png" alt="">
          </network>
        </div>
      </social-sharing>
    </div>
    <v-btn
      v-if="!isOpen"
      :color="color"
      class="btn-ma-2"
      tile
      large
      icon
      @click="isOpen = !isOpen"
    >
      <v-icon size="28">mdi-share-variant</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import SocialSharing from 'vue-social-sharing';

export default {
  components: {
    SocialSharing,
  },

  props: {
    color: {
      default: '#CCC',
    },
    url: String,
    title: String,
    description: String,
    hashtags: {
      default: 'MissaoNewSchoolApp',
    },
    twitterUser: {
      default: 'NewSchoolApp',
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.share-container {
  width: 90px;
  height: 35px;
  background: #60c;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 7px 2px 0 0;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
