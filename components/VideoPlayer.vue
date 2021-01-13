<template class="teste">
  <div>
    <div v-if="!playing" id="course-thumbnail-backgorund" @click="playVideo()">
      <img id="course-thumbnail" :src="thumbnail" alt="imagem-curso" />

      <v-icon class="play-btn">
        mdi-play-circle-outline
      </v-icon>
    </div>

    <youtube-vue v-else ref="youtube" :videoid="videoUrl" />
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
  beforeDestroy() {
    window.plugins.insomnia.allowSleepAgain()
  },
  methods: {
    playVideo() {
      window.plugins.insomnia.keepAwake();
      this.playing = true;
      setTimeout(() => {
        this.$refs.youtube.player.playVideo();
      }, 100);
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
