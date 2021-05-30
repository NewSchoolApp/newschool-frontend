<template>
  <div class="background">
    <HeaderBar :title="'CERTIFICADO'" :back-page="false" />
    <v-container>
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
        <header class="certificate__title">
          <h3 class="medium__text">CERTIFICADO DE CONCLUSÃO</h3>
          <h1 class="new_school__bold">NEW SCHOOL</h1>
        </header>
        <div class="container">
          <main class="main">
            <h4>CURSO DE {{ certificate.course.titulo.toUpperCase() }}</h4>
            <h4 class="medium__text">
              FINALIZADO NO DIA {{ courseCompleteDate }} COM CARGA HORÁRIA DE
              {{ certificate.course.horas }}HRS
            </h4>
          </main>
          <main class="main">
            <h4 class="medium__text middle__text">
              ESTE CERTIFICADO É ORGULHOSAMENTE APRESENTADO PARA
            </h4>
            <h4 class="user">
              {{ certificate.user.name.toUpperCase() }}
            </h4>
          </main>
          <footer>
            <div class="signature">
              <img
                class="signature-img"
                src="../../assets/assinaturaSergio.png"
                alt=""
              />
              <div class="signature-text">DIRETORIA</div>

              <img
                class="new__logo"
                src="../../assets/NS-Logo-vertical.svg"
                alt=""
              />
            </div>
          </footer>
        </div>
      </div>
    </v-container>
    <navigation-bar id="navigator" />
  </div>
</template>
<router>
    path: "/pagina-certificado/:idUser/:idCourse/:print?"
</router>
<script>
import moment from 'moment';
import http from '../../services/http/public';
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import ogImage from '~/assets/backgroundCertificate.png';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },
  data: () => ({
    certificate: {},
    loading: true,
    courseStartDate: '',
    courseCompleteDate: '',
    author: '',
    director: 'New School',
  }),
  computed: {
    certificateUrl() {
      return window.location.href;
    },
  },
  mounted() {
    const idCourse = this.$route.params.idCourse;
    const idUser = this.$route.params.idUser;
    http.pageCertificate(idUser, idCourse).then(res => {
      this.certificate = res.data;
      this.author = this.convertName(this.certificate.course.nomeDoAutor);
      this.courseStartDate = moment(this.certificate.created_at).format(
        'DD/MM/YYYY',
      );
      this.courseCompleteDate = moment(
        this.certificate.courseCompleteDate,
      ).format('DD/MM/YYYY');
      this.loading = false;
      if (this.$route.params.print == 1) {
        setTimeout(() => {
          this.download();
        }, 850);
      }
      if (this.$route.params.print == 0) {
        document.getElementById('head__bar').style.visibility = 'hidden';
        document.getElementById('navigator').style.display = 'none';
      }
    });
  },
  methods: {
    head() {
      return {
        meta: [
          {
            hid: 'og:image',
            property: 'og:image',
            content: `${process.env.domain}/assets/backgroundCertificate.png`,
          },
        ],
      };
    },
    download() {
      window.print();
    },
    convertName(name) {
      name = name.split(' ');
      if (name.length > 2) {
        name[1] = name[1].charAt(0);
      }
      return name.join(' ');
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
h4,
h3 {
  color: black !important;
}

.background {
  background: url('../../assets/backgroundCertificate.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.card-box {
  margin-left: 5%;
}
.medium__text {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
}
.certificate__title {
  .new_school__bold {
    font-weight: 700;
    color: var(--primary);
  }
}
.btn-block,
.btn-white {
  margin: 5% 10%;
}
.main {
  width: 85%;
  margin: 4% 0 5% 0;
  font-size: 16px;
  .middle__text {
    font-size: 14px;
  }
}
.user {
  font-size: 16px;
}
.icon {
  height: 35px;
  width: 35px;
  margin-left: 20px;
  margin-top: 10px;
  background-color: rgba(112, 16, 207, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
  font-size: 8px;
  color: var(--primary);
  line-height: 10px;
  align-items: center;
  justify-content: center;
}
.new__logo {
  display: none;
}
h6 {
  font-size: 12px !important;
  margin-top: 2%;
}
.signature {
  margin-top: 24px;
}
.signature-img {
  width: 150px;
  border-bottom: 1px solid;
}
.signature-text {
  font-size: 12px;
  font-weight: bold;
}

@media (min-width: 700px) {
  .icon {
    display: none;
  }
  .certificate__title {
    margin-top: 3%;
  }
  .certificate__title .new_school__bold {
    font-size: 75px;
  }
  .main,
  .medium__text {
    font-size: 25px;
  }

  .main .middle__text {
    font-size: 20px;
  }
  .user {
    font-size: 25px;
  }
  .new__logo {
    width: 200px;
    height: 200px;
    display: block;
    position: absolute;
    right: 35px;
    bottom: 0;
  }
  ::v-deep .v-item-group.v-bottom-navigation--fixed,
  #head__bar {
    display: none;
  }

  .background {
    border: 20px solid #6600cc;
  }
  .signature {
    margin-top: 24px;
  }
  .signature-img {
    width: 200px;
    border-bottom: 1px solid;
  }
  .signature-text {
    font-size: 12px;
    font-weight: bold;
  }
}

@media print {
  @page {
    margin: 0;
    size: landscape;
  }
  html,
  body {
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }

  .icon {
    display: none;
  }
  .certificate__title {
    margin-top: 3%;
  }
  .certificate__title .new_school__bold {
    font-size: 75px;
  }
  .main,
  .medium__text {
    font-size: 25px;
  }

  .main .middle__text {
    font-size: 20px;
  }
  .user {
    font-size: 25px;
  }
  .new__logo {
    width: 200px;
    height: 200px;
    display: block;
    position: absolute;
    right: 35px;
    bottom: 0;
  }
  ::v-deep .v-item-group.v-bottom-navigation--fixed,
  #head__bar {
    display: none;
  }
  .background {
    border: 20px solid #6600cc;
  }
  .signature {
    margin-top: 24px;
  }
  .signature-img {
    width: 200px;
    border-bottom: 1px solid;
  }
  .signature-text {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
