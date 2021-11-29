<template>
  <v-container fluid class="home__container">
    <Banner />
    <OriginalsRow />
    <Row title="Trending Videos" :fetchUrl="requests.fetchTrending" />
    <Row title="Top Rated" :fetchUrl="requests.fetchTopRated" />
    <Row title="Action Movies" :fetchUrl="requests.fetchActionMovies" />
    <Row title="Comedy Movies" :fetchUrl="requests.fetchComedyMovies" />
    <Row title="Horror Movies" :fetchUrl="requests.fetchHorrorMovies" />
    <Row title="Romance Movies" :fetchUrl="requests.fetchRomanceMovies" />
    <Row title="Documentaries" :fetchUrl="requests.fetchDocumentaries" />
  </v-container>
</template>

<router>
  {
    path: '/netflixoriginal',
    name : 'netflixoriginal'
  }
</router>

<script>
// @ is an alias to /src
import Row from "@/components/netflix/Row.vue";
import OriginalsRow from "@/components/netflix/OriginalsRow.vue";
import Banner from "@/components/netflix/Banner.vue";
import requests from "../../requests";

export default {
  name: "Home",
  data() {
    return {
      requests,
    };
  },
  components: {
    Row,
    OriginalsRow,
    Banner,
  },
};
</script>

<style scoped>
.home__container {
  background-color: #111;
}
</style>
