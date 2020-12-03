<template>
  <v-container class="d-flex response">
    <v-col>
      <v-avatar size="44">
        <img v-if="responseUserPhoto" :src="responseUserPhoto" />
        <img v-else :src="require(`~/assets/person.svg`)" />
      </v-avatar>
    </v-col>
    <v-container class="response__box mt-5">
      <v-row class="user__name">{{ responseUserName }}</v-row>
      <v-row class="user__comment">{{ responseCommentText }}</v-row>
      <v-row class="d-flex justify-space-between">
        <p class="user__interaction">Gostei ({{ responseLikes }})</p>
        <p class="user__interaction">Responder</p>
        <p class="user__interaction">{{ responseCommentDate }}</p>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'ResponseCard',
  props: [
    'responseUserName',
    'responseCommentText',
    'responseLikes',
    'responseCommentDate',
    'responseUserPhoto',
  ],
};
</script>

<style></style>
