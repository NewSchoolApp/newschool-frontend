<template>
  <v-row v-if="dataReady" class="mt-1 mx-0">
    <v-avatar
      :size="response ? 25 : 40"
      :class="'mr-1 ' + (response ? 'mt-2 ml-1' : {})"
    >
      <img v-if="comment.user.photo" :src="comment.user.photo" />
      <img v-else :src="require(`~/assets/person.svg`)" />
    </v-avatar>
    <v-col class="pa-0 mt-3">
      <v-row class="mx-0 ml-1 user__name pl-1">{{ comment.user.name }}</v-row>
      <v-row class="ml-1 user__comment pl-1">{{ comment.text }}</v-row>
      <v-row class="ml-4 mr-1">
        <v-row>
          <div
            v-ripple
            :class="
              'user__interaction mr-6 pa-1 ' +
                (claps > 0 || storedClaps > 0
                  ? 'primary--text font-weight-bold'
                  : {})
            "
            @click="scheduleClap()"
          >
            Salve {{ clapsToShow ? '(' + clapsToShow + ')' : '' }}
          </div>
          <div
            v-if="!response && !answering"
            v-ripple
            class="user__interaction pt-1"
            @click="answering = true"
          >
            Responder
          </div>
        </v-row>
        <div class="user__interaction pt-1">{{ date }}</div>
      </v-row>
      <v-col v-if="!response && answering" class="pr-0 pl-2 py-0">
        <v-row class="pl-2 pr-3" justify="space-between">
          <v-icon color="primary" @click="answering = false"
            >mdi-close-circle</v-icon
          >
          <p
            :class="
              'publish pt-4 ' + (answerPost && !tooBig ? 'primary--text' : {})
            "
            @click="postAnswer()"
          >
            Publicar
          </p>
        </v-row>
        <v-textarea
          v-model="answerPost"
          :loading="posting"
          outlined
          rows="5"
          auto-grow
          class="light-text-area mt-0"
          placeholder="Escreva seu comentário."
          :messages="tooBigWarn"
          :error="tooBig"
        />
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import http from '~/services/http/generic';

export default {
  name: 'CommentCell',
  props: ['comment', 'response'],
  data: () => ({
    dataReady: false,
    answering: false,
    posting: false,
    answerPost: '',
    claps: 0,
    storedClaps: 0,
  }),
  computed: {
    tooBig() {
      if (this.answerPost.length > 255) {
        return true;
      } else {
        return false;
      }
    },
    tooBigWarn() {
      if (this.tooBig) {
        return 'Comentário muito grande';
      } else {
        return '';
      }
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
    date() {
      const date = new Date(this.comment.createdAt);
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      );
    },
    clapsToShow() {
      return this.comment.clappedByTotalCount + this.storedClaps;
    },
  },
  async mounted() {
    this.checkIfClapped();

    this.dataReady = true;
  },
  methods: {
    checkIfClapped() {
      const myClaps = this.comment.clappedBy.find(
        clap => clap.user.id == this.idUser,
      );

      if (myClaps) {
        this.claps = myClaps.claps;
      }
    },
    async sendClaps() {
      const clapsToPost = this.storedClaps;

      this.claps += this.storedClaps;
      this.comment.clappedByTotalCount += this.storedClaps;
      this.storedClaps = 0;

      await http
        .post(`/api/v1/comment/${this.comment.id}/clap`, {
          userId: this.idUser,
          claps: clapsToPost,
        })
        .catch(error => {
          console.log(error);
        });
    },
    scheduleClap() {
      if (this.claps + this.storedClaps < 50) {
        this.storedClaps++;

        if (this.timerForSend) {
          clearTimeout(this.timerForSend);
          this.timerForSend = null;
        }

        this.timerForSend = setTimeout(() => {
          this.sendClaps();
          clearTimeout(this.timerForSend);
          this.timerForSend = null;
        }, 1000);
      }
    },
    async postAnswer() {
      if (this.answerPost) {
        this.posting = true;
        const postData = (
          await http.post(`/api/v1/comment/${this.comment.id}/response`, {
            partId: this.comment.partId,
            userId: this.idUser,
            text: this.answerPost,
          })
        ).data;

        this.comment.responses.push(postData);

        this.answerPost = '';
        this.answering = false;
        this.posting = false;
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
  overflow-wrap: break-word !important;
  display: block;
  max-width: 100%;
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
.response {
  margin-left: -35px;
}
::placeholder {
  color: black;
}
#avatar-col {
  padding-left: 0;
}
#send-res {
  position: relative;
  bottom: 50px;
  left: -8px;
}
#res-icons .v-icon {
  font-size: 30px;
  outline: none !important;
}
.publish {
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  color: #d8b4ff;
}
img {
  object-fit: cover;
}
</style>
