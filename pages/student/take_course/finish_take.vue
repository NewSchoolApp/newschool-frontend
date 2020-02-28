<template>
  <div>
    <main class="container__screen">
      <div id="info__winner">
        <img src="~/assets/winner.svg" alt="vencedor" />
        <h1>AEEEE, parabéns por mais esse passo!</h1>
      </div>
      <div id="container__btn">
        <v-btn color="#60c" dark block depressed large @click="finish">Meu Certificado</v-btn>
      </div>
    </main>
  </div>
</template>
<router>
    {
        path : '/aluno/curso/:courseSlug/fim'
    }
</router>
<script>
export default {
  methods: {
    finish() {
      $nuxt._router.push(`/pagina-certificado/${this.idUser}/${this.courseId}`);
    },
  },
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
  },
};
</script>

<style>
.container__screen {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  justify-content: space-around;
}
#info__winner {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 70%;
  flex-direction: column;
}
h1 {
  color: #60c;
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem;
}
</style>