<template>
  <v-col id="main-col">
    <HeaderBar :title="'Instituto Semear'" :route="'/aluno/home'" />
    <template v-if="start">
      <v-col>
        <v-col class="px-0 pb-0">
          <p class="p-info">
            Você tá ligado que o vestibular é um momento que pode mudar a tua
            vida e defenir o teu futuro, né?
            <br />
            <br />
            Responde aqui pra nós algumas perguntas? Quem sabe a gente pode te
            ajudar!
          </p>
          <div class="input-label">Quer fazer ou já fez vestibular?</div>
          <v-radio-group class="primary-checkbox" row>
            <v-radio label="Sim" :value="true"></v-radio>
            <v-radio label="Não" :value="false"></v-radio>
          </v-radio-group>

          <div class="input-label">Quer faculdade pública ou privada?</div>
          <v-radio-group class="primary-checkbox" row>
            <v-radio label="Pública" value="public"></v-radio>
            <v-radio label="Privada" value="private"></v-radio>
            <v-radio label="Os dois" value="both"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col class="px-0 pb-0">
          <div class="input-label">
            Quer prestar vestibular pra qual área?
          </div>
          <v-autocomplete
            :items="vestTypes"
            filled
            placeholder="Selecione uma opção"
            class="primary-text-field"
          ></v-autocomplete>
        </v-col>

        <v-col class="px-0 pt-0">
          <div class="input-label">
            Já escolheu a Universidade que você quer? Conta pra nós o nome!
            <v-textarea
              filled
              rows="2"
              class="primary-text-field"
              placeholder="Digite aqui o nome de uma ou mais Universidades que você quer."
            />
          </div>
        </v-col>
      </v-col>
      <!-- footer -->
      <v-row class="base">
        <v-btn
          class="btn-block btn-new-primary btn-shadow"
          :loading="loading"
          @click="start = false"
        >
          Próximo
        </v-btn>
      </v-row>
    </template>
    <template v-else>
      <v-col>
        <v-col class="px-0 pb-0" align="center">
          <p class="p-info">
            Mano, você pode receber apoio financeiro por meio de uma Bolsa de
            Estudo, orientação por meio de um Programa de Mentoria ou acesso à
            Rede de Contatos do Instituto, que reúne desde jovens na mesma
            situação a profissionais de sucesso em diversas áreas. Bora lá?
          </p>
          <img class="logo-img" :src="require(`~/assets/semearLogo.svg`)" />
        </v-col>
      </v-col>
      <!-- footer -->
      <v-row class="base">
        <v-btn
          class="btn-block btn-new-primary btn-shadow"
          :loading="loading"
          @click="submit"
        >
          Bora lá no site
        </v-btn>
      </v-row>
    </template>
  </v-col>
</template>

<router>
{
  path : '/aluno/semear',
}
</router>
<script>
import HeaderBar from '~/components/Header.vue';
export default {
  components: {
    HeaderBar,
  },
  data() {
    return {
      start: true,
      vestTypes: [
        'Administração, negócios e serviços',
        'Arte e Design',
        'Ciências Biológicas e da Terra',
        'Análise e Desenvolvimento de Sistemas',
        'Ciências Sociais e Humanas',
        'Comunicação e Informação',
        'Engenharia e Produção',
        'Saúde e Bem-estar',
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

/* main styles */
* {
  font-family: Roboto;
  letter-spacing: 0em;
}
body {
  position: relative;
}
#main-col {
  padding-top: 16px;
  height: 100%;
}

.p-info {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  padding-bottom: 64px;
  text-align: left;
}

.logo-img {
  padding-bottom: 104px;
}

/* input styles */
.input-label {
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  color: var(--primary);
}

/* buttons style */
.base {
  padding: 5px 24px;
}
</style>
