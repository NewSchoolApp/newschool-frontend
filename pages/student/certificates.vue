<template>
  <div>
    <HeaderBar :title="'Certificados'" :back-page="true"></HeaderBar>
    <v-container v-if="certificates.length" class="main">
      <div v-for="certificate in certificates" :key="certificate.id" class="cards-box">
        <div class="content-image" @click="goToCertificate(certificate.course.id)">
          <button>
            <img class="background-img" :src="certificate.course.thumbUrl" alt />
          </button>
          <img class="medal" src="~/assets/medalha-imagem.svg" alt="Imagem de uma medalha" />
        </div>
        <div class="footer">
          <div class="title-and-socialMedias">
            <button type="button" @click="goToCertificate">
              <strong class="certificate-title">{{ certificate.course.title }}</strong>
              <p>{{ certificate.user.name }}</p>
            </button>
          </div>
          <div class="sharing-icons">
            <shareBtn :url="mountUrlCertificate(certificate.course.id)" :title="'Certificado de conclusão de curso New School'" :description="certificate.course.title"/>
          </div>
        </div>
      </div>
    </v-container>
    <NothingToShow v-else title="Vixe :/" message="Você ainda não tem nenhum certificado. :(" />
  </div>
</template>

<script>
import shareBtn from '~/components/ShareBtn.vue';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';
import NothingToShow from '~/components/NothingToShow';

export default {
  components: {
    shareBtn,
    HeaderBar,
    NothingToShow,
  },
  data: () => ({
    certificates: [],
  }),
  mounted() {
    http
      .getAll(
        `${process.env.endpoints.CERTIFICATES_ME}${this.$store.state.user.data.id}`,
      )
      .then(certificates => {
        this.certificates = certificates.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    goToCertificate(id) {
      // eslint-disable-next-line no-undef
      $nuxt._router.push(
        `/pagina-certificado/${this.$store.state.user.data.id}/${id}`,
      );
    },
    backgroundClass(certificateBackgroundName) {
      return `background-image: url(${certificateBackgroundName})`;
    },
    mountUrlCertificate(id) {
      return `/pagina-certificado/${this.$store.state.user.data.id}/${id}`;
    },
  },
};
</script>

<router>
  path: "/certificados"
</router>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;

  button {
    cursor: pointer !important;
  }
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;

  .content-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 14rem;
    overflow: hidden;
    background: #6600cc;
  }

  .background-img {
    max-width: 100%;
    opacity: 0.1;
  }

  .medal {
    position: absolute;
  }

  .cards-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin-bottom: 25px;

    .background-image {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 200px;
      height: 115px;
      box-shadow: 0 2.5px 3px 0px rgba(0, 0, 0, 0.42);
    }

    .footer {
      display: flex;
      text-align: center;
      justify-content: space-between;
      width: 80%;

      .title-and-socialMedias {
        .certificate-title {
          display: flex;
          align-items: center;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 15px;
          color: #1a1a1a;
          padding-left: 5px;
          text-align: center;
        }

        .sharing-icons {
          position: absolute;
          margin: 4px 0 0 226px;
        }
      }

      p {
        display: flex;
        align-items: center;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 10px;
        line-height: 12px;
        padding-left: 5px;
        color: #1a1a1a;
        margin-top: 7px;
      }
    }
  }
}
</style>
