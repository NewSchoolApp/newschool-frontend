<template>
  <div>
    <HeaderBar :title="'Questionário'" :back-page="true"></HeaderBar>
    <v-layout justify-center id="page">
      <v-flex ref="flex" class="main-container">
        <div v-if="loading">
          <div class="container-spinner">
            <v-progress-circular :size="70" :width="5" indeterminate color="#6600cc" />
          </div>
        </div>

        <div class="inner-container" v-else>
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
          <!-- Button Purple Solid -->
          <v-btn color="primary" class="save-button" @click="nextTest">Próximo</v-btn>
        </div>

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
      </v-flex>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/aluno/curso/:courseSlug/aula/parte/teste'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar';
import tests from '~/services/http/generic';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
  },
  data: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarStatus: '',
    computedSelection: [],
    cmpSelect: [],
    loading: true,
  }),
  computed: {
    test() {
      return this.$store.state.courses.currentTest;
    },
    alternativeRule() {
      return [!!this.computedSelection.length || 'Selecione uma alternativa'];
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    courseId() {
      return this.$store.state.courses.current.id;
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
    this.loading = false;
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
            `/api/v1/test/${this.test.id}/checkTest/alternative/${this.computedSelection[0]}`,
          )
          .then(res => {
            if (res.data) {
              // Como a resposta está certa a gente limpa a validação e escolha para o próximo teste
              this.$refs.form.reset();

              // Apenas para tornar mais vísivel o acerto, depois mudar para um componente melhor
              this.confirmSnackbar('Acertou!!!', 'success');

              // Camando método para avançar
              this.advanceCourse();

              // Se a resposta está certa a gente avança no curso
            } else this.computedSelection = [];
          });
      }
    },

    advanceCourse() {
      this.loading = true;
      // avançando no curso
      http
        .post(
          `${process.env.endpoints.ADVANCE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
        )
        .then(() => {
          // Atualizando o estado do curso
          http
            .getAll(
              `${process.env.endpoints.STATE_COURSE}/user/${this.idUser}/course/${this.courseId}`,
            )
            .then(res => {
              // Verificando se já concluiu
              if (res.data.status === 'COMPLETED') {
                delete res.data.user;
                delete res.data.course;
                delete res.data.currentLesson;
                delete res.data.currentPart;
                delete res.data.currentTest;
                this.$store.commit('courses/setCurrentState', res.data);
                $nuxt._router.push(`/aluno/curso/${this.slug}/fim`);
              } else {
                // caso não houver concluído, salva o estado atual
                this.$store.commit('courses/setCurrent', res.data.course);
                delete res.data.user;
                delete res.data.course;
                this.$store.commit('courses/setCurrentState', res.data);

                // Verificando qual o próximo passo
                http
                  .getAll(
                    `${process.env.endpoints.CURRENT_STEP}/user/${this.idUser}/course/${this.courseId}`,
                  )
                  .then(res => {
                    if (res.data.type === 'NEW_TEST') {
                      this.$store.commit(
                        'courses/setCurrentTest',
                        res.data.data,
                      );
                      this.loading = false;
                    } else {
                      this.$store.commit(
                        'courses/setCurrentPart',
                        res.data.data,
                      );
                      $nuxt._router.push(
                        `/aluno/curso/${this.courseId}/aula/parte`,
                      );
                    }
                  });
              }
            });
        });
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
  padding: 0em 2rem 0rem;
  margin-bottom: 5rem;
}

.inner-container,
.alternatives-container {
  margin-top: 1.5em;
}
/* Button Purple Solid */
.save-button {
  height: 45px !important;
  width: 100%;
  font-weight: 900;
  font-size: 12px !important;
  margin-top: 2rem;
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
