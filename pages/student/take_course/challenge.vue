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
      <v-textarea
        v-model="challengeText"
        outlined
        placeholder="Seu comentário"
      />
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
  },
  methods: {
    onSuccess(result) {
      console.log('Share completed? ' + result.completed);
      console.log(result); // On Android apps mostly return false even while it's true
      console.log('Shared to app: ' + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      http
        .post(process.env.endpoints.EVENT, {
          event: 'SHARE_APP',
          rule: {
            userId: this.idUser,
            platform: result.app,
          },
        })
        .then(res => {
          this.$notifier.showMessage({
            type: 'success',
          });
          $nuxt._router.push('/aluno/home');
        })
        .catch(() =>
          this.$notifier.showMessage({
            type: 'error',
          }),
        );
    },
    onError(msg) {
      console.log('Sharing failed with message: ' + msg);
    },
    async postChallenge() {
      await http.post(
        `${process.env.endpoints.CHALLENGE}${this.idUser}/course/${this.currentCourse.id}`,
        { challenge: this.challengeText },
      );
      this.$router.push(`/aluno/curso/${this.slug}/fim`);
    },
    goBack() {
      this.$router.back();
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
</style>
