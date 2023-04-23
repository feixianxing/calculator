<template>
  <div class="main">
    <number-output/>
    <key-board/>
  </div>
</template>

<script setup>
import NumberOutput from './components/NumberOutput.vue'
import KeyBoard from './components/KeyBoard.vue'
</script>

<style lang="less">
@import './assets/css/styles.less';

.main{
  width: 100vw;
  height: 100vh;
  background-color: var(--panel-background);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
