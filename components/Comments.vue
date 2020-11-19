<template>
  <v-container class="d-flex margin__adjustment">
    <v-col>
      <v-avatar size="44">
        <img v-if="user.photo" :src="user.photo" />
        <img v-else :src="require(`~/assets/person.svg`)" />
      </v-avatar>
    </v-col>
    <v-container class="comment">
      <v-row class="user__name">{{ user.name }}</v-row>
      <v-row class="user__comment">{{ commentText }}</v-row>
      <v-row class="d-flex justify-space-between">
        <p class="user__interaction">Gostei ({{ likes }})</p>
        <p class="user__interaction">Responder</p>
        <p class="user__interaction">{{ commentDate }}</p>
      </v-row>
      <div v-for="response of responses" :key="response.rank">
        <response-card
          :responseUserName="response.userName"
          :responseCommentText="response.comment"
          responseLikes="5"
          responseCommentDate="20/11/2020"
          :responseUserPhoto="response.photo"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script>
import ResponseCard from '~/components/ResponseCard';
export default {
  name: 'CommentCard',
  props: ['user', 'commentText', 'likes', 'commentDate', 'responses'],
  data: () => ({}),
  components: {
    ResponseCard,
  },
};
</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
  transition: 0.2 ease-in;
}
h1 {
  font-weight: 900;
  font-size: 1em;
  line-height: 36px;
  color: var(--primary);
}

@media screen and (max-width: 20.625em) {
  h1 {
    font-size: 14px;
  }
}

.comments__number {
  color: black;
  margin-top: 24px;
  font-size: 12px;
  font-weight: 700;
  color: #1a1a1a;
}
.filter__coments {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #3f3d56;
}

.user__comment {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #3f3d56;
  margin: 8px 0 8px -12px;
}

.user__name {
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: center;
  color: #3f3d56;
}
.margin__adjustment {
  margin-top: -30px;
}

.container {
  padding: 12px 8px;
}
.comment {
  margin-top: 15px;
}

h3 {
  font-weight: 900;
  font-size: 14px;
  line-height: normal;
  line-height: initial;
  text-align: left;
  color: var(--primary);
}

h4 {
  font-weight: 400;
  padding-top: 0.25em;
  padding-bottom: 12px;
  color: #1a1a1a;
  font-size: 12px;
}
.user__interaction {
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: right;
  color: #737373;
}

.response__box {
  width: 100%;
}

.text__information {
  margin-top: 24px;
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 0em 2em 78px;
}

.user__comment__box {
  margin-top: 13px;
  position: relative;
}
::v-deep .v-input {
  width: 75%;
}

.response {
  margin-left: -35px;
}

.inner-container {
  margin-top: 0.5rem;
}
::placeholder {
  color: black;
}
</style>
