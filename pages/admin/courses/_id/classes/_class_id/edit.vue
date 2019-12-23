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

      <div class="sections">
        <h2>Partes</h2>
        <div v-for="section in klass.sections" v-bind:key="section.id" class="section">
          <div class="section__info">
            <p class="section__title">{{ section.title }}</p>
          </div>
          <div class="actions">
            <nuxt-link v-bind:to="editLink(section)">Editar</nuxt-link>
            <nuxt-link v-bind:to="deleteLink(section)">Excluir</nuxt-link>
          </div>
       </div>
      </div>

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
    },
    methods: {
      editLink: section => `sections/${section.id}/edit`,
      deleteLink: section => `sections/${section.id}/delete`
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

h2 {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  color: #6600CC;
}

.sections {
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #e3e0e6;
}


.section {
  border-bottom: 1px solid #e3e0e6;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.section__title {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #1A1A1A;
  margin: 0;
}

.actions {
  min-width: 120px;
  display: flex;
  align-items: center;
}

.actions a {
  margin-left: 16px;
}
.actions a:first-child {
  margin-left: 0;
}
</style>
