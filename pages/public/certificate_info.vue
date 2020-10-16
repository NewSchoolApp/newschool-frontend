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
    <p>{{ certificate.user.name }}</p>

    <div class="thumb">
      <div class="content-image" @click="gotoCertificate()">
        <button>
          <img
            class="background-img"
            :src="certificate.course.thumbUrl"
            alt="Imagem do curso"
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
      <div class="box-title">Compartilhar</div>
      <social-sharing
        :url="urlCertificate"
        :title="'Certificado de conclusão de curso New School'"
        :description="certificate.course.title"
        :hashtags="'MissaoNewSchoolApp'"
        :twitter-user="'NewSchoolApp'"
        inline-template
      >
        <div class="box-icons">
          <network class="icon" network="facebook">
            <v-icon color="purple darken-2"> mdi-facebook </v-icon>
          </network>
          <network class="icon" network="twitter">
            <v-icon color="purple darken-2"> mdi-twitter </v-icon>
          </network>
          <network class="icon" network="linkedin">
            <v-icon color="purple darken-2"> mdi-linkedin </v-icon>
          </network>
        </div>
      </social-sharing>
    </div>

    <div class="info-box">
      <div class="box-title">Exportar</div>
      <div class="box-icons">
        <div class="icon" style="background-color: transparent">
          <v-icon color="purple darken-2" @click="gotoCertificate(1)">
            mdi-download
          </v-icon>
          Baixar
        </div>
      </div>
    </div>
    <navigation-bar />
  </v-container>
</template>

<script>
import http from '../../services/http/public';
import CertificateCard from '~/components/CertificateCard';
import SocialSharing from 'vue-social-sharing';
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
  }),

  computed: {
    urlCertificate() {
      return `${process.env.domain}/pagina-certificado/${this.params.idUser}/${this.params.idCourse}`;
    },
    params() {
      return this.$route.params;
    },
  },

  methods: {
    gotoCertificate(forcePrint) {
      $nuxt._router.push(
        `/pagina-certificado/${this.params.idUser}/${this.params.idCourse}/${forcePrint}`,
      );
    },
  },
  mounted() {
    http.pageCertificate(this.params.idUser, this.params.idCourse).then(res => {
      this.certificate = res.data;
      this.loading = false;
    });
  },
};
</script>

<router>
    path: "/certificado-info/:idUser/:idCourse"
</router>

<style>
* {
  font-family: Montserrat;
  color: #1a1a1a;
  font-size: 10px;
}

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
  color: #6600cc;
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
  background-color: #6600cc;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
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

.icon {
  height: 35px;
  width: 35px;
  margin-right: 25px;
  background-color: rgba(112, 16, 207, 0.1);
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 8px;
  color: #6600cc;
  line-height: 10px;
  align-items: center;
  justify-content: center;
}
</style>
