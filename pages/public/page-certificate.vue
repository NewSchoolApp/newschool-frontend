<template>
  <v-container class="main">
    <div class="card-box">
      <div class="card">
        <div class="course">
          <button type="button" @click="goToHome">
            <h4>Missão Newschool</h4>
          </button>
          <td>Educação de qualidade</td>
          <!-- <strong>{{ certificate.title }}</strong> -->
          <strong>Matemática na prática</strong>
          <!-- <tr>
            Carga horária de
            {{
              certificate.workload
            }}
            horas
          </tr> -->
          <tr>
            Carga horária de 56 horas
          </tr>
          <span>Este certificado é orgulhosamente apresentado para</span>
          <!-- <p>{{ certificate.name }}</p> -->
          <p>Thiago Carvalho</p>
        </div>

        <!-- <ul>
          <li>{{ certificate.courseStartDate }}</li>
          <li>{{ certificate.courseCompleteDate }}</li>
        </ul> -->
        <ul>
          <li>Emissão: 16/01/2020</li>
          <li>06/12/2029</li>
          <li>15/01/2020</li>
        </ul>
      </div>
      <div class="footer">
        <p>Professor</p>
        <p>Diretoria</p>
      </div>
      <div class="export">
        <div class="title-export-share">
          <div class="export-title">Exportar</div>
          <div class="export-title">Compartilhar</div>
        </div>
        <div class="export-share">
          <div class="icons">
            <button type="button">
              <v-icon color="#6600CC" size="20">
                mdi-format-vertical-align-bottom
              </v-icon>
            </button>
            <button type="button">
              <v-icon color="#6600CC" size="20">
                mdi-printer
              </v-icon>
            </button>
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
// import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  components: {
    shareBtnPageCertificate,
  },
  data() {
    return '';
  },
  mounted() {
    // this.loadClientCredentials();
    // http
    //   .getAll(process.env.endpointCourseTaken.CERTIFICATES_COURSE_TAKEN_ME)
    //   .then(certificates => {
    //     this.certificates = certificates.data;
    //   })
    //   .catch(error => console.log(error));
  },
  methods: {
    loadClientCredentials() {
      utils.getExternalCredentials().then(res => {
        this.token = res.data.accessToken;
      });
    },
    goToHome() {
      this.$nuxt._router.push('home');
    },
  },
};
</script>

<router>
  path: "/pagina-certificado"
</router>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Oxygen&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('../../assets/backgroundCertificates.svg');

  .card-box {
    padding: 10px 20px 10px 20px;
    height: 100%;
    max-width: 100%;
    text-align: center;

    .course {
      display: flex;
      flex-direction: column;
      padding: 0 10px;

      h4 {
        padding-top: 30px;
        line-height: 15px;
        font-family: 'Oxygen', sans-serif;
        text-transform: uppercase;
        font-style: normal;
        font-weight: 600;
        color: #6600cc;
        letter-spacing: 1px;
      }

      td {
        padding-top: 5px;
        font-size: 10px;
        color: #6600ccb7;
      }

      tr {
        padding-top: 8px;
        font-size: 12px;
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
        padding-top: 40px;
        font-size: 14px;
        color: #6600cc;
      }

      p {
        padding-top: 5px;
        font-weight: bold;
        color: #1a1a1a;
        font-family: Montserrat;
      }
    }
  }

  ul {
    padding: 0;
    padding-top: 20px;
    list-style: none;

    li {
      font-family: Montserrat;
      font-weight: 300;
      font-size: 12px;
      color: #6600ccb7;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 5px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 60px 0 10px 0;
      font-size: 10px;
      letter-spacing: 3px;
      color: #6600ccb7;
    }
  }
}

.title-export-share {
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 0 25px 10px 25px;

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
}

.export-share {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 10px 25px;

  .icons {
    height: 35px;
    width: 23%;

    display: flex;
    align-items: left;
    justify-content: space-between;

    :hover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      background: #d6d6d6;
      border-radius: 5px;
    }

    .share {
      height: 30px;
      width: 30%;

      display: flex;
      align-items: right;
      justify-content: space-around;
    }
  }

  button {
    cursor: pointer !important;
  }
}
</style>
