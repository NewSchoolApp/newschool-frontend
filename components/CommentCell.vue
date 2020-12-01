<template>
  <v-row v-if="dataReady" class="mt-1">
    <v-avatar :size="response ? 34 : 44" class="mr-1">
      <img v-if="comment.user.photo" :src="comment.user.photo" />
      <img v-else :src="require(`~/assets/person.svg`)" />
    </v-avatar>
    <v-col class="pb-1">
      <v-row class="ml-1 user__name">{{ comment.user.name }}</v-row>
      <v-row class="ml-1 user__comment">{{ comment.text }}</v-row>
      <v-row class="ml-4">
        <div
          :class="'pb-2 absolute ' + pulseClass"
          @click="popBubbleAnimation()"
        >
          <p
            ref="bubble"
            v-ripple
            :class="'bubble ' + bubbleClass"
            @click="popBubbleAnimation()"
          >
            Salve! {{ salveQnt }}
          </p>
        </div>
        <v-row>
          <p
            v-ripple
            :class="
              'user__interaction mr-6 ' +
                (liked ? 'primary--text font-weight-bold' : {})
            "
            @click="popBubbleAnimation()"
          >
            Salve ({{ comment.likedBy.length }})
          </p>
          <p
            v-if="!response && !answering"
            v-ripple
            class="user__interaction"
            @click="answering = true"
          >
            Responder
          </p>
        </v-row>
        <p class="user__interaction">{{ date }}</p>
      </v-row>
      <v-col v-if="!response && answering" class="px-0 py-0">
        <v-row align="top">
          <v-textarea
            v-model="answerPost"
            filled
            rows="5"
            class="primary-text-field"
            placeholder="Digite aqui sua resposta."
            prepend-icon-inner="mdi-send"
          />
          <div id="res-icons" class="ml-1 mt-2">
            <v-icon v-if="answerPost" @click="postAnswer">mdi-send</v-icon>
            <v-icon v-else color="grey" @click="answering = false"
              >mdi-close-thick</v-icon
            >
          </div>
        </v-row>
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
    liked: false,
    answering: false,
    answerPost: '',
    salveQnt: 1,
    bubbleClass: '',
    pulseClass: '',
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
  async mounted() {
    this.checkIfLiked();

    this.dataReady = true;
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
    postAnswer() {
      http.post(`/api/v1/comment/${this.comment.id}/response`, {
        partId: this.comment.partId,
        userId: this.idUser,
        text: this.answerPost,
      });

      this.comment.responses.push({
        text: this.answerPost,
        userId: this.idUser,
        likedBy: [],
        createdAt: new Date(Date.now()).toISOString(),
      });

      this.answerPost = '';
      this.answering = false;
    },
    log(text) {
      console.log(text);
    },
    popBubbleAnimation() {
      console.log('popBubbleAnimation');
      this.pulseClass = 'not-pulse';
      setTimeout(() => {
        this.pulseClass = 'pulse-bubble';
      }, 50);

      this.salveQnt++;

      if (this.timerForHide) {
        clearTimeout(this.timerForHide);
        this.timerForHide = null;
      } else {
        this.bubbleClass = 'show-bubble';

        clearTimeout(this.timerForClearClass);
        this.timerForClearClass = null;
      }
      this.timerForHide = setTimeout(() => {
        this.bubbleClass = 'hide-bubble';
        this.timerForHide = null;

        this.timerForClearClass = setTimeout(() => {
          this.bubbleClass = '';
        }, 990);
      }, 1000);
    },
    clap(claps) {
      http.post(`/api/v1/comment/${this.comment.id}/clap`, {
        userId: this.idUser,
        claps,
      });
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
#send-res {
  position: relative;
  bottom: 50px;
  left: -8px;
}
#res-icons .v-icon {
  font-size: 30px;
}
.primary-text-field {
  font-size: 14px !important;
}
#salve {
  background-color: red;
}
.bubble {
  position: relative;
  background: var(--primary);
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  line-height: 200%;
  text-align: center;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  padding: 0px;
  top: -40px;
  left: 0;
  opacity: 0;
}
.bubble:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  z-index: 99;
  border-style: solid;
  border-width: 10px 10px 0 0;
  border-color: var(--primary) transparent transparent transparent;
  bottom: -10px;
  left: 20%;
  margin-left: -10px;
}
.absolute {
  position: absolute;
  pointer-events: none;
}

/* .pop {
  animation: pop 0.5s;
}
.hide {
  animation: hide 1s;
}
@keyframes pop {
  0% {
    display: initial;
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
.hiden {
  display: none;
} */

.show-bubble {
  animation: showbubble 1s forwards;
}
.hide-bubble {
  animation: hidebubble 1s;
}
.pulse-bubble {
  animation: pulse 0.5s;
}
@keyframes showbubble {
  0% {
    display: initial;
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: initial;
  }
}
@keyframes hidebubble {
  0% {
    display: initial;
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
@keyframes pulse {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
