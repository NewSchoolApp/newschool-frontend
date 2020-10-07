<template>
  <div>
    <div
      :style="{
        'background-image': `url(${backgroundUrl})`,
      }"
      class="content-image"
      @click="goToCertificate(certificate.course.id)"
    >
      <button>
        <img class="background-img" :src="certificate.course.thumbUrl" alt />
      </button>
      <img
        class="medal"
        src="~/assets/medalha-imagem.svg"
        alt="Imagem de uma medalha"
      />
    </div>
    <div class="footer">
      <div class="title-and-socialMedias">
        <button type="button" @click="goToCertificate(certificate.course.id)">
          <p class="certificate-title">{{ certificate.course.title }}</p>
          <p>{{ certificate.user.name }}</p>
        </button>
      </div>
      <div class="sharing-icons">
        <shareBtn
          :url="mountUrlCertificate(certificate.course.id)"
          :title="'Certificado de conclusão de curso New School'"
          :description="certificate.course.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import shareBtn from '~/components/ShareBtn';
export default {
  name: 'CertificateCard',
  components: {
    shareBtn,
  },
  props: ['certificate', 'background-url'],

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

<style lang="scss" scoped>
.content-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 11rem;
  overflow: hidden;
  background-size: cover;

  background-color: #6600cc;
  background-position: center;
}
button {
  text-align: left;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
.cards-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.background-image {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 115px;
  box-shadow: 0 2.5px 3px 0px rgba(0, 0, 0, 0.42);
}
.certificate-title {
  font-weight: 600;
  font-size: 12px;
}
p {
  display: flex;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  color: #1a1a1a;
  margin-top: -10px;
}

.sharing-icons {
  position: absolute;
  margin: 4px 0 0 265px;
}
::v-deep .share-container {
  position: absolute;
  right: -35px;
  top: -4px;
}
.footer {
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 80%;
}
</style>
