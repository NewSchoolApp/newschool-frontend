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
  <div v-else id="page">
    <div id="layout-certificates">
      <HeaderBar :title="'Certificados'" :back-page="true"></HeaderBar>
      <v-container v-if="certificates.length" class="container px-2">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          class="cards-box"
        >
          <certificate-card :certificate="certificate" />
        </div>
        <navigation-bar />
      </v-container>
      <NothingToShow
        v-else
        title="Vixe :/"
        message="Você ainda não tem nenhum certificado. :("
      />
      <navigation-bar />
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';
import NothingToShow from '~/components/NothingToShow';
import CertificateCard from '~/components/CertificateCard';

export default {
  components: {
    HeaderBar,
    NothingToShow,
    NavigationBar,
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

<router>
  path: "/certificados"
</router>

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
</style>
