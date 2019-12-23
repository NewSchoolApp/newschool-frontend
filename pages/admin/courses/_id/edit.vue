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

      <div class="classes">
        <h2>Aulas</h2>
        <div v-for="klass in course.classes" v-bind:key="klass.id" class="class">
          <div class="class__info">
            <p class="class__title">{{ klass.title }}</p>
          </div>
          <div class="actions">
            <nuxt-link v-bind:to="editLink(klass)">Editar</nuxt-link>
            <nuxt-link v-bind:to="deleteLink(klass)">Excluir</nuxt-link>
          </div>
       </div>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      course() {
        return this.$store.state.courses.current
      }
    },
    asyncData({ store, data, params, $axios }) {
      const coursePromise = $axios.get(
        `http://localhost:3030/api/v1/courses/${params.id}`
      ).then(res =>
        store.commit('courses/setCurrent', res.data.course)
      )
      const classesPromise = $axios.get(
        `http://localhost:3030/api/v1/courses/${params.id}/classes`
      ).then(res =>
        store.commit('courses/setCurrentClasses', res.data.classes)
      )
      return Promise.all([coursePromise, classesPromise])
    },
    methods: {
      editLink: klass => `classes/${klass.id}/edit`,
      deleteLink: klass => `classes/${klass.id}/delete`
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

.classes {
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #e3e0e6;
}


.class {
  border-bottom: 1px solid #e3e0e6;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.class__title {
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
