<template>
  <div>
    <header-bar :title="'Aula'" :route="`/aluno/curso/${this.slug}`"></header-bar>
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
      
      <v-col id="main">
        <!-- Video Frame -->
        <div id="video-iframe-container">          
          <video-player
          ref="player"
          :youtubeUrl="currentPart.youtubeUrl.replace('watch?v=', 'embed/')"
          :thumbnail="thumbUrl"
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
        <v-tabs-items v-model="selectedTab" id="part-info">
          
          <!-- info -->
          <v-tab-item>
            <h3>{{ currentPart.title }}</h3>
            <h4>{{ currentPart.description }}</h4>
            <v-btn class="btn-block btn-primary" @click="advanceCourse">
              FAZER TESTE
            </v-btn>
          </v-tab-item>

          <!-- comments -->
            <v-tab-item>
              <v-col id="comments">
                <v-row justify='space-between'>
                <h3 class="comments__number">
                  {{ comments.lenth || 0 }} Comentários
                </h3>
                <div 
                :class="'publish-btn pt-4 ' + (commentPost ? 'primary--text' : {})"
                @click="postComment"
                >
                  Publicar
                </div>
                </v-row>
                <v-row  justify="center">
                  <v-avatar size="45">
                    <img v-if="user.photo" :src="user.photo" />
                    <img v-else :src="require(`~/assets/person.svg`)" />
                  </v-avatar>
                  <v-text-field
                    class="light-text-field mt-2 ml-2"
                    placeholder="Escreva seu comentario"
                    outlined
                    v-model="commentPost"
                  ></v-text-field>
                </v-row>
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        v-bind="attrs"
                        v-on="on"
                        class="filter__coments"
                      >
                        Mais recentes 
                        <v-icon>mdi-chevron-down</v-icon>
                      </p>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <hr>
                <div
                v-for="comment in comments" :key="comment.id">
                  <comment-card                    
                    :commentText="comment.text"
                    :user="user"
                    likes="5"
                    commentDate="06/10/2020"
                    
                  ></comment-card> 
                  <hr>
                </div>
                
              </v-col>
            </v-tab-item>
        </v-tabs-items>
      </v-col>
      
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte/:autoPlay?'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import CommentCard from '~/components/Comments';
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
    items: [
      { title: 'Mais recentes' },
      { title: 'Mais atigos' },
      { title: 'Mais aotados' },
      { title: 'Meus Comentarios' },
    ],
  }),
  computed: {
    currentPart() {
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
    slug() {
      return this.$route.params.courseSlug;
    },
    thumbUrl() {
      return this.$store.state.courses.current.thumbUrl;
    }
  },
  mounted() {
    this.getComments();
    this.loading = false;

    //play video if there is an ongoing course
    if(this.$route.params.autoPlay) {
      this.$refs.player.playVideo();
    }
  },
  methods: {
    async getComments() {
      console.log("PARTS.getComments() START")
      await http.getAll(`${process.env.endpoints.COMMENT}/${this.currentPart.id}`)
      .then(res => {
        console.log('COMMENTS::::::', res);
        this.comments = res.data;
      })   
      console.log("PARTS.getComments() END") 
    },
    postComment() {
      console.log("Postou")
      const postBody = {
        partId: this.partId,
        userId: this.idUser,
        text: this.commentPost,
      }
      console.log("VAI POSTAR:", postBody)
      http.post('/api/v1/comment', postBody)
      .then(res => {
        console.log("FOI", res)
      })
      this.getComments();
    },
    advanceCourse() {
      this.loading = true;
      // advancing course step
      http
        .post(
          `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
        )
        .then(() => {
          // cheking if this was the last step of the course
          http
            .getAll(
              `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
            )
            .then(res => {
              // if this has 'COMPLETED' state
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
                    console.log("CurrentStep = Test")
                    this.$store.commit('courses/setCurrentTest', res.data.data);
                    $nuxt._router.push(`/aluno/curso/${this.slug}/aula/teste`);
                  }
                  else if(res.data.type === 'NEW_LESSON') {
                    console.log("CurrentStep = Lesson, id:", res.data.data.id)
                    
                    //get parts of this lesson
                    var parts = [];
                    http.getAll(`${process.env.endpoints.PARTS_BY_LESSON}/${res.data.data.id}`)
                    .then(res => {
                      parts = res.data;
                      console.log(parts);

                      //get data of the first part
                      http.getAll(`${process.env.endpoints.PART_BY_ID}/${parts[0].id}`)
                      .then(res => {
                        this.$store.commit('courses/setCurrentPart', res.data);
                        $nuxt._router.push(`/aluno/curso/${this.slug}/aula/parte/play`);
                      })
                    })                
                  } 
                  else {
                    console.log("CurrentStep = Part")
                    //get part data
                    http.getAll(`${process.env.endpoints.PART_BY_ID}/${res.data.data.id}`)
                    .then(res => {
                      this.$store.commit('courses/setCurrentPart', res.data);
                      $nuxt._router.push(`/aluno/curso/${this.slug}/aula/parte/play`);
                    })
                  }
                });
            });
        });
    },
  },  
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}
hr {
  margin: 0 -36px 0;
  border: 2px solid #f7f7f7;
}
#main {
  padding: 0;
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
  padding: 0 24px;
}
#comments {
  padding-top: 0;
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
.publish-btn {
margin-bottom: 0;
font-size: 12px;
font-weight: 400;
line-height: 18px;
letter-spacing: 0em;
color: #737373;
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


</style>
