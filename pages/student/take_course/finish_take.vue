<template>
  <div id="page">
    <v-col id="main-col">
      <v-row align="start" justify="end">
        <v-icon
          style="justify-content: flex-end; padding-bottom: 10px"
          color="white"
          dark
          @click="gotoCourse()"
        >
          mdi-close-circle
        </v-icon>
      </v-row>
      <v-col align="center">
        <v-col>
          <img src="~/assets/congrats.svg" alt="vencedor" />
          <div class="score"><strong>+ 30 NC</strong></div>
        </v-col>
        <v-col class="pad0">
          <h1 class="white-info">Parabéns {{ nameUser }}!!</h1>
          <p class="white-info low-wheight">
            O seu curso foi concluído com sucesso!
          </p>
        </v-col>
      </v-col>
    </v-col>

    <v-col align="center" align-self="baseline">
      <p class="share-info">
        Compartilhe seu certificado, para cada rede social compartilhada. (+ 1
        NC)
      </p>
      <!-- Share -->
      <div class="btn__container">
        <button
          class="btn-block btn-primary"
          @click="share($event, title, image)"
        >
          COMPARTILHAR
        </button>
      </div>
      <small class="view-certificate" @click="gotoCertificate()"
        >Visualizar o certificado</small
      >
    </v-col>

    <!-- dialog start -->
    <v-col v-if="activeDialog == 'start'" class="dialogCol">
      <!-- dialog header -->
      <v-icon
        style="justify-content: flex-end; padding-bottom: 10px"
        color="#6600cc"
        dark
        @click="activeDialog = 'none'"
      >
        mdi-close-circle
      </v-icon>

      <p align="end">
        1 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Ganhe</p>
        <p class="giant">+ 5 NC</p>
      </v-col>
      <v-col align="center">
        <strong>Diz aí!</strong>
        <p>De 0 a 10, quanto você indicaria este curso para um amigo?</p>
      </v-col>
      <v-radio-group :class="bindedClass" row>
        <v-radio
          v-for="n in 11"
          :key="n.id"
          :label="(n - 1).toString()"
          :value="n - 1"
          @mousedown="postBody.rating = n - 1"
        />
      </v-radio-group>
      <v-spacer />

      <!-- dialog footer -->
      <v-row align="end" style="padding-bottom: 0">
        <v-btn class="btn-block btn-primary" @click="submitRating">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog good -->
    <v-col v-if="activeDialog == 'good'" class="dialogCol">
      <!-- dialog header -->
      <v-icon
        style="justify-content: flex-end; padding-bottom: 10px"
        color="#6600cc"
        dark
        @click="activeDialog = 'none'"
      >
        mdi-close-circle
      </v-icon>

      <p align="end">
        2 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Oba!!</p>
      </v-col>
      <v-col align="center">
        <p>Caso queira, fale um pouco mais sobre sua nota!</p>
      </v-col>
      <v-textarea
        v-model="postBody.feedback"
        outlined
        placeholder="Seu comentário"
      />
      <v-spacer />

      <!-- dialog footer -->
      <v-row align="end" style="padding-bottom: 0">
        <v-btn class="btn-block btn-primary" @click="postFeedback()">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog bad -->
    <v-col v-if="activeDialog == 'bad'" class="dialogCol">
      <!-- dialog header -->
      <v-icon
        style="justify-content: flex-end; padding-bottom: 10px"
        color="#6600cc"
        dark
        @click="activeDialog = 'none'"
      >
        mdi-close-circle
      </v-icon>

      <p align="end">
        2 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Hum...</p>
      </v-col>
      <v-col align="center">
        <p>O que faria você aumentar a nota escolhida?</p>
      </v-col>
      <v-textarea
        v-model="postBody.feedback"
        :class="bindedClass"
        outlined
        placeholder="Seu comentário"
      />
      <v-spacer />

      <!-- dialog footer -->
      <v-row align="end" style="padding-bottom: 0">
        <v-btn class="btn-block btn-primary" @click="postFeedback()">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog end -->
    <v-col v-if="activeDialog == 'end'" class="dialogCol">
      <!-- dialog header -->
      <v-img :src="require(`~/assets/tyThumb.png`)" />

      <!-- dialog body -->
      <v-col align="center">
        <strong style="font-size: 24px;"> Obrigado!!!</strong>
        <p>Sua avaliação é muito importante!</p>
      </v-col>
      <v-spacer />

      <!-- dialog footer -->
      <v-row align="end" style="padding-bottom: 0">
        <v-btn class="btn-block btn-primary" @click="activeDialog = 'none'">
          Finalizar
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>
<router>
  {
    path : '/aluno/curso/:courseSlug/fim/:lateFeedback?'
  }
</router>
<script>
import SocialSharing from 'vue-social-sharing';
import http from '~/services/http/generic';

export default {
  components: {
    SocialSharing,
  },
  data() {
    return {
      dialog: 'start',
      bindedClass: 'none',
      postBody: {
        rating: null,
        feedback: '',
      },
    };
  },
  computed: {
    activeDialog: {
      get() {
        return this.dialog;
      },
      set(newValue) {
        if (this.$route.params.lateFeedback == 1 && newValue === 'none') {
          $nuxt._router.replace('/aluno/meus-cursos');
        } else {
          this.dialog = newValue;
        }
      },
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    nameUser() {
      return this.$store.state.user.data.name.split(' ')[0];
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
    courseTitle() {
      return this.$store.state.courses.current.titulo;
    },
    courseSlug() {
      return this.$route.params.courseSlug;
    },
  },
  mounted() {
    if (this.$route.params.lateFeedback == 1) {
      this.activeDialog = 'start';
    }
  },
  methods: {
    gotoCertificate() {
      $nuxt._router.replace(
        `/aluno/certificado-info/${this.idUser}/${this.courseId}`,
      );
    },
    async gotoCourse() {
      await this.$store.dispatch('courses/refreshMyCourses');

      $nuxt._router.replace(`/aluno/curso/${this.courseSlug}`);
    },
    onSuccess(result) {
      http
        .post(process.env.endpoints.EVENT, {
          event: 'SHARE_COURSE',
          rule: {
            courseId: this.courseId,
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
        url: `http://newschool.us-east-2.elasticbeanstalk.com/#/pagina-certificado/${this.idUser}/${this.courseId}/0`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
    submitRating() {
      if (this.postBody.rating === null) {
        this.bindedClass = 'error-form';
        setTimeout(() => {
          this.bindedClass = '';
        }, 500);
      } else if (this.postBody.rating > 7) {
        this.activeDialog = 'good';
      } else {
        this.activeDialog = 'bad';
      }
    },
    postFeedback() {
      http.post(
        `${process.env.endpoints.NPS}${this.idUser}/course/${this.courseId}`,
        this.postBody,
      );
      this.activeDialog = 'end';
    },
    convertToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
      const to = 'aaaaaeeeeeiiiiooooouuuunc------';

      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
      return str;
    },
    goToMyCertificates() {
      this.$router.replace('/aluno/certificados');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
p {
  font-weight: 500;
}
h1 {
  color: var(--primary);
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  padding: 0.7rem;
}
strong {
  font-size: 20px;
  font-weight: 900;
}
#page {
  position: relative;
  padding-bottom: 0px !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-self: center;
}
#main-col {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--primary);
}
.dialogCol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  padding: 20px 16px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.giant {
  font-size: 48px;
  font-weight: 900;
  color: black;
  line-height: 45px;
}
.container__screen {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.error-form {
  animation: nono 300ms, intro paused;
}
::v-deep .row {
  justify-content: center;
  padding-bottom: 10px;
  margin: 0;
}
::v-deep .col {
  flex-basis: initial !important;
}
@media (min-width: 700px) {
  #page {
    max-width: 700px !important;
  }
  #main-col {
    max-width: 700px !important;
  }
}
/* style textarea */
::v-deep fieldset {
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
::v-deep .v-input textarea {
  color: #000000 !important;
}
::v-deep ::placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5) !important;
}
/* style rating radios */
::v-deep .v-radio {
  margin-right: 0 !important;
  flex-direction: column;
}
::v-deep .v-input--radio-group__input {
  justify-content: space-between;
  padding: 0 15px;
}
::v-deep .v-radio .v-label {
  color: #000000 !important;
}
::v-deep .v-input--selection-controls__input {
  margin-right: 0 !important;
}
.white-info {
  color: #ffffff !important;
}
.score {
  margin-top: 8px;
  height: 34.8px;
  width: 96px;
  border-radius: 20px;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pad0 {
  padding: 0;
}
.low-wheight {
  font-weight: 400;
}
.icons {
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
::v-deep .icon,
::v-deep .v-icon {
  border: none !important;
  outline: none !important;
}
.share-info {
  margin-top: 32px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
}
.view-certificate {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  color: #a3a3a3;
  padding: 10px;
}
.btn__container {
  text-align: center;
  margin-bottom: 20px;
}
</style>
