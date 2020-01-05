<template>
  <main class="max-content">
    <header class="welcome">
      <h1 class="welcome-title">{{'Olá ' + user.name}}</h1>
      <h2 class="welcome-subtitle">Seja bem vindo</h2>
    </header>

    <article>
      <h3 class="titleSection">CURSOS</h3>
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
        <h3 class="titleSection">{{category.name}}</h3>
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
    this.getUser();
  },
  asyncData({ store, data, params, $axios }) {
    const coursesPromise = courses.getAll().then(response =>
      store.commit('courses/set', response.data)
    )
    return Promise.resolve(coursesPromise)
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
.max-content{
  max-height: 100vh;
  padding-bottom: 56px;
  overflow-y: auto;
  width: 100%;
  max-width: 860px;
  box-sizing: border-box;
  margin: 0 auto;
}

.welcome{
  padding: 16px 34px 0;
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

.titleSection{
  font-weight: 900;
  font-size: 14px;
  line-height: 17px;
  color: #6600CC;
  padding: 20px 34px 10px;
  text-transform: uppercase;
}

</style>
