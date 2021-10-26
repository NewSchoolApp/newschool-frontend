<template>
  <div class="ma-0">
    <header class="banner" :style="headerStyle">
      <div class="banner__contents">
        <h1 class="banner__title">{{ bannerTitle }}</h1>
        <div class="banner__buttons">
          <button class="banner__button rounded-0">Play</button>
          <button class="banner__button rounded-0">My List</button>
        </div>
        <p class="banner__description">{{ truncateOverview }}</p>
      </div>
      <div class="banner__fadeBottom" />
    </header>
  </div>
</template>

<script>

import axios from "@/plugins/axios";
import requests from "../../requests";

export default {
  data() {
    return {
      showLoading: true,
      movie: {},
      size: "cover",
      position: "center center",
      image: "",
    };
  },
  async mounted() {
    this.showLoading = true;
    try {
      const response = await axios.get(requests.fetchNetflixOriginals);
      const { results } = response.data;
      const movieIndex = Math.floor(Math.random() * results.length - 1);
      this.movie = results[movieIndex];
      this.image = results[movieIndex]?.backdrop_path;
      console.log("image here", this.image);
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoading = false;
    }
  },
  computed: {
    truncateOverview: function() {
      let n = 150;
      const movieOverview = this.movie?.overview;
      return movieOverview?.length > n
        ? movieOverview.substr(0, n - 1) + "..."
        : movieOverview;
    },
    bannerTitle: function() {
      return this.movie?.title || this.movie?.name || this.movie?.original_name;
    },
    headerStyle: function() {
      return {
        backgroundSize: this.size,
        backgroundPosition: this.position,
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${this.image}")`,
      };
    },
  },
};
</script>

<style scoped>
.banner {
  color: white;
  object-fit: contain;
  height: 448px;
  width: 100%;
}

.banner__contents {
  margin-left: 30px;
  padding-top: 100px;
  height: 190px;
}

.banner__title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}

.banner__description {
  width: 45rem;
  margin-top: 1rem;
  line-height: 1.5;
  padding-top: 1rem;
  font-size: 0.9rem;
  max-width: 360px;
  height: 80px;
}

.banner__button {
  cursor: pointer;
  color: white;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  background-color: rgb(51, 51, 51, 0.5);
  padding-bottom: 0.5rem;
}

.banner__button:hover {
  color: #000;
  background-color: #e6e6e6;
  transition: all 0.2s;
}
/** .banner__fadeBottom {
  height: 15rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
} **/
</style>
