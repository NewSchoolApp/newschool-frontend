<template>
<div>
  <div class="bg"></div>
    <div class="container">
    <v-layout text-left>
      <v-flex>
        <h2 class="font-weight-bold mr-3 ml-3 mt-3 mb-3 text">
          O que é a New School?
        </h2>
        <div class="subtext">
         <p>Você deve estar se perguntando o que é a <span>New School</span>, né</p>
         <p>A New School não é só um app, uma escola ou uma startup. É um <span>movimento.</span></p>
         <p>A gente leva <span>educação de qualidade</span> traduzida na linguagem da quebrada para todo o Brasil 
           através da <span>tecnologia</span>  e de conteúdos baseados nas novas <span>habilidades do futuro.</span></p>
         <p>Nosso objetivo é formar <span>protagonistas</span> por meio de um conceito diferente de educação prática, futurista e <span>descolada.</span>
            Criamos experiências transformadoras de aprendizagem para que jovens como você encarem melhor os <span>desafios da vida.</span></p> 
        </div>
      </v-flex>
    </v-layout>
    </div>
 </div>
</template>
<router>
  {
    path: '/sobre'
  }
</router>

<script>
import NavigationBar from "~/components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  }
}
</script>
<style>
  .text{
    width: 100%;
    color: #6600CC;
    font-family: 'Montserrat'; 
    text-transform: uppercase; 
  }
  .container{
    max-width: 500px;
  }
  .subtext{
    width: 100%;
    margin: 0 auto;
    font-size: 100%;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("../../assets/paraisopolis.png");
    background-size: cover;
    background-position: center;
}
span{
  font-weight: 700;
}
p{
  margin: 15px;
}
</style>



