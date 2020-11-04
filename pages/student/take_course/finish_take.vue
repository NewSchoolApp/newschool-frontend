<template>
  <div id="page">
    
     <v-col id="main-col">
      <v-spacer />
      <img src="~/assets/winner.svg" alt="vencedor" />
      <h1>AEEEE, parabéns por mais esse passo!</h1>
      <v-spacer />
      <v-btn class="btn-block btn-primary" @click="finish">
        Meu Certificado
      </v-btn>
    </v-col>

    <!-- dialog start -->
    <v-col
    class="dialogCol"
    v-if="activeDialog == 'start'"
    >
      <!-- dialog header -->
      <v-icon
      style="justify-content: flex-end; padding-bottom: 10px"
      color="#6600cc"
      dark
      @click="activeDialog = 'none'; postFeedback()"    
      >
        mdi-close-circle
      </v-icon>
      
      <p align="end">
        1 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Ganhe</p>
        <p class="giant">+ 5 XP</p>
      </v-col>
      <v-col align="center">
        <strong>Diz aí!</strong>
        <p>De 0 a 10, quanto você indicaria este curso para um amigo?</p>
      </v-col>
      <v-radio-group
      :class="bindedClass"
      row      
      >      
        <v-radio 
        v-for="n in 10" 
        :key="n.id" 
        :label="n.toString()" 
        :value="n" 
        @mousedown="postBody.rating = n"
      />
      </v-radio-group>
      <v-spacer />

      <!-- dialog footer -->
      <v-row 
      align="end"
      style="padding-bottom: 0"
      >
        <v-btn        
        class="btn-block btn-primary baseline"        
        @click="submitRating">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog good -->
    <v-col
    class="dialogCol"
    v-if="activeDialog == 'good'"
    >
      <!-- dialog header -->
      <v-icon
      style="justify-content: flex-end; padding-bottom: 10px"
      color="#6600cc"
      dark
      @click="activeDialog = 'none'; postFeedback()"    
      >
        mdi-close-circle
      </v-icon>
      
      <p align="end">
        2 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Oba!!</p>
      </v-col>
      <v-col align="center">      
        <p>Caso queira, fale um pouco mais sobre sua nota!</p>
      </v-col>
      <v-textarea
      outlined
      placeholder="Seu comentário"
      v-model="postBody.feedback"
      />
      <v-spacer />

      <!-- dialog footer -->
      <v-row 
      align="end"
      style="padding-bottom: 0"
      >
        <v-btn        
        class="btn-block btn-primary baseline"        
        @click="activeDialog = 'end'; postFeedback()">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog bad -->
    <v-col
    class="dialogCol"
    v-if="activeDialog == 'bad'"
    >
      <!-- dialog header -->
      <v-icon
      style="justify-content: flex-end; padding-bottom: 10px"
      color="#6600cc"
      dark
      @click="activeDialog = 'none'; postFeedback()"    
      >
        mdi-close-circle
      </v-icon>
      
      <p align="end">
        2 de 2
      </p>

      <!-- dialog body -->
      <v-col align="center">
        <p class="giant">Hum...</p>
      </v-col>
      <v-col align="center">
        <p>O que faria você aumentar a nota escolhida?</p>
      </v-col>
      <v-textarea
      outlined
      placeholder="Seu comentário"
      v-model="postBody.feedback"
      />
      <v-spacer />

      <!-- dialog footer -->
      <v-row 
      align="end"
      style="padding-bottom: 0"
      >
        <v-btn        
        class="btn-block btn-primary baseline"        
        @click="activeDialog = 'end'; postFeedback()">
          Próximo
        </v-btn>
      </v-row>
    </v-col>

    <!-- dialog end -->
    <v-col
    class="dialogCol"
    v-if="activeDialog == 'end'"
    >
      <!-- dialog header -->
      <v-img         
        :src="require(`~/assets/tyThumb.png`)"
      />

      <!-- dialog body -->
      <v-col align="center">    
        <strong
        style="font-size: 24px;"
        >
        Obrigado!!!</strong>
        <p>Sua avaliação é muito importante!</p>
      </v-col>      
      <v-spacer />

      <!-- dialog footer -->
      <v-row 
      align="end"
      style="padding-bottom: 0"
      >
        <v-btn        
        class="btn-block btn-primary baseline"        
        @click="activeDialog = 'none'">
          Finalizar
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>
<router>
    {
        path : '/aluno/curso/:courseSlug/fim'
    }
</router>
<script>
import http from '~/services/http/generic';

export default {
  data() {
    return {
      activeDialog: 'start', //(start, good, bad, end)
      bindedClass: 'none',
      postBody: {
        'rating': '',
        'feedback': ''
      },
    };
  },  
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    courseId() {
      return this.$store.state.courses.current.id;
    },
  },
  methods: {    
    finish() {
      $nuxt._router.push(`/pagina-certificado/${this.idUser}/${this.courseId}`);
    },    
    submitRating(){
      if(!this.postBody.rating){        
        this.bindedClass = "error-form";
        setTimeout(() => {
          this.bindedClass = "";
        }, 500);
      }
      else if(this.postBody.rating > 7){
        this.activeDialog = "good";
      }
      else {
        this.activeDialog = "bad";
      }
    },
    postFeedback(){
      if (this.postBody.rating){
        http.post(
          `/api/v1/course-taken/nps/user/${this.idUser}/course/${this.courseId}`,
          this.postBody
         );
      }
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
p {
  font-weight: 500;
}
h1 {
  color: var(--primary);
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem;
}
strong {
  font-size: 20px;
  font-weight: 900;
}
#page {
  position: relative;
  padding: 0 16px 30px !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-self: center;
}
#main-col {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
}
.dialogCol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  padding: 20px 16px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.giant {
  font-size: 48px;
  font-weight: 900;
  color: black;
  line-height: 45px;
}
.container__screen {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.error-form {
  animation: nono 300ms, intro paused;
}
::v-deep .row {
  justify-content: center;
  padding-bottom: 10px;
  margin: 0;
}
@media (min-width: 700px) {
  #page {
    max-width: 700px !important;
  }
  #main-col {
    max-width: 700px !important;
  }  
}
/* style textarea */
::v-deep fieldset {
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
::v-deep .v-input textarea
{
  color: #000000 !important;
}
::v-deep ::placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, .5) !important;
}
/* style rating radios */
::v-deep .v-radio {
  margin-right: 0 !important;
  flex-direction: column;
}
::v-deep .v-input--radio-group__input {
  justify-content: space-between;
  padding: 0 15px;
}
::v-deep .v-radio .v-label {
  color: #000000 !important;
}
::v-deep .v-input--selection-controls__input {
  margin-right: 0 !important;
}
</style>
