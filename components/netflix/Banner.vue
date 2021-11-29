<template>
  <div class="ma-0">
    <header class="banner rounded-1" :style="headerStyle">
      <div class="banner__contents">
        <h1 class="banner__title">{{ bannerTitle }}</h1>
        <p class="banner__description">{{ truncateOverview }}</p>
        <div class="banner__buttons">
          <button class="banner__button rounded-0"
            @click="openCourse()">Assistir</button>
          <!--<button class="banner__button rounded-0">Meus cursos</button>-->
        </div>
      </div>
      <div class="banner__fadeBottom" />
    </header>
  </div>
</template>
<script>
export default {
  props: {
    highlights: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showLoading: true,
      course: {},
      size: '100% 100%',
      position: 'center center',
      image: '',
    };
  },
  async mounted() {
    this.showLoading = true;
    try {
      //const { cursos } = this.highlights[0];
      const cursos = this.$store.state.courses.all;
      const courseIndex = Math.floor(Math.random() * cursos.length - 1);
      this.course = cursos[courseIndex];
      this.image = cursos[courseIndex]?.capa.url;
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoading = false;
    }
  },
  methods: {
    async openCourse() {
      await this.$store.commit('courses/setCurrent', this.course);
      $nuxt._router.push(`/aluno/curso/${this.course.slug}`);
    },
  },
  computed: {
    truncateOverview: function() {
      let n = 150;
      const courseOverview = this.course?.descricao;
      return courseOverview?.length > n
        ? courseOverview.substr(0, n - 1) + "..."
        : courseOverview;
    },
    bannerTitle: function() {
      // return this.movie?.titulo || this.movie?.name || this.movie?.original_name;
      return this.course?.titulo;
    },
    headerStyle: function() {
      return {
        backgroundSize: this.size,
        backgroundPosition: this.position,
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 0, 0, 0) 60%, transparent 50%), url("${this.image}")`,
      };
    },
  },
};
</script>

<style scoped>
/*Large devices (desktops, 992px and up)*/
@media (min-width: 768px) {
  .banner {
    color: white;
    object-fit: contain;
    height: 380px !important;
    width: 100%;
    border-radius: 5px;
  }

  .banner__contents {
    margin-left: 10px;
    padding-top: 120px;
    height: 190px;
  }

  .banner__title {
    font-size: 2rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
    color: #fff;
    visibility: hidden;
  }

  .banner__description {
    width: 45rem !important;
    margin-top: 2.5rem;
    line-height: 1.5;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 360px;
    height: 80px;
  }
}

@media (max-width: 768px) {
  .banner {
    color: white;
    object-fit: contain;
    height: 300px !important;
    width: 100%;
    border-radius: 5px;
  }

  .banner__contents {
    margin-left: 10px;
    padding-top: 120px !important;
    height: 190px;
  }

  .banner__title {
    font-size: 2rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
    color: #fff;
    display: none;
  }

  .banner__description {
    width: 21rem;
    margin-top: 2.5rem;
    line-height: 1.5;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 360px;
    height: 80px;
  }
}

.banner__buttons {
  text-align: right;
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
  color: #fff;
  background-color: rgba(120, 0, 209, 0.4);
  transition: all 0.2s;
}
</style>
