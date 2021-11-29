<template>
  <div id="product-card" v-ripple @click="soldout ? soldOut() : goToProduct()">
    <div id="img-viewport" :class="soldout ? 'sold-out' : ''" :style="`background-image: url(${img});`" />
    <div id="product-info">
      <div>{{ name }}</div>
      <div>{{ price }} NC</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'price', 'soldout', 'img', 'slug'],
  methods: {
    goToProduct() {
      $nuxt._router.push(`/aluno/marketplace/product/${this.slug}`);
    },
    soldOut() {
      console.log('Produto Esgotado');
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

.sold-out {
  position: relative;
}
.sold-out::before {
  content: 'Esgotado';
  font-weight: bolder;
  color: #fff;
  font-size: 2em;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
}

.sold-out::after {
  content: 'Esgotado';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.2;
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
  color: var(--secondary);
}
</style>
