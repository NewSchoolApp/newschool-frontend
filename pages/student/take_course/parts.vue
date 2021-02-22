<template>
  <div>
    <header-bar
      :title="'Aula'"
      :back-func="goBack"
      :close-func="leaveCourse"
    ></header-bar>
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

      <v-col v-else class="pa-0">
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
            :youtube-url="currentPart.videoUrl.replace('watch?v=', 'embed/')"
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
            <h4>{{ currentPart.descricao }}</h4>
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
      </v-col>
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
  computed: {
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
    test() {
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
        .getAll(`${process.env.endpoints.COMMENT}/${this.currentPart.id}`)
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
        http.post('/api/v1/comment', postBody).then(res => {
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
    },
    enableNext() {
      this.disableBtn = false;
    },
    async goBack() {
      this.loading = true;

      if (!this.watchMode) {
        await this.$store.commit('courses/setCurrentTest', '');
      }

      const currentPart = this.currentPartOfWatching || this.currentPart;
      const partOrder = currentPart.ordem;
      const lessonId = currentPart.aula.id;
      const lessonOrder = currentPart.aula.ordem;

      if (partOrder > 1) {
        // ir para o ultimo teste da parte anterior
        const parts = (await http.getAll(`/api/v2/part/lesson/${lessonId}`))
          .data;

        const partToGo = parts.find(part => part.ordem === partOrder - 1);

        this.goTo(partToGo);
      } else if (lessonOrder > 1) {
        // ir para o ultimo teste da ultima parte da lesson anterior
        const lessonToGo = this.currentCourse.aulas.find(
          lesson => lesson.ordem === lessonOrder - 1,
        );

        const parts = (
          await http.getAll(`/api/v2/part/lesson/${lessonToGo.id}`)
        ).data;

        const partToGo = parts[parts.length - 1];

        this.goTo(partToGo);
      } else {
        // voltar para os detalhes do curso
        $nuxt._router.replace(`/aluno/curso/${currentPart.slug}`);
      }
    },
    async goTo(partToGo) {
      if (partToGo.exercicios.length) {
        const testToGo = partToGo.exercicios.find(
          test => test.ordem === partToGo.exercicios.length,
        );
        await this.$store.commit('courses/setCurrentWatching', testToGo);
        await this.$store.commit('courses/setCurrentPartOfWatching', partToGo);
        $nuxt._router.replace(
          `/aluno/curso/${this.currentCourse.slug}/aula/teste/1`,
        );
      } else {
        await this.$store.commit('courses/setCurrentWatching', partToGo);
        await this.$store.commit('courses/setCurrentPartOfWatching', partToGo);
        this.watchMode = true;
        this.loading = false;
      }
    },
    async goFoward() {
      this.loading = true;

      const currentPart = this.currentPartOfWatching;
      const partOrder = currentPart.ordem;
      const lessonId = currentPart.aula.id;
      const lessonOrder = currentPart.aula.ordem;

      if (currentPart.exercicios.length) {
        const testToGo = currentPart.exercicios.find(test => test.ordem === 1);

        if (this.test && testToGo.id === this.test.id) {
          await this.$store.commit('courses/setCurrentWatching', '');
          await this.$store.commit('courses/setCurrentPartOfWatching', '');

          $nuxt._router.replace(
            `/aluno/curso/${this.currentCourse.slug}/aula/teste`,
          );
        } else {
          await this.$store.commit('courses/setCurrentWatching', testToGo);

          $nuxt._router.replace(
            `/aluno/curso/${this.currentCourse.slug}/aula/teste/1`,
          );
        }
      } else {
        const parts = (await http.getAll(`/api/v2/part/lesson/${lessonId}`))
          .data;

        if (part.ordem < parts.length) {
          const partToGo = parts.find(part => part.ordem === partOrder + 1);

          if (partToGo.id === this.currentPart.id) {
            await this.$store.commit('courses/setCurrentWatching', '');
            await this.$store.commit('courses/setCurrentPartOfWatching', '');
            this.watchMode = false;
            this.loading = false;
          } else {
            await this.$store.commit('courses/setCurrentWatching', partToGo);
            await this.$store.commit(
              'courses/setCurrentPartOfWatching',
              partToGo,
            );
            await this.$store.commit(
              'courses/setCurrentPartOfWatching',
              partToGo,
            );
            this.loading = false;
          }
        } else {
          const lessonToGo = this.currentCourse.aulas.find(
            lesson => lesson.ordem === lessonOrder + 1,
          );

          const parts = (
            await http.getAll(`/api/v2/part/lesson/${lessonToGo.id}`)
          ).data;

          const partToGo = parts[0];

          if (partToGo.id === this.currentPart.id) {
            await this.$store.commit('courses/setCurrentWatching', '');
            await this.$store.commit('courses/setCurrentPartOfWatching', '');
            this.watchMode = false;
            this.loading = false;
          } else {
            await this.$store.commit('courses/setCurrentWatching', partToGo);
            await this.$store.commit(
              'courses/setCurrentPartOfWatching',
              partToGo,
            );
            await this.$store.commit(
              'courses/setCurrentPartOfWatching',
              partToGo,
            );
            this.loading = false;
          }
        }
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

.base {
  padding: 0 24px 80px !important;
  position: absolute;
  bottom: 0;
  width: 100%;
}
#video-iframe-container {
  padding: 0 24px;
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
  padding: 0 24px 200px;
  display: flex;
  margin-top: 0.6rem;
  flex-direction: column;
}
::v-deep .v-slide-group__content {
  padding: 0 24px;
  border-bottom: 4px solid #f7f7f7 !important;
}
::v-deep .v-tabs-slider-wrapper {
  bottom: -4px !important;
  height: 4px !important;
  color: var(--primary-light);
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
  color: var(--primary);
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
  color: var(--primary);
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
.base {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.info__box {
  display: flex;
  margin-top: 0.6rem;
  flex-direction: column;
}
.progress-comp {
  margin: 0 24px 6px;
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
  background-color: var(--primary);
  border-radius: 3px;
}
.progress-comp small {
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0em;
}
</style>
