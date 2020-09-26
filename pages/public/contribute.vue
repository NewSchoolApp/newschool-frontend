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
            <v-col
              v-for="stack in stacks"
              :key="stack.id"
              :class="stack.class"
              cols="xs12 sm6"
            >
              <v-card
                class="mx-auto"
                max-width="344"
                min-width="200"
                min-height="400"
              >
                <v-img :src="stack.cover" margin-top="0"></v-img>

                <v-card-title>{{ stack.title }}</v-card-title>

                <v-card-subtitle>{{ stack.description }}</v-card-subtitle>

                <v-card-actions>
                  <v-btn text :href="stack.linkUrl" target="_blank">{{
                    stack.linkText
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
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
              <v-col
                v-for="tool in tools"
                :key="tool.id"
                :class="tool.class"
                cols="xs12 sm6"
              >
                <v-card
                  class="mx-auto"
                  max-width="344"
                  min-width="200"
                  min-height="450"
                >
                  <v-img :src="tool.cover" contain></v-img>

                  <v-card-title>{{ tool.title }}</v-card-title>

                  <v-card-subtitle>{{ tool.description }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn text :href="tool.linkUrl" target="_blank">{{
                      tool.linkText
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
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
            'https://www.opus-software.com.br/wp-content/uploads/2018/09/nodejs.jpg',
          title: 'Backend',
          description: 'NodeJs, NestJs, TypeScript, Swagger, MySQL',
          linkUrl: 'https://github.com/NewSchoolBR/newschool-backend',
          linkText: 'Github',
        },
        {
          id: 2,
          cover:
            'https://miro.medium.com/max/900/1*vYKA-nnA_hvBZil2TTq37g.jpeg',
          title: 'Frontend',
          description: 'Vue, Nuxt, Vuetify - Material Design',
          linkUrl: 'https://github.com/NewSchoolBR/newschool-frontend',
          linkText: 'Github',
        },
        {
          id: 3,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/ui-ux.jpg',
          title: 'UI/UX Design',
          description: 'Personas, User Stories, Figma, Material Design Icons',
          linkUrl:
            'https://www.figma.com/file/whTp4hE6ZQR3V8LBxSZnjv/NewSchool?node-id=0%3A1',
          linkText: 'Figma',
          class: 'figma',
        },
      ],
      tools: [
        {
          id: 1,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/slack.jpg',
          title: 'Slack',
          description:
            'Comunicação, colaboração e integração. Uma das ferramentas favoritas dos devs.',
          linkUrl:
            'https://join.slack.com/t/newschoolbr/shared_invite/enQtODYwMTI2MTgwODY5LTJkYzcwYWVlYWUyNWI1NDg3OTRjMjUyYjE5ZjZhMDMxZWFjMTJlMDA3NDJlYzQ0ZDEzZmIxOTQ1MzIzNjIzZjI',
          linkText: 'Slack',
        },
        {
          id: 2,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/trello.jpg',
          title: 'Trello',
          description:
            'Chegou a hora de contribuir! Peque uma tarefa, coloque no seu nome e mova pra DOING.',
          linkUrl:
            'https://trello.com/invite/b/2MHuWn0C/b1a15b7112ea11b856cfa78174a6f72d/projeto-new-school-app',
          linkText: 'Trello',
        },
        {
          id: 3,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/github.jpg',
          title: 'Github',
          description:
            'Aqui nós temos o cuidado de ter um histórico educativo, onde cada commit conta uma estória.',
          linkUrl: 'https://github.com/newschoolbr',
          linkText: 'Github',
        },
        {
          id: 4,
          cover:
            'https://sharebook.com.br/assets/img/contribute-project/appveyor.jpg',
          title: 'AppVeyor',
          description:
            'Solução fácil e amigável para integração e deploy contínuo. Integrado com Slack.',
          linkUrl: 'https://www.appveyor.com',
          linkText: 'Website',
          class: 'appveyor',
        },
        {
          id: 5,
          cover: 'https://cdn.worldvectorlogo.com/logos/rollbar.svg',
          title: 'Rollbar',
          description:
            'Monitoramento e notificação de erros integrado com nossas demais ferramentas.',
          linkUrl: 'https://rollbar.com/',
          linkText: 'Website',
          class: 'rollbar',
        },
        {
          id: 6,
          cover: 'https://cdn.worldvectorlogo.com/logos/heroku.svg',
          title: 'Heroku',
          description: 'Hospedagem gratuita para os ambientes DEV e STG.',
          linkUrl: 'https://www.heroku.com/',
          linkText: 'Website',
          class: 'heroku',
        },
      ],
    };
  },
};
</script>

<style scoped>
::v-deep .title {
  color: #6600cc;
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
::v-deep .figma .v-image__image {
  margin-top: -10px;
}
::v-deep .figma .v-card__title {
  margin-top: -33px;
}
::v-deep .heroku .v-image__image {
  height: 40%;
  margin-top: 10%;
}
::v-deep .heroku .v-card__title {
  margin-top: -80%;
}
::v-deep .rollbar .v-image__image {
  width: 80%;
  height: 70%;
  margin: 15% 10%;
}
::v-deep #page {
  max-height: 100vh;
}
</style>
