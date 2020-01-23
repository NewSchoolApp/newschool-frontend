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
            <v-icon color="#6600CC" size="20">
              mdi-facebook
            </v-icon>
          </network>
        </button>
        <button type="button">
          <network network="twitter">
            <v-icon color="#6600CC" size="20">
              mdi-twitter
            </v-icon>
          </network>
        </button>
        <button type="button">
          <network network="linkedin">
            <v-icon color="#6600CC" size="20">
              mdi-linkedin
            </v-icon>
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
    return {};
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

  :hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: #d6d6d6;
    border-radius: 5px;
  }
}

.ma-2 {
  padding-left: 55px;
}

button {
  cursor: pointer !important;
}
</style>
