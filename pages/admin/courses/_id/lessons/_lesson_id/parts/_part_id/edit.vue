<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando parte da aula</h1>
      <n-link to="../../edit">Voltar para aula</n-link>
      <v-form>
        <v-text-field
          :value="part.title"
          label="Título"
          required
        />
        <v-textarea
          :value="part.description"
          label="Descrição"
          required
        />
        <v-text-field
          :value="part.youtubeUrl"
          label="Link do youtube"
          required
        />
        <v-text-field
          :value="part.vimeoUrl"
          label="Link do vimeo"
          required
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Teste"
        :resources="part.questions"
        path="test/"
      />
    </v-flex>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:lessonId/part/:id/edit'
  }
</router>

<script>
  import parts from '~/services/http/parts'
  export default {
    computed: {
      part() {
        return this.$store.state.courses.currentSection
      }
    },
    asyncData({ store, data, params }) {
      return parts.getById(params.id).then(response =>
        store.commit('courses/setCurrentSection', response.data)
      )
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
