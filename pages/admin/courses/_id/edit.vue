<template>
  <v-layout justify-center id="page">
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
          rows="1"
        />
        <v-text-field
          :value="course.author"
          label="Professor"
          required
        />
        <v-textarea
          :value="course.authorInfo"
          label="Biografia do professor"
          required
          rows="1"
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Aula"
        redirect="true"
        :resources="lessons"
        path="lesson"
      />
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:id/edit'
  }
</router>

<script>
  import NavigationBar from "~/components/NavigationBar.vue"
  import courses from '~/services/http/courses'
  import lessons from '~/services/http/lessons'

  export default {
    components: {
      NavigationBar
    },
    async asyncData({ store, data, params}) {
      const course = await courses.getById(params.id)
      const _lessons = await lessons.getByCourse(params.id)
      return {course: course.data, lessons: _lessons.data}
    }
  }
</script>

<style scoped>
h1 {
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  color: #6600CC;
}
</style>
