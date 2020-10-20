<template>
  <v-layout id="page">
    <v-flex ref="flex" class="main-container">

      <h1>
        <n-link to="../../edit">
          <v-btn class="back-button" text icon color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </n-link>
        Gerenciar meus cursos
      </h1>
      <!-- Input Field --> 
      <v-form class="part-form" ref="part" v-model="status" lazy-validation>
        <h3>Parte</h3>
        <v-text-field
          v-model="part.title"
          :rules="titleRules"
          :margin-bottom="!titleRules"
          color="#60c"
          label="Título"
          required
        />
        <v-textarea
          v-model="part.description"
          color="#60c"
          label="Descrição"
          rows="1"
          required
        />
        <v-text-field
          v-model="part.youtubeUrl"
          :rules="videoUrlRules"
          color="#60c"
          label="Link do youtube"
          required
        />
        <v-text-field
          v-model="part.vimeoUrl"
          :rules="videoUrlRules"
          color="#60c"
          label="Link do vimeo"
          required
        />
      </v-form>

      <resources-list
        name="Teste"
        :resources="tests"
        redirect="true"
        path="test"
      />
      <span v-if="!tests.length" class="new-tests-span">Favor, adicionar um teste</span>
      <!-- Button Purple Solid -->
      <v-btn color="primary" class="save-button" @click="submit">Salvar</v-btn>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarStatus"
      :timeout="5000"
      :top="true"
      :right="true"
    >
    {{ snackbarText }}
        <v-btn color="#FFF" text @click="snackbar = false">
            Fechar
        </v-btn>
    </v-snackbar>
    <client-only>
      <navigation-bar />
    </client-only>
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:lessonId/part/:id/edit'
  }
</router>

<script scoped>
  import NavigationBar from "~/components/NavigationBar.vue"
  import parts from '~/services/http/parts'
  import tests from '~/services/http/tests'

  export default {
    components: {
      NavigationBar
    },
    data: () => ({
      title: 'Editar Parte',
      status: true,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarStatus: '',
      titleRules: [title => !!title || 'Digite um título'],
      videoUrlRules: [video => !!video || 'Insira o link do vídeo'],
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Altere ou reestruture uma Parte de um Curso da New School - Levamos educação de qualidade ' +
              'na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da ' + 
              'curadoria de conteúdos baseados nas habilidades do futuro.',
          },
        ],
      }
    },
    methods: {
        submit() {
            if (this.$refs.part.validate()) {
                this.animateForm(true)
                this.part['lesson'] = this.$route.params.lessonId
                parts.updatePart(this.part)
                .then(res => {
                    this.loading = false
                    this.showConfirmSnack('Parte salva! ;)', 'success')
                })
                .catch(err => {
                    setTimeout(() => {
                        this.loading = false
                    }, 500)
                    console.error(err)
                })
            } else {
                this.animateForm(false)
            }
        },

        animateForm(status) {
            if (status) {
                this.$refs.flex.classList.add('hide-form')
                document.querySelector('html').style.overflow = 'hidden'
                setTimeout(() => {
                    this.loading = true
                }, 300)
            } else {
                this.$refs.flex.classList.add('error-form')
                setTimeout(() => {
                    this.$refs.flex.classList.remove('error-form')
                }, 500)
            }
            document.querySelector('html').style.overflow = 'scroll'
        },

        showConfirmSnack(text, status) {
            this.snackbarText = text
            this.snackbarStatus = status
            this.snackbar = true
        },
    },
    async asyncData({ store, data, params }) {
      const _part = await parts.getById(params.id)
      const _tests = await tests.getByPart(params.id)
      
      return {part: _part.data, tests: _tests.data}
    }
  }
</script>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  text-transform: uppercase;
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
  line-height: 24px;
  text-transform: uppercase;
  text-align: left;
  color: #6600CC;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 2em 3em 78px 2em;
}

.v-input {
  width: 90%;
  height: 50px;
}
/* Button Purple Solid */
.save-button {
  height: 2.75em;
  width: 100%;
  font-weight: 600;
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

.new-tests-span {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #656565;
  width: 100%;
  text-align: center;
  display: inline-block;
}

.back-button {
  min-width: 0 !important;
  float: left;
}

.v-label {
  color: #60c;
}

.part-form {
  margin-top: 1.5em;
}

::v-deep .v-text-field:not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover:before {
  border-color: #60c;
}

::v-deep .v-label {
  font-weight: 600;
  font-size: 14px;
  color: #aa56ff;
}

::v-deep .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot::before {
  border-color: #aa56ff;
}

::v-deep .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252; /* cor da borda quando der estado de erro */
}

::v-deep .v-messages__message {
  text-align: right;
  margin-top: -0.3em;
}
</style>
