<template>
  <div>
    <v-progress-linear
      id="file"
      dark
      class="content"
      :value="progress || 0"
      :height="height || '25px'"
      :style="`width: ${width || '100px'};`"
    >
      <h1 :style="`font-weight: ${fontWeight || '600'}`" class="level__text">
        {{ value || 0 }}
      </h1>
    </v-progress-linear>
    <img
      id="img"
      :style="`height: ${Number(height.replace('px', '')) * 1.7}px`"
      class="img__icon"
      :src="iconPath || 'trophy'"
      alt=""
    />
    <h1 v-if="icon === 'level'" class="level_icon_text">{{ level || 12 }}</h1>
  </div>
</template>
<script>
export default {
  props: [
    'width',
    'height',
    'icon',
    'value',
    'progress',
    'fontWeight',
    'level',
  ],
  data() {
    return {
      iconPath: '',
    };
  },
  mounted() {
    this.loadLayout();
  },
  methods: {
    loadLayout() {
      switch (this.icon) {
        case 'book':
          this.iconPath = require('~/assets/book.svg');
          break;
        case 'trophy':
          this.iconPath = require('~/assets/trophy.svg');
          break;
        case 'level':
          this.iconPath = require('~/assets/level.png');
          break;
        default:
          this.iconPath = require('~/assets/level.png');
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1rem;
}
.content {
  border-radius: 7px;
  position: relative;
  border: 1px solid #400080;
}
.container {
  margin-top: 20px;
  position: absolute;
  width: 0;
}
.img__icon {
  top: -34px;
  left: -22px;
  position: relative;
}
.level_icon_text {
  position: relative;
  bottom: 77px;
  font-size: 1.25rem;
  color: #fff;
  right: 11px;
}
</style>
