<template>
  <div
    v-ripple
    :class="`time ${model === value ? 'toggle-active' : false}`"
    @click="$emit('toggle', value)"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'model'],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.time {
  width: 64px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid var(--primary);
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  color: var(--primary);
  transition: background-color 0.2s;
}
.toggle-active {
  background-color: var(--primary) !important;
  color: white !important;
}
</style>
