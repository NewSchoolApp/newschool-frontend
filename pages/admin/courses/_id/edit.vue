<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando curso</h1>
      <v-form>
        <v-text-field
          :value="course.title"
          label="Título"
          required
        />
        <v-textarea
          :value="course.description"
          label="Descrição"
          required
        />
        <v-text-field
          :value="course.author"
          label="Título"
          required
        />
        <v-textarea
          :value="course.authorInfo"
          label="Descrição"
          required
        />
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      course() {
        return this.$store.state.courses.current
      }
    },
    asyncData({ store, data, params, $axios }) {
      return $axios.get(`http://localhost:3030/api/v1/courses/${params.id}`)
        .then(res =>
          store.commit('courses/setCurrent', res.data.course)
        )
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

</style>
