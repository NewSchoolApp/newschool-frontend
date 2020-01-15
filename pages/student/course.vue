<template>
  <div v-if="loading">
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
  <not-found v-else-if="notFound" />
  <div v-else-if="!notFound">
    <div id="page">
      <div id="head__bar">
        <v-btn class="btn-back" text icon @click="gotoBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="h1__theme">Curso</h1>
      </div>
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
        <v-btn class="btn__primary" color="#60c" dark block depressed large>Iniciar</v-btn>
      </main>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
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
import courses from "~/services/http/courses";

export default {
  components: {
    NavigationBar,
    NotFound
  },
  data() {
    return {
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
    courses
      .getBySlug(slug)
      .then(({ data }) => {
        const { id, authorId, description, slug, thumbUrl, title } = data;
        this.course = { id, authorId, description, slug, thumbUrl, title };
        this.loading = false;
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // this.notFound = true;
          // this.loading = false;
          return;
        }
        // eslint-disable-next-line no-console
        console.error(error);
      });
    this.loading = false;
  }
};
</script>

<style scoped lang="scss">
main {
  padding: 1.6rem;

  h1 {
    font-size: 1rem;
  }
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
  padding-top: 15px;
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
  font-weight: 500;
}

#description {
  margin-top: 1.5rem;
  color: gray;
  font-size: smaller;
  text-align: justify;
}
::v-deep .btn-back {
  position: absolute;
  left: 1.5rem;
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
</style>
