<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <resources-list
        name="Cursos"
        :resources="courses"
        :path="'/admin/course/'"
        :subtitle="(course) => course.author"
      />
    </v-flex>
  </v-layout>
</template>

<router>
  {
    path: '/admin/meus-cursos'
  }
</router>

<script>
import courses from '~/services/http/courses';

export default {
  computed: {
    courses () { return this.$store.state.courses.list }
  },
  asyncData: ({ store, data, $axios }) => {
    return courses.getAll().then(response =>
      store.commit('courses/set', response.data)
    )
  }
}
</script>
