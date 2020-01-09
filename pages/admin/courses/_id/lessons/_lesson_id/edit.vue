<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Aula</h1>
      <n-link to="../../edit">Voltar para curso</n-link>
      <v-form>
        <v-text-field
          :value="lesson.title"
          label="Título"
          required
        />
        <v-textarea
          :value="lesson.description"
          label="Descrição"
          required
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Parte"
        :resources="parts"
        path="part/"
      />

    </v-flex>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:id/edit'
  }
</router>

<script>
  import lessons from '~/services/http/lessons'
  import parts from '~/services/http/parts'
  export default {
    async asyncData({ store, data, params }) {
      const lesson = await lessons.getById(params.id)
      const _parts = await parts.getByLesson(params.id)
      return {parts: _parts.data, lesson: lesson.data}
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
