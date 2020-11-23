<template>
  <div id="page">
    <HeaderBar :title="'Gerenciar Meus Cursos'" :back-page="true"></HeaderBar>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md4 style="text-align: -webkit-left;">      
        <v-container>
          <v-row>
            <v-col>
              <h3>Teste</h3>
              <v-form class="test-form" ref="test" v-model="status" lazy-validation>
                <v-text-field
                  v-model="test.title"
                  :rules="titleRules"                  
                  label="Título"
                  required
                />
                <v-text-field
                  v-model="test.correctAlternative"
                  :rules="answerRules"                  
                  label="Alternativa Correta"
                  required
                />
                <v-text-field
                  v-model="test.firstAlternative"
                  :rules="alternativeRules"
                  prepend-inner-icon="A:"                  
                  required
                />
                <v-text-field
                  v-model="test.secondAlternative"
                  :rules="alternativeRules"                  
                  prepend-inner-icon="B:"
                  required
                />
                <v-text-field
                  v-model="test.thirdAlternative"
                  :rules="alternativeRules"                  
                  prepend-inner-icon="C:"
                  required
                />
                <v-text-field
                  v-model="test.fourthAlternative"
                  :rules="alternativeRules"                  
                  prepend-inner-icon="D:"
                  required
                />
              </v-form>
              <v-btn 
              class="btn-block btn-primary" @click="submit">
                Salvar
              </v-btn>
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
          <v-btn color="#FFF" text @click="snackbar = false">
              Fechar
          </v-btn>
      </v-snackbar>
      <client-only>
        <navigation-bar />
      </client-only>
    </v-layout>
  </div>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:lessonId/part/:partId/test/:id/edit'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar'
import HeaderBar from '~/components/Header.vue';
import tests from '~/services/http/generic'

export default {
    components: {
      NavigationBar,
      HeaderBar,
    },
    data: () => ({
        title: 'Editar Teste',
        status: true,
        submited: false,
        loading: false,
        snackbar: false,
        snackbarText: '',
        snackbarStatus: '',
        titleRules: [title => !!title || 'Digite um título'],
        answerRules: [answer => !!answer || 'Digite a resposta'],
        alternativeRules: [alternative => !!alternative || 'Digite o texto da alternativa'],
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
      }
    },
    created() {
        this.test.part = this.$route.params.partId
    },
    methods: {
        submit() {
            if (this.$refs.test.validate()) {
                this.animateForm(true)
                this.test['part'] = this.$route.params.partId
                tests.put(`/api/v1/test/${this.test.id}`, this.test)
                .then(res => {
                    this.loading = false
                    this.showConfirmSnack('Teste salvo! ;)', 'success')
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
      const _test = await tests.getById('/api/v1/test', params.id)
      
      return {test: _test.data}
    }
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__icon--prepend-inner {
    justify-content: flex-start;
    i {
        color: var(--primary);
        font-size: 16px;
        font-weight: 600;
        font-style: normal !important;
    }
}
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
