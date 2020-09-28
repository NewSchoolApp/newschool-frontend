<template>
  <div class="main">
    <HeaderBar :title="'Dashboard'" :back-page="true"></HeaderBar>

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

    <article v-else class="article-container">
      <chart-card
        :chart-title="'Usuários'"
        :data="[dashboardInfo.activeUsers, totalInactiveUsers]"
        :labels="['Ativo', 'Inativo']"
        :chart-colors="['#29bf54', '#c02a2b']"
      />

      <chart-card
        :card-title="'Cursos'"
        :chart-title="'Estudantes'"
        :chart-total="totalStudents"
        :data="[
          parseInt(lessPopularCourse.frequency),
          parseInt(mostPopularCourse.frequency),
        ]"
        :labels="[lessPopularCourse.title, mostPopularCourse.title]"
        :label-suffix="'alunos'"
        :labels-subject="['Curso menos acessado', 'Cursos mais acessado']"
      />

      <div class="dashboardFooter">
        <div class="dashboardInfo">
          <img src="~/assets/alunoIcon.png" alt="aluno" />
          <p>
            {{ dashboardInfo.nsCertificatedQuantity }} alunos terminaram
            <strong>TODOS</strong> os cursos
          </p>
        </div>
        <div class="dashboardInfo">
          <img src="~/assets/certificadoIcon.png" alt="certificado" />
          <p>{{ dashboardInfo.certificateQuantity }} certificados</p>
        </div>
      </div>

      <navigation-bar />
    </article>
  </div>
</template>

<router>
  {
    path: '/admin/dashboard',
    name: "admin-dashboard"
  }
</router>

<script>
import auth from '~/services/http/auth';
import http from '~/services/http/generic';
import ChartCard from '~/components/ChartCard';
import HeaderBar from '~/components/Header.vue';
import NavigationBar from '~/components/NavigationBar';

export default {
  components: {
    ChartCard,
    HeaderBar,
    NavigationBar,
  },

  data: () => ({
    loading: true,
    dashboardInfo: {},
  }),

  computed: {
    mostPopularCourse() {
      return this.dashboardInfo.courseViews.reduce(function(prev, current) {
        return prev.frequency > current.frequency ? prev : current;
      });
    },

    lessPopularCourse() {
      return this.dashboardInfo.courseViews.reduce(function(prev, current) {
        return prev.frequency < current.frequency ? prev : current;
      });
    },

    // get the sum of all students enrolled in all courses.
    totalStudents() {
      return this.dashboardInfo.courseViews.reduce(function(prev, current) {
        return prev + parseInt(current.frequency);
      }, 0);
    },

    totalInactiveUsers() {
      return this.dashboardInfo.totalUsers - this.dashboardInfo.activeUsers;
    },
  },

  created() {
    this.loadDashboard();
  },

  methods: {
    loadDashboard() {
      const { accessToken } = auth.getInfoAuth();

      const data = {
        totalUsers: 0,
        activeUsers: 0,
        courseViews: [],
        nsCertificatedQuantity: 0,
        certificateQuantity: 0,
      };

      Promise.all([
        http.getAll(process.env.endpoints.TOTAL_USERS, {
          headers: { Authorization: accessToken },
        }),

        http.getAll(process.env.endpoints.ACTIVE_USERS, {
          headers: { Authorization: accessToken },
        }),

        http.getAll(process.env.endpoints.COURSE_VIEWS, {
          headers: { Authorization: accessToken },
        }),

        http.getAll(process.env.endpoints.NS_CERTIFICATED_QUANTITY, {
          headers: { Authorization: accessToken },
        }),

        http.getAll(process.env.endpoints.CERTIFICATE_QUANTITY, {
          headers: { Authorization: accessToken },
        }),
      ]).then(values => {
        data.totalUsers = values[0].data.length;
        data.activeUsers = values[1].data.totalElements;
        data.courseViews = values[2].data;
        data.nsCertificatedQuantity = values[3].data.totalElements;
        data.certificateQuantity = values[4].data.totalElements;
      });

      this.dashboardInfo = data;

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.article-container {
  display: flex;
  max-width: 100vw;
  padding: 0 2em 56px 1.5em;
}

.dashboardInfo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dashboardInfo p {
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 5vw;
}

.dashboardInfo img {
  height: auto;
  width: 15vw;
  margin-right: 15px;
}

@media screen and (orientation: portrait) {
  .article-container {
    flex-flow: column wrap;
  }

  @media (min-width: 27.5em) {
    .article-container {
      flex-flow: row wrap;
      padding: 0 1em 56px 1.5em;
    }

    .dashboardFooter {
      display: flex;
    }

    .dashboardInfo p {
      font-size: 2.5vw;
    }

    .dashboardInfo {
      width: 50%;
    }

    .dashboardInfo img {
      height: auto;
      width: 10vw;
    }
  }
}

@media screen and (orientation: landscape) {
  .article-container {
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-x: auto;
    margin: 0 2em 56px 1.5em;
    padding: 0;
  }

  .dashboardInfo p {
    font-size: 2vw;
  }

  @media (min-width: 48em) {
    .dashboardInfo p {
      font-size: 2vw;
    }

    .dashboardInfo {
      width: 100%;
    }

    .dashboardInfo img {
      height: auto;
      width: 8vw;
    }
  }
}
</style>
