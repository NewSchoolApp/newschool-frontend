<template>
  <div>
    <HeaderBar :title="'Curso'" :back-page="true"></HeaderBar>    
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
    <div v-else>
      <div id="page">
        <main>
          <h1 id="title__course" class="h1__theme">{{ course.title }}</h1>
          <div class="mask__img">
            <img
              v-if="showThumb"
              :src="course.thumbUrl"
              @error="imageLoadError"
              alt="imagem-curso"
              title="imagem curso"
            />
          </div>
          <div class="info__box">
            <section>
              <h1 class="h1__theme">Professor&nbsp;&nbsp;</h1>
              <p id="author__name">{{ course.authorName }}</p>
            </section>
            <p id="description">{{ course.description }}</p>
          </div>
          <v-btn
          v-if="courseState == 'TAKEN'"
          class="btn-block btn-primary"
          :loading="loadingInit"
          :disabled="loadingInit"
          @click="continueCourse()"
          >
            Continuar
          </v-btn>
          <v-btn
          v-else-if="courseState == 'COMPLETED'"
          class="btn-block btn-primary"
          :loading="loadingInit"           
          @click="goToCertificate()"
          >
            Certificado
          </v-btn>
          <v-btn
          v-else
          class="btn-block btn-primary"
          :loading="loadingInit"
          :disabled="loadingInit"              
          @click="startCourse()"
          >
            Iniciar
          </v-btn>
        </main>
      </div>      
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>
<router>
  {
    path: '/aluno/curso/:courseSlug'
  }
</router>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data() {
    return {
      showThumb: true,
      loading: true,
      loadingInit: false,
      courseState: '',
    };
  },
  computed: {
    course() {
      return this.$store.state.courses.current;
    },
    idUser() {
      return this.$store.state.user.data.id;
    }
  },
  methods: {
    checkCurrentState() {
      this.$store.state.courses.my.forEach(myCourse => {
        if (myCourse.course.id === this.course.id) {
          this.courseState = myCourse.status;
        }        
      });
      this.loading = false;  
    },
    imageLoadError() {
      this.showThumb = false;
    },
    startCourse() {
      this.loadingInit = true;

      http
        .post(process.env.endpoints.INIT_COURSE, {
          userId: this.idUser,
          courseId: id,
        })
        .then(() => {
          http
            .getAll(
              `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${id}`,
            )
            .then(res => {
              this.$store.commit('courses/setCurrent', res.data.course);
              delete res.data.user;
              delete res.data.course;
              this.$store.commit('courses/setCurrentState', res.data);

              http
                .getAll(
                  `${process.env.endpoints.CURRENT_STEP}/user/${this.idUser}/course/${id}`,
                )
                .then(res => {
                  this.$store.commit(
                    'courses/setCurrentPart',
                    res.data.data,
                  );
                });

              setTimeout(() => {
                console.log("%%%  INIT Course %%%")
                $nuxt._router.push(`/aluno/curso/${id}/aula/parte`);
              }, 400);
            });
            })
        .catch(error => {
          this.$notifier
          .showMessage({
            type: 'error',
            message: 'Vish algo deu errado, tenta de novo mano!',
          });
          setTimeout(() => {
            $nuxt._router.push('/aluno/home');
          }, 2000);          
        });        
    },
    continueCourse() {
      this.loadingInit = true;
      http
        .getAll(
          `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${this.course.id}`,
        )
        .then(res => {
          console.log("continueCourse()", res)
          console.log("res.data", res.data)
          console.log("res.data.course", res.data.course)
          // salvando o estado atual
          this.$store.commit('courses/setCurrent', res.data.course);
          delete res.data.user;
          delete res.data.course;
          this.$store.commit('courses/setCurrentState', res.data);

          // Verificando qual o próximo passo
          http
            .getAll(
              `${process.env.endpoints.CURRENT_STEP}/user/${this.idUser}/course/${this.course.id}`,
            )
            .then(res => {
              console.log("Current_Step", res.data)
              if (res.data.type === 'NEW_TEST') {
                console.log("CurrentStep = Test")
                this.$store.commit('courses/setCurrentTest', res.data.data);
                $nuxt._router.push(
                  `/aluno/curso/${this.slug}/aula/teste`,
                );
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
                    $nuxt._router.push(`/aluno/curso/${this.slug}/aula/parte`);
                  })
                })                
              } 
              else {
                console.log("CurrentStep = Part")
                //get part data
                http.getAll(`${process.env.endpoints.PART_BY_ID}/${res.data.data.id}`)
                .then(res => {
                  this.$store.commit('courses/setCurrentPart', res.data);
                  $nuxt._router.push(`/aluno/curso/${this.slug}/aula/parte`);
                })
              }
            });
        });
    },
    goToCertificate() {
      // eslint-disable-next-line no-undef
      $nuxt._router.push(
        `/certificado-info/${this.$store.state.user.data.id}/${this.course.id}`,
      );
    },
  },
  mounted() {
    this.checkCurrentState();
  }  
};
</script>

<style scoped lang="scss">
  h1 {
    font-size: 1rem;
  }
  main {
    padding: 0rem 1.6rem;
  }
  .mask__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    height: 15rem;
    margin-top: 0.5rem;

    img {
      width: 100%;
    }
  }
  .info__box {
    display: flex;
    margin-top: 0.6rem;
    flex-direction: column;
  }
  .info__box section {
    width: 100%;
    display: flex;
    align-items: center;
  }
  #author__name {
    font-size: 0.8555rem;
    font-weight: 600;
    margin-bottom: 0;
  }
  #description {
    margin-top: 0.5rem;
    color: gray;
    font-size: smaller;
    text-align: justify;
  }
  .v-progress-circular {
    color: #b2b2b2;
  }
  .v-btn__loader {
    background-color: #e9e9e9;
  }
  #page {
    margin-bottom: 5rem !important;
  }
</style>
