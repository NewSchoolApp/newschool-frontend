<template>
<div>
    <v-layout justify-center>
      <v-flex xs10 sm8 md6>
        <h2 class="mr-3 ml-3 mt-3 mb-3 text">
          Invista na New School
        </h2>
        <p class="subtext mr-3 ml-3">
           A New School acredita que a educação é a chave para tudo na vida, por este motivo contamos com o seu apoio para manter nosso projeto
           sempre atualizado com muito conteúdo e ativo para nossos jovens!
        </p>

        <h2 class="mr-5 ml-3 mt-3 mb-3 text">
          Seja um voluntário e entre para o time New School
        </h2>
          <p class="subtext mr-3 ml-3">
            Ja pensou em ajudar milhares de jovens com o seu conhecimento?
          </p>
          <p class="subtext mr-3 ml-3">
            Seja um voluntario New School e ajude a manter nossa plataforma sempre atualizada e com os melhores conteúdos.
          </p>
          <p class="subtext mr-3 ml-3">
          Entre em contato conosco e saiba como colaborar!
          </p>
          <h2 class="mr-3 ml-3 mt-3 mb-3 text">
            <a v-bind:href="url">Financiamento Coletivo!!</a>
          </h2>
      </v-flex>
    </v-layout>
 </div>
</template>

<router>
{
  path : '/invista'
}
</router>

<script>
export default {
  data: () => ({
    url:'http://www.vakinha.com.br/'
  }),
};
</script>

<style>
  .text{
    color: #8036ca;
    font-family: 'Montserrat';
    font-weight: 600px
  }
  .subtext{
    font-size: 110%;
    font-weight: 600px
  }

</style>
