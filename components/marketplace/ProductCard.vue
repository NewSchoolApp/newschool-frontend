<template>
  <div id="product-card">
    <div id="img-viewport" :style="`background-image: url(${img});`" />
    <div id="product-info">
      <div>{{ name }}</div>
      <div>{{ price }} NC</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'price', 'img'],
  methods: {},
};
</script>

<style scoped>
* {
  font-family: 'Roboto';
}
#product-card {
  height: 22vh;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
#img-viewport {
  flex: 1;
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
