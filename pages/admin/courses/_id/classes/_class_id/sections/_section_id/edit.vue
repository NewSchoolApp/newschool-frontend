<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando parte da aula</h1>
      <n-link to="../../edit">Voltar para aula</n-link>
      <v-form>
        <v-text-field
          :value="section.title"
          label="Título"
          required
        />
        <v-textarea
          :value="section.description"
          label="Descrição"
          required
        />
        <v-text-field
          :value="section.youtubeUrl"
          label="Link do youtube"
          required
        />
        <v-text-field
          :value="section.vimeoUrl"
          label="Link do vimeo"
          required
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        :resources="section.questions"
        name="Questões"
        path="questions/"
      />
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    computed: {
      section() {
        return this.$store.state.courses.currentSection
      }
    },
    asyncData({ store, data, params, $axios }) {
      const sectionPromise = $axios.get(
        `http://localhost:3030/api/v1/sections/${params.section_id}`
      ).then(res =>
        store.commit('courses/setCurrentSection', res.data.section)
      )
      const questionsPromise = $axios.get(
        `http://localhost:3030/api/v1/sections/${params.section_id}/questions`
      ).then(res =>
        store.commit('courses/setSectionQuestions', res.data.questions)
      )
      return Promise.all([sectionPromise, questionsPromise])
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
