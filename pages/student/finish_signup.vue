<template>
  <div class="notification__content">
    <div class="bg__fire" />
    <div class="notification">
      <img
        class="notification__image"
        :src="require('~/assets/finish_signup.svg')"
        alt=""
      />
      <h1 class="points">+ 30 NC</h1>
    </div>
    <div class="messages">
      <h1 class="message">
        Parabéns!
      </h1>
    </div>
    <div class="share__achievement">
      <p>Você concluiu seu cadastro, aproveite seus pontos!</p>
      <div class="btn__container">
        <button @click="goToHome" class="btn-block btn-primary">
          FINALIZAR
        </button>
      </div>
    </div>
  </div>
</template>
<router>
  {
    path: '/aluno/finalizar-cadastro'
  }
</router>

<script>
import http from '~/services/http/generic';
export default {
  methods: {
    goToHome() {
      $nuxt._router.push('/aluno/home');
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}
.notification {
  text-align: center;
  margin: 30% auto 5%;
}

.messages {
  padding: 0 2em;
}

.message {
  color: rgb(63, 61, 86);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
}
.share__achievement {
  padding: 0 15px;
}

.notification__content {
  background-image: url('../../assets/background_signup.svg');
  background-repeat: no-repeat;
  background-size: 100% 70%;
  max-width: 480px;
  margin: 0 auto;
}

.share__achievement p {
  font-size: 12px;
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
  padding: 0 15px;
  font-weight: 400;
}
.btn__container {
  text-align: center;
}

.btn-block {
  width: 90%;
  margin: 15% auto;
  padding: 5px auto;
  font-size: 16px;
  font-weight: 700;
}
.points {
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0 auto;
  padding: 5px;
  border-radius: 20px;
  width: 96px;
  background: rgb(237, 237, 237);
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
.notification__image {
  width: 263px;
  height: 215px;
  margin: 0 auto;
}
@media (min-width: 480px) {
  .notification__content {
    top: 0;
    height: 100vh;
  }
  .messages {
    margin-top: -12%;
  }
  .notification__image {
    top: 10%;
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
