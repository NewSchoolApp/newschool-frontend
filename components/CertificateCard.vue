<template>
  <v-col class="main-col" align="center">
    <v-card class="v-card-body" elevation="0" color="transparent">
      <template>
        <v-img :src="certificate.course.capa.url" />
        <v-img class="thumb-background" @click="gotoCertificateInfo" />

        <v-img
          class="medal"
          contain
          :src="require(`@/assets/medalha-imagem.svg`)"
          @click="gotoCertificateInfo"
        />
      </template>

      <div>
        <v-col class="card-footer">
          <v-row justify="space-between">
            <div class="card-title">
              {{ certificate.course.titulo }}
            </div>
            <v-icon v-ripple color="grey" @click="share($event, title, image)"
              >mdi-share-variant-outline</v-icon
            >
          </v-row>
          <v-row class="card-teacher">
            {{ certificate.course.nomeDoAutor }}
          </v-row>
        </v-col>
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
        url: `https://http://newschool-api-dev2.eba-gxtzwa9m.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.idUser}/${this.certificate.courseId}/0`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
    gotoCertificateInfo() {
      this.$router.push(
        `/aluno/certificado-info/${this.idUser}/${this.certificate.courseId}`,
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
.main-col {
  padding: 0 58px 0;
}
.thumb-background {
  background-color: var(--primary);
  position: absolute;
  top: 0;
  opacity: 0.4;
}

.v-responsive.v-image {
  padding-top: 45%;
  height: 115px;
  width: 100%;
  border-radius: 3px;
}
.v-card-body {
  margin-bottom: 30px;
}
.card-title {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
}
.card-teacher {
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: 0px;
  letter-spacing: 0em;
  text-align: left;
  color: #1a1a1a;
}
.medal {
  position: absolute;
  top: 0;
  max-width: 36px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
}
.card-footer {
  padding-top: 8px;
}
.v-icon {
  font-size: 20px;
  outline: none;
}
</style>
