<template>
  <div id="page">
    <HeaderBar :title="'Gerenciar Meus Cursos'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md4 style="text-align: -webkit-left;">      
        <v-container>
          <v-row>
            <v-col>
              <h3>Curso</h3>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  :rules="rules"
                  v-model="course.title"
                  label="Título *"
                  name="title"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  v-model="course.description"
                  label="Descrição *"
                  name="description"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  v-model="course.authorName"
                  label="Professor *"
                  name="authorName"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  v-model="course.authorDescription"
                  label="Biografia do Professor *"
                  name="authorDescription"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  v-model="course.workload"
                  type="number"
                  label="Carga Horária *"
                  name="workload"
                  required
                ></v-text-field>
                <v-text-field
                  :rules="rules"
                  v-model="course.thumbUrl"
                  label="URL da Imagem do Curso"
                  name="thumbUrl"
                  required
                ></v-text-field>

                <resources-list name="Aula" :resources="lessons" redirect="true" path="lesson" />
                <span v-if="!lessons.length" class="new-lessons-span">Favor, adicionar uma aula</span>
                
                <v-btn
                class="btn-block btn-primary" 
                @click="submit">
                  Salvar
                </v-btn>
              </v-form>
            </v-col> 
          </v-row>
        </v-container>
      </v-flex>
      <v-snackbar
            v-model="snackbar"
            :color="snackbarStatus"
            :timeout="5000"
            :top="true"
            :right="true"
          >
            {{ snackbarText }}
            <v-btn @click="snackbar = false" color="#FFF" text>Fechar</v-btn>
      </v-snackbar>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/admin/course/:id/edit'
  }
</router>

<script scoped>
import courses from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
  data() {
    return {
      title: 'Gerenciar meus cursos',
      sendCourse: false,
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',

      rules: [v => !!v || 'Obrigatório'],
    };
  },

  head() {
    return {
      title: this.title,
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.course['authorId'] = 'null'

        courses
          .put(process.env.endpoints.COURSE, this.course.id, this.course)
          .then(res => {
            this.loading = false;
            this.sendCourse = true;
            this.confirmSnackbar('Curso salvo!', 'success');
            this.$store.commit('courses/setCurrent', res.data);
            this.gotoAddClass(res.data.id);
          })
          .catch(err => {
            this.confirmSnackbar(
              'Ocorreu um erro ao cadastrar o curso.',
              'error',
            );
            setTimeout(() => {
              this.loading = false;
            }, 500);
            console.error(err);
          });
      } else {
        this.animateForm(false);
      }
    },

    animateForm(status) {
      if (status) {
        this.$refs.flex.classList.add('hide-form');
        document.querySelector('html').style.overflow = 'hidden';
        setTimeout(() => {
          this.loading = true;
        }, 300);
      } else {
        this.$refs.flex.classList.add('error-form');
        setTimeout(() => {
          this.$refs.flex.classList.remove('error-form');
        }, 500);
      }
      document.querySelector('html').style.overflow = 'scroll';
    },

    gotoAddClass(courseId) {
      if (this.sendCourse) {
        $nuxt._router.push(`/admin/course/${courseId}/lesson/new`);
      } else {
        this.confirmSnackbar(
          'Você precisa salvar o curso antes de adicionar uma aula',
          'error',
        );
      }
    },

    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },
  async asyncData({ store, data, params }) {
    const _course = await courses.getById(
      process.env.endpoints.COURSE,
      params.id,
    );
    const _lessons = await courses.getById(
      process.env.endpoints.LESSON + '/course',
      params.id,
    );

    return { course: _course.data, lessons: _lessons.data };
  },
};
</script>

<style scoped>
.v-input {
  width: 90%;
  height: 50px;    
}
.v-input input {
  color: none;
}
::v-deep .v-messages__message {
  text-align: right;
  margin-top: -0.3em;
}
</style>