<template>
  <div class="background">
    <HeaderBar :title="'CERTIFICADO'" :back-page="true" />
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
            <h4>CURSO DE {{ certificate.course.title.toUpperCase() }}</h4>
            <h4 class="medium__text">
              FINALIZADO NO DIA {{ courseCompleteDate }} COM CARGA HORÁRIA DE
              {{ certificate.course.workload }}HRS
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
            <div class="assignature">
              <div class="professor ">
                <div class="asn">
                  <img
                    class="asn_img"
                    src="../../assets/assinatura.png"
                    alt=""
                  />
                </div>
                <h6 class="medium__text">PROFESSOR</h6>
              </div>
              <div class="director ">
                <div class="asn">
                  <img
                    class="asn_img"
                    src="../../assets/assinatura.png"
                    alt=""
                  />
                </div>
                <h6 class="medium__text">DIRETORIA</h6>
              </div>
            </div>
            <img
              class="new__logo"
              src="../../assets/NS-Logo-vertical.svg"
              alt=""
            />
          </footer>
        </div>
      </div>
    </v-container>
    <navigation-bar id="navigator" />
  </div>
</template>
<router>
    path: "/pagina-certificado/:idUser/:idCourse/:print"
</router>
<script>
import moment from 'moment';
import http from '../../services/http/public';
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import ogImage from '~/assets/backgroundCertificates.svg';

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
      this.author = this.convertName(this.certificate.course.authorName);
      this.courseStartDate = moment(this.certificate.courseStartDate).format(
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
            content: `${process.env.domain}/assets/backgroundCertificates.svg`,
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

<router>
    path: "/pagina-certificado/:idUser/:idCourse"
</router>

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
  background: url('../../assets/backgroundCertificates.svg');
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
.assignature {
  margin-top: -55px;
  display: flex;
  justify-content: center;
  align-items: center;
  .professor,
  .director {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .asn {
    border-bottom: 1px solid black;
    width: 75%;
  }
}
.asn_img {
  width: 91px;
  height: 192px;
  margin-left: 26px;
  margin-bottom: -80px;
}
h6 {
  font-size: 12px !important;
  margin-top: 2%;
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
  .assignature {
    justify-content: flex-start;
  }
  .asn_img {
    width: 150px;
    height: 250px;
    margin-left: 20px;
    margin-bottom: -110px;
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
  .assignature .professor,
  .assignature .director {
    width: 30%;
  }

  .background {
    border: 20px solid #6600cc;
  }
}

@media print {
  @page {
    margin: 0;
    size: landscape;
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
  .assignature {
    justify-content: flex-start;
  }
  .asn_img {
    width: 150px;
    height: 250px;
    margin-left: 20px;
    margin-bottom: -110px;
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
  .assignature .professor,
  .assignature .director {
    width: 30%;
  }

  .background {
    border: 20px solid #6600cc;
  }
}
</style>
