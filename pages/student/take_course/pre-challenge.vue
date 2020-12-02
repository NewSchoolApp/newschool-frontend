<template>
  <div class="challenge__content">
    <HeaderBar :back-page="true" />
    <h1 class="congratulations__text">Parabéns!!!</h1>
    <div class="share__achievement">
      <p>
        Parça... Da hora que você chegou até aqui. Agora a gente tem um desafio
        pra você! Tá preparado?.
      </p>
    </div>

    <div class="challenge">
      <img
        class="challenge__image"
        :src="require('~/assets/challenge.svg')"
        alt=""
      />
    </div>
    <div class="btn__container">
      <button @click="goToChallenge" class="btn-block btn-primary">
        SO VAMO!
      </button>
    </div>
  </div>
</template>
<router>
  {
    path: '/aluno/pre-challenge'
  }
</router>

<script>
import HeaderBar from '~/components/Header.vue';
import http from '~/services/http/generic';
export default {
  components: {
    HeaderBar,
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  mounted() {
    console.log(this.user);
  },
  methods: {
    goToChallenge() {
      this.$router.push('/aluno/challenge');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#close-btn {
  position: absolute;
  right: 20px;
  top: 50px;
  cursor: pointer;
  font-size: 30px;
}

.mdi-close-circle::before {
  color: var(--primary);
  width: 20px;
  height: 20px;
  z-index: 9999999;
}

.congratulations__text {
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  color: #8c40d9;
}

.share__achievement {
  margin: 40px auto 60px;
}
.share__achievement p {
  font-size: 16px;
  line-height: 19px;
  padding: 0 30px;
  text-align: center;
  letter-spacing: 0.08em;

  /* Preto */

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
  text-align: center;
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
