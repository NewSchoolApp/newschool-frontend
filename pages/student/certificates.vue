<template>
  <div>
    <HeaderBar :title="'Certificados'" :back-page="true"></HeaderBar>
    <v-container class="main">
      <div
        v-for="certificate in certificates"
        :key="certificate.id"
        class="cards-box"
      >
        <button type="button" @click="goToCertificate">
          <div
            :style="backgroundClass(certificate.certificateBackgroundName)"
            class="background-image"
          >
            <img
              src="~/assets/medalha-imagem.svg"
              alt="Imagem de uma medalha"
            />
          </div>
        </button>
        <div class="footer">
          <div class="title-and-socialMedias">
            <button type="button" @click="goToCertificate">
              <strong class="certificate-title">{{ certificate.title }}</strong>
            </button>
            <div class="sharing-icons">
              <shareBtn />
            </div>
          </div>
          <p>{{ certificate.userName }}</p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import shareBtn from '~/components/ShareBtn.vue';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    shareBtn,
    HeaderBar,
  },
  data: () => ({
    certificates: [],
  }),
  mounted() {
    http
      .getAll(process.env.endpoints.CERTIFICATES_ME)
      .then(certificates => {
        this.certificates = certificates.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    goToCertificate() {
      this.$nuxt._router.push('/aluno/pagina-certificado');
    },
    backgroundClass(certificateBackgroundName) {
      return `background-image: url(/_nuxt/assets/${certificateBackgroundName})`;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;

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
      background: #6600cc url('../../assets/matematica.svg');
      background: #6600cc url('../../assets/fotografia.svg');
      background: #6600cc url('../../assets/cenografia.svg');
    }

    .footer {
      width: 200px;
      padding-top: 10px;
      line-height: 15px;
      text-align: center;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;

      .title-and-socialMedias {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: Montserrat;

        .certificate-title {
          display: flex;
          align-items: center;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 15px;
          color: #1a1a1a;
          padding-left: 2px;
          text-align: center;
        }

        .sharing-icons {
          position: absolute;
          margin: 0 0 0 110px;
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
        padding-left: 2px;
        color: #1a1a1a;
        margin-top: 7px;
      }
    }
  }
}

button {
  cursor: pointer !important;
}
</style>
