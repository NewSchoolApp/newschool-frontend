<template>
  <v-layout align-center justify-center>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      indeterminate
    ></v-progress-circular>
    
    <v-flex ref="flex" xs10 sm8 md4>
      <h1>Parte</h1>
      <n-link to="../edit">Voltar para aula</n-link>
      <v-form ref="part" v-model="status" lazy-validation>
        <v-text-field
          v-model="part.title"
          :rules="titleRules"
          label="Título"
          required
        />
        <v-textarea
          v-model="part.description"
          label="Descrição"
          required
        />
        <v-text-field
          v-model="part.youtubeUrl"
          :rules="videoUrlRules"
          label="Link do youtube"
        />
        <v-text-field
          v-model="part.vimeoUrl"
          :rules="videoUrlRules"
          label="Link do vimeo"
        />
      </v-form>
      <resources-list
        name="Teste"
        :resources="part.questions"
        path="test/"
      />
      
      <v-btn color="primary" @click="submit">Salvar</v-btn>
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
  </v-layout>
</template>

<router>
  {
    path: '/admin/course/:courseId/lesson/:lessonId/part/new'
  }
</router>

<script>
import parts from '~/services/http/parts'
export default {
    data: () => ({
        status: true,
        loading: false,
        part : {
            title: '',
            description: '',
            youtubeUrl: '',
            vimeoUrl: '',
            lesson: '',
            nextPart: '',
        },
        titleRules: [title => !!title || 'Digite um título']
    }),
    computed: {
        videoUrlRules() {
            return [() => (this.part.youtubeUrl.length > 0 || this.part.vimeoUrl.length > 0) || 'A parte precisa ter ao menos um vídeo.']
        }
    },
    head: () => {

    },
    created() {
        this.part.lesson = this.$route.params.lessonId
    },
    methods: {
        submit() {
            if (this.$refs.part.validate()) {
                this.animateForm(true)
                parts.savePart(this.part)
                .then(res => {
                    this.loading = false
                    this.showConfirmSnack('Parte criada! ;)', 'success')
                })
                .catch(err => {
                    this.showConfirmSnack('Ocorreu um erro.', 'error')
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
