<template>
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
  <div v-else id="page" class="px-7">
    <div id="layout-certificates">
      <h3 class="h3-title py-8">Meus Certificados</h3>
      <v-container v-if="certificates.length" class="container pa-0">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          class="cards-box"
        >
          <certificate-card :certificate="certificate" />
        </div>
      </v-container>
      <NothingToShow
        v-else
        title="Vixe :/"
        message="Você ainda não tem nenhum certificado. :("
      />
    </div>
    <navigation-bar />
  </div>
</template>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import http from '~/services/http/generic';
import NothingToShow from '~/components/NothingToShow';
import CertificateCard from '~/components/CertificateCard';

export default {
  components: {
    NavigationBar,
    NothingToShow,
    CertificateCard,
  },
  data: () => ({
    loading: true,
    certificates: [],
  }),
  computed: {
    allCourses() {
      return this.$store.state.courses.all;
    },
  },
  async mounted() {
    this.certificates = (
      await http.getAll(
        `${process.env.endpoints.CERTIFICATES_ME}${this.$store.state.user.data.id}`,
      )
    ).data;

    this.certificates.forEach(certificate => {
      const courseOfCertificate = this.allCourses.find(
        course => course.id == certificate.courseId,
      );
      certificate.course = courseOfCertificate;
    });

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.cards-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  width: 100%;
  margin-bottom: 25px;
}

.container {
  margin-bottom: 25px;
}
/*Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
  #page {
    display: flex;
    justify-content: center;
  }
  #layout-certificates {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    width: 700px;
    padding: 20px 24px 50px 24px;
  }
}

/*Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
  #page {
    display: flex;
    justify-content: center;
  }
}
.h3-title {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0em;
}
</style>
