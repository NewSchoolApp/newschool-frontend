<template>
  <v-col class="my-0 pb-0 px-0">
    <CommentCell :comment="this.comment" />

    <div v-for="res in comment.responses" :key="res.index" class="ml-12 mt-1">
      <CommentCell :comment="res" :response="true" />
    </div>
  </v-col>
</template>

<script>
import CommentCell from '~/components/CommentCell';
import http from '~/services/http/generic';

export default {
  name: 'CommentCard',
  components: {
    CommentCell,
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
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      );
    },
  },
  mounted() {
    // this.checkIfLiked();
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
