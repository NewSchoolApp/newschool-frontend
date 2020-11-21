<template>
  <div>
    <header-bar :title="'Aula'" :back-page="true"></header-bar>
    <v-layout id="page" justify-center>
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
      <v-flex v-else ref="flex" class="main-container">
        <div class="inner-container">
          <div class="video-iframe-container">
            <iframe
              width="300"
              height="250"
              :src="part.videoUrl.replace('watch?v=', 'embed/')"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <v-tabs v-model="selectedTab" height="35px">
            <v-tab>
              Informação
            </v-tab>
            <v-tab>
              Dúvidas e Comentários
            </v-tab>
          </v-tabs>
          <div v-if="selectedTab === 0" class="text__information">
            <h3>{{ part.lessonTitle }}</h3>
            <h4>{{ description }}</h4>
            <v-btn class="btn-block btn-primary" @click="advanceCourse">
              FAZER TESTE
            </v-btn>
          </div>
          <div v-else class="comments">
            <h3 class="comments__number">
              10 Comentários
            </h3>
            <v-row justify="center mt-2">
              <v-avatar size="44">
                <img v-if="user.photo" :src="user.photo" />
                <img v-else :src="require(`~/assets/person.svg`)" />
              </v-avatar>
              <v-text-field
                class="input__data mt-2 ml-2"
                placeholder="Escreva seu comentario"
                outlined
              ></v-text-field>
            </v-row>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <p
                    v-bind="attrs"
                    v-on="on"
                    class="
              filter__coments"
                  >
                    Mais recentes <img src="~/assets/arrow_down.svg" alt="" />
                  </p>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <comment-card
              commentText="Qual melhor time de Tech do Brasil?"
              :user="user"
              likes="5"
              commentDate="06/10/2020"
              :responses="responses"
            ></comment-card>
          </div>
        </div>
      </v-flex>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import CommentCard from '~/components/Comments';
import utils from '~/utils/index';
import http from '~/services/http/generic';
import CertificateCard from '~/components/CertificateCard.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    CommentCard,
    CertificateCard,
  },
  data: () => ({
    urlVideo: '',
    description: '',
    selectedTab: 0,
    partId: '',
    loading: true,
    items: [
      { title: 'Mais recentes' },
      { title: 'Mais atigos' },
      { title: 'Mais aotados' },
      { title: 'Meus Comentarios' },
    ],
    responseUser: {
      photo:
        'https://newschool-dev.s3.us-east-2.amazonaws.com/17954a42-8132-481e-bc38-508aefe7a996/profile.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201119%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201119T035211Z&X-Amz-Expires=900&X-Amz-Signature=a879de0ff9f0a4f7eda52940f7f9261aec9e242f38650a1e4e680982dbacd065&X-Amz-SignedHeaders=host',
      points: '132',
      rank: '2',
      userId: '17954a42-8132-481e-bc38-508aefe7a996',
      userName: 'Henrry',
    },
    responses: [
      {
        photo:
          'https://newschool-dev.s3.us-east-2.amazonaws.com/b406aee7-065f-4ea4-a46b-34fe34d70b8f/leo.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201119%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201119T140637Z&X-Amz-Expires=900&X-Amz-Signature=772e30996f3ed979e2437ac04352b49c75b3e2c251cdc67a03178a204c2584b8&X-Amz-SignedHeaders=host',
        points: '132',
        rank: '2',
        userId: '17954a42-8132-481e-bc38-508aefe7a996',
        userName: 'Leonardo',
        comment: 'Microsoft',
      },
      {
        photo:
          'https://newschool-dev.s3.us-east-2.amazonaws.com/b406aee7-065f-4ea4-a46b-34fe34d70b8f/leo.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201119%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201119T140637Z&X-Amz-Expires=900&X-Amz-Signature=772e30996f3ed979e2437ac04352b49c75b3e2c251cdc67a03178a204c2584b8&X-Amz-SignedHeaders=host',
        points: '132',
        rank: '2',
        userId: '17954a42-8132-481e-bc38-508aefe7a996',
        userName: 'Henrry',
        comment: 'Corinthians',
      },
      {
        photo:
          'https://newschool-dev.s3.us-east-2.amazonaws.com/b406aee7-065f-4ea4-a46b-34fe34d70b8f/leo.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV56KXRILVMG6BB2Q%2F20201119%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20201119T140637Z&X-Amz-Expires=900&X-Amz-Signature=772e30996f3ed979e2437ac04352b49c75b3e2c251cdc67a03178a204c2584b8&X-Amz-SignedHeaders=host',
        points: '132',
        rank: '2',
        userId: '17954a42-8132-481e-bc38-508aefe7a996',
        userName: 'Mayara',
        comment: 'New School, claro',
      },
    ],
  }),
  computed: {
    part() {
      return this.$store.state.courses.currentPart;
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
  },
  created() {
    this.getCourse();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    async getCourse() {
      const parts = await http.getAll(
        `${process.env.endpoints.PART_BY_LESSON}/${this.part.id}`,
      );

      const lessons = await http.getAll(
        `${process.env.endpoints.LESSONS_BY_COURSE}${this.courseId}`,
      );
      const currentLessonData = await lessons.data.filter(
        data => data.title === this.part.lessonTitle,
      );
      const responsePart = parts.data.filter(part => part.videoUrl === this.part.youtubeUrl)
      console.log(responsePart)
      this.partId = responsePart[0].id

      console.log(this.partId)
      this.description = currentLessonData[0].description;
      this.getComments();

    },
    async getComments() {
      const comments = await http.getAll(
        `${process.env.endpoints.COMMENT}/${this.partId}`,
      );
      console.log(comments)
    },
    advanceCourse() {
      this.loading = true;
      // avançando no curso
      http
        .post(
          `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
        )
        .then(() => {
          // Atualizando o estado do curso
          http
            .getAll(
              `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
            )
            .then(res => {
              // Verificando se já concluiu
              if (res.data.status === 'COMPLETED') {
                delete res.data.user;
                delete res.data.course;
                delete res.data.currentLesson;
                delete res.data.currentPart;
                delete res.data.currentTest;
                this.$store.commit('courses/setCurrentState', res.data);
                $nuxt._router.push(`/aluno/curso/${this.slug}/fim`);
              }

              // caso não houver concluído, salva o estado atual
              this.$store.commit('courses/setCurrent', res.data.course);
              delete res.data.user;
              delete res.data.course;
              this.$store.commit('courses/setCurrentState', res.data);

              // Verificando qual o próximo passo
              http
                .getAll(
                  `${process.env.endpoints.CURRENT_STEP}/user/${this.idUser}/course/${this.courseId}`,
                )
                .then(res => {
                  if (res.data.type === 'NEW_TEST') {
                    this.$store.commit('courses/setCurrentTest', res.data.data);
                    $nuxt._router.push(`parte/teste`);
                  } else {
                    this.$store.commit('courses/setCurrentPart', res.data.data);
                  }
                });
            });
        });
    },
  },
  head() {
    return {
      title: this.part.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Assista as video-aulas para conseguir responder ao testes e avançar no curso! - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
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
  margin-top: 24px;
  font-size: 12px;
  font-weight: 700;
  color: #1a1a1a;
}
.filter__coments {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #3f3d56;
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

.text__information {
  margin-top: 24px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2em 78px;
}

::v-deep .v-input {
  width: 75%;
}

.inner-container {
  margin-top: 0.5rem;
}
::v-deep ::placeholder {
  color: rgba(26, 26, 26, 0.24) !important;
}

::v-deep.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  min-height: 0 !important;
}
::v-deep .v-tabs-slider-wrapper {
  height: 4px !important;
  color: var(--primary-light);
}
::v-deep .v-tab {
  margin-top: 5px;
  font-size: 11px !important;
  line-height: 16px;
  font-weight: 400;
  color: black;
  text-transform: none;
  border-bottom: 4px solid #f5f5f5;
}
// force initial active tab to be selected
::v-deep .v-tab--active {
  border-bottom: 4px solid var(--primary-light);
}
::v-deep .v-tabs {
  max-height: 32px;
}
/* ::v-deep .v-input__control {
  height: 0 !important;
}
::v-deep .v-input__slot {
  min-height: 32px !important;
}
::v-deep #input-236 {
  top: -9px;
  position: relative;
} */

.video-iframe-container {
  background-color: black;
  margin-top: 0.75em;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
