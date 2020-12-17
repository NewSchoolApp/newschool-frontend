<template>
  <div v-if="loading">
    <div class="container-spinner">
      <v-progress-circular
        :size="70"
        :width="5"
        indeterminate
        color="#6600cc"
      />
    </div>
  </div>
  <div v-else class="px-6 pb-12">
    <header-bar
      :title="'Nosso Mural'"
      :route="`/aluno/curso/${slug}`"
    ></header-bar>
    <p class="mural-title">Se liga como esse curso pode mudar a tua vida!</p>

    <div v-infinite-scroll="getChallenges" infinite-scroll-disabled="busy">
      <masonry :cols="2" :gutter="16">
        <MuralCard
          v-for="challenge in challenges"
          :key="challenge.index"
          :challenge-data="challenge"
        >
        </MuralCard>
      </masonry>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>
<router>
  {
    path: '/aluno/curso/:courseSlug/mural'
  }
</router>
<script>
import infiniteScroll from 'vue-infinite-scroll';
import NavigationBar from '~/components/NavigationBar';
import HeaderBar from '~/components/Header.vue';
import MuralCard from '~/components/MuralCard.vue';
import http from '~/services/http/generic';

export default {
  components: {
    MuralCard,
    HeaderBar,
    NavigationBar,
  },
  directives: { infiniteScroll },
  data: () => ({
    loading: true,
    busy: false,
    page: 1,
    challenges: [],
  }),
  computed: {
    currentCourse() {
      return this.$store.state.courses.current;
    },
    slug() {
      return this.$route.params.courseSlug;
    },
  },
  async mounted() {
    await this.getChallenges();
    this.loading = false;
  },
  methods: {
    async getChallenges() {
      if (this.busy) {
        return;
      }

      this.busy = true;
      this.loading = true;

      await http
        .getAll(
          `${process.env.endpoints.CHALLENGE}course/${this.currentCourse.id}` +
            `?limit=50` +
            `&page=${this.page}`,
        )
        .then(res => {
          if (!res.data.content.length) {
            this.loading = false;
            return;
          }

          this.challenges = this.challenges.concat(res.data.content);
          this.page++;
          this.loading = false;
          this.busy = false;
        });
    },
  },
};
</script>

<style>
.mural-title {
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  padding: 0 65px;
}
</style>
