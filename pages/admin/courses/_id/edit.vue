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
          label="Professor"
          required
        />
        <v-textarea
          :value="course.authorInfo"
          label="Biografia do professor"
          required
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Aula"
        :resources="lessons"
        path="lesson/"
      />
    </v-flex>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:id/edit'
  }
</router>

<script>
  import courses from '~/services/http/courses'
  import lessons from '~/services/http/lessons'
  export default {
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
