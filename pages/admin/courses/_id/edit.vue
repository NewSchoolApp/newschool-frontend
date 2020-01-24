<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Editando curso</h1>
      <v-form>
        <v-text-field
          :value="course.title"
          v-model="course.title"
          label="Título"
          required
        />
        <v-textarea
          :value="course.description"
          v-model="course.description"
          label="Descrição"
          required
          rows="1"
        />

         <v-text-field
          :value="course.workload"
          v-model="course.workload"
          label="Carga Horária *"
          required
        />
         <v-text-field
          :value="course.thumbUrl"
          v-model="course.thumbUrl"
          label="URL da Imagem do Curso"
          required
        />

        <v-btn color="primary" @click="salvarEdicao()">Salvar</v-btn>
      </v-form>

      <resources-list
        name="Aula"
        redirect="true"
        :resources="lessons"
        path="lesson"
      />
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:id/edit'
  }
</router>

<script>
  import NavigationBar from "~/components/NavigationBar.vue"
  import courses from '~/services/http/courses'
  import lessons from '~/services/http/lessons'
  import http from '~/services/http/generic';

  export default {
    components: {
      NavigationBar
    },

    async asyncData({ store, data, params}) {
      const course = await courses.getById(params.id)
      const _lessons = await lessons.getByCourse(params.id)
      return {course: course.data, lessons: _lessons.data, }
    },
    methods:{
      salvarEdicao(){

        const data = this.$store.state.user.data
       const formData = {
        title:this.course.title,
        thumbUrl:this.course.thumbUrl,
        description:this.course.description,
        workload:this.course.workload,
        authorId:data.id
        };

        http
        .put(process.env.endpoints.COURSE, this.$route.params.id,formData)
        .then(res => {
         alert("Curso editado com sucesso!");

        })
        .catch(err => {
          console.error(err);
          alert("Erro a editar o curso!");
        }).finally(fi =>{
          $nuxt._router.push(`/admin/listar-cursos`);

        });
      }
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
