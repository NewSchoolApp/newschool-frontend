<template>
  <div class="white--text">
    <h2 class="mt-6 font-weight-medium mb-4 pa-2 ml-5">{{ title }}</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
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
            :color="active ? undefined : 'grey lighten-5'"
            class="mr-3 rounded-0"
            :class="{ 'on-hover': hover }"
            height="85"
            width="120"
            @click="toggle"
          >
            <v-img
              :src="base_url + movie.poster_path"
              @click="handleClick(movie)"
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
    <youtube
      width="100%"
      height="230"
      v-if="videoId"
      :video-id="videoId"
      :player-vars="playerVars"
      @playing="playing"
    ></youtube>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import movieTrailer from "movie-trailer";
import getYouTubeID from "get-youtube-id";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    fetchUrl: String,
  },
  data: () => ({
    model: null,
    movies: [],
    showLoading: true,
    base_url: "https://image.tmdb.org/t/p/original/",
    videoId: "",
    playerVars: {
      autoplay: 1,
    },
  }),
  async mounted() {
    this.showLoading = true;
    try {
      const response = await axios.get(this.fetchUrl);
      this.movies = response.data.results;
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoading = false;
    }
  },
  methods: {
    handleClick(movie) {
      console.log("movie title", movie?.title);
      if (this.videoId) {
        this.videoId = "";
      } else {
        movieTrailer(movie?.title || "")
          .then((res) => {
            this.videoId = getYouTubeID(res);
            console.log("video id", this.videoId);
          })
          .catch((err) => console.error(err));
      }
    },
    playing() {
      console.log("we are watching!!!");
    },
  },
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
