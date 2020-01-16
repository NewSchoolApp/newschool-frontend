<template>
  <div>
    <header-bar :title="Aulas" :backPage="true"></header-bar>
  </div>
</template>
<router>
    {
        path : "/aluno/aulas/:id"
    }
</router>
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
    const { idCourse } = this.$route.params;
    http
      .getAll(`${process.end.endpoints.LESSONS_BY_COURSE}/${idCourse}`)
      .then(res => {
        console.log(res);
        this.lesson_list = res.data;
        this.loading = true;
      });
  }
};
</script>
<style></style>
