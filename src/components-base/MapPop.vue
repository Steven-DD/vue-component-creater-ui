<!--地图弹框-->
<template>
  <div
    class="map-pop"
    :style="`width:${htmlSize(width)}px;height:${htmlSize(height)}px;left:${leftChange()};top:${htmlSize(top)}px`"
  >
    <div class="pop-title" v-if="title">
      <span class="title">{{ title }}</span>
      <span class="close" @click="closePop"></span>
    </div>
    <div class="pop-body">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      htmlSize
    }
  },
  computed: {
    devWidths() {
      return this.$store.state.devWidth
    }
  },
  methods: {
    closePop() {
      this.$emit('closePop')
    },
    leftChange() {
      return this.left == 'center' ? (this.devWidths - htmlSize(this.width)) / 2 + 'px' : htmlSize(this.left) + 'px'
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.map-pop {
  @include background('mapPop/popBg.png');
  position: absolute;
  z-index: 999;
  font-size: $fs18;
  padding: px2rem(10);
  .pop-title {
    margin-top: px2rem(15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $fs20;
    color: $whiteC;
    .title {
      @include background('mapPop/titleBg.png', 100% px2rem(21));
      width: 100%;
      background-position-y: px2rem(12);
      margin-left: px2rem(25);
    }
    .close {
      @include icon($iconUrl: 'icon/close.png', $iconWidth: px2rem(40), $iconHeight: px2rem(40));
      flex-shrink: 0;
      cursor: pointer;
      margin-right: px2rem(25);
    }
  }
  .pop-body {
    position: relative;
    &::before {
      @include background('mapPop/up-border.png');
      content: '';
      display: block;
      width: 103%;
      height: px2rem(86);
      position: absolute;
      top: px2rem(-65);
      right: -1.5%;
      z-index: -1;
    }
    &::after {
      @include background('mapPop/down-border.png');
      content: '';
      display: block;
      width: 103%;
      height: px2rem(86);
      position: absolute;
      bottom: px2rem(-10);
      right: -1.5%;
      z-index: -1;
    }
  }
}
</style>
