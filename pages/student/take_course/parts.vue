<template>
  <div>
    <v-layout justify-center>
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

      <div v-else id="main-div">
        <div id="wrapper">
          <div id="content" v-bind:class="[isIos ? 'iosspacing' : 'normalspacing']">
            <header-bar
              :title="this.$store.state.courses.current.titulo"
              :back-func="goBack"
              :close-func="leaveCourse"
            ></header-bar>
            <div class="progress-comp">
              <small>{{ completion }}% concluído</small>
              <div class="progress-bar">
                <div class="progress-fill" :style="`width:${completion}%`" />
              </div>
            </div>
            <!-- Video Frame -->
            <div v-if="currentPart.videoUrl" id="video-iframe-container">
              <video-player
                ref="player"
                :youtube-url="
                  currentPart.videoUrl.replace('watch?v=', 'embed/')
                "
                :thumbnail="currentCourse.capa.url"
                @enableNext="enableNext()"
              />
            </div>
            <!-- Tabs -->
            <v-tabs id="tabs" v-model="selectedTab" height="35px">
              <v-tab>
                Informação
              </v-tab>
              <v-tab>
                Dúvidas e Comentários
              </v-tab>
            </v-tabs>

            <!-- Info / Comments -->
            <v-tabs-items id="part-info" v-model="selectedTab">
              <!-- info -->
              <v-tab-item>
                <h3>{{ currentPart.titulo }}</h3>
                <h4 id="description">{{ currentPart.descricao }}</h4>
              </v-tab-item>

              <!-- comments -->
              <v-tab-item>
                <v-col id="comments">
                  <v-row justify="space-between" class="ma-0">
                    <h3 class="comments__number pb-5">
                      {{ commentsAmount || 0 }} Comentários
                    </h3>
                    <div
                      v-if="!posting"
                      :class="
                        'publish-btn pt-4 ' +
                          (commentPost && !tooBig ? 'primary--text' : {})
                      "
                      @click="postComment"
                    >
                      Publicar
                    </div>
                  </v-row>
                  <v-row justify="center" class="top-row">
                    <v-avatar size="40" class="mt-1">
                      <img v-if="user.photo" :src="user.photo" />
                      <img v-else :src="require(`~/assets/person.svg`)" />
                    </v-avatar>
                    <v-text-field
                      v-model="commentPost"
                      :loading="posting"
                      class="light-text-field mt-2 ml-2"
                      placeholder="Escreva seu comentario"
                      outlined
                      :messages="tooBigWarn"
                      :error="tooBig"
                      @keyup.enter="postComment"
                    ></v-text-field>
                  </v-row>
                  <v-row justify="center" class="pt-3">
                    <v-select
                      height="10"
                      :items="items"
                      item-value="Mais salves"
                      value="Mais salves"
                      @change="sortBy = $event"
                    ></v-select>
                  </v-row>
                  <hr />
                  <div v-for="comment in sortedComments" :key="comment.id">
                    <comment-card :comment="comment"></comment-card>
                    <hr />
                  </div>
                </v-col>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <div class="base">
            <v-btn
              v-if="selectedTab == 0"
              class="btn-block btn-primary"
              :disabled="disableBtn"
              @click="advanceCourse()"
            >
              Continuar
            </v-btn>
          </div>
        </div>
      </div>
    </v-layout>
    <navigation-bar />
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte/:watchMode?'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import CommentCard from '~/components/CommentsFrame';
import http from '~/services/http/generic';
import VideoPlayer from '~/components/VideoPlayer.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    CommentCard,
    VideoPlayer,
  },
  data: () => ({
    urlVideo: '',
    description: '',
    selectedTab: 0,
    partId: '',
    comments: [],
    commentPost: '',
    loading: true,
    posting: false,
    items: ['Mais salves', 'Mais recentes', 'Mais antigos', 'Meus comentarios'],
    sortBy: 'Mais salves',
    completion: 0,
    disableBtn: true,
    watchMode: false,
  }),
  updated() {
    document.getElementById("description").innerHTML = this?.currentPart?.descricao;
  },
  computed: {
    isIos() {
      return window.cordova?.platformId === 'ios';
    },
    tooBig() {
      if (this.commentPost.length > 255) {
        return true;
      } else {
        return false;
      }
    },
    tooBigWarn() {
      if (this.tooBig) {
        return 'Comentário muito grande';
      } else {
        return '';
      }
    },
    currentCourse() {
      return this.$store.state.courses.current;
    },
    currentPart() {
      if (this.$store.state.courses.currentWatching) {
        return this.$store.state.courses.currentWatching;
      } else {
        return this.$store.state.courses.currentPart;
      }
    },
    currentTest() {
      return this.$store.state.courses.currentTest;
    },
    currentWatching() {
      return this.$store.state.courses.currentWatching;
    },
    currentPartOfWatching() {
      return this.$store.state.courses.currentPartOfWatching;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
    user() {
      return this.$store.state.user.data;
    },
    slug() {
      return this.$route.params.courseSlug;
    },
    thumbUrl() {
      return this.$store.state.courses.current.thumbUrl;
    },
    sortedComments() {
      switch (this.sortBy) {
        case 'Mais recentes':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return this.comments.sort(function(a, b) {
            return Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1;
          });
        case 'Mais antigos':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return this.comments.sort(function(a, b) {
            return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? 1 : -1;
          });
        case 'Mais salves':
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return (this.comments = this.comments.sort(
            (a, b) => a.clappedBy.length < b.clappedBy.length,
          ));
        case 'Meus comentarios':
          return this.comments.filter(
            comment => comment.userId === this.idUser,
          );
        default:
          return this.comments;
      }
    },
    commentsAmount() {
      let amount = this.sortedComments.length;
      this.sortedComments.forEach(comment => {
        amount += comment.responses.length;
      });
      return amount;
    },
  },
  async created() {
    if (this.$route.params.watchMode) {
      this.watchMode = true;
    } else {
      await this.$store.commit('courses/setCurrentWatching', '');
      await this.$store.commit('courses/setCurrentPartOfWatching', '');
    }

    if (this.watchMode) this.disableBtn = false;
  },
  mounted() {
    this.getCompletion();

    document.addEventListener(
      'fullscreenchange',
      function() {
        if (document.fullscreenElement) window.screen.orientation.unlock();
      },
      false,
    );

    document.addEventListener(
      'msfullscreenchange',
      function() {
        if (document.msFullscreenElement) window.screen.orientation.unlock();
      },
      false,
    );

    document.addEventListener(
      'mozfullscreenchange',
      function() {
        if (document.mozFullScreen) window.screen.orientation.unlock();
      },
      false,
    );

    document.addEventListener(
      'webkitfullscreenchange',
      function() {
        if (document.webkitIsFullScreen) window.screen.orientation.unlock();
      },
      false,
    );

    document.addEventListener(
      'fullscreenchange',
      function() {
        if (!document.fullscreenElement)
          window.screen.orientation.lock('portrait');
      },
      false,
    );

    document.addEventListener(
      'msfullscreenchange',
      function() {
        if (!document.msFullscreenElement)
          window.screen.orientation.lock('portrait');
      },
      false,
    );

    document.addEventListener(
      'mozfullscreenchange',
      function() {
        if (!document.mozFullScreen) window.screen.orientation.lock('portrait');
      },
      false,
    );

    document.addEventListener(
      'webkitfullscreenchange',
      function() {
        if (!document.webkitIsFullScreen)
          window.screen.orientation.lock('portrait');
      },
      false,
    );

    this.getComments();
    this.loading = false;
  },
  methods: {
    leaveCourse() {
      this.$router.push(`/aluno/curso/${this.slug}`);
    },
    async getComments() {
      await http
        .getAll(`${process.env.endpoints.COMMENT}/part/${this.currentPart.id}`)
        .then(res => {
          this.comments = res.data;
        });
    },
    postComment() {
      if (this.commentPost && !this.tooBig) {
        this.posting = true;

        const postBody = {
          partId: this.currentPart.id,
          userId: this.idUser,
          text: this.commentPost,
        };
        http.post(process.env.endpoints.COMMENT, postBody).then(res => {
          // refresh comments
          this.getComments();

          // clear comment input
          this.commentPost = '';

          this.posting = false;
        });
      }
    },
    async advanceCourse() {
      if (this.watchMode) {
        this.goFoward();
      } else {
        this.loading = true;
        // advancing course step
        await http.post(
          `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
        );

        // cheking if this was the last step of the course
        const currentStep = await this.$store.dispatch(
          'courses/refreshCurrentStep',
        );

        if (currentStep.type === 'PART' || currentStep.type === 'LESSON') {
          // case current step still a part or a lesson, continue on this page
          this.loading = false;
        } else {
          // else, go to step url
          $nuxt._router.replace(currentStep.stepUrl);
        }
      }
    },
    async getCompletion() {

      const myCourses = (
        await http.getAll(`${process.env.endpoints.MY_COURSES}${this.user.id}`)
      ).data;

      this.completion = myCourses.find(
        course => parseInt(course.courseId) === this.courseId,
      ).completion;

      if (this.completion === 100 && this.disableBtn) {
        this.completion = 80;
      }
    },
    enableNext() {
      this.disableBtn = false;
    },
    async goFoward() {
      this.loading = true;

      // define main constants of this step
      const currentPart = this.watchMode
        ? this.currentPartOfWatching
        : this.currentPart;

      const currentLesson = this.currentCourse.aulas.find(
        lesson => lesson.id === currentPart.aula.id,
      );

      const nextTest = this.findNextTest(0, currentPart);

      if (nextTest) {
        if (this.currentTest && this.currentTest.id === nextTest.id) {
          // exit watchmode and go to new test

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
            // exit watchmodde and show new part
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
              // exit watchmodde and show new part

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
      const currentPart = this.watchMode
        ? this.currentPartOfWatching
        : this.currentPart;
      const currentLesson = this.currentCourse.aulas.find(
        lesson => lesson.id === currentPart.aula.id,
      );

      const previousPart = await this.findPreviousPart(
        currentPart.ordem,
        currentLesson,
      );

      if (previousPart) {
        if (previousPart.exercicios.length) {
          const previousTest = this.findPreviousTest(9999, previousPart);
          this.goToTest(previousTest, previousPart, true);
        } else {
          this.goToPart(previousPart, true);
        }
      } else {
        const previousLesson = await this.findPreviousValidLesson(
          currentLesson.ordem,
          this.currentCourse,
        );

        if (previousLesson) {
          const previousPart = await this.findPreviousPart(
            9999,
            previousLesson,
          );

          if (previousPart.exercicios.length) {
            const previousTest = this.findPreviousTest(9999, previousPart);
            this.goToTest(previousTest, previousPart, true);
          } else {
            this.goToPart(previousPart, true);
          }
        } else {
          $nuxt._router.replace(`/aluno/curso/${this.currentCourse.slug}`);
        }
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

        $nuxt._router.replace(
          `/aluno/curso/${this.currentCourse.slug}/aula/teste/1`,
        );
      } else {
        await this.$store.commit('courses/setCurrentWatching', '');
        await this.$store.commit('courses/setCurrentPartOfWatching', '');

        $nuxt._router.replace(
          `/aluno/curso/${this.currentCourse.slug}/aula/teste`,
        );
      }
    },
    async goToPart(part, watchMode) {
      if (watchMode) {
        await this.$store.commit('courses/setCurrentWatching', part);
        await this.$store.commit('courses/setCurrentPartOfWatching', part);

        this.watchMode = true;
        this.loading = false;
      } else {
        await this.$store.commit('courses/setCurrentWatching', '');
        await this.$store.commit('courses/setCurrentPartOfWatching', '');

        this.watchMode = false;
        this.disableBtn = true;
        this.loading = false;
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
    async findPreviousPart(currentPartOrder, currentLesson) {
      const parts = (
        await http.getAll(
          `${process.env.endpoints.PARTS_BY_LESSON}/${currentLesson.id}`,
        )
      ).data;

      const previousParts = parts.filter(part => part.ordem < currentPartOrder);

      const smallerOrders = previousParts.map(part => part.ordem);

      if (smallerOrders.length) {
        const previousPartOrder = Math.max(...smallerOrders);
        const prviousPart = parts.find(
          part => part.ordem === previousPartOrder,
        );

        return prviousPart;
      } else {
        return undefined;
      }
    },
    async findPreviousValidLesson(currentLessonOrder, currentCourse) {
      const previousLessons = currentCourse.aulas.filter(
        lesson => lesson.ordem < currentLessonOrder,
      );

      const smallerOrders = previousLessons.map(lesson => lesson.ordem);

      if (smallerOrders.length) {
        const previousLessonOrder = Math.max(...smallerOrders);

        for (let index = 0; index < smallerOrders.length; index++) {
          const previousValidLesson = currentCourse.aulas.find(
            lesson => lesson.ordem === previousLessonOrder - index,
          );

          const parts = (
            await http.getAll(
              `${process.env.endpoints.PARTS_BY_LESSON}/${previousValidLesson.id}`,
            )
          ).data;

          if (parts.length) return previousValidLesson;
        }
        return null;
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}
hr {
  margin: 0 -36px 0;
  border: 2px solid #f7f7f7;
}
#video-iframe-container {
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  height: 163px;
  border: none;
}
#tabs {
  padding-bottom: 24px;
}
#part-info {
  display: flex;
  margin-top: 0.6rem;
  flex-direction: column;
}
::v-deep .v-slide-group__content {
  border-bottom: 4px solid #f7f7f7 !important;
}
::v-deep .v-tabs-slider-wrapper {
  bottom: -4px !important;
  height: 4px !important;
  color: var(--secondary);
}
::v-deep .v-tab {
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 500;
  color: grey;
  text-transform: none;
}
::v-deep .v-tab:nth-of-type(2) {
  padding: 0;
  justify-content: left;
}
::v-deep .v-input__slot {
  min-height: 32px !important;
}
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
  color: var(--secondary);
}
@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}
.comments__number {
  color: black;
  font-size: 12px;
  font-weight: 700;
  color: #1a1a1a;
}
.button-primary {
  color: #6600cc;
}
.publish-btn {
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  color: #d8b4ff;
}
.filter__coments {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #3f3d56;
  margin: 0 0 2px;
}
h3 {
  font-weight: 900;
  font-size: 14px;
  line-height: normal;
  line-height: initial;
  text-align: left;
  color: var(--secondary);
}
h4 {
  font-weight: 400;
  padding-top: 0.25em;
  padding-bottom: 12px;
  color: #1a1a1a;
  font-size: 12px;
}
.main-container {
  display: flex;
  flex-direction: column;
}
::v-deep .v-input {
  width: 75%;
}
.inner-container {
  margin-top: 0.5rem;
}
::v-deep .v-select {
  margin: -3px 0 -42px !important;
  padding: 0 !important;
  max-width: 155px !important;
  border: 0 !important;
  outline: 0 !important;
  text-align: center !important;
}
::v-deep .v-select__selections {
  width: auto !important;
  display: initial !important;
  text-align: center !important;
}
::v-deep .v-select__selection {
  padding-top: 7px;
  margin: 0 !important;
  max-width: initial;
  margin-right: -40px !important;
  font-size: 12px !important;
}
::v-deep .v-input__slot::before,
::v-deep .v-input__slot::after {
  border-width: 0 !important;
}
.top-row {
  margin: -5px 0;
}
.info__box {
  display: flex;
  margin-top: 0.6rem;
  flex-direction: column;
}
.progress-comp {
  margin-bottom: 6px;
  flex-grow: 1;
}
.progress-bar {
  height: 8px;
  flex-grow: 1;
  background-color: #e7e7e7;
  border-radius: 3px;
}
.progress-fill {
  height: 100%;
  background-color: var(--secondary);
  border-radius: 3px;
}
.progress-comp small {
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0em;
}
#main-div {
  margin: 0 24px 100px;
}

#wrapper {
  position: relative;
}
#content {
}
#base {
  width: 100%;
  position: relative;
  bottom: 0px;
}
::v-deep #header {
  margin: 20px 0;
}

.iosspacing {
  min-height: calc(100vh - 200px);
  padding-bottom: 50px;
}

.normalspacing {
  min-height: calc(100vh - 150px);
  padding-bottom: 100px;
}

</style>
