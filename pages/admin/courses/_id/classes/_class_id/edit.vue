<template>
  <v-layout justify-center>
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando aula</h1>
      Aula <em>{{klass.title}}</em> do curso <n-link to="../../edit">{{klass.courseTitle}}</n-link>
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
        // return { id: 1, title: 'Introdução', courseTitle: 'Fotografia básica',
        // sections: [{id: 1, title: 'Fotografia', description: 'parte 1' }] }
        return this.$store.state.courses.currentClass
      }
    },
    asyncData({ store, data, params, $axios }) {
      const classPromise = $axios.get(
        `http://localhost:3030/api/v1/courses/${params.id}/classes/${params.class_id}`
      ).then(res =>
        store.commit('courses/setCurrentClass', res.data.class)
      )
      const sectionsPromise = $axios.get(
        `http://localhost:3030/api/v1/courses/${params.id}/classes/${params.class_id}/sections`
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
