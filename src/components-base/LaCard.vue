<template>
  <!-- 标题行组件 -->
  <div class="la-card">
    <div class="la-card__header" v-if="header">
      <div class="la-card__iconTitle">
        <span class="icon"></span>
        <div class="title">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
      <div class="la-card__more">
        <slot name="more"></slot>
      </div>
    </div>
    <div class="la-card__wrap">
      <div class="la-card__body">
        <slot name="body"></slot>
      </div>
      <div class="la-card__border--bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    header: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.la-card {
  // @include background('laCard/cardbg.png');
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: px2rem(15);
  position: relative;
  background: rgba(11, 22, 38, 0.7);
  border: px2rem(1) solid $mainC;
  border-radius: px2rem(13);

  &__header {
    @include background('laCard/titleBg.png', $bgSize: 100%);
    background-position-y: bottom;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }
  &__iconTitle {
    display: flex;
    align-items: baseline;
    .icon {
      @include icon('laCard/cardIcon.png');
    }
    .title {
      height: px2rem(34);
      font-size: $fs18;
      color: $whiteC;
      font-style: italic;
      line-height: px2rem(34);
      flex-shrink: 0;
      padding-left: px2rem(2);
    }
  }

  &__more {
    font-size: $fs18;
    color: $laMore;
  }
}
</style>
