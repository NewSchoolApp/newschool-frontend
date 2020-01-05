<template>
  <v-card
    class="v-card-body"
    elevation="0"
    color="transparent"
    :tile="true"
    width="280"
  >
    <v-img
      aspect-ratio="1"
      height="150px"
      :src="image"
    >
    </v-img>
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle class="mt-0">{{teacher}}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'courseCard',
  props: ['title', 'image', 'teacher']
}
</script>

<style>
.v-card-body {
  padding: 0 0 16px 34px;
}

.v-card__title{
  font-weight: 500;
  font-size: 12px;
  color: #1A1A1A;
  padding:5px 0 0;
  line-height: 15px;
}

.theme--light.v-card .v-card__subtitle{
  padding: 0;
  color: #1A1A1A;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
}
</style>