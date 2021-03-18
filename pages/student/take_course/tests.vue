<template>
  <div>
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
    <div v-else id="main-div">
      <div id="wrapper">
        <div id="content">
          <HeaderBar
            v-if="!correct"
            :title="this.$store.state.courses.current.titulo"
            :back-func="goBack"
            :close-func="leaveCourse"
          ></HeaderBar>
          <h3>{{ testToShow.titulo || 'Título do Teste' }}</h3>
          <h4 class="mt-4">
            {{ testToShow.pergunta || 'Enunciado do teste' }}
          </h4>
          <v-radio-group v-model="selected" class="mt-4" :readonly="readonly">
            <v-radio value="A" :ripple="false">
              <template #label>
                <div><span>A:</span> {{ testToShow.primeira_alternativa }}</div>
              </template>
            </v-radio>

            <v-radio value="B" :ripple="false">
              <template #label>
                <div><span>B:</span> {{ testToShow.segunda_alternativa }}</div>
              </template>
            </v-radio>

            <v-radio value="C" :ripple="false">
              <template #label>
                <div><span>C:</span> {{ testToShow.terceira_alternativa }}</div>
              </template>
            </v-radio>

            <v-radio value="D" :ripple="false">
              <template #label>
                <div><span>D:</span> {{ testToShow.quarta_alternativa }}</div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>

        <div class="base">
          <v-btn :class="'btn-block btn-primary ' + error" @click="nextTest">
            Próximo
          </v-btn>
        </div>
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
    currentCourse() {
      return this.$store.state.courses.current;
    },
    currentWatching() {
      return this.$store.state.courses.currentWatching;
    },
    currentPartOfWatching() {
      return this.$store.state.courses.currentPartOfWatching;
    },
    testToShow() {
      if (this.watchMode) {
        return this.currentWatching;
      } else {
        return this.$store.state.courses.currentTest;
      }
    },
    currentTest() {
      return this.$store.state.courses.currentTest;
    },
    currentPart() {
      return this.$store.state.courses.currentPart;
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
  async mounted() {
    this.loading = false;

    if (this.$route.params.watchMode) {
      await this.showCorrect();
    }
  },
  methods: {
    leaveCourse() {
      this.$router.push(`/aluno/curso/${this.slug}`);
    },
    resetBadgeAndContinue() {
      this.badgePoints = 0;
      this.try = 1;
      this.correct = false;
      this.advanceCourse();
    },
    async nextTest() {
      if (this.watchMode) {
        this.goFoward();
      } else if (this.selected !== '') {
        // Primeiro passo é verificar se a resposta está correta
        const checkTest = (
          await http.post(
            `${process.env.endpoints.TEST}${this.testToShow.id}/check-test`,
            {
              chosenAlternative: this.selected,
            },
          )
        ).data.isCorrect;

        if (checkTest) {
          this.getPointsAndNotificate();
          // advancing course step
          await http.post(
            `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
          );
        } else if (!checkTest) {
          this.try++;
        }
        this.selected = '';

        this.error = 'error-form';
        setTimeout(() => {
          this.error = '';
        }, 300);
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
    async showCorrect() {
      const currentTestData = (
        await http.getAll(
          `${process.env.endpoints.TEST}${this.currentWatching.id}`,
        )
      ).data;

      this.selected = currentTestData.alternativa_certa.toUpperCase();
      this.readonly = true;
    },
    async goFoward() {
      this.loading = true;

      // define main constants of this step
      const currentWatchingTeste = this.currentWatching;
      const currentPart = this.currentPartOfWatching;
      const currentLesson = this.currentCourse.aulas.find(
        lesson => lesson.id === currentPart.aula.id,
      );

      const nextTest = this.findNextTest(
        currentWatchingTeste.ordem,
        currentPart,
      );

      if (nextTest) {
        if (this.currentTest && this.currentTest.id === nextTest.id) {
          // exit watchmode and show new test

          this.goToTest(nextTest, currentPart, false);
        } else {
          // continue in watchmode and show next test

          this.goToTest(nextTest, currentPart, true);
        }
      } else {
        const nextPart = await this.findNextPart(
          currentPart.ordem,
          currentLesson,
        );

        if (nextPart) {
          if (this.currentPart && this.currentPart.id === nextPart.id) {
            // exit watchmode and show new part

            this.goToPart(nextPart, false);
          } else {
            // continue in watchmode and show next part

            this.goToPart(nextPart, true);
          }
        } else {
          const nextLesson = await this.findNextValidLesson(
            currentLesson.ordem,
            this.currentCourse,
          );

          if (nextLesson) {
            const nextPart = await this.findNextPart(0, nextLesson);

            if (this.currentPart && this.currentPart.id === nextPart.id) {
              // exit watchmode and show new part

              this.goToPart(nextPart, false);
            } else {
              // continue in watchmode and show next part

              this.goToPart(nextPart, true);
            }
          } else {
            // go back to course main view

            $nuxt._router.replace(`/aluno/curso/${this.currentCourse.slug}`);
          }
        }
      }
    },
    async goBack() {
      this.loading = true;

      // define main constants of this step
      const currentTest = this.watchMode
        ? this.currentWatching
        : this.currentTest;
      let currentPart = this.watchMode
        ? this.currentPartOfWatching
        : this.currentPart;

      if (!currentPart.id) {
        console.log('____________', currentTest.parte.id);
        currentPart = (
          await http.getAll(
            `${process.env.endpoints.PART_BY_ID}/${currentTest.parte.id}`,
          )
        ).data;
      }

      const previousTest = this.findPreviousTest(
        currentTest.ordem,
        currentPart,
      );

      if (previousTest) {
        this.goToTest(previousTest, currentPart, true);
      } else {
        this.goToPart(currentPart, true);
      }
    },
    findNextTest(currentTestOrder, currentPart) {
      const laterTests = currentPart.exercicios.filter(
        test => test.ordem > currentTestOrder,
      );

      const greaterOrders = laterTests.map(test => test.ordem);

      if (greaterOrders.length) {
        const nextTestOrder = Math.min(...greaterOrders);
        return currentPart.exercicios.find(
          test => test.ordem === nextTestOrder,
        );
      } else {
        return null;
      }
    },
    async findNextPart(currentPartOrder, currentLesson) {
      const parts = (
        await http.getAll(
          `${process.env.endpoints.PARTS_BY_LESSON}/${currentLesson.id}`,
        )
      ).data;

      const laterParts = parts.filter(part => part.ordem > currentPartOrder);

      const greaterOrders = laterParts.map(part => part.ordem);

      if (greaterOrders.length) {
        const nextPartOrder = Math.min(...greaterOrders);
        const nextPart = parts.find(part => part.ordem === nextPartOrder);

        return nextPart;
      } else {
        return undefined;
      }
    },
    async findNextValidLesson(currentLessonOrder, currentCourse) {
      const laterLessons = currentCourse.aulas.filter(
        lesson => lesson.ordem > currentLessonOrder,
      );

      const greaterOrders = laterLessons.map(lesson => lesson.ordem);

      if (greaterOrders.length) {
        const nextLessonOrder = Math.min(...greaterOrders);

        for (let index = 0; index < greaterOrders.length; index++) {
          const nextValidLesson = currentCourse.aulas.find(
            lesson => lesson.ordem === nextLessonOrder + index,
          );

          const parts = (
            await http.getAll(
              `${process.env.endpoints.PARTS_BY_LESSON}/${nextValidLesson.id}`,
            )
          ).data;

          if (parts.length) return nextValidLesson;
        }
        return null;
      } else {
        return null;
      }
    },
    async goToTest(test, part, watchMode) {
      if (watchMode) {
        await this.$store.commit('courses/setCurrentWatching', test);
        await this.$store.commit('courses/setCurrentPartOfWatching', part);

        this.watchMode = true;
        await this.showCorrect();
        this.loading = false;
      } else {
        await this.$store.commit('courses/setCurrentWatching', '');
        await this.$store.commit('courses/setCurrentPartOfWatching', '');

        this.readonly = false;
        this.selected = '';
        this.watchMode = false;
        this.loading = false;
      }
    },
    async goToPart(part, watchMode) {
      if (watchMode) {
        await this.$store.commit('courses/setCurrentWatching', part);
        await this.$store.commit('courses/setCurrentPartOfWatching', part);
        $nuxt._router.replace(
          `/aluno/curso/${this.currentCourse.slug}/aula/parte/1`,
        );
      } else {
        await this.$store.commit('courses/setCurrentWatching', '');
        await this.$store.commit('courses/setCurrentPartOfWatching', '');
        $nuxt._router.replace(
          `/aluno/curso/${this.currentCourse.slug}/aula/parte`,
        );
      }
    },
    findPreviousTest(currentTestOrder, currentPart) {
      const previousTests = currentPart.exercicios.filter(
        test => test.ordem < currentTestOrder,
      );

      const smallerOrders = previousTests.map(test => test.ordem);

      if (smallerOrders.length) {
        const previousTestOrder = Math.max(...smallerOrders);
        return currentPart.exercicios.find(
          test => test.ordem === previousTestOrder,
        );
      } else {
        return null;
      }
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
  padding: 0 20px;
}
.content-wrap {
  padding-bottom: 180px;
}
.base {
  width: 100%;
  margin-bottom: 100px;
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
#main-div {
  margin: 0 24px 100px;
}
#wrapper {
  position: relative;
}
#content {
  min-height: calc(100vh - 150px);
  padding-bottom: 100px;
}
#base {
  width: 100%;
  position: relative;
  bottom: 0px;
}
::v-deep #header {
  margin: 20px 0;
}
</style>
