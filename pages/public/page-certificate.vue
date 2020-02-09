<template>
  <div class="background">
    <HeaderBar :title="'New School'" :back-page="true" :route="'/login'"></HeaderBar>
    <v-container class="main">
      <div v-if="loading">
        <div class="container-spinner">
          <v-progress-circular
            :size="70"
            :width="5"
            indeterminate
            color="#6600cc"
          />
        </div>
      </div>
      <div v-else class="card-box">
        <div class="card">
          <div class="course">
            <td>Educação de qualidade</td>
            <strong>{{ certificate.course.title }}</strong>
            <tr>
              Carga horária de {{ certificate.course.workload }} horas
            </tr>
            <span>Este certificado é orgulhosamente apresentado para</span>
            <p>{{ certificate.user.name }}</p>
          </div>
          <div>
            <p>
              Início:
              <span class="p__theme">{{this.courseStartDate}}</span>
            </p>
            <p>
              Término:
              <span class="p__theme">{{this.courseCompleteDate}}</span>
            </p>
          </div>
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
                <v-icon color="#6600CC" size="20">mdi-format-vertical-align-bottom</v-icon>
              </button>
              <button type="button">
                <v-icon color="#6600CC" size="20">mdi-printer</v-icon>
              </button>
            </div>
            <div class="share">
              <shareBtnPageCertificate
                :url="this.certificateUrl"
                :title="'Certificado de conclusão de curso New School'"
                :description="certificate.course.title"/>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import shareBtnPageCertificate from '~/components/ShareBtnPageCertificate.vue';
import http from '../../services/http/public';
import HeaderBar from '~/components/Header.vue';
import moment from 'moment';
import ogImage from '~/assets/backgroundCertificates.svg';

export default {
  components: {
    shareBtnPageCertificate,
    HeaderBar,
  },
  data: () => ({
    certificate: {},
    loading: true,
    courseStartDate: '',
    courseCompleteDate: '',
  }),
  mounted() {
    const idCourse = this.$route.params.idCourse;
    const idUser = this.$route.params.idUser;
    http.pageCertificate(idUser, idCourse).then(res => {
      this.certificate = res.data;
      this.courseStartDate = moment(this.certificate.courseStartDate).format('DD/MM/YYYY');
      this.courseCompleteDate = moment(
        this.certificate.courseCompleteDate,
      ).format('DD/MM/YYYY');
      this.loading = false;
    });
  },
  methods: {
    head() {
      return {
        meta: [
          {
            hid: 'og:image',
            property: 'og:image',
            content: `${process.env.domain}/assets/backgroundCertificates.svg`,
          },
        ],
      };
    },
  },
};
</script>

<router>
    path: "/pagina-certificado/:idUser/:idCourse"
</router>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

.background {
  background: url('../../assets/backgroundCertificates.svg');
  position: absolute;
  height: 100%;
  width: 100%;
}

.main {
  .card-box {
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
      padding: 80px 0 10px 0;
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
  padding: 10px 25px 10px 25px;

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
