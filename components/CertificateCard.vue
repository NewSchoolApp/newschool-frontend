<template>
  <v-col class="main-col" align="center">
    <v-card class="v-card-body" elevation="0" color="transparent">
      <template>
        <v-img :src="certificate.course.capa.url" />
        <v-img class="thumb-background" @click="openCertificate" />
        <v-img
          class="medal"
          contain
          :src="require(`@/assets/medalha-imagem.svg`)"
          @click="openCertificate"
        />
      </template>

      <div class="footer-card">
        <v-row>
          <v-col align="left" class="pt-0">
            <v-card-title>{{ certificate.course.titulo }}</v-card-title>
            <v-card-subtitle class="mt-0">{{
              certificate.course.nomeDoAutor
            }}</v-card-subtitle>
          </v-col>

          <v-card-actions class="pt-0">
            <v-icon class="pr-2" color="grey" @click="goToCertificate(1)"
              >mdi-download</v-icon
            >

            <v-icon color="grey" @click="share($event, title, image)"
              >mdi-share-variant</v-icon
            >
          </v-card-actions>
        </v-row>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import httpHelper from '~/services/http/generic';

export default {
  name: 'CertificateCard',
  props: ['certificate'],
  data: () => ({
    showThumb: true,
  }),
  computed: {
    params() {
      return this.$route.params;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    allCourses() {
      return this.$store.state.courses.all;
    },
  },
  methods: {
    goToCertificate(print) {
      window.location = `https://newschoolapp.com.br/#/pagina-certificado/${this.idUser}/${this.certificate.courseId}/${print}`;
    },
    imageLoadError() {
      this.showThumb = false;
    },
    onSuccess(result) {
      httpHelper
        .post(process.env.endpoints.EVENT, {
          event: 'SHARE_COURSE',
          rule: {
            courseId: this.params.idCourse,
            userId: this.idUser,
            platform: result.app,
          },
        })
        .then(res => {
          this.$notifier.showMessage({
            type: 'success',
          });
          $nuxt._router.push('/aluno/home');
        })
        .catch(() =>
          this.$notifier.showMessage({
            type: 'error',
          }),
        );
    },
    onError(msg) {
      alert('Sharing failed with message: ' + msg);
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
        url: `https://newschoolapp.com.br/#/pagina-certificado/${this.idUser}/${this.certificate.courseId}/0`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
    openCertificate() {
      this.$router.push(
        `/pagina-certificado/${this.idUser}/${this.certificate.courseId}/2`,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
.thumb-background {
  background-color: var(--primary);
  position: absolute;
  top: 0;
  opacity: 0.4;
}

.footer-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.v-responsive.v-image {
  padding-top: 45%;
  height: 150px;
  width: 100%;
  border-radius: 5px;
}
.v-card-body {
  margin-bottom: 20px;
}
.v-card__title {
  font-weight: 700;
  font-size: 0.75rem;
  padding: 8px 0 0;
  line-height: 16px;
  color: #1a1a1a;
}
.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-size: 10px;
  line-height: 11.72px;
}
.medal {
  //max-width: 10%;
  //max-height: auto;
  position: absolute;
  top: 0;
  max-width: 4rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
}
</style>
