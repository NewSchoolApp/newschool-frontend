<template>
  <div>
    <HeaderBar
      v-if="!correct"
      :title="this.$store.state.courses.current.titulo"
      :route="`/aluno/curso/${slug}`"
    ></HeaderBar>
    <v-btn rounded color="primary" dark @click="goBack()">
      Rounded Button
    </v-btn>
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
    <div v-else-if="correct">
      <div class="bg__fire">
        <v-icon id="close__btn" color="primary" @click="resetBadgeAndContinue"
          >mdi-close-circle</v-icon
        >

        <div class="notification">
          <img
            v-if="tryMessage === 'De \n primeira!!'"
            class="notification__image"
            :src="require('~/assets/badge-first.png')"
            alt=""
          />
          <img
            v-if="tryMessage === 'Na \n segunda!'"
            class="notification__image"
            :src="require('~/assets/badge-second.png')"
            alt=""
          />
          <img
            v-if="tryMessage === 'Na \n terceira!'"
            class="notification__image"
            :src="require('~/assets/badge-third.png')"
            alt=""
          />
          <img
            v-if="tryMessage === 'Na \n última!'"
            class="notification__image"
            :src="require('~/assets/badge-fourth.png')"
            alt=""
          />
        </div>
        <div class="messages pb-5">
          <h1 class="message">
            {{ headerNotification }}
          </h1>
          <p class="message__subtext">
            {{ textNotification }}
          </p>
        </div>
      </div>

      <div class="share__achievement">
        <p>Compartilhe com seus amigos</p>
        <div>
          <div class="icons">
            <button
              class="btn-block btn-primary"
              @click="share($event, title, image)"
            >
              COMPARTILHAR
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="test-screen">
      <div class="content-wrap">
        <h3>{{ test.titulo || 'Título do Teste' }}</h3>
        <h4 class="mt-4">
          {{ test.pergunta || 'Enunciado do teste' }}
        </h4>
        <v-radio-group v-model="selected" class="mt-4" :readonly="readonly">
          <v-radio value="A">
            <template #label>
              <div><span>A:</span> {{ test.primeira_alternativa }}</div>
            </template>
          </v-radio>

          <v-radio value="B">
            <template #label>
              <div><span>B:</span> {{ test.segunda_alternativa }}</div>
            </template>
          </v-radio>

          <v-radio value="C">
            <template #label>
              <div><span>C:</span> {{ test.terceira_alternativa }}</div>
            </template>
          </v-radio>

          <v-radio value="D">
            <template #label>
              <div><span>D:</span> {{ test.quarta_alternativa }}</div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>

      <div class="base">
        <v-btn
          :class="'btn-block btn-primary btn-fixed ' + error"
          @click="nextTest"
        >
          Próximo
        </v-btn>
      </div>
    </div>
    <navigation-bar v-if="!correct" />
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/teste/:watchMode?'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import tests from '~/services/http/generic';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data: () => ({
    selected: '',
    correct: false,
    loading: true,
    try: 1,
    hasthtag: '',
    badgePoints: 0,
    tryMessage: '',
    headerNotification: '',
    textNotification: '',
    error: '',
    readonly: false,
    watchMode: false,
  }),
  computed: {
    currentWatching() {
      return this.$store.state.courses.currentWatching;
    },
    test() {
      if (this.watchMode) {
        return this.currentWatching;
      } else {
        return this.$store.state.courses.currentTest;
      }
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    user() {
      return this.$store.state.user.data;
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
    slug() {
      return this.$route.params.courseSlug;
    },
  },
  async created() {
    if (this.$route.params.watchMode) {
      this.watchMode = true;
    } else {
      await this.$store.commit('courses/setCurrentWatching', {});
      await this.$store.commit('courses/setCurrentPartOfWatching', {});
    }
  },
  mounted() {
    this.loading = false;

    if (this.$route.params.watchMode) {
      this.showCorrect();
    }
  },
  methods: {
    resetBadgeAndContinue() {
      this.badgePoints = 0;
      this.try = 1;
      this.correct = false;
      this.advanceCourse();
    },
    nextTest() {
      if (this.selected !== '') {
        // Primeiro passo é verificar se a resposta está correta
        tests
          .post(`${process.env.endpoints.TEST}${this.test.id}/check-test`, {
            chosenAlternative: this.selected,
          })
          .then(res => {
            if (res.data.isCorrect === true) {
              this.getPointsAndNotificate();
            } else if (res.data.isCorrect === false) {
              if (this.try < 4) {
                this.try++;
              }
              this.selected = '';

              this.error = 'error-form';
              setTimeout(() => {
                this.error = '';
              }, 300);
            } else {
              this.$notifier.showMessage({
                type: 'error',
                message: 'Má conexão',
              });
            }
          });
      } else {
        this.error = 'error-form';
        setTimeout(() => {
          this.error = '';
        }, 300);
      }
    },
    getPointsAndNotificate() {
      const points = {
        1: 10,
        2: 5,
        3: 2,
        4: 1,
      };
      const trymessage = {
        1: 'De \n primeira!!',
        2: 'Na \n segunda!',
        3: 'Na \n terceira!',
        4: 'Na \n última!',
      };
      const headerMessage = {
        1: 'Mandou Bem!',
        2: 'Nossa, foi por pouco!',
        3: 'Continue Estudando!',
        4: 'Não desista!',
      };
      const bodyMessage = {
        1: 'Parabéns por acertar de primeira, você vai longe!',
        2: 'Você quase acertou de primeira, continue estudando, você está quase lá.',
        3: 'Você acertou na terceira tentativa, agora é pegar mais firme nos estudos para acertar de primeira!',
        4: 'Você é um guerreiro(a), dedique mais tempo aos estudos e tire suas dúvidas, você é capaz de ir longe.',
      };

      this.badgePoints = points[this.try];
      this.tryMessage = trymessage[this.try];
      this.hasthtag = this.tryMessage.split('\n').join('');
      this.headerNotification = headerMessage[this.try];
      this.textNotification = bodyMessage[this.try];
      this.correct = true;
    },
    onSuccess(result) {
      console.log('Shared to app: ' + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      console.log(result); // On Android apps mostly return false even while it's true
    },
    onError(msg) {
      alert('Sharing failed with message: ' + msg);
    },
    share(event, title, image) {
      event.stopPropagation();
      event.preventDefault();
      const options = {
        message: 'Se liga nessa questão que eu acertei!', // not supported on some apps (Facebook, Instagram)
        subject: this.tryMessage, // fi. for email
        url: `http://newschool.us-east-2.elasticbeanstalk.com/#/cadastro/${this.user.inviteKey}`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
    async advanceCourse() {
      this.loading = true;
      // advancing course step
      await http.post(
        `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
      );

      // case this course is not finished, go to next step
      const currentStep = await this.$store.dispatch(
        'courses/refreshCurrentStep',
      );

      if (currentStep.type === 'TEST') {
        // case current step still a test, continue tests on this page
        this.selected = '';
        this.loading = false;
      } else {
        // else, go to step url
        $nuxt._router.replace(currentStep.stepUrl);
      }
    },
    async goBack() {
      this.loading = true;

      const currentPart =
        this.currentPartOfWatching ||
        (
          await http.getAll(
            `/api/v2/part/${this.test.parte.id || this.test.parte}`,
          )
        ).data;

      const testOrder = this.test.ordem;

      if (testOrder > 1) {
        // ir para o teste anterior
        const testToGo = currentPart.exercicios.find(
          test => test.ordem === testOrder - 1,
        );
        await this.$store.commit('courses/setCurrentWatching', testToGo);
        await this.$store.commit(
          'courses/setCurrentPartOfWatching',
          currentPart,
        );
        this.watchMode = true;
        this.loading = false;
        this.showCorrect();
      } else {
        // exibir a parte desse teste
        await this.$store.commit('courses/setCurrentWatching', currentPart);
        await this.$store.commit(
          'courses/setCurrentPartOfWatching',
          currentPart,
        );
        $nuxt._router.replace(`/aluno/curso/${currentPart.slug}/aula/parte/1`);
      }
    },
    async showCorrect() {
      const currentTestData = (
        await http.getAll(`/api/v2/test/${this.currentWatching.id}`)
      ).data;

      this.selected = currentTestData.alternativa_certa;
      this.readonly = true;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
  text-align: center;
  color: var(--primary);
}
@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}
h3 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 24px;
  line-height: 28.13px;
  color: #1a1a1a;
}
h4 {
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: justify;
  color: #1a1a1a;
}
.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2rem 0rem;
}
.inner-container {
  padding: 0 24px;
}
::v-deep label {
  overflow: visible;
  width: 200px;
}
@mixin inner-text-checkbox {
  font-weight: 400;
  color: var(--primary);
  margin-right: 0.5em;
}
.mdi-close-circle::before {
  color: var(--primary);
  width: 20px;
  height: 20px;
  z-index: 9999999;
}
.notification {
  margin-top: 115px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.notification__image {
  height: 185px;
  width: auto;
}
.bg__fire {
  position: absolute;
  padding: 0 20px;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: url('../../../assets/background-fire.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100%;
}
.test-screen {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
.content-wrap {
  padding-bottom: 90%;
}
.base {
  position: absolute;
  bottom: 96px;
  width: 92%;
}
.message {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  color: black;
  margin-top: 32px;
}
.message__subtext {
  margin-top: 2%;
  text-align: center;
  z-index: 9999;
  font-size: 16px;
  font-family: Roboto;
}
::v-deep .main-container {
  padding: 0 !important;
}
.share__achievement {
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: 50px;
  width: 100%;
}
.icons {
  margin: 0 auto;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
::v-deep .theme--light.v-label {
  color: rgb(0, 0, 0) !important;
  font-weight: 600;
  font-size: 14px !important;
  font-family: 'Roboto';

  span {
    color: var(--primary);
    font-weight: 400;
  }
}
::v-deep .v-radio {
  margin-bottom: 17px !important;
}
::v-deep .mdi-checkbox-blank-outline::before {
  content: url('https://api.iconify.design/bi:circle.svg?height=16');
  vertical-align: -0.125em;
}
::v-deep .mdi-checkbox-marked::before {
  content: url('https://api.iconify.design/bi:check-circle-fill.svg?color=rgb(104%2C0%2C201)&height=16');
  vertical-align: -0.125em;
}
#close__btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
}
::v-deep .error--text {
  animation: none !important;
}
.error-form {
  animation: nono 300ms, intro paused;
}
::v-deep .v-radio {
  align-items: initial;
}
</style>
