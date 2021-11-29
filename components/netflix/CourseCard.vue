<template>
  <v-card
    :color="active ? undefined : 'grey lighten-1'"
    class="mr-3"
    :class="{ 'on-hover': hover }"
    height="100%"
    width="325"
    @click="openCourse()"
  >
    <v-img
      :src="course.capa.url"
      aspect-ratio="1"
      class=""
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="180px"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ course.titulo }}</v-card-title>
    <!--<div class="footer-card">
      <v-card-subtitle class="mt-0">{{ course.nomeDoAutor }}</v-card-subtitle>
    </div>-->
  </v-card>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    toggle: {
      type: Boolean,
      required: true,
    },
    hover: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    capa() {
      if (this.course && this.course.capa && this.course.capa.url) {
        return this.course.capa.url;
      }
      return 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg';
    },
  },
  methods: {
    async openCourse() {
      if (!this.course.nomeDoAutor) {
        await this.$store.commit('courses/setAll', this.course.cursos);
        return $nuxt._router.push(`/aluno/lista-de-cursos/${this.course.titulo}`);
      }
      // store this course on VueX
      await this.$store.commit('courses/setCurrent', this.course);
      // go to course page
      if (this.user.data.role == 'ADMIN') {
        $nuxt._router.push(`/admin/curso/${this.course.slug}`);
      } else {
        $nuxt._router.push(`/aluno/curso/${this.course.slug}`);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
.v-img {
  object-fit: contain;
  border-radius: 5px !important;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
  white-space: nowrap;
}

::v-deep .v-image__image--cover {
  background-size: 100% 100% !important;
  background-position: center center !important;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.v-card__title {
  font-weight: 700;
  font-size: 0.75rem;
  padding: 3px 0 0;
  padding-left: 3px;
  line-height: 16px;
  color: #fff;
  background-color: rgb(39, 7, 104);
}
.theme--light.v-card .v-card__subtitle {
  padding: 0;
  padding-left: 3px;
  color: #fff;
  font-size: 10px;
  line-height: 11.72px;
  background-color: rgb(39, 7, 104);
}
</style>
