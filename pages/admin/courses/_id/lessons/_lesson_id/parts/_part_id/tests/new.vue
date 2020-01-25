<template>
  <v-layout id="page">
    <v-flex ref="flex" class="main-container">
      <h1>
        <n-link to="../edit">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>Gerenciar meus cursos
      </h1>

      <v-form class="test-form" ref="test" v-model="status" lazy-validation>
        <h3>Teste</h3>
        <v-text-field
          v-model="test.title"
          :rules="titleRules"
          color="#60c"
          label="Título"
          required
        />
        <v-textarea
          v-model="test.question"
          :rules="answerRules"
          color="#60c"
          label="Enunciado"
        />
        <v-text-field
          v-model="test.correctAlternative"
          :rules="answerRules"
          color="#60c"
          label="Alternativa Correta"
          required
        />
        <v-text-field
          v-model="test.firstAlternative"
          :rules="alternativeRules"
          prepend-inner-icon="A:"
          color="#60c"
          required
        />
        <v-text-field
          v-model="test.secondAlternative"
          :rules="alternativeRules"
          color="#60c"
          prepend-inner-icon="B:"
          required
        />
        <v-text-field
          v-model="test.thirdAlternative"
          :rules="alternativeRules"
          color="#60c"
          prepend-inner-icon="C:"
          required
        />
        <v-text-field
          v-model="test.fourthAlternative"
          :rules="alternativeRules"
          color="#60c"
          prepend-inner-icon="D:"
          required
        />
      </v-form>
      <v-btn color="primary" class="save-button mb-5 mt-5" @click="submit">Adicionar</v-btn>
      <v-btn color="primary" :disabled="!submited" class="save-button button-ajust" @click="finish()">Finalizar</v-btn>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarStatus"
      :timeout="5000"
      :top="true"
      :right="true"
    >
      {{ snackbarText }}
      <v-btn color="#FFF" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:lessonId/part/:partId/test/new'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import tests from '~/services/http/generic';

export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    title: 'Criar um Teste',
    status: true,
    submited: false,
    loading: false,
    snackbar: false,
    snackbarText: '',
    snackbarStatus: '',
    courseId: '',
    lessonId: '',
    test: {
      title: '',
      question: '',
      correctAlternative: '',
      firstAlternative: '',
      secondAlternative: '',
      thirdAlternative: '',
      fourthAlternative: '',
      part: '',
    },
    titleRules: [title => !!title || 'Digite um título'],
    answerRules: [answer => !!answer || 'Digite a resposta'],
    alternativeRules: [
      alternative => !!alternative || 'Digite o texto da alternativa',
    ],
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Ajude a espalhar o conhecimento criando um Teste para uma Parte de um Curso da New School - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
  created() {
    this.test.part = this.$route.params.partId;
    this.courseId = this.$route.params.courseId;
    this.lessonId = this.$route.params.lessonId;
  },
  methods: {
    submit() {
      if (this.$refs.test.validate()) {
        this.animateForm(true);
        tests
          .post('/api/v1/test', this.test)
          .then(res => {
            this.loading = false;
            this.showConfirmSnack('Teste criado! ;)', 'success');
            this.submited = true;
            $nuxt._router.push(
              `/admin/course/${this.courseId}/lesson/${this.lessonId}/part/${this.test.part}/edit`,
            );
          })
          .catch(err => {
            setTimeout(() => {
              this.loading = false;
            }, 500);
            console.error(err);
          });
      } else {
        this.animateForm(false);
      }
    },

    finish(){
      this.snackbar("Criação concluída", "success")
      $nuxt._router.push(`/admin/course/${this.courseId}/lesson/new'`);
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

    showConfirmSnack(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
  },
};
</script>


<style lang="scss" scoped>
::v-deep .v-input__icon--prepend-inner {
  justify-content: flex-start;
  i {
    color: #60c;
    font-size: 16px;
    font-weight: 600;
    font-style: normal !important;
  }
}

h1 {
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  text-transform: uppercase;
  text-align: center;
  color: #6600cc;
}

@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}

h3 {
  font-weight: 900;
  font-size: 1em;
  line-height: 24px;
  text-transform: uppercase;
  text-align: left;
  color: #6600cc;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 2em 3em 1.5em 2em;
}

.v-input {
  width: 90%;
  height: 50px;
}

.save-button {
  height: 2.75em;
  width: 100%;
  font-weight: 600;
  margin-top: auto;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.v-button__content {
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
}
.button-ajust{
  margin-bottom: 50px;
}
.back-button {
  min-width: 0 !important;
  float: left;
}

.v-label {
  color: #60c;
}

.test-form {
  margin-top: 1.5em;
}

::v-deep
  .v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #60c;
}

::v-deep .v-label {
  font-weight: 600;
  font-size: 14px;
  color: #aa56ff;
}

::v-deep
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot::before {
  border-color: #aa56ff;
}

::v-deep
  .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252;
}

::v-deep .v-messages__message {
  text-align: right;
  margin-top: -0.3em;
}
</style>
