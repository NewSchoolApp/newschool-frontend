<template>
<div>
  <div class="bg"></div>
    <v-layout text-left>
      <v-flex  >
        <h2 class="font-weight-bold mr-3 ml-3 mt-3 mb-3 text">
          SOBRE A NEW SCHOOL
        </h2>
        <p class="font-weight-bold subtext mr-3 ml-3">
           A New School foi criada com intenção de ajudar os jovens de periferia que por muitas 
           das vezes não conseguem ter uma educação 
           de qualidade. Com isso o seu fundador JP (João Malara) teve a brilhante ideia de 
           criar esse projeto sagrado. Com isso, a New School tem o objetivo de trazer o ensino de qualidade em uma linguagem simples
            para o público jovem, que estuda, como também os que não estudam mais o ensino escolar.
        </p>
      </v-flex>
    </v-layout>
 </div>
</template>

<script>
export default {
  name: 'about',
  data: () => ({
   
  }),
};
</script>
<style>
  .text{
    color: #6600CC;
    font-family: 'Montserrat';  
  }
  .subtext{
    font-size: 110%;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("../assets/paraisopolis.png");
    background-size: cover;
    background-position: center;
}
</style>



