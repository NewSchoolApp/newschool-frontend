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
        <network network="facebook">
          <v-icon color="#6600CC" size="20">
            mdi-facebook
          </v-icon>
        </network>
        <network network="twitter">
          <v-icon color="#6600CC" size="20">
            mdi-twitter
          </v-icon>
        </network>
        <network network="linkedin">
          <v-icon color="#6600CC" size="20">
            mdi-linkedin
          </v-icon>
        </network>
      </div>
    </social-sharing>
  </v-layout>
</template>

<script>
import SocialSharing from 'vue-social-sharing'

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
    return {}
  },
}
</script>

<style scoped>
.share-container {
  /* width: 90px;
  height: 35px; */
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 100%;
}

.icons span {
  width: 100px;
  height: 35px;
}

.ma-2 {
  padding-left: 55px;
}
</style>
