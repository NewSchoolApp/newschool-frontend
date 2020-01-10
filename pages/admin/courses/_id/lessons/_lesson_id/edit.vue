<template>
  <v-layout justify-center id="page">
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
          rows="1"
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Parte"
        :resources="parts"
        redirect="true"
        path="part/"
      />

    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:id/edit'
  }
</router>

<script scoped>
  import NavigationBar from "~/components/NavigationBar.vue"
  import lessons from '~/services/http/lessons'
  import parts from '~/services/http/parts'

  export default {
    components: {
      NavigationBar
    },
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
