<template>
  <div>
    <div id="page">
      <v-row>
        <v-col cols="6" md="8">
          <v-card class="mx-auto item" max-width="344">
            <img src="~/assets/perfil.png" alt />
            <a href>Perfil</a>
          </v-card>
        </v-col>

        <v-col cols="6" md="8">
          <v-card class="mx-auto item" max-width="344">
            <img src="~/assets/cursos.png" alt />
            <a href>Perfil</a>
          </v-card>
        </v-col>

        <v-col cols="6" md="8">
          <v-card class="mx-auto item" max-width="344">
            <img src="~/assets/configurações.png" alt />
            <a href>Perfil</a>
          </v-card>
        </v-col>

      </v-row>

      <!-- <v-card class="mx-auto item" max-width="344">
          <img src="../assets/cursos.png" alt />
          <a href>Cursos</a>
        </v-card>

        <v-card class="mx-auto item" max-width="344">
          <img src="../assets/configurações.png" alt />
          <a href>Configurações</a>
        </v-card>

        <v-card class="mx-auto item" max-width="344">
          <img src="../assets/configurações.png" alt />
          <a href>Configurações</a>
        </v-card>
      </div>-->

      <!-- <main>
        <section>
          <div class="titulo">
            <h1>MEU PAINEL</h1>
          </div>
        </section>
        <section>
          <div class="íconestextos">
            <img src="../assets/perfil.png" alt />
            <h3>Meu Perfil</h3>
            <p>Visualizar Perfil, alterar foto de perfil</p>
          </div>
          <div>
            <img src="../assets/cursos.png" alt />
            <h3>Meus Cursos</h3>
            <p>Cursos concluídos, cursos em andamento e emitir certificados</p>
          </div>
          <div>
            <img src="../assets/configurações.png" alt />
            <h3>Configurações</h3>
            <p>Configurar usúario, alterar senha...</p>
          </div>
          <div>
            <p>
              asdfjasdifadsuifhauidshfauisdfhauisdfhadsiufhasdufia
              sodfhasioduhfasduiofhauidsfhadsufa asdoifhasdiufhasdufabndsif
              asdnfaoidsfhnaiodsnhfaoidsfhansdf
              asoidfnaoidsfnasdoifnaodsifadsfioahjos
            </p>
          </div>
        </section>
      </main>-->
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<router>
  {
    path: '/aluno/perfil'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  }
};
</script>

<style>
.item {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

* {
  margin: 0;
  padding: 0;
}
.logo {
  width: 48%;
  margin-left: -11%;
  margin-top: 2%;
}
body {
  background-image: url("../../assets/paraisopolis.png");
  background-repeat: repeat;
  background-size: cover;
}

figure {
  margin: 0 5% 0 1%;
}
.titulo h1 {
  font-family: "Montserrat";
  font-weight: 900;
  font-size: 150%;
  display: flex;
  align-items: center;
  color: #6600cc;
}
.titulo {
  margin: 3% 0 0 4%;
}

div {
  text-align: center;
  align-items: center;
}
div h1,
h2,
h3,
p {
   color: #6600cc;
}
/* Modificar nomes das clases, padrão ingles e nomes mais abstratos */
@media (max-height: 768px) {
  .rodapé {
    position: relative;
  }
}
</style>
