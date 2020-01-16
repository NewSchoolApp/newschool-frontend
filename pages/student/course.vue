<template>
  <div>
    <HeaderBar :title="'Curso'" :backPage="true"></HeaderBar>

    <div v-if="loading">
      <client-only>
        <navigation-bar />
      </client-only>
    </div>
    <not-found v-else-if="notFound" />
    <div v-else-if="!notFound">
      <div id="page">
        <main>
          <h1 id="title__course" class="h1__theme">{{ course.title }}</h1>
          <div class="mask__img">
            <img :src="course.thumbUrl" alt="imagem-curso" title="imagem curso" />
          </div>
          <div class="info__box">
            <section>
              <h1 class="h1__theme">Professor&nbsp;&nbsp;</h1>
              <p id="author__name">{{ course.author }}</p>
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
            @click="initCourse"
          >Iniciar</v-btn>
        </main>
      </div>
      <modal
        :dialogMessage="dialogMessage"
        :ok="dialogOptions.ok"
        :cancel="dialogOptions.cancel"
        :toRoute="dialogOptions.toRoute"
      ></modal>
      <client-only>
        <navigation-bar />
      </client-only>
    </div>
  </div>
</template>

<router>
  {
    path: '/curso/:slug',
    name: 'aluno-curso',
    props: true
  }
</router>

<script>
import NotFound from "../public/404.vue";
import NavigationBar from "~/components/NavigationBar.vue";
import HeaderBar from "~/components/Header.vue";
import Modal from "~/components/Modal.vue";
import http from "~/services/http/generic";
import utils from "~/utils/index";

export default {
  components: {
    NavigationBar,
    NotFound,
    Modal,
    HeaderBar
  },
  data() {
    return {
      dialogMessage: "",
      dialogOptions: {
        ok: false,
        cancel: false,
        toRoute: false
      },
      loadingInit: false,
      loading: true,
      notFound: false,
      course: {
        id: "4e4884dd-535c-41cc-8aee-32f4164a1fc6",
        title: "Fotografia na raça",
        description:
          "Tá afim de tirar aquela foto para postar nas mídias? Então já sabe o que fazer",
        thumbUrl: "http://i.imgur.com/SrPdUD4.png",
        slug: "fotografia-na-raca",
        author: "Felipe Andrews"
      }
    };
  },
  mounted() {
    const { slug } = this.$route.params;
    http
      .getAll(`${process.env.endpoints.COURSE_BY_SLUG}${slug}`)
      .then(({ data }) => {
        const { id, authorId, description, slug, thumbUrl, title } = data;
        this.course = { id, authorId, description, slug, thumbUrl, title };
        this.loading = false;
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // this.notFound = true;
          this.loading = false;
          return;
        }
        // eslint-disable-next-line no-console
        console.error(error);
      });
    this.loading = false;
  },
  methods: {
    initCourse() {
      this.loadingInit = true;
      if (utils.getToken()) {
        http
          .post(`${process.env.endpoints.INIT_COURSE}/${this.course.slug}`)
          .then(res => {
            // TODO : Implementação de iniciar curso
          })
          .catch(error => {
            this.dialogOptions.ok = true;
            this.dialogMessage =
              error.response.status === 401
                ? "Você precisa estar logado para fazer um curso!"
                : "Erro ao iniciar o curso, tente novamente";
            setTimeout(() => {
              this.loadingInit = false;
              utils.runModal();
            }, 1000);
          });
      } else {
        setTimeout(() => {
          this.dialogOptions.toRoute = { path: "/login", name: "Fazer Login" };
          this.dialogOptions.ok = true;
          this.dialogMessage =
            "Você precisa estar logado para fazer um curso! faça o login e tente novamente";
          this.loadingInit = false;
          utils.runModal();
        }, 1000);
      }
    },
    comeBackPage() {
      window.history.go(-1);
    }
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
