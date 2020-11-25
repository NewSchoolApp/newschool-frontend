<template>
  <v-container class="d-flex margin__adjustment">
    <v-col id="avatar-col">
      <v-avatar size="44">
        <img v-if="comment.user.photo" :src="comment.user.photo" />
        <img v-else :src="require(`~/assets/person.svg`)" />
      </v-avatar>
    </v-col>
    <v-container class="comment">
      <v-row class="user__name">{{ comment.user.name }}</v-row>
      <v-row class="user__comment">{{ comment.text }}</v-row>
      <v-row class="d-flex justify-space-between">
        <v-row>
          <p
            v-ripple
            :class="
              'user__interaction mr-6 ' +
                (liked ? 'primary--text font-weight-bold' : {})
            "
            @click="like()"
          >
            Gostei ({{ comment.likedBy.length }})
          </p>
          <p v-ripple class="user__interaction">Responder</p>
        </v-row>
        <p class="user__interaction">{{ date }}</p>
      </v-row>
      <div v-for="response of responses" :key="response.rank">
        <response-card
          :response-user-name="response.userName"
          :response-comment-text="response.comment"
          response-likes="5"
          response-comment-date="20/11/2020"
          :response-user-photo="response.photo"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script>
import ResponseCard from '~/components/ResponseCard';
import http from '~/services/http/generic';

export default {
  name: 'CommentCard',
  components: {
    ResponseCard,
  },
  props: ['comment'],
  data: () => ({
    liked: false,
  }),
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    date() {
      const date = new Date(this.comment.createdAt);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    },
  },
  mounted() {
    this.checkIfLiked();
  },
  methods: {
    async like() {
      // check if this user already liked this comment
      if (!this.liked) {
        await http.post(`api/v1/comment/${this.comment.id}/like`, {
          userId: this.idUser,
        });
        this.comment.likedBy.push({});
        this.liked = true;
      }
    },
    checkIfLiked() {
      if (this.comment.likedBy.find(user => user.id === this.idUser) != null) {
        this.liked = true;
      }
    },
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
.container {
  padding: 12px 0 12px;
}
.comment {
  margin-top: 15px;
  padding: 0px 8px;
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
#avatar-col {
  padding-left: 0;
}
</style>
