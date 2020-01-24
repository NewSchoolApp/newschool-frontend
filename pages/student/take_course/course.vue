<template>
  <div>
    <HeaderBar :title="'Curso'" :back-page="true"></HeaderBar>

    <not-found v-if="notFound" />
    <div v-else>
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
                :src="course.thumbUrl"
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
              class="btn__primary"
              color="#60c"
              :loading="loadingInit"
              :disabled="loadingInit"
              dark
              block
              depressed
              large
              @click="initCourse(course.id)"
              >Iniciar</v-btn
            >
          </main>
        </div>
        <modal
          :dialog-message="dialogMessage"
          :ok="dialogOptions.ok"
          :cancel="dialogOptions.cancel"
          :to-route="dialogOptions.toRoute"
        ></modal>
      </div>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import NotFound from '~/pages/public/404.vue';
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import Modal from '~/components/Modal.vue';
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  components: {
    NavigationBar,
    NotFound,
    Modal,
    HeaderBar,
  },
  data() {
    return {
      idUser: 0,
      slug: '',
      dialogMessage: '',
      dialogOptions: {
        ok: false,
        cancel: false,
        toRoute: false,
      },
      loadingInit: false,
      loading: true,
      notFound: false,
      course: {},
    };
  },
  mounted() {
    this.idUser = this.$store.state.user.data.id;
    this.slug = this.$route.params.slug;
    http
      .getAll(`${process.env.endpoints.COURSE_BY_SLUG}${this.slug}`)
      .then(({ data }) => {
        this.course = data;
        this.loading = false;
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.notFound = true;
          this.loading = false;
          return;
        }
        // eslint-disable-next-line no-console
        console.error(error);
      });
  },
  methods: {
    initCourse(id) {
      if (this.verifyStore(id)) {
        this.dialogOptions.ok = true;
        this.dialogMessage =
          'Você já iniciou esse curso, confira ele na aba "meus curso"';
        this.loadingInit = false;
        utils.runModal();
      } else {
        this.loadingInit = true;
        if (utils.getToken() && this.idUser) {
          http
            .post(process.env.endpoints.INIT_COURSE, {
              user: this.idUser,
              course: id,
            })
            .then(res => {
              this.$store.commit(
                'courses/setCurrentLesson',
                res.data.currentLesson,
              );
              this.$store.commit(
                'courses/setCurrentPart',
                res.data.currentPart,
              );
              this.$store.commit(
                'courses/setCurrentTest',
                res.data.currentTest,
              );

              http
                .getAll(
                  `${process.env.endpoints.STATE_COURSE}/${this.idUser}/${id}`,
                )
                .then(res => {
                  this.$store.commit('courses/setCurrent', res.data.course);
                  delete res.data.user;
                  delete res.data.course;
                  this.$store.commit('courses/setCurrentState', res.data);
                  setTimeout(() => {
                    $nuxt._router.push(`/aluno/curso/${this.slug}/aula/parte`);
                  }, 400);
                });
            })
            .catch(error => {
              this.dialogOptions.ok = true;
              this.dialogMessage =
                error.response.status === 401
                  ? 'Você precisa estar logado para fazer um curso!'
                  : 'Erro ao iniciar o curso, tente novamente';
              setTimeout(() => {
                this.loadingInit = false;
                utils.runModal();
              }, 1000);
            });
        } else {
          setTimeout(() => {
            this.dialogOptions.toRoute = {
              path: '/login',
              name: 'Fazer Login',
            };
            this.dialogOptions.ok = true;
            this.dialogMessage =
              'Você precisa estar logado para fazer um curso! faça o login e tente novamente';
            this.loadingInit = false;
            utils.runModal();
          }, 1000);
        }
      }
    },
    comeBackPage() {
      window.history.go(-1);
    },
    verifyStore(id) {
      this.list.forEach(item => {
        if (item.course.id == id && item.status === 'TAKEN') {
          return true;
        }
      });
      return false;
    },
  },
  computed: {
    list() {
      return this.$store.state.courses.list;
    },
  },
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
  height: 12rem;
  margin-top: 0.5rem;
}
#head__bar {
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  position: relative;
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
::v-deep .btn-back {
  position: absolute;
  left: 1rem;
}
::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 35px;
}
.btn__primary {
  width: 100%;
  margin-top: 2rem;
  font-weight: 700;
  box-shadow: 0px 4px 4px #21212154 !important;
}
.v-progress-circular {
  color: #b2b2b2;
}
.v-btn__loader {
  background-color: #e9e9e9;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #6600cc !important;
}
.theme--light.v-icon {
  color: #ffffff;
  font-size: 3rem;
}
</style>
