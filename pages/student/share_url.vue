<template>
  <div class="notification__content">
    <div id="close">
      <v-icon id="close-btn" color="primary" @click="goBack"
        >mdi-close-circle</v-icon
      >
    </div>
    <div class="bg__fire" />

    <div class="notification">
      <img
        class="notification__image"
        :src="require('~/assets/happy.svg')"
        alt=""
      />
    </div>
    <div class="messages">
      <h1 class="message">
        Ganhe pontos!
      </h1>
    </div>
    <div class="share__achievement">
      <p>Ganhe 1 NC cada vez que 3 amigos se cadastrarem na New School.</p>
      <div class="btn__container">
        <button
          class="btn-block btn-primary"
          @click="shareInSocialMedia($event, title, image)"
        >
          COMPARTILHAR
        </button>
      </div>
    </div>
  </div>
</template>
<router>
  {
    path: '/aluno/indicar-app'
  }
</router>

<script>
import http from '~/services/http/generic';
export default {
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  methods: {
    onSuccess(result) {
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
      alert('Sharing failed with message: ' + msg);
    },
    shareInSocialMedia(event, title, image) {
      event.stopPropagation();
      event.preventDefault();
      const options = {
        message: 'Vem colar com nois, aqui na New School!', // not supported on some apps (Facebook, Instagram)
        subject: 'Faça seu cadastro e vem aprender com a gente', // fi. for email
        url: `https://newschoolapp.com.br/#/cadastro/${this.user.inviteKey}`,
        chooserTitle: 'Compartilhe seu URL de convite', // Android only, you can override the default share sheet title
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        this.onSuccess,
        this.onError,
      );
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
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
.notification {
  width: 193px;
  height: 193px;
  margin: 40% auto 10%;
}

.messages {
  padding: 0 2em;
}

.message {
  font-size: 20px;
  color: rgb(26, 26, 26);
  z-index: 9999;
  margin-top: 5%;
  font-weight: 900;
  text-align: center;
}
.share__achievement p {
  font-size: 12px;
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
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
  position: absolute;
  left: -12px;
  top: 10%;
  z-index: 999;
  width: 100%;
  max-height: 280px;
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
}</style
>>
