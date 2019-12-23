<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando aula</h1>
      <n-link to="../../edit">Voltar para curso</n-link>
      <v-form>
        <v-text-field
          :value="klass.title"
          label="Título"
          required
        />
        <v-textarea
          :value="klass.description"
          label="Descrição"
          required
        />
        <v-btn color="primary">Salvar</v-btn>
      </v-form>

      <resources-list
        :resources="klass.sections"
        name="Partes"
        path="sections/"
      />

    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    computed: {
      klass() {
        return this.$store.state.courses.currentClass
      }
    },
    asyncData({ store, data, params, $axios }) {
      const classPromise = $axios.get(
        `/api/v1/classes/${params.class_id}`
      ).then(res =>
        store.commit('courses/setCurrentClass', res.data.class)
      )
      const sectionsPromise = $axios.get(
        `/api/v1/classes/${params.class_id}/sections`
      ).then(res =>
        store.commit('courses/setClassSections', res.data.sections)
      )
      return Promise.all([classPromise, sectionsPromise])
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
