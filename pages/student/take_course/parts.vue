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
                v-if="!posting"
                :class="'publish-btn pt-4 ' + (commentPost ? 'primary--text' : {})"
                @click="postComment"                
                >
                  Publicar
                </div>
                <var v-else class="py-4 pr-5">                  
                  <v-progress-circular
                    class="publish-btn pt-4"
                    indeterminate
                    color="primary"
                    size="20"
                  />
                </var>
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
                    v-on:keyup.enter="postComment"
                  ></v-text-field>
                </v-row>
                <v-row justify="center">
                  <v-select
                    height="10"
                    :items="items"
                    item-value="Mais recentes"
                    value="Mais recentes"
                    @change="sortBy = $event"
                  ></v-select>
                </v-row>
                <hr>
                <div
                v-for="comment in sortedComments" :key="comment.id">
                  <comment-card
                    :comment="comment"
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
    posting: false,
    items: [
      'Mais recentes',
      'Mais atigos',
      'Mais gostados',
      'Meus comentarios',
    ],
    sortBy: 'Mais recentes',
  }),
  computed: {
    currentPart() {
      return this.$store.state.courses.currentPart;
    },
    currentState() {
      return this.$store.state.courses.currentState;
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
      switch(this.sortBy) {
        case 'Mais recentes':
          return this.comments.sort(function (a, b) {
	          return (Date.parse(a.createdAt) < Date.parse(b.createdAt)) ? 1 : -1;
          });
        case 'Mais atigos':
          return this.comments.sort(function (a, b) {
	          return (Date.parse(a.createdAt) > Date.parse(b.createdAt)) ? 1 : -1;
          });
        case 'Mais gostados':
          return this.comments.sort(function (a, b) {
	          return (a.likedBy.length < b.likedBy.length ? 1 : a.likedBy.length > b.likedBy.length ? -1 : 0);
          });
        case 'Meus comentarios':
          return this.comments.filter(comment => comment.userId === this.idUser);        
      }
      
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
      await http.getAll(`${process.env.endpoints.COMMENT}/${this.currentPart.id}`)
      .then(res => {
        console.log('COMMENTS::::::', res);
        this.comments = res.data;
      })
    },
    postComment() {
      if(this.commentPost){
        this.posting = true;

        const postBody = {
          partId: this.currentPart.id,
          userId: this.idUser,
          text: this.commentPost,
        }      
        http.post('/api/v1/comment', postBody)
        .then(res => {
          //refresh comments
          this.getComments();
  
          //clear comment input
          this.commentPost = ''; 

          this.posting = false;
        });
      }     
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

        $nuxt._router.push(currentStep.stepUrl);
      }
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

//sortBy select
::v-deep .v-select {
  margin: 0 !important;
  padding: 0 !important;
  max-width: 155px !important;
  border: 0 !important;
  outline: 0 !important;
  text-align: center !important;
  margin-bottom: -37px !important;
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
</style>
