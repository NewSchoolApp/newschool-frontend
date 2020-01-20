<template>
  <v-layout justify-center id="page">
    <v-flex ref="flex" class="main-container">
      <h1>
        <n-link to="..">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>
        {{ $route.params.courseSlug || 'Titúlo do Curso'}}
      </h1>

      <div class="inner-container">
          <v-form ref="form" lazy-validation>
            <h3> {{ test.title || 'Título do Teste'}} </h3>
            <h4> {{ test.text || 'Enunciado do teste: Sed ut perspiciatis unde omnis iste natus error sit ' + 
                'voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore ' +
                'veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia ' + 
                'voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'}} </h4>
            <div class="alternatives-container">
                <v-checkbox class="first-alternative" v-model="selected" hide-details color="#60c" :rules="alternativeRule" :label="test.firstAlternative" value="A" />
                <v-checkbox class="second-alternative" v-model="selected" hide-details color="#60c" :rules="alternativeRule" :label="test.secondAlternative" value="B" />
                <v-checkbox class="third-alternative" v-model="selected" hide-details color="#60c" :rules="alternativeRule" :label="test.thirdAlternative" value="C" />
                <v-checkbox class="fourth-alternative" v-model="selected" hide-details color="#60c" :rules="alternativeRule" :label="test.fourhAlternative" value="D" />
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
    path: '/curso/:courseSlug/aula/:lessonId/parte/:partId/testes/'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar'
import tests from '~/services/http/generic'

export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    title: 'Título do Teste',
    test: {
        title: 'Título',
        text: '',
        firstAlternative: 'Primeira alternativa',
        secondAlternative: 'Segunda alternativa',
        thirdAlternative: 'Terceira alternativa',
        fourhAlternative: 'Quarta alternativa',
    },
    computedSelection: [],
    cmpSelect: [],
  }),
  computed: {
    selected: {
        get: function() {
            return this.$data.computedSelection
        },
        set: function(value) {
            this.$data.cmpSelect = value
        }
    },
    alternativeRule() {
        return [!!this.computedSelection.length || 'Selecione uma alternativa']
    },
  },
  watch: {
    cmpSelect: function (newQuestion) {
        this.computedSelection = newQuestion
        if(this.computedSelection.length > 1) this.computedSelection.shift()
    },
  },
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
    }
  },
  methods: {
    nextTest() {
        if (this.$refs.form.validate()) {
            tests.getAll(`/api/v1/test/checkTest/${test.id}/${computedSelection[0]}`).then(res => {
                if(res) {

                }
            })
        }        
    },
  },
  async asyncData({ store, data, params }) {
    const _tests = await tests.getById('/api/v1/test/part', params.partId)

    return { tests: _tests.data }
  },
}
</script>

<style lang="scss" scoped>
h1 {
    font-weight: 900;
    font-size: 1em;
    line-height: 36px;
    text-align: center;
    color: #6600CC;
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
    color: #6600CC;
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
    padding: 2em 2em 0;
}

.inner-container, .alternatives-container {
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
    color: #FFFFFF;
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
    content: "A:";
    @include inner-text-checkbox;
}

::v-deep .second-alternative > div > div > label:before {
    content: "B:";
    @include inner-text-checkbox;
}

::v-deep .third-alternative > div > div > label:before {
    content: "C:";
    @include inner-text-checkbox;
}

::v-deep .fourth-alternative > div > div > label:before {
    content: "D:";
    @include inner-text-checkbox;
}
</style>
