<template>
  <v-layout>
    <social-sharing
      :url="url"
      :title="title"
      :description="description"
      :hashtags="hashtags"
      :twitter-user="twitterUser"
      inline-template
    >
      <div class="icons">
        <button type="button">
          <network network="facebook">
            <img src="~/assets/facebook-purple.png" alt="">
          </network>
        </button>
        <button type="button">
          <network network="twitter">
            <img src="~/assets/twitter-purple.png" alt="">
          </network>
        </button>
        <button type="button">
          <network network="linkedin">
            <img src="~/assets/linkedin-purple.png" alt="">
          </network>
        </button>
      </div>
    </social-sharing>
  </v-layout>
</template>

<script>
import SocialSharing from 'vue-social-sharing';
import '@mdi/font/css/materialdesignicons.css';

export default {
  components: {
    SocialSharing,
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
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
    let baseUrl = process.env.domain;
    return {
      isOpen: false,
      shareUrl: `${baseUrl}${this.url}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: 110px;
  height: 20px;
}

.ma-2 {
  padding-left: 55px;
}

button {
  cursor: pointer !important;
}
</style>
