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
  <div v-else id="page">
    <v-col class="pa-0">
      <h2 id="title">{{ certificate.course.titulo }}</h2>
      <div id="teacher">{{ certificate.course.nomeDoAutor }}</div>
    </v-col>
    <v-img
      v-ripple
      class="thumb"
      :src="certificate.course.capa.url"
      @click="goToCertificate()"
    >
      <v-img class="thumb-background" />
      <v-img
        class="medal"
        contain
        :src="require(`@/assets/medalha-imagem.svg`)"
      />
    </v-img>
    <v-row justify="end" class="pr-3 pt-4">
      <v-icon v-ripple class="mr-4" @click="goToCertificate(1)">
        mdi-arrow-collapse-down
      </v-icon>
      <v-icon v-ripple @click="share($event, title, image)"
        >mdi-share-variant-outline</v-icon
      >
    </v-row>

    <navigation-bar />
  </div>
</template>

<router>
    path: "/aluno/certificado-info/:idUser/:idCourse"
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    loading: true,
    certificate: [],
  }),
  computed: {
    allCourses() {
      return this.$store.state.courses.all;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  async mounted() {
    this.certificate = (
      await http.getAll(
        `/api/v2/course-taken/certificate/user/${this.$route.params.idUser}/course/${this.$route.params.idCourse}`,
      )
    ).data;

    this.certificate.course = (
      await http.getAll(`/api/v2/course/${this.$route.params.idCourse}`)
    ).data;

    this.loading = false;
  },
  methods: {
    goToCertificate(print) {
      window.location = `http://newschool.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.idUser}/${this.certificate.courseId}/${print}`;
    },
    onSuccess(result) {
      http
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
        subject: 'Certificado NewSchool', // fi. for email
        // files: [
        //   'https://newschool-dev.s3.us-east-2.amazonaws.com/17954a42-8132-481e-bc38-508aefe7a996/profile.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201115%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201115T042331Z&X-Amz-Expires=900&X-Amz-Signature=b7e68e7db1194b74e266f211d56adab75d35f75dd3eceb4982b0c6aad8bb5c60&X-Amz-SignedHeaders=host',
        // ],
        url: `http://newschool.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.idUser}/${this.certificate.courseId}/0`,
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

<style scoped>
#page {
  padding: 32px 24px 0;
}
#title {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0em;
  padding-bottom: 4px;
}
#teacher {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  line-height: 14px;
  letter-spacing: 0em;
  padding-bottom: 32px;
}
.thumb {
  height: 189px;
  width: 100%;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
}

.thumb-background {
  background-color: var(--primary);

  top: 0;
  opacity: 0.4;

  height: 100%;
  width: 100%;
}
.medal {
  position: absolute;
  top: 0;
  width: 55px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.v-icon {
  font-size: 28px;
  outline: none;
}
</style>
