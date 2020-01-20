<template>
  <v-container class="main">
    <div class="card-box">
      <div
        v-for="(certificate, index) in certificates"
        :key="index"
        class="card"
      >
        <div class="course">
          <button @click="gotoChangeData">
            <h5>Missão Newschool</h5>
          </button>
          <td>Educação de qualidade</td>
          <strong>{{ certificate.title }}</strong>
          <tr>
            Carga horária de
            {{
              certificate.workload
            }}
            horas
          </tr>
          <span>Este certificado é orgulhosamente apresentado para</span>
          <p>{{ certificate.name }}</p>
        </div>

        <ul>
          <li>Emissão: 16/01/2020</li>
          <li>{{ certificate.courseStartDate }}</li>
          <li>{{ certificate.courseCompleteDate }}</li>
        </ul>
      </div>
      <div class="footer">
        <p>Diretoria</p>
      </div>
      <div class="export">
        <div class="title-export-share">
          <div class="export-title">Exportar</div>
          <div class="export-title">Compartilhar</div>
        </div>
        <div class="export-share">
          <div class="icons">
            <v-icon color="#6600CC" class="icon" size="20">
              mdi-format-vertical-align-bottom
            </v-icon>
            <v-icon color="#6600CC" class="icon" size="20">
              mdi-printer
            </v-icon>
          </div>
          <div class="share">
            <shareBtnPageCertificate />
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import shareBtnPageCertificate from '~/components/ShareBtnPageCertificate.vue';
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  components: {
    shareBtnPageCertificate,
  },
  data() {
    return '';
  },
  mounted() {
    this.loadClientCredentials();
    http
      .getAll(process.env.endpointCourseTaken.CERTIFICATES_COURSE_TAKEN_ME)
      .then(certificates => {
        this.certificates = certificates.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    loadClientCredentials() {
      utils.getExternalCredentials().then(res => {
        this.token = res.data.accessToken;
      });
    },
    gotoChangeData() {
      this.$nuxt._router.push('home');
    },
  },
};
</script>
<router>
  path: "/aluno/pagina-certificado"
</router>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Oxygen&display=swap');

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

.card-box {
  max-width: 500px;
  text-align: center;
}

.course {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

h5 {
  padding-top: 30px;
  line-height: 15px;
  font-family: 'Oxygen', sans-serif;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 600;
  color: #6600cc;
  letter-spacing: 1px;
}

.course td {
  padding-top: 5px;
  font-size: 8px;
  color: #6600ccb7;
}

.course tr {
  padding-top: 8px;
  font-size: 10px;
  color: #6600ccb7;
}

strong {
  padding-top: 50px;
  line-height: 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  color: #6600cc;
  letter-spacing: 3px;
}
span {
  font-family: Montserrat;
  font-weight: 300;
  padding-top: 30px;
  font-size: 14px;
  color: #6600cc;
}

p {
  padding-top: 20px;
  font-weight: bold;
  color: #1a1a1a;
  font-family: Montserrat;
}

ul {
  padding: 0;
  padding-top: 20px;
  list-style: none;
}

li {
  font-family: Montserrat;
  font-weight: 300;
  font-size: 12px;
  color: #6600ccb7;
}

.footer {
  width: 100%;
  margin-top: 10px;
}

.footer p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 60px 0 10px 0;
  font-size: 10px;
  letter-spacing: 3px;
  color: #6600ccb7;
}

.export-title {
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Montserrat;
  font-weight: 900;
  font-size: 12px;
  line-height: 15px;
  margin-top: 25px;
  text-transform: uppercase;
  color: rgba(102, 0, 204, 0.5);
}

.title-export-share {
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 0 15px 10px 15px;
}

.export-share {
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 0 15px 10px 15px;
}

.icons {
  height: 30px;
  width: 20%;

  display: flex;
  align-items: left;
  justify-content: space-between;
}

.share {
  height: 30px;
  width: 30%;

  display: flex;
  align-items: right;
  justify-content: space-around;
}
</style>
