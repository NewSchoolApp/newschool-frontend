<template>
  <main class="max-content" id="page">
    <header class="welcome">
      <h1 class="welcome-title">{{ "Salve, " + loadUserName()+ "!"}}</h1>
      <h2 class="welcome-subtitle">Seja bem-vindo</h2>
    </header>

    <h3 class="title-section">CURSOS</h3>

    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular :size="70" :width="5" indeterminate color="#6600cc" />
      </div>
    </div>
    <article v-else class="article-container">
      <course-card
        :key="course.id"
        v-for="course in list"
        :title="course.title"
        :description="course.description"
        :teacher="course.authorName"
        :image="course.thumbUrl"
        :slug="course.slug"
      />
    </article>
  </main>
</template>

<script>
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';

export default {
  components: {
    CourseCard,
  },
  data: () => ({
    title: 'Bem-vindo',
    list: [],
    loading: true,
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Seja bem vindo(a) ao aplicativo da New School - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
  methods: {
    loadUserName() {
      return this.user.name.split(' ')[0];
    },
  },
  mounted() {
    return http.getAll(process.env.endpoints.COURSE).then(res => {
      this.list = res.data;
      this.loading = false;
    });
  },
  asyncData({ store, data, params, $axios }) {
    return http
      .getAll(`${process.env.endpoints.MY_COURSES}${store.state.user.data.id}`)
      .then(response => store.commit('courses/set', response.data));
  },
};
</script>

<style scoped>
#page {
  height: 100vh;
}

.welcome {
  padding: 2em 0 0 1.5em;
  text-transform: uppercase;
}

h1 {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 24px;
}
.welcome-title {
  color: #1a1a1a;
}

.welcome-subtitle {
  color: var(--primary);
  font-size: 1.1rem;
}

@media screen and (orientation: portrait) {
  .article-container {
    flex-flow: column wrap;
  }

  @media (min-width: 27.5em) {
    .article-container {
      flex-flow: row wrap;
      padding: 0 1em 56px 1.5em;
    }
  }
}

@media screen and (orientation: landscape) {
  .article-container {
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    margin: 0 2em 56px 1.5em;
    padding: 0;
  }

  @media (min-width: 48em) {
    .article-container {
      flex-flow: row wrap;
      margin: 0;
    }
  }
}

@media (min-width: 48em) {
  .welcome {
    padding-top: 2em;
  }

  .welcome-title {
    font-size: 2em;
    line-height: 0.8em;
  }

  .welcome-subtitle {
    font-size: 1.3em;
  }
}

.article-container {
  display: flex;
  max-width: 100vw;
  padding: 0 2em 56px 1.5em;
}

.max-content {
  max-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.title-section {
  font-weight: 900;
  font-size: 0.9rem;
  line-height: 17px;
  color: var(--primary);
  padding: 1.25em 0 0.5em 1.6em;
  text-transform: uppercase;
}
</style>
