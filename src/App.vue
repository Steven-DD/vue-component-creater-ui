<template>
  <vccs></vccs>
  <div class="app">
    <div>顶部编辑</div>
    <div>左侧编辑</div>
    <div>右侧编辑</div>
    <div>底部编辑</div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    vccs: defineAsyncComponent(() => import('./vcc.vue')),
  },
}
</script>