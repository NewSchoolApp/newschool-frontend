<template>
  <div v-if="loading">
    <div class="container-spinner">
      <v-progress-circular
        :size="70"
        :width="5"
        indeterminate
        color="#6600cc"
      />
    </div>
  </div>
  <v-container v-else>
    <p class="certificate-title">{{ certificate.course.title }}</p>
    <p>{{ certificate.course.authorName }}</p>

    <div class="thumb">
      <div class="content-image" @click="gotoCertificate()">
        <button>
          <img
            v-if="showThumb"
            class="background-img"
            :src="certificate.course.thumbUrl"
            alt="Imagem do curso"
            @error="imageLoadError"
          />
        </button>
        <img
          class="medal"
          src="~/assets/medalha-imagem.svg"
          alt="Imagem de uma medalha"
        />
      </div>
    </div>

    <div class="info-box">
      <button
        @click="share($event, title, image)"
        class="btn-block btn-white box-container"
      >
        Compartilhar
      </button>
      <span></span>
      <button
        @click="goToCertificate(1)"
        class="btn-block btn-white box-container"
      >
        Exportar
      </button>
    </div>
    <navigation-bar />
  </v-container>
</template>

<script>
import SocialSharing from 'vue-social-sharing';
import http from '../../services/http/public';
import CertificateCard from '~/components/CertificateCard';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  components: {
    CertificateCard,
    SocialSharing,
    NavigationBar,
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

  data: () => ({
    certificate: {},
    loading: true,
    showThumb: true,
  }),

  computed: {
    urlCertificate() {
      return `${process.env.domain}/pagina-certificado/${this.params.idUser}/${this.params.idCourse}`;
    },
    params() {
      return this.$route.params;
    },
  },
  mounted() {
    console.log(window);
    http.pageCertificate(this.params.idUser, this.params.idCourse).then(res => {
      this.certificate = res.data;
      this.loading = false;
    });
  },

  methods: {
    goToCertificate(print) {
      window.location = `http://newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.params.idUser}/${this.params.idCourse}/${print}`;
      //   encodeURI(
      //     // `http://newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.params.idUser}/${this.params.idCourse}/${print}/undefined`,
    },
    imageLoadError() {
      this.showThumb = false;
    },
    onSuccess(result) {
      console.log('Share completed? ' + result.completed);
      console.log(result); // On Android apps mostly return false even while it's true
      console.log('Shared to app: ' + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      console.log(result); // On Android apps mostly return false even while it's true
    },
    onError(msg) {
      console.log('Sharing failed with message: ' + msg);
    },
    share(event, title, image) {
      event.stopPropagation();
      event.preventDefault();
      const options = {
        message: 'Se liga no certificado que eu ganhei, SELOKO!', // not supported on some apps (Facebook, Instagram)
        subject: this.tryMessage, // fi. for email
        // files: [
        //   'https://newschool-dev.s3.us-east-2.amazonaws.com/17954a42-8132-481e-bc38-508aefe7a996/profile.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201115%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201115T042331Z&X-Amz-Expires=900&X-Amz-Signature=b7e68e7db1194b74e266f211d56adab75d35f75dd3eceb4982b0c6aad8bb5c60&X-Amz-SignedHeaders=host',
        // ],
        url: `http://newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.params.idUser}/${this.params.idCourse}/0`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
  },
};
</script>

<router>
    path: "/certificado-info/:idUser/:idCourse"
</router>

<style scoped>
p {
  margin-bottom: 5px !important;
}

.container {
  padding: 0 34px;
  width: 100%;
  height: 100%;
}

.certificate-title {
  font-weight: 900;
  font-size: 16px;
  margin-top: 10px;
  text-transform: uppercase;
  color: var(--primary);
}

.thumb {
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}

.content-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 11rem;
  overflow: hidden;
  background-color: var(--primary);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
}
span {
  width: 10px;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0.4;
}

.medal {
  position: absolute;
  width: 18%;
  height: auto;
}

.info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87%;
}
.box-container {
  width: 180px;
}

.box-title {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 15px;
  color: rgba(102, 0, 204, 0.5);
}

.box-icons {
  display: flex;
  padding-bottom: 30px;
}

::v-deep .icon {
  height: 35px;
  width: 35px;
  margin-right: 25px;
  background-color: rgba(112, 16, 207, 0.1);
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 8px;
  color: var(--primary);
  line-height: 10px;
  align-items: center;
  justify-content: center;
}
</style>
