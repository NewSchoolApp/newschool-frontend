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
