<template>
  <v-card 
  class="v-card-body" 
  elevation="0" 
  color="transparent" 
  :tile="true" 
  @click="openCourse()">
    <v-img :src="course.thumbUrl" />    
    <div class="media-and-footer-container">      
      <v-card-title>{{course.title}}</v-card-title>
      <div class="footer-card">
        <v-card-subtitle class="mt-0">{{course.authorName}}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
import { methods } from 'vue-social-sharing'
export default {
  name: 'courseCard',
  props: {    
    course: {
      type: Object,      
      required: true,
    },
  },
  methods: {
    openCourse() {
      //store this course on VueX
      this.$store.commit('courses/setCurrent', this.course);
      //go tho course page
      $nuxt._router.push(`/aluno/curso/${this.course.slug}`);
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
.footer-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.v-responsive.v-image {
  padding-top: 45%;
  height: 150px;
  position: relative;
  width: 100%;
  border-radius: 5px;
}
.v-card-body {
  margin-bottom: 20px;
}
.v-card__title {
  font-weight: 700;
  font-size: .75rem;
  padding: 8px 0 0;
  line-height: 16px;
  color: #1a1a1a;
}
.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 10px;
  line-height: 11.72px;
}
</style>
