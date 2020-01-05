<template>
  <main class="max-content" id="page">
    <header class="welcome">
      <h1 class="welcome-title">{{'Olá ' + user.name}}</h1>
      <h2 class="welcome-subtitle">Seja bem vindo</h2>
    </header>

    <h3 class="title-section">CURSOS</h3>
    <article class="article-container">
      <course-card
        :key="course.id"
        v-for="course in courses"
        :title="course.title"
        :teacher="course.authorId"
        :image="course.thumbUrl"
      />
    </article>
    <client-only>
      <navigation-bar />
    </client-only>
  </main>
</template>

<!--<template>
  <main class="max-content">
      <header class="welcome">
        <h1 class="welcome-title">Olá joão</h1>
        <h2 class="welcome-subtitle">Seja bem vindo</h2>
      </header>

      <article :key="category.name" v-for="category in categoryCourses">
        <h3 class="title-section">{{category.name}}</h3>
        <horizontal-scroll :horizontalPadding="34" :gap="20">
          <course-card
            v-for="course in category.courses"
            :key="course.id"
            :title="course.name"
            :teacher="course.teacher"
            :image="course.image"
          />
        </horizontal-scroll>
      </article>
    <client-only>
      <navigation-bar />
    </client-only>
  </main>
</template>-->

<router>
  {
    path: '/aluno/home'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue";
// import HorizontalScroll from "~/components/HorizontalScroll.vue";
import CourseCard from "~/components/CourseCard";
import courses from '~/services/http/courses';

export default {
  components: {
    NavigationBar,
    CourseCard
  },
  data: () => ({
    user: {
      name: ''
    }
  }),
  computed: {
    courses() {
      return this.$store.state.courses.list
    }
  },
  methods: {
    loadUserName() {
      let storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        this.user = storedUser;
        this.user.name = this.user.name.split(' ')[0]
      }
    }
  },
  mounted() {
    this.loadUserName();
  },
  asyncData({ store, data, params, $axios }) {
    return courses.getAll().then(response =>
      store.commit('courses/set', response.data)
    )
  }


  // data: () => ({
  //   categoryCourses:[{
  //     name: "Cursos",
  //     courses:[
  //       {
  //         id:1,
  //         name: "Curso 1",
  //         teacher: "Gustavo Raña",
  //         image: "http://i.imgur.com/SrPdUD4.png"
  //       },
  //       {
  //         id:2,
  //         name: "Curso 2",
  //         teacher: "Mateus Vinicius",
  //         image: "https://s31450.pcdn.co/wp-content/uploads/2015/10/iStock_computer-art.151110.jpg"
  //       },
  //       {
  //         id:3,
  //         name: "Curso 3",
  //         teacher: "Patricia Camarões",
  //         image: "http://i.imgur.com/SrPdUD4.png"
  //       },
  //     ]
  //   },
  //   {
  //     name: "Cursos top",
  //     courses:[
  //       {
  //         id:4,
  //         name: "Curso 1",
  //         teacher: "Gustavo Raña",
  //         image: "https://ugc.futurelearn.com/uploads/images/41/22/regular_4122fa44-6ac3-4c39-ba9b-29a7160e763b.jpg"
  //       },
  //       {
  //         id:5,
  //         name: "Curso 2",
  //         teacher: "Mateus Vinicius",
  //         image: "https://s31450.pcdn.co/wp-content/uploads/2015/10/iStock_computer-art.151110.jpg"
  //       },
  //       {
  //         id:6,
  //         name: "Curso 3",
  //         teacher: "Patricia Camarões",
  //         image: "http://i.imgur.com/SrPdUD4.png"
  //       },
  //     ]
  //   },
  //   {
  //     name: "Cursos mais vistos",
  //     courses:[
  //       {
  //         id:7,
  //         name: "Curso 1",
  //         teacher: "Gustavo Raña",
  //         image: "https://s31450.pcdn.co/wp-content/uploads/2015/10/iStock_computer-art.151110.jpg"
  //       },
  //       {
  //         id:8,
  //         name: "Curso 2",
  //         teacher: "Mateus Vinicius",
  //         image: "https://ugc.futurelearn.com/uploads/images/41/22/regular_4122fa44-6ac3-4c39-ba9b-29a7160e763b.jpg"
  //       },
  //       {
  //         id:9,
  //         name: "Curso 3",
  //         teacher: "Patricia Camarões",
  //         image: "http://i.imgur.com/SrPdUD4.png"
  //       },
  //     ]
  //   },
  //   ]
  // }),
};
</script>

<style scoped>
.welcome{
  padding: 1em 0 0 1.5em;
}

.welcome-title{
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 4px;
  color: #1A1A1A;
}

.welcome-subtitle{
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
  color: #6600CC;
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

.max-content{
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.title-section{
  font-weight: 900;
  line-height: 17px;
  color: #6600CC;
  padding: 1.25em 0 0.5em 1.5em;
  text-transform: uppercase;
}

</style>
