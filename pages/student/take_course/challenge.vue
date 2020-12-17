<template>
  <div class="challenge__content">
    <HeaderBar :title="'Desafio'" :route="`/aluno/curso/${slug}`" />
    <h1 class="hello_text">E aí, parça! Blz?</h1>
    <div class="share__achievement">
      <p>
        Da hora que você terminou o curso...<br />
        Mas querendo ou não, teoria não muda nada.<br />
        Como você vai aplicar isso no seu dia a dia?
      </p>
    </div>

    <div class="challenge">
      <v-form ref="form" v-model="status" lazy-validation>
        <v-textarea
          v-model="challengeText"
          :class="challengeFieldClass"
          outlined
          placeholder="Seu comentário"
          :messages="warnMessage"
          :error="tooBig"
        />
      </v-form>
    </div>
    <div class="btn__container">
      <button class="btn-block btn-primary" @click="postChallenge()">
        PRÓXIMO
      </button>
    </div>
  </div>
</template>
<router>
  {
    path: '/aluno/curso/:courseSlug/challenge'
  }
</router>

<script>
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
export default {
  components: {
    HeaderBar,
  },
  data: () => ({
    challengeText: '',
    challengeFieldClass: '',
    challengeRule: [
      v => !!v || 'Digite a senha',
      v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caractéres',
    ],
  }),
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    slug() {
      return this.$route.params.courseSlug;
    },
    currentCourse() {
      return this.$store.state.courses.current;
    },
    tooBig() {
      if (this.challengeText.length > 500) {
        return true;
      } else {
        return false;
      }
    },
    warnMessage() {
      if (this.tooBig) {
        return 'Resposta muito grande!';
      } else {
        return '';
      }
    },
  },
  methods: {
    async postChallenge() {
      if (this.challengeText && !this.tooBig) {
        await http.post(
          `${process.env.endpoints.CHALLENGE}user/${this.idUser}/course/${this.currentCourse.id}`,
          { challenge: this.challengeText },
        );
        this.$router.push(`/aluno/curso/${this.slug}/fim`);
      } else {
        this.challengeFieldClass = 'error-field';
        setTimeout(() => {
          this.challengeFieldClass = '';
        }, 300);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

::v-deep fieldset {
  border-color: rgba(0, 0, 0, 0.5);
  border-radius: 0;
}
::v-deep .v-input textarea {
  color: #000000 !important;
}
::v-deep ::placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5) !important;
}

.hello_text {
  font-weight: 900;
  font-size: 14px;
  color: #1a1a1a;
  margin-left: 24px;
}

.share__achievement {
  margin: 16px auto 40px;
  padding: 0 10px 0 24px;
}
.share__achievement p {
  font-size: 12px;
  line-height: 16px;
  color: #1a1a1a;
}
.btn__container {
  text-align: center;
}

.btn-block {
  width: 90%;
  padding: 10px auto;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  bottom: 40px;
  right: 5%;
  left: 5%;
}

h3 {
  font-weight: 900;
  font-size: 1em;
  line-height: initial;
  text-align: center;
  color: var(--primary);
}

h4 {
  font-weight: 500;
  padding-top: 1em;
  text-align: center;
  color: #656565;
  font-size: 14px;
}
.challenge {
  padding: 0 24px;
}
.challenge__image {
  width: 139px;
  height: 139px;
  margin: 0 auto;
}
@media (min-width: 480px) {
  .challenge__content {
    top: 0;
    height: 100vh;
  }
  .messages {
    margin-top: -12%;
  }

  .btn-block {
    width: 96%;
    padding: 5px auto;
  }

  #page {
    height: 100vh;
    overflow: hidden;
  }
}
.error-field {
  animation: nono 300ms, intro paused;
}
</style>
