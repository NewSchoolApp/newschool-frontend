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

      <p>Course {{ course.title }}</p>
      <p>id: {{ course.id }}</p>
      <p>authorId: {{ course.authorId }}</p>
      <p>description: {{ course.description }}</p>
      <p>slug: {{ course.slug }}</p>
      <p>thumbUrl: {{ course.thumbUrl }}</p>
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
        slug: "fotografia-na-raca"
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
#head__bar {
  display: flex;
  justify-content: center;
  padding-top: 15px;
  height: 3.4rem;
  position: relative;
}
::v-deep .btn-back {
  position: absolute;
  left: 3rem;
  top: 0.566666rem;
  margin-top: 3px;
}
::v-deep .btn-back .theme--light.v-icon {
  color: #60c;
  font-size: 35px;
}
</style>
