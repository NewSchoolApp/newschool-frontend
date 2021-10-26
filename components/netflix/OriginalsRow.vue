<template>
  <div class="white--text">
    <h2 class="font-weight-medium mb-3 mt-4 pa-5">NETFLIX ORIGINALS</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
      prev-icon="mdi-minus"
      next-icon="mdi-plus"
      show-arrows
      dark
      width="100%"
    >
      <v-slide-item
        v-for="movie in movies"
        :key="movie.id"
        v-slot:default="{ active, toggle }"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 12 : 0"
            :color="active ? undefined : 'grey lighten-1'"
            class="mr-3"
            :class="{ 'on-hover': hover }"
            height="100%"
            width="110"
            @click="toggle"
          >
            <v-img
              :src="base_url + movie.poster_path"
              aspect-ratio="1"
              class=""
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
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
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import requests from "../../requests";

export default {
  data: () => ({
    model: null,
    movies: [],
    showLoading: true,
    base_url: "https://image.tmdb.org/t/p/original/",
  }),
  async mounted() {
    this.showLoading = true;
    try {
      const response = await axios.get(requests.fetchNetflixOriginals);
      this.movies = response.data.results;
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoading = false;
    }
  },
  methods: {},
};
</script>

<style scoped>
.v-img {
  object-fit: contain;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
