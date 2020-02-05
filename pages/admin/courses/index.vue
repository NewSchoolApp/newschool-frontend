<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" xs10 sm8 md4>
      <resources-list
        name="Cursos"
        redirect="true"
        :resources="courses"
        :path="'/admin/course'"
        :subtitle="(course) => course.author"
      />
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/meus-cursos'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue"
import courses from '~/services/http/courses';

export default {
  components: {
    NavigationBar
  },
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
