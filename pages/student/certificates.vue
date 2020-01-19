<template>
  <v-container class="main">
    <div>
      <h1 class="page-title">
        Meus certificados
      </h1>
    </div>
    <div v-for="certificate in certificates" class="cards-box">
      <div
        :style="backgroundClass(certificate.certificateBackgroundName)"
        class="background-image"
      >
        <img src="~/assets/medalha-image.svg" alt="Imagem de uma medalha" />
      </div>
      <div class="footer">
        <div class="title-and-socialMedias">
          <strong class="certificate-title">{{ certificate.title }}</strong>
          <div class="sharing-icons">
            <shareBtn />
          </div>
        </div>
        <p>{{ certificate.userName }}</p>
      </div>
    </div>
    <navigation-bar/>
  </v-container>
</template>

<router>
  path: "/aluno/certificados"
</router>

<script>
import shareBtn from '~/components/ShareBtn.vue'
import http from '~/services/http/generic'
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    shareBtn,
    NavigationBar
  },
  data: () => ({
    certificates: [],
  }),
  mounted() {
    http
      .getAll(process.env.endpoints.CERTIFICATES_ME)
      .then(certificates => {
        this.certificates = certificates.data
      })
      .catch(error => console.log(error))
  },
  methods: {
    backgroundClass(certificateBackgroundName) {
      return `background-image: url(/_nuxt/assets/${certificateBackgroundName})`
    },
  },
}
</script>
<style scoped>
.main {
  padding: 0;
  margin-top: 30px;
  width: 375px;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer !important;
}

.cards-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 25px;
}

.page-title {
  font-family: Montserrat;
  color: #6600cc;
  font-size: 16px;
  text-transform: uppercase;
  padding-left: 34px;
  margin-bottom: 10px;
}
.background-image {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 115px;
  box-shadow: 0 2.5px 3px 0px rgba(0, 0, 0, 0.42);
  background: #6600cc url('../../assets/matematica.svg');
  background: #6600cc url('../../assets/fotografia.svg');
  background: #6600cc url('../../assets/cenografia.svg');
}

.footer {
  width: 200px;
  padding-top: 10px;
  line-height: 15px;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
}

.footer p {
  display: flex;
  align-items: center;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  padding-left: 2px;
  color: #1a1a1a;
  margin-top: 7px;
}

.certificate-title {
  display: flex;
  align-items: center;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #1a1a1a;
  padding-left: 2px;
  text-align: center;
}

.title-and-socialMedias {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: Montserrat;
}

<<<<<<< HEAD
.sharing-icons {
  position: absolute;
  margin: 0 0 0 110px;
}
</style>
=======
<style scoped>
</style>
  
>>>>>>> a0778763b8eabee878d51d5c0e2939be51ed21c5
