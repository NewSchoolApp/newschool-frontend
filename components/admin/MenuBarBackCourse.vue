<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs10 sm12 md8 ref="flex">
        <v-container>
          <v-row style="align-items: center;">
            <v-btn class="ma-0" large text icon color="#6600cc">
              <v-icon class="color-forced" size="40">mdi-arrow-left</v-icon>
            </v-btn>
            <p class="text-uppercase font-weight-bold sub-title" style="color:#6600cc">Gerenciar meus cursos</p>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<style>

.sub-title {
  font-size: calc(0.45em + 1.55vmin) !important;
  margin-left: 1.55vmin !important;
    
}

.color-forced {
  color: #6600cc !important;
}

</style>