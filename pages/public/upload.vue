<template>
  <div>
    <HeaderBar :title="'Fale com a gente'" :back-page="true"></HeaderBar>
    <div class="align-global">
      <div v-if="loading">
        <div class="container-spinner" style="z-index: 9999999;">
          <v-progress-circular
            :size="70"
            :width="5"
            indeterminate
            color="#000"
          />
        </div>
      </div>
      <v-layout mt-1 flat class="container">
        <v-flex ref="flex">
          <v-container flat>
            <v-row>
              <v-file-input show-size @change="selectFile"></v-file-input>
              <p style="word-wrap: break-word;">{{ base }}</p>
              <navigation-bar />
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<router>
  {
    path: '/upload'
  }
</router>

<script scoped>
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  transition: 'bounce',
  components: {
    HeaderBar,
    NavigationBar,
  },
  data() {
    return {
      base: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
  mounted() {},
  methods: {
    upload(file, onUploadProgress) {
      const formData = new FormData();

      formData.append('file', file);
      console.log(formData);

      // return http.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress,
      // });
    },
    async selectFile(file) {
      const base64image = await this.getBase64(file);
      this.base = base64image;
      // http.post(
      //   `${process.env.endpoints.TOTAL_USERS}/${this.user.id}/photo`,
      //   {},
      // );
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
  },
};
</script>

<style scoped>
.align-global {
  width: 100%;
  max-width: 400px;
  justify-content: center;
  background: #ffffff;
  padding-bottom: 50px;
}
@media (min-width: 400px) {
  .align-global {
    margin: 0 auto;
  }
}
@media (max-width: 320px) {
  .container {
    padding: 0px 12px 0 12px !important;
  }
  ::v-deep .h1__theme {
    font-size: 20px;
  }
}
.container-spinner,
.flex {
  z-index: 1;
  text-align: center;
  margin-top: -55px;
}
.container {
  z-index: -1;
  padding: 20px 12px 0 12px;
}
.banner {
  width: 90%;
  margin: 5% 5% -5% 5%;
}
::v-deep .v-form {
  width: 100%;
  margin: 0 4%;
}
</style>
