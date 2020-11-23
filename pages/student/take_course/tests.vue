<template>
  <div id="app">
    <HeaderBar
      v-if="!correct"
      :title="'Questionário'"
      :route="`/aluno/curso/${this.slug}`"
    ></HeaderBar>
    <v-layout id="page" justify-center>
      <v-flex ref="flex" class="main-container">
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
        <div v-if="!loading && correct" class="notification__content">
          <div id="close">
            <v-icon
              id="close-btn"
              color="primary"
              @click="resetBadgeAndContinue"
              >mdi-close-circle</v-icon
            >
          </div>
          <div class="bg__fire" />

          <div class="notification">
            <img
              v-if="tryMessage === 'De \n primeira!!'"
              class="notification__image"
              :src="require('~/assets/badge-first-bg.svg')"
              alt=""
            />
            <img
              v-if="tryMessage === 'Na \n segunda!'"
              class="notification__image"
              :src="require('~/assets/badge-second-bg.svg')"
              alt=""
            />
            <img
              v-if="tryMessage === 'Na \n terceira!'"
              class="notification__image"
              :src="require('~/assets/badge-third-bg.svg')"
              alt=""
            />
            <img
              v-if="tryMessage === 'Na \n última!'"
              class="notification__image"
              :src="require('~/assets/badge-fourth-bg.svg')"
              alt=""
            />
          </div>
          <div class="messages">
            <h1 class="message">
              {{ headerNotification }}
            </h1>
            <p class="message__subtext">
              {{ textNotification }}
            </p>
          </div>
          <div class="share__achievement">
            <p>Compartilhe com seus amigos</p>
            <div>
              <div class="icons">
                <button
                  @click="share($event, title, image)"
                  class="btn-block btn-primary"
                >
                  COMPARTILHAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!loading && !correct" class="inner-container">
          <v-form ref="form" lazy-validation>
            <h3>{{ test.title || 'Título do Teste' }}</h3>
            <h4>
              {{ test.question || 'Enunciado do teste' }}
            </h4>
            <div class="alternatives-container">
              <v-checkbox
                v-model="selected"
                class="first-alternative"
                hide-details
                color="#60c"
                :rules="alternativeRule"
                :label="test.firstAlternative"
                value="A"
              />
              <v-checkbox
                v-model="selected"
                class="second-alternative"
                hide-details
                color="#60c"
                :rules="alternativeRule"
                :label="test.secondAlternative"
                value="B"
              />
              <v-checkbox
                v-model="selected"
                class="third-alternative"
                hide-details
                color="#60c"
                :rules="alternativeRule"
                :label="test.thirdAlternative"
                value="C"
              />
              <v-checkbox
                v-model="selected"
                class="fourth-alternative"
                hide-details
                color="#60c"
                :rules="alternativeRule"
                :label="test.fourthAlternative"
                value="D"
              />
            </div>
          </v-form>
          <v-btn class="btn-block btn-primary" @click="nextTest">
            Próximo
          </v-btn>
        </div>
      </v-flex>
      <client-only>
        <navigation-bar v-if="!correct" />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/teste'
  }
</router>

<script>
import SocialSharing from 'vue-social-sharing';
import NavigationBar from '~/components/NavigationBar';
import tests from '~/services/http/generic';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    SocialSharing,
  },
  data: () => ({
    computedSelection: [],
    cmpSelect: [],
    correct: false,
    loading: true,
    try: 1,
    hasthtag: '',
    badgePoints: 0,
    tryMessage: '',
    headerNotification: '',
    textNotification: '',
  }),
  computed: {
    test() {
      return this.$store.state.courses.currentTest;
    },
    alternativeRule() {
      return [!!this.computedSelection.length || 'Selecione uma alternativa'];
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
    // Vamos alterar o getter e setter do selected para poder alterar os valores do checkbox como se fosse um radio group
    selected: {
      get() {
        return this.$data.computedSelection;
      },
      set(value) {
        this.$data.cmpSelect = value;
      },
    },
  },
  watch: {
    setCorrect(condition) {
      this.correct = condition;
    },
    // Assim que houver mudança ele adquire o novo valor (que vem como array [antigoValor, novoValor]) e retiramos o antigo com shift()
    cmpSelect(newQuestion) {
      this.computedSelection = newQuestion;
      if (this.computedSelection.length > 1) this.computedSelection.shift();
    },
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
    resetBadgeAndContinue() {
      this.badgePoints = 0;
      this.try = 1;
      this.correct = false;
      this.advanceCourse();
    },
    nextTest() {
      if (this.$refs.form.validate()) {
        // Primeiro passo é verificar se a resposta está correta
        tests
          .getAll(
            `/api/v1/test/${this.test.id}/checkTest/alternative/${this.computedSelection[0]}`,
          )
          .then(res => {
            if (res.data) {
              // Como a resposta está certa a gente limpa a validação e escolha para o próximo teste
              this.$refs.form.reset();
              this.getPointsAndNotificate();
              // Se a resposta está certa a gente avança no curso
            } else {
              if (this.try < 4) {
                this.try++;
              }
              this.computedSelection = [];
            }
          });
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
      console.log('Share completed? ' + result.completed);
      console.log(result); // On Android apps mostly return false even while it's true
      console.log('Shared to app: ' + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      console.log(result); // On Android apps mostly return false even while it's true
    },
    onError(msg) {
      console.log('Sharing failed with message: ' + msg);
    },
    share(event, title, image) {
      event.stopPropagation();
      event.preventDefault();
      const options = {
        message: 'Se liga nessa questão que eu acertei!', // not supported on some apps (Facebook, Instagram)
        subject: this.tryMessage, // fi. for email
        url: `newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/cadastro/${this.user.inviteKey}`,
        chooserTitle: 'Vem colar com nois!', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },    
    setCorrect(condition) {
      this.correct = condition;
    },
    async advanceCourse() {
      this.loading = true;
      // advancing course step
      await http.post(
        `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
      )

      // cheking if this was the last step of the course
      const currentState = await this.$store.dispatch('courses/refreshState');      
      
      if (currentState.status === 'COMPLETED') {        
        $nuxt._router.push(`/aluno/curso/${this.slug}/fim`);
      }
      else{
        //case this course is not finished, go to next step
        const currentStep = await this.$store.dispatch('courses/refreshCurrentStep');

        if (currentStep.type === 'test'){
          //case current step still a test, continue tests on this page
          this.loading = false;
        }
        else{
          //else, go to step url
          $nuxt._router.push(currentStep.stepUrl);
        }
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
  font-weight: 900;
  font-size: 1em;
  line-height: initial;
  text-align: left;
  color: var(--primary);
}

h4 {
  font-weight: 500;
  padding-top: 1em;
  color: #656565;
  font-size: 14px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2rem 0rem;
}

.inner-container {
  margin: 1em 6px 0;
  padding: 0 0.5em !important;
}

::v-deep .btn-primary {
  margin-top: 25px;
}
label {
  text-align: justify;
}

@mixin inner-text-checkbox {
  font-weight: 900;
  color: var(--primary);
  margin-right: 0.5em;
}
.mdi-close-circle::before {
  color: var(--primary);
  width: 20px;
  height: 20px;
  z-index: 9999999;
}

#close-btn {
  position: absolute;
  right: 20px;
  top: 50px;
  cursor: pointer;
  font-size: 30px;
}
.notification {
  width: 193px;
  height: 193px;
  margin: 40% auto 10%;
}

.messages {
  padding: 0 2em;
}

.message {
  font-size: 24px;
  color: black;
  z-index: 9999;
  margin-top: 5%;
  font-weight: 600;
}

.message__subtext {
  margin-top: 2%;
  text-align: center;
  z-index: 9999;
  font-size: 16px;
}

.notification__content {
  background-image: url('../../../assets/background-fire.png');
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 480px;
  margin: 0 auto;
}

::v-deep .main-container {
  padding: 0 !important;
}

.share__achievement {
  margin-top: 10%;
}

.share__achievement p {
  font-size: 12px;
  text-align: center;
}

.icons {
  margin: 5% auto;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.notification__image {
  position: absolute;
  left: 0;
  z-index: 999;
  width: 100%;
  max-height: 280px;
}

::v-deep .theme--light.v-label {
  color: rgba(0, 0, 0, 0.6) !important;
  font-weight: 500;
}

::v-deep .first-alternative > div > div > label:before {
  content: 'A:';
  @include inner-text-checkbox;
}

::v-deep .second-alternative > div > div > label:before {
  content: 'B:';
  @include inner-text-checkbox;
}

::v-deep .third-alternative > div > div > label:before {
  content: 'C:';
  @include inner-text-checkbox;
}

::v-deep .fourth-alternative > div > div > label:before {
  content: 'D:';
  @include inner-text-checkbox;
}
.icons:hover {
  cursor: pointer;
}

::v-deep .mdi-checkbox-blank-outline::before {
  content: url('https://api.iconify.design/bi:circle.svg?height=16');
  vertical-align: -0.125em;
}

::v-deep .mdi-checkbox-marked::before {
  content: url('https://api.iconify.design/bi:check-circle-fill.svg?color=rgb(104%2C0%2C201)&height=16');
  vertical-align: -0.125em;
}

@media (min-width: 480px) {
  .notification__content {
    top: 0;
    height: 100vh;
  }
  .messages {
    margin-top: -12%;
  }
  .notification__image {
    top: 10%;
  }
  .btn-block {
    width: 96%;
    padding: 5px auto;
  }

  #page {
    height: 100vh;
    overflow: hidden;
  }
}
</style>
