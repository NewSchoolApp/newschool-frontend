<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <resources-list
        name="Cursos"
        :resources="courses"
        :subtitle="(course) => course.author"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    courses () { return this.$store.state.courses.list }
  },
  asyncData: ({ store, data, $axios }) =>
    $axios.get('/api/v1/courses')
      .then(res =>
        store.commit('courses/set', res.data.courses)
      )
}
</script>
