<template>
  <div id="product-card" v-ripple @click="goToProduct">
    <div id="img-viewport" :style="`background-image: url(${img});`" />
    <div id="product-info">
      <div>{{ name }}</div>
      <div>{{ price }} NC</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'price', 'img', 'slug'],
  methods: {
    goToProduct() {
      $nuxt._router.push(`/aluno/marketplace/product/${this.slug}`);
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto';
}
#product-card {
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  -webkit-box-shadow: 0px 0px 15px -5px #0000005d;
  box-shadow: 0px 0px 15px -5px #0000005d;
}
#img-viewport {
  height: 21vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#product-info {
  margin: 8px;
}
#product-info :nth-child(1) {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  color: #737373;
}
#product-info :nth-child(2) {
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  color: var(--primary);
}
</style>
