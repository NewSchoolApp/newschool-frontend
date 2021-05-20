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
  <div v-else id="page">
    <v-col id="main-col">
      <v-row justify="end">
        <img
          class="header_img"
          :src="require(`~/assets/trophy-home.png`)"
          @click="goTo('ranking')"
        />
        <img
          id="bell"
          :src="
            require(`~/assets/${
              notifications.length ? 'bell' : 'bell-home-colorized'
            }.svg`)
          "
          @click="goTo('notificacao')"
        />
        <div class="notification__number__container">
          <div
            v-if="notifications.length"
            :class="
              notifications.length < 100
                ? 'notification__number'
                : 'notification_high_number'
            "
          >
            <p
              v-if="notifications.length < 100"
              :class="
                notifications.length < 10
                  ? 'notification__low_text'
                  : 'notification__text'
              "
            >
              {{ notifications.length }}
            </p>
            <p v-else class="notifications__high">
              {{ notifications.length }}
            </p>
          </div>
        </div>
      </v-row>

      <!-- Header-bar -->
      <v-row id="header" align="center">
        <v-avatar size="55">
          <img
            v-if="user.photo"
            class="user__image"
            :src="user.photo"
            @click="goTo('perfil')"
          />
          <img
            v-else
            :src="require(`~/assets/person.svg`)"
            @click="goTo('perfil')"
          />
        </v-avatar>

        <v-col>
          <h1 class="welcome-title">
            {{ 'Salve, ' + userName + '!' }}
          </h1>
          <h1 class="welcome-subtitle">Seja bem-vindo</h1>
        </v-col>

        <h1 class="xp">{{ userPoints || 0 }} NC</h1>
      </v-row>

      <!-- Search Field -->
      <v-text-field
        v-model="filtro"
        class="search-field"
        label="Encontre..."
        outlined
        prepend-inner-icon="mdi-magnify"
        autocomplete="off"
      />

      <div v-if="!filtro">
        <p id="title">Trilhas</p>
        <course-card
          v-for="pilar in pilarList"
          :key="pilar.id"
          :course="pilar"
        />
      </div>
      <br />
      <div v-if="!filtro">
        <p id="title">Pilares</p>
        <course-card
          v-for="trail in trailList"
          :key="trail.id"
          :course="trail"
        />
      </div>
      <div v-if="filtro">
        <course-card
          v-for="item in filteredList"
          :key="item.id"
          :course="item"
        />
      </div>
    </v-col>
    <navigation-bar />
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import CourseCard from '~/components/CourseCard';
import http from '~/services/http/generic';
import utils from '~/utils/index';

export default {
  components: {
    NavigationBar,
    CourseCard,
  },
  data: () => ({
    title: 'Bem-vindo',
    loading: true,
    filtro: '',
    notifications: '',
    userPoints: '',
    trails: [],
    pilars: [],
  }),
  computed: {
    courseList() {
      return this.$store.state.courses.all;
    },
    trailList() {
      const trails = [
        {
          id: 1,
          titulo: 'Socioemocional',
          courses: ['amor', 'liberdade', 'medo'],
          capa: {
            url: require('~/assets/socioemocional.svg'),
          },
          pilar: true,
        },
        {
          id: 2,
          titulo: 'Educacional',
          courses: [
            'literatura sem tédio',
            'matemática na prática',
            'projeto X',
            'e depois da escola?',
            'ditadura militar'
          ],
          capa: {
            url: require('~/assets/educacional.svg'),
          },
          pilar: true,
        },
        {
          id: 3,
          titulo: 'Profissional',
          courses: [
            'programação além do código',
            'futurismo e inovação',
            'habilidades do futuro',
            'fotografia na raça',
            'pnl',
          ],
          capa: {
            url: require('~/assets/profissional.svg'),
          },
          pilar: true,
        },
        {
          id: 4,
          titulo: 'Social',
          courses: ['liderança seja o capitão do time', 'preconceito'],
          capa: {
            url: require('~/assets/social.svg'),
          },
          pilar: true,
        },
      ];
      return trails;
    },
    pilarList() {
      const pilars = [
        {
          id: 5,
          titulo: 'Números e o bicho de 7 cabeças',
          courses: [
            'programação além do código',
            'matemática na prática',
            'liberdade',
            'e depois da escola?',
          ],
          capa: {
            url: require('~/assets/numeros.svg'),
          },
          trilha: true,
        },
        {
          id: 6,
          titulo: 'Construa seu castelo',
          courses: [
            'liderança',
            'literatura Sem Tédio',
            'pnl = programação Neurolinguística',
            'e depois da escola?',
            'medo',
            'preconceito',
          ],
          capa: {
            url: require('~/assets/construa-castelo.svg'),
          },
          trilha: true,
        },
        {
          id: 7,
          titulo: 'Expandindo a mente',
          courses: ['liberdade', 'projeto X', 'e depois da escola?'],
          capa: {
            url: require('~/assets/expandindo-mente.svg'),
          },
          trilha: true,
        },
        {
          id: 8,
          titulo: 'Você se conhece?',
          courses: ['preconceito', 'medo', 'liberdade', 'e depois da escola?'],
          capa: {
            url: require('~/assets/voce-conhece.svg'),
          },
          trilha: true,
        },
        {
          id: 9,
          titulo: 'Assuma o controle',
          courses: [
            'habilidades do Futuro',
            'liderança: Seja o capitão do time!',
            'liberdade',
            'medo',
            'amor',
          ],
          capa: {
            url: require('~/assets/assuma-controle.svg'),
          },
          trilha: true,
        },
        {
          id: 10,
          titulo: 'Mó paz',
          courses: [
            'fotografia na raça',
            'literatura sem tédio',
            'preconceito',
            'amor',
          ],
          capa: {
            url: require('~/assets/mo-paz.svg'),
          },
          trilha: true,
        },
      ];
      return pilars;
    },
    user() {
      return this.$store.state.user.data;
    },
    userName() {
      return this.user.name.split(' ')[0];
    },
    filteredList() {
      const totalList = [...this.trailList, ...this.pilarList];

      if (this.filtro) {
        return totalList.filter(
          trail =>
            trail.titulo.toLowerCase().includes(this.filtro.toLowerCase()) ||
            trail.courses.includes(this.filtro.toLowerCase()),
        );
      }
      return totalList;
    },
  },

  async mounted() {
    await this.$store.dispatch('courses/refreshAllCourses');
    await this.$store.dispatch('courses/refreshMyCourses');

    await this.getNotifications();
    await this.getUserScore();

    this.loading = false;
  },
  methods: {
    goTo(path) {
      $nuxt._router.push(`/aluno/${path}`);
    },
    async getNotifications() {
      this.notifications = (
        await http.getAll(
          `${process.env.endpoints.NOTIFICATIONS}/user/${this.user.id}`,
        )
      ).data;
    },
    // async getTrails() {
    //   this.trails = (await http.getAll(`${process.env.endpoints.TRAILS}`)).data;
    // },
    async getUserScore() {
      this.userPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.user.id}/total-points`,
        )
      ).data.points;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

#main-col {
  padding: 20px 24px 50px 24px;
  max-width: 700px;
}

::v-deep .row {
  width: 100%;
  margin: 0;
}
.user__image {
  object-fit: cover;
}

#title {
  color: var(--primary);
  line-height: 16.4px;
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.header_img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}
.notification__number {
  height: 11px;
  width: 11px;
  border-radius: 50px;
  background: linear-gradient(
    157.23deg,
    #d63305 8.86%,
    #cf3004 38.81%,
    #bc2602 82.43%,
    #b72401 90.69%
  );
  position: absolute;
  right: 5px;
  top: 13px;
}

.notification_high_number {
  height: 12px;
  width: 14px;
  border-radius: 50px;
  background: linear-gradient(
    157.23deg,
    #d63305 8.86%,
    #cf3004 38.81%,
    #bc2602 82.43%,
    #b72401 90.69%
  );
  position: absolute;
  right: 5px;
  top: 13px;
}

.notification__text {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 1px;
}

.notification__low_text {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 3px;
}
.notifications__high {
  color: white;
  font-size: 8px;
  position: absolute;
  top: 0.4px;
  right: 0;
}

#bell {
  color: #737373;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

#header {
  height: auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.welcome {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 24px;
}

.xp {
  font-weight: 900;
  font-size: 1rem;
  color: rgba(26, 26, 26, 1);
  flex: center;
}

.notification__number__container {
  max-width: 700px;
  position: relative;
}

.welcome-title {
  color: #1a1a1a;
  font-size: 0.87rem;
  font-weight: 900;
}

.welcome-subtitle {
  line-height: 10px;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.article-container {
  display: flex;
  max-width: 100vw;
  padding: 0 2em 56px 1.5em;
}

.max-content {
  max-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.title-section {
  font-weight: 900;
  font-size: 0.9rem;
  line-height: 17px;
  color: var(--primary);
  padding: 1.25em 0 0.5em 1.6em;
  text-transform: uppercase;
}
/*Large devices (desktops, 992px and up)*/
@media (min-width: 700px) {
  #page {
    display: flex;
    justify-content: center;
  }
}
</style>
