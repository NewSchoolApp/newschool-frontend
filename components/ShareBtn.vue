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
            <v-icon color="#fff" size="20">mdi-facebook</v-icon>
          </network>
          <network network="twitter">
            <v-icon color="#fff" size="20">
              mdi-linkedin
            </v-icon>
          </network>
          <network network="linkedin">
            <v-icon color="#fff" size="20">
              mdi-twitter
            </v-icon>
          </network>
        </div>
      </social-sharing>
    </div>
    <v-btn v-if="!isOpen" :color="color" class="btn-ma-2" tile large icon @click="isOpen = !isOpen">
      <v-icon size="28">mdi-share-variant</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import SocialSharing from "vue-social-sharing";

export default {
  components: {
    SocialSharing
  },

  props: {
    color: {
      default: "#CCC"
    },
    url: String,
    title: String,
    description: String,
    hashtags: {
      default: "MissaoNewSchoolApp"
    },
    twitterUser: {
      default: "NewSchoolApp"
    }
  },

  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style scoped>
.share-container {
  width: 90px;
  height: 35px;
  background: #60c;
  margin-top: -8px;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  box-shadow:2px 4px 4px rgba(0, 0, 0, 0.25);
}

.btn-ma-2 {
  padding-left: 55px;
  margin: 5px 0px !important;
}
</style>
