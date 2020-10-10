<template>
  <div>
    <HeaderBar :title="'Certificados'" :back-page="true"></HeaderBar>
    <v-container v-if="certificates.length">
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
    certificates: [],
  }),
  mounted() {
    http
      .getAll(
        `${process.env.endpoints.CERTIFICATES_ME}${this.$store.state.user.data.id}`,
      )
      .then(certificates => {
        this.certificates = certificates.data;
      })
      .catch(error => console.log(error));
  },
};
</script>

<router>
  path: "/certificados"
</router>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
}

.cards-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  margin-bottom: 25px;
}
</style>
