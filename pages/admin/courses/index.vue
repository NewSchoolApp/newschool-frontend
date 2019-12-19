<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Cursos</h1>
      <div v-for="course in courses" v-bind:key="course.id" class="course">
        <div class="course__info">
          <h2 class="course__title">{{ course.title }}</h2>
          <p class="course__author">{{ course.author }}</p>
        </div>
        <div class="actions">
          <nuxt-link v-bind:to="editLink(course)">Editar</nuxt-link>
          <nuxt-link v-bind:to="deleteLink(course)">Excluir</nuxt-link>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Axios from 'axios'

export default {
  computed: {
    courses () { return this.$store.state.courses.list }
  },
  asyncData: ({ store, data }) =>
    Axios.get('http://localhost:3030/api/v1/courses')
      .then(res =>
        store.commit('courses/set', res.data.courses)
      ),
  methods: {
    editLink: course => `courses/${course.id}/edit`,
    deleteLink: course => `courses/${course.id}/delete`
  }
}

</script>

<style scoped>
h1 {
  font-family: Montserrat;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  color: #6600CC;
}

.course {
  border-bottom: 1px solid #e3e0e6;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.course__title {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #1A1A1A;
}

.course__author {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #1A1A1A;
  margin: 0;
}

.actions {
  min-width: 120px;
  display: flex;
  align-items: center;
}

.actions a {
  margin-left: 16px;
}
.actions a:first-child {
  margin-left: 0;
}
</style>
