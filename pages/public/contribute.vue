<template>
  <section>
    <HeaderBar :title="'CONTRIBUA'" :back-page="true"></HeaderBar>
    <article id="page">
      <v-container>
        <div class="title">APOIE O PROJETO</div>
        <p class="descricao">
          Que tal nosso stack tecnológico? Combinação boa heim! Em cada
          repositório GITHUB tem uma explicação passo-a-passo de como você fazer
          sua PRIMEIRA CONTRIBUIÇÃO no projeto. Bora?
        </p>

        <v-container fluid max-width="700">
          <v-row>
            <div class="horizontal-scroll">
              <v-card
                v-for="stack in stacks"
                :key="stack.id"
                style="box-shadow: none;"
                min-width="115"
                class="content-padding"
              >
                <div class="card-alignment">
                  <v-img
                    class="img-size"
                    :src="stack.cover"
                    margin-top="0"
                    contain
                  ></v-img>

                  <v-card-title>{{ stack.title }}</v-card-title>

                  <v-card-subtitle>{{ stack.deion }}</v-card-subtitle>
                </div>
              </v-card>
            </div>
          </v-row>
        </v-container>

        <article>
          <div class="title">Ferramentas</div>
          <p class="descricao">
            Nós temos um monte de ferramentas legais pra esse trabalho
            colaborativo. SLACK, TRELLO, GITHUB. Tudo integrado e bem explicado,
            fácil de entender.
          </p>

          <v-container fluid>
            <v-row>
              <div class="horizontal-scroll">
                <v-card
                  v-for="tool in tools"
                  :key="tool.id"
                  style="box-shadow: none;"
                  class="content-padding"
                  max-width="168"
                  min-width="115"
                  @click="select(tool.linkUrl)"
                >
                  <div class="card-alignment bottom-padding">
                    <v-img class="img-size " :src="tool.cover"></v-img>

                    <v-card-title>{{ tool.title }}</v-card-title>

                    <v-card-subtitle>{{ tool.deion }}</v-card-subtitle>
                  </div>
                </v-card>
              </div>
            </v-row>
          </v-container>
        </article>
      </v-container>
    </article>
    <navigation-bar />
  </section>
</template>

<router>
  {
    path: '/contribua'
  }
</router>

<script>
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';

export default {
  components: {
    HeaderBar,
    NavigationBar,
  },

  data() {
    return {
      stacks: [
        {
          id: 1,
          cover:
            'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
          title: 'Backend',
          deion: 'NodeJs, NestJs, Type, Swagger, MySQL',
          linkUrl: 'https://github.com/NewSchoolBR/newschool-backend',
          linkText: 'Github',
        },
        {
          id: 2,
          cover: 'https://openbox.pt/wp-content/uploads/2018/04/vue-1.png',
          title: 'Frontend',
          deion: 'Vue, Nuxt, Vuetify - Material Design',
          linkUrl: 'https://github.com/NewSchoolBR/newschool-frontend',
          linkText: 'Github',
        },
        {
          id: 3,
          cover: 'https://pngimg.com/uploads/github/github_PNG83.png',
          title: 'Mobile',
          deion: 'Cordova',
          linkUrl: 'https://cordova.apache.org/',
          linkText: 'Figma',
        },
      ],
      tools: [
        {
          id: 1,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/slack.jpg',
          title: 'Slack',
          deion: 'Comunicação, colaboração e integração.',
          linkUrl:
            'https://join.slack.com/t/newschoolbr/shared_invite/enQtODYwMTI2MTgwODY5LTJkYzcwYWVlYWUyNWI1NDg3OTRjMjUyYjE5ZjZhMDMxZWFjMTJlMDA3NDJlYzQ0ZDEzZmIxOTQ1MzIzNjIzZjI',
          linkText: 'Slack',
        },
        {
          id: 2,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/trello.jpg',
          title: 'Trello',
          deion:
            'Pegue uma tarefa, coloque no seu nome e mova pra DOING.',
          linkUrl:
            'https://trello.com/invite/b/2MHuWn0C/b1a15b7112ea11b856cfa78174a6f72d/projeto-new-school-app',
          linkText: 'Trello',
        },
        {
          id: 3,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/github.jpg',
          title: 'Github',
          deion:
            'Aqui nós temos o cuidado de ter um histórico educativo.',
          linkUrl: 'https://github.com/newschoolbr',
          linkText: 'Github',
        },
      ],
    };
  },
  methods: {
    select(location) {
      window.open(location, '_blank');
    },
  },
};
</script>

<style scoped>
.card-alignment {
  margin: 1% auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 115px;
}

.img-size {
  width: 110px;
  height: 110px;
  padding: 5px;
}
.bottom-padding {
  margin-bottom: 30%;
}

.horizontal-scroll {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
}
.content-padding {
  margin: 0 20px 0 0;
  padding: 0 10px 0 0;
}

::v-deep .v-card__subtitle {
  font-size: 10px;
  padding: 0px 30px;
  line-height: 12px;
}
::v-deep .v-card__title {
  text-align: center !important;
  display: block;
  font-size: 12px;
}
::v-deep .v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 10px;
}
::v-deeo .v-card {
  box-shadow: white white white;
}

::v-deep .title {
  color: var(--primary);
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
}
::v-deep .descricao {
  margin-top: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #1a1a1a;
}
::v-deep .v-title__title {
  margin-top: -57px;
}
::v-deep #page {
  max-height: 100vh;
}

@media (min-width: 700px) {
  .horizontal-scroll {
    justify-content: space-evenly;
  }
  .container {
    max-width: 700px;
  }
}
</style>
