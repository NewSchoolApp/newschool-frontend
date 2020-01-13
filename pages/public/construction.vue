<template>
<v-container col="12" justify-center>
    <v-layout mt-5>  
         <v-flex ref="flex">      
            <v-col>
                <v-row>
                <h1 class="initial-text">Salve salve, estamos 
                    terminando de criar a New School. Então relaxa que 
                    logo logo vem novidade ai, tamo together wow! 
                    </h1>  
                </v-row>
                <v-row>
                    <img class="img" src="../../assets/construction.svg" alt="">
                </v-row>
                <v-row>
                    <h1 class="data-text"> 
                    <span>{{ days }}</span>:    
                    <span>{{ hours }}</span>:
                    <span>{{ minutes }}</span> 
                    </h1>  
                    <p class="atribute-data"><span>Dias</span> <span>Horas</span> <span>Minutos</span></p> 
                     
                </v-row>
                <v-row>
                    <h1 class="end-text">25 de Janeiro de 2020</h1>
                </v-row>
            </v-col>
        </v-flex>    
    </v-layout>        
</v-container>
    
</template>
<router>
{
    path: '/construindo'
}

</router>
<script>




export default {
    data(){
        return{
        days: '5',    
        hours : '15',
        minutes: '10'
        }
    },
    mounted() {
        let dateEnd = new Date('january 20, 2020').getTime();
        setInterval(() => {
            let dateToday = new Date().getTime();
    var seconds = (dateEnd - dateToday) / 1000;

    this.days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    
    this.hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    
    this.minutes = parseInt(seconds / 60);
    segundos = parseInt(seconds % 60);
            
            
        }, 1000);
    }
    
}
</script>


<style scoped>
*{
    font-family: "Montserrat", Helvetica, Arial, sans-serif !important;
}

.initial-text {
font-style: normal!important;
font-size: 18px;
line-height: 22px;
display: flex;
align-items: center;
color: #8036ca;
}
.img{
    width: 90%;
    margin: 10% 5%;

}
.data-text{
font-style: normal;
font-weight: 900;
font-size: 48px;
line-height: 59px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.2em;
width: 70%;
margin: 10% 20% 0 15%;
color: #6600CC;
}
.end-text{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    bottom: 1%;
    right: 0;
    width: 80%;
    color: #6600cc;
    
}
.atribute-data{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #6600CC;
}
.atribute-data span{
    margin-left: 25%;
}

</style>