<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" class="main-container">
      <h1>
        <n-link to="../parte">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>
        {{ $route.params.courseSlug || 'Titúlo do Curso'}}
      </h1>

      <div class="inner-container">
        <v-form ref="form" lazy-validation>
          <h3>{{ test.title || 'Título do Teste'}}</h3>
          <h4>{{ test.question || 'Enunciado do teste'}}</h4>
          <div class="alternatives-container">
            <v-checkbox
              class="first-alternative"
              v-model="selected"
              hide-details
              color="#60c"
              :rules="alternativeRule"
              :label="test.firstAlternative"
              value="A"
            />
            <v-checkbox
              class="second-alternative"
              v-model="selected"
              hide-details
              color="#60c"
              :rules="alternativeRule"
              :label="test.secondAlternative"
              value="B"
            />
            <v-checkbox
              class="third-alternative"
              v-model="selected"
              hide-details
              color="#60c"
              :rules="alternativeRule"
              :label="test.thirdAlternative"
              value="C"
            />
            <v-checkbox
              class="fourth-alternative"
              v-model="selected"
              hide-details
              color="#60c"
              :rules="alternativeRule"
              :label="test.fourthAlternative"
              value="D"
            />
          </div>
        </v-form>
      </div>

      <v-btn color="primary" class="save-button" @click="nextTest">Próximo</v-btn>
    </v-flex>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte/teste'
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
    snackbar: false,
    snackbarText: '',
    snackbarStatus: '',
    computedSelection: [],
    cmpSelect: [],
  }),
  computed: {
    test() {
      return this.$store.state.courses.currentTest;
    },
    alternativeRule() {
      return [!!this.computedSelection.length || 'Selecione uma alternativa'];
    },

    // Vamos alterar o getter e setter do selected para poder alterar os valores do checkbox como se fosse um radio group
    selected: {
      get: function() {
        return this.$data.computedSelection;
      },
      set: function(value) {
        this.$data.cmpSelect = value;
      },
    },
  },
  watch: {
    // Assim que houver mudança ele adquire o novo valor (que vem como array [antigoValor, novoValor]) e retiramos o antigo com shift()
    cmpSelect: function(newQuestion) {
      this.computedSelection = newQuestion;
      if (this.computedSelection.length > 1) this.computedSelection.shift();
    },
  },
  head() {
    return {
      title: this.test.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Prove se o conhecimento que adquiriu com as vídeo-aulas foi satisfatório ou se precisa revê-las - Levamos educação de qualidade ' +
            'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' +
            'curadoria de conteúdos baseados nas habilidades do futuro.',
        },
      ],
    };
  },
  mounted() {
    this.slug = this.$route.params.courseSlug;
  },
  methods: {
    confirmSnackbar(text, status) {
      this.snackbarText = text;
      this.snackbarStatus = status;
      this.snackbar = true;
    },
    nextTest() {
      if (this.$refs.form.validate()) {
        // Primeiro passo é verificar se a resposta está correta
        tests
          .getAll(
            `/api/v1/test/checkTest/${this.test.id}/${this.computedSelection[0]}`,
          )
          .then(res => {
            if (res.data) {
              // Como a resposta está certa a gente limpa a validação e escolha para o próximo teste
              this.$refs.form.reset();
              // Apenas para tornar mais vísivel o acerto, depois mudar para um componente melhor
              this.confirmSnackbar('Acertou!!!', 'success');
              let courseTaken = this.$store.state.courses.currentState;
              courseTaken['user'] = this.$store.state.user.data.id;
              courseTaken['course'] = this.$store.state.courses.current.id;

              // Se a resposta está certa a gente avança no curso
              tests
                .post('/api/v1/course-taken/advance-on-course', courseTaken)
                .then(res => {
                  // Como o advance-on-course endpoint não retorna qual o estado atual da Aula, Parte e Teste eu preciso chamar attend-a-class
                  tests
                    .getAll(
                      `/api/v1/course-taken/attend-a-class/${courseTaken.user}/${courseTaken.course}`,
                    )
                    .then(res => {
                      // Primeiro checa se por acaso ele já terminou o curso, isso vai evitar as próximas verificações
                      if (res.data.status === 'COMPLETED') {
                        delete res.data.user;
                        delete res.data.course;
                        delete res.data.currentLesson;
                        delete res.data.currentPart;
                        delete res.data.currentTest;
                        this.$store.commit('courses/setCurrentState', res.data);
                        setTimeout(() => {
                          $nuxt._router.push(`/aluno/curso/${this.slug}/fim`);
                        }, 400);
                      }

                      // Se muda a aula atual, ele completou todas as partes da anterior e deve ir para a parte da nova aula
                      if (
                        res.data.currentLesson.id !=
                        this.$store.state.courses.currentLesson.id
                      ) {
                        this.$store.commit(
                          'courses/setCurrentLesson',
                          res.data.currentLesson,
                        );
                        this.$store.commit(
                          'courses/setCurrentPart',
                          res.data.currentPart,
                        );
                        this.$store.commit(
                          'courses/setCurrentTest',
                          res.data.currentTest,
                        );
                        setTimeout(() => {
                          $nuxt._router.push(
                            `/aluno/curso/${this.slug}/aula/parte`,
                          );
                        }, 400);
                      }

                      // Se mudar a parte atual, quer dizer que ele terminou todos os testes da anterior e agora precisa assistir ao vídeo da nova parte
                      if (
                        res.data.currentPart.id !=
                        this.$store.state.courses.currentPart.id
                      ) {
                        this.$store.commit(
                          'courses/setCurrentPart',
                          res.data.currentPart,
                        );
                        this.$store.commit(
                          'courses/setCurrentTest',
                          res.data.currentTest,
                        );
                        setTimeout(() => {
                          $nuxt._router.push(
                            `/aluno/curso/${this.slug}/aula/parte`,
                          );
                        }, 400);
                      }

                      // Se quando avançar no curso o teste mudar ele deve permanecer na página e apenas mudar o contexto
                      if (
                        res.data.currentTest.id !=
                        this.$store.state.courses.currentTest.id
                      ) {
                        this.$store.commit(
                          'courses/setCurrentTest',
                          res.data.currentTest,
                        );
                      }
                    });
                });
            } else this.computedSelection = [];
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
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
  line-height: initial;
  text-align: left;
  color: #6600cc;
}

h4 {
  font-weight: 500;
  padding-top: 1em;
  color: #656565;
  font-size: 14px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 2em 2em 78px;
}

.inner-container,
.alternatives-container {
  margin-top: 1.5em;
}

.save-button {
  height: 45px !important;
  width: 100%;
  font-weight: 900;
  font-size: 12px !important;
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

.back-button {
  min-width: 0 !important;
  float: left;
}

@mixin inner-text-checkbox {
  font-weight: 900;
  color: #60c;
  margin-right: 0.5em;
}

::v-deep .first-alternative > div > div > label:before {
  content: 'A:';
  @include inner-text-checkbox;
}

::v-deep .second-alternative > div > div > label:before {
  content: 'B:';
  @include inner-text-checkbox;
}

::v-deep .third-alternative > div > div > label:before {
  content: 'C:';
  @include inner-text-checkbox;
}

::v-deep .fourth-alternative > div > div > label:before {
  content: 'D:';
  @include inner-text-checkbox;
}
</style>
