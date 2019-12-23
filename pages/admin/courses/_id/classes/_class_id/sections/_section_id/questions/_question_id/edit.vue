<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando questão</h1>
      <n-link to="../../edit">Voltar para seção da aula</n-link>
      <v-form>
        <v-textarea
          :value="question.title"
          label="Enunciado"
          required
        />
        <v-textarea v-for="item in items" v-bind:key="item.id"
          :value="question.alternatives[item.id]"
          :label="`Alternativa ${item.letter}`"
          required
        />
        <v-select
          v-model="model"
          :items="items.map(item => item.letter)"
          label="Alternativa correta"
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    computed: {
      question() {
        return this.$store.state.courses.currentQuestion
      }
    },
    asyncData({ store, data, params, $axios }) {
      return $axios.get(
        `http://localhost:3030/api/v1/questions/${params.question_id}`
      ).then(res =>
        store.commit('courses/setCurrentQuestion', res.data.question)
      )
    },
    data: () => ({
      items: [
        { letter: 'A', id: 0 },
        { letter: 'B', id: 1 },
        { letter: 'C', id: 2 },
        { letter: 'D', id: 3 },
      ]
    })
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
