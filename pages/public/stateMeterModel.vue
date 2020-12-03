<template>
  <div class="page_content">
    <state-meter
      width="100px"
      height="25px"
      progress="100"
      value="127"
      icon="level"
    />
    <state-meter
      width="100px"
      height="25px"
      progress="100"
      value="127"
      icon="book"
    />
    <state-meter
      width="100px"
      height="25px"
      progress="100"
      value="127"
      icon="trophy"
    />
  </div>
</template>
<router>
    { path: '/state-meter' }
  </router>
<script>
import StateMeter from '../../components/StateMeter';
export default {
  components: {
    StateMeter,
  },
  data: () => ({}),
};
</script>

<style scoped>
.page_content {
  display: flex;
  margin-left: 10px;
  margin-top: 15px;
  justify-content: space-around;
}
</style>
