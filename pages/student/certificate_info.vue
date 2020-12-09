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
      <HeaderBar
        :title="'Certificados'"
        :route="`/aluno/curso/${certificate.course.slug}`"
      ></HeaderBar>
      <v-container class="container px-2">
        <certificate-card :certificate="certificate" />
        <navigation-bar />
      </v-container>
      <navigation-bar />
    </div>
  </div>
</template>

<router>
    path: "/aluno/certificado-info/:idUser/:idCourse"
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import http from '~/services/http/generic';
import HeaderBar from '~/components/Header.vue';
import CertificateCard from '~/components/CertificateCard';

export default {
  components: {
    HeaderBar,
    NavigationBar,
    CertificateCard,
  },
  data: () => ({
    loading: true,
    certificate: [],
  }),
  computed: {
    allCourses() {
      return this.$store.state.courses.all;
    },
  },
  async mounted() {
    this.certificate = (
      await http.getAll(
        `/api/v2/course-taken/certificate/user/${this.$route.params.idUser}/course/${this.$route.params.idCourse}`,
      )
    ).data;

    this.certificate.course = (
      await http.getAll(`/api/v2/course/${this.$route.params.idCourse}`)
    ).data;

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
</style>
