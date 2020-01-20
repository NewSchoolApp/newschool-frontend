<template scoped>
  <div>
    <header-bar :title="'Aulas'" :backPage="true"></header-bar>
  </div>
</template>

<script>
import HeaderBar from "~/components/Header.vue";
import http from "~/services/http/generic";
export default {
  data: () => ({
    lesson_list: [],
    loading: false
  }),
  components: {
    HeaderBar
  },
  mounted() {
    const { id } = this.$route.params;
    http
      .getAll(`${process.env.endpoints.LESSONS_BY_COURSE}${id}`)
      .then(res => {
        this.lesson_list = res.data;
        this.loading = true;
      });
  }
};
</script>
<style scoped></style>
