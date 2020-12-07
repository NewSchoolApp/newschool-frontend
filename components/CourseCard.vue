<template>
  <v-card
    class="v-card-body"
    elevation="0"
    color="transparent"
    @click="openCourse()"
  >
    <v-img :src="course.capa.url" />
    <v-card-title>{{ course.title }}</v-card-title>
    <div class="footer-card">
      <v-card-subtitle class="mt-0">{{ course.authorName }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
import { methods } from 'vue-social-sharing';
export default {
  name: 'courseCard',
  props: ['title', 'description', 'image', 'teacher', 'slug'],
};
</script>

<style scoped>
.footer-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

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
.v-responsive__sizer {
  padding: 0;
}

.v-image__image {
  background: url('http://i.imgur.com/SrPdUD4.png') 50% 50% no-repeat;
  background-color: #000;
  position: absolute;
  width: 100%;
  height: 100%;
}

@media screen and (orientation: landscape) {
  .v-image__image {
    background: url('http://i.imgur.com/SrPdUD4.png') no-repeat;
    position: absolute;
    width: 300px;
    height: 200px;
  }

  .v-card-body {
    margin-right: 2.5em;
  }

  .v-card-body div {
    cursor: pointer;
  }

  .v-responsive.v-image {
    height: 200px;
    width: 300px;
  }

  @media (min-width: 48em) {
    .v-card-body {
      margin-right: 0;
      padding-right: 1em;
      width: 50%;
    }

    .v-responsive.v-image {
      height: 250px;
      width: 350px;
    }

    .v-image__image {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 64em) {
    .v-card-body {
      width: 25%;
      padding-right: 3em;
    }
  }

  @media (min-width: 100em) {
    .v-card-body {
      width: 20%;
      padding-right: 3em;
    }
  }
}

@media screen and (min-width: 27.5em) and (orientation: portrait) {
  .v-card-body {
    width: 50%;
    padding-right: 1em;
  }
}

.v-card-body {
  margin-bottom: 20px;
}
.v-card__title {
  font-weight: 700;
  font-size: 0.75rem;
  padding: 8px 0 0;
  line-height: 16px;
  color: #1a1a1a;
}
.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-size: 10px;
  line-height: 11.72px;
}
</style>
