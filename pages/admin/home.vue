<template>
  <main id="page" class="max-content">
    <header class="welcome">
      <h1 class="welcome-title">{{ 'Olá ' + user.name }}</h1>
      <h2 class="welcome-subtitle">Seja bem vindo</h2>
    </header>

    <h3 class="title-section">CURSOS</h3>
    <article class="article-container">
      <course-card
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </article>
    <client-only>
      <navigation-bar />
    </client-only>
  </main>
</template>

<router>
  {
    path: '/admin/home',
    name: "admin-home"
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
    CourseCard,
  },
  data: () => ({
    title: 'Bem-vindo',
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
    courses() {
      return this.$store.state.courses.all;
    },
  },
  mounted() {
    this.getAllCourses();
    this.getMyCourses();
  },
  methods: {
    loadUserName() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user.name = storedUser.name.split(' ')[0];
      }
    },
    getAllCourses() {
      http.getAll(process.env.endpoints.COURSE).then(({ data }) => {
        this.$store.commit('courses/setAll', data);
        this.loading = false;
      });
    },
    getMyCourses() {
      http
        .getAll(`${process.env.endpoints.MY_COURSES}${this.user.id}`)
        .then(({ data }) => {
          this.$store.commit('courses/setMy', data);
        });
    },
  },
};
</script>

<style scoped>
.welcome {
  padding: 1em 0 0 1.5em;
}

.welcome-title {
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 4px;
  color: #1a1a1a;
}

.welcome-subtitle {
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
  color: var(--primary);
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
    overflow-x: auto;
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
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.title-section {
  font-weight: 900;
  line-height: 17px;
  color: var(--primary);
  padding: 1.25em 0 0.5em 1.5em;
  text-transform: uppercase;
}
</style>
