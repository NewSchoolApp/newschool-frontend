<template>
  <div>
    <div v-if="!playing" id="course-thumbnail-backgorund" @click="playVideo()">
      <img id="course-thumbnail" :src="thumbnail" alt="imagem-curso" />

      <v-icon class="play-btn">
        mdi-play-circle-outline
      </v-icon>
    </div>

    <youtube-vue
      v-else
      ref="youtube"
      :videoid="videoUrl"
      @ended="destroyPlayer()"
    />
  </div>
</template>
<script>
import { YoutubeVue } from 'youtube-vue';

export default {
  components: {
    YoutubeVue,
  },
  props: ['youtubeUrl', 'thumbnail'],
  data() {
    return {
      playing: false,
    };
  },
  computed: {
    videoUrl() {
      const splited = this.youtubeUrl.split('/');
      return splited[splited.length - 1];
    },
  },
  mounted() {
    this.tag = window.document.createElement('script');
  },
  beforeDestroy() {
    if (window.plugins) {
      window.plugins.insomnia.allowSleepAgain();
    }
  },
  methods: {
    playVideo() {
      if (window.plugins) {
        window.plugins.insomnia.keepAwake();
      }
      this.playing = true;
      setTimeout(() => {
        this.checkVideoProgression();
        this.$refs.youtube.player.playVideo();
      }, 100);
    },
    destroyPlayer() {
      this.$refs.youtube.player.destroy();
      this.playing = false;
    },
    async checkVideoProgression() {
      if (this.$refs.youtube) {
        const duration = await this.$refs.youtube.player.getDuration();
        const currentTime = await this.$refs.youtube.player.getCurrentTime();

        if ((duration / 100) * 80 < currentTime) {
          this.$emit('enableNext');
        }

        setTimeout(() => {
          this.checkVideoProgression();
        }, 5000);
      }
    },
  },
};
</script>
<style>
#course-thumbnail {
  width: 100% !important;
  height: auto !important;
  opacity: 0.4 !important;
}
#course-thumbnail-backgorund {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.v-progress-circular {
  z-index: 3;
  position: absolute;
}
iframe {
  height: 100%;
  width: 100%;
}
.play-btn {
  position: absolute;
  font-size: 45px !important;
  color: white !important;
}
</style>
