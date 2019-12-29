<template>
  <section>
    <article id="page" class="overflow-y-auto" max-height="600">
      <v-container>
        <article>
        <div class="title">APOIE O PROJETO</div>
        <p class="descricao">Que tal nosso stack tecnológico? Combinação boa heim! Em cada repositório GITHUB tem uma explicação passo-a-passo de como você fazer sua PRIMEIRA CONTRIBUIÇÃO no projeto. Bora?</p>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="stack in stacks" :key="stack.id" cols="xs12 sm6">
              <v-card class="mx-auto" max-width="344" min-width="300">
                <v-img :src="stack.cover" height="200px"></v-img>

                <v-card-title>{{stack.title}}</v-card-title>

                <v-card-subtitle>{{stack.description}}</v-card-subtitle>

                <v-card-actions>
                  <v-btn text :href="stack.linkUrl" target="_blank">{{stack.linkText}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        </article>
        <article>
        <div class="title">Ferramentas</div>
        <p class="descricao">Nós temos um monte de ferramentas legais pra esse trabalho colaborativo. SLACK, TRELLO, GITHUB. Tudo integrado e bem explicado, fácil de entender.</p>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="tool in tools" :key="tool.id" cols="xs12 sm6">
              <v-card class="mx-auto" max-width="344" min-width="300">
                <v-img :src="tool.cover" height="200px"></v-img>

                <v-card-title>{{tool.title}}</v-card-title>

                <v-card-subtitle>{{tool.description}}</v-card-subtitle>

                <v-card-actions>
                  <v-btn text :href="tool.linkUrl" target="_blank">{{tool.linkText}}</v-btn>
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
import NavigationBar from "~/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar
  },
  data() {
    return {
      stacks: [
        {
          id: 1,
          cover:
            "https://www.opus-software.com.br/wp-content/uploads/2018/09/nodejs.jpg",
          title: "Backend",
          description: "NodeJs, NestJs, TypeScript, Swagger, MySQL",
          linkUrl: "https://github.com/NewSchoolBR/newschool-backend",
          linkText: "Github"
        },
        {
          id: 2,
          cover:
            "https://miro.medium.com/max/900/1*vYKA-nnA_hvBZil2TTq37g.jpeg",
          title: "Frontend",
          description: "Vue, Nuxt, Vuetify - Material Design",
          linkUrl: "https://github.com/NewSchoolBR/newschool-frontend",
          linkText: "Github"
        },
        {
          id: 3,
          cover:
            "https://sharebook.com.br/assets/img/contribute-project/ui-ux.jpg",
          title: "UI/UX Design",
          description: "Personas, User Stories, Figma, Material Design Icons",
          linkUrl:
            "https://www.figma.com/file/whTp4hE6ZQR3V8LBxSZnjv/NewSchool?node-id=0%3A1",
          linkText: "Figma"
        }
      ],
      tools: [
        {
          id: 1,
          cover:
            "https://sharebook.com.br/assets/img/contribute-project/slack.jpg",
          title: "Slack",
          description:
            "Comunicação, colaboração e integração. Uma das ferramentas favoritas dos devs.",
          linkUrl:
            "https://join.slack.com/t/newschoolbr/shared_invite/enQtODYwMTI2MTgwODY5LTJkYzcwYWVlYWUyNWI1NDg3OTRjMjUyYjE5ZjZhMDMxZWFjMTJlMDA3NDJlYzQ0ZDEzZmIxOTQ1MzIzNjIzZjI",
          linkText: "Slack"
        },
        {
          id: 2,
          cover:
            "https://sharebook.com.br/assets/img/contribute-project/trello.jpg",
          title: "Trello",
          description:
            "Chegou a hora de contribuir! Peque uma tarefa, coloque no seu nome e mova pra DOING.",
          linkUrl:
            "https://trello.com/invite/b/2MHuWn0C/b1a15b7112ea11b856cfa78174a6f72d/projeto-new-school-app",
          linkText: "Trello"
        },
        {
          id: 3,
          cover:
            "https://sharebook.com.br/assets/img/contribute-project/github.jpg",
          title: "Github",
          description:
            "Aqui nós temos o cuidado de ter um histórico educativo, onde cada commit conta uma estória.",
          linkUrl: "https://github.com/newschoolbr",
          linkText: "Github"
        },
        {
          id: 4,
          cover:
            "https://sharebook.com.br/assets/img/contribute-project/appveyor.jpg",
          title: "AppVeyor",
          description:
            "Solução fácil e amigável para integração e deploy contínuo. Integrado com Slack.",
          linkUrl: "https://www.appveyor.com",
          linkText: "Website"
        },
        {
          id: 5,
          cover:
            "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_bf0fb4cb7fe948c42f37ded73895638f/salesforce-heroku.png",
          title: "Heroku",
          description: "Hospedagem gratuita para os ambientes DEV e STG.",
          linkUrl: "https://www.heroku.com/",
          linkText: "Website"
        }
      ]
    };
  }
};
</script>

<style>
.title {
  color: #6600cc;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
}
.descricao {
  margin-top: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #1a1a1a;
}
</style>