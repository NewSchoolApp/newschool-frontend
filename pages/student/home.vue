<template>
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
  <div id="page" v-else>
    <v-col id="main-col" justify="center">
      <v-row justify="end">
        <v-icon id="bell">mdi-bell-ring-outline</v-icon>
      </v-row>

      <!-- Header-bar -->
      <v-row id="header" align="center">
        <v-avatar size="55">
          <img :src="require(`@/assets/avatarTeste.png`)" />
        </v-avatar>

        <v-col>
          <h1 class="welcome-title">
            {{ 'Salve, ' + loadUserName() + '!' }}
          </h1>
          <h1 class="welcome-subtitle">Seja bem-vindo</h1>
        </v-col>

        <h1 class="xp">100 XP</h1>
      </v-row>

      <!-- Search Field -->
      <v-row>
        <v-text-field
          label="Encontre Cursos"
          outlined
          prepend-inner-icon="mdi-magnify"
          v-model="filtro"
          autocomplete="off"
        />
      </v-row>

      <!-- Course Title -->
      <v-row>
        <p id="title">Cursos</p>
      </v-row>

      <!-- Course Cards  -->
      <v-row>
        <course-card
          :key="course.id"
          v-for="course in filteredList"
          :title="course.title"
          :description="course.description"
          :teacher="course.authorName"
          :image="course.thumbUrl"
          :slug="course.slug"
        />
      </v-row>
    </v-col>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';
import Avatar from 'vue-avatar';

export default {
  components: {
    CourseCard,
    Avatar,
  },
  data: () => ({
    title: 'Bem-vindo',
    list: [],
    loading: true,
    filtro: '',
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
    filteredList() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.list.filter(course => exp.test(course.title));
      } else {
        return this.list;
      }
    },
  },
  watch: {
    filtro: function() {
      console.log(this.filtro);
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

#page {
  display: flex;
  justify-content: center;  
}

#main-col {
  padding: 20px 24px 50px 24px;
  max-width: 700px;
}

::v-deep .row {
  width: 100%;
  margin: 0;
}

#title {
  color: var(--primary);
  line-height: 16.4px;
  font-weight: 900;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

/* especificações gerais da fonte do label e do valor */
::v-deep .v-label,
::v-deep .v-input input {
  font-size: .87rem !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.25) !important;
  font-family: 'Montserrat', sans-serif;
}

/* cor especifica do valor */
::v-deep .v-input input {
  color: rgba(0, 0, 0, 0.5) !important;
}

/* tirar a margin inferior */
::v-deep .v-input__slot {
  margin-bottom: 0;
  margin-bottom: 10px !important;
}

/* cor e aspecto da borda */
::v-deep fieldset {
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

/* margin superior */
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 16px 0 0 !important;
}

/* define a altura do campo de input */
::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 48px;
}

/* centraliza o label */
::v-deep .v-input:not(.v-input--is-focused) > .v-input__control > .v-input__slot > .v-text-field__slot > .v-label {
  /* display: contents; */
  line-height: 12px;
} 

/* container do icon: tira margin de cima, aplica um distanciamento do label e alinha ao centro do campo */
 ::v-deep .v-text-field--enclosed .v-input__prepend-inner {
  margin-top: 0;
  /* padding-right: 11.5px; */
  align-self: center;
} 

/* margin lateral do conteudo do campo */
::v-deep
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 19px;
}

::v-deep .theme--light.v-icon {
  color: rgba(0, 0, 0, 0.9);
}

/* .theme--light.v-icon {
  color: none;
} */

#header {
  height: auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.welcome {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 24px;
}

.xp {
  font-weight: 400;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.5);
  flex: center;
}

.welcome-title {
  color: #1a1a1a;
  font-size: .87rem;
  font-weight: 900;
}

.welcome-subtitle {
  line-height: 10px;
  color: var(--primary);
  font-size: .75rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
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
