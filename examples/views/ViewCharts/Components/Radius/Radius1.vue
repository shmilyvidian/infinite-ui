<template>
  <div class="loading-radius1">
    <div class="left">
      <div class="inner"
        :class="{
          'rotate-step-1': renderAni
        }"
      ></div>
    </div>
    <div class="right">
      <div class="inner"
        :class="{
          'rotate-step-1': renderAni,
          'show-small-round-edge': show
        }"
      ></div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radius1',
  props: {
    renderAni: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    renderAni: function (val) {
      if (val) {
        this.showSmallRoundEdge()
      }
    }
  },
  methods: {
    showSmallRoundEdge () {
      const _this = this
      setTimeout(() => {
        _this.show = true
      }, 320)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./Radius1.scss";

@media screen and (min-width: 1360px) {
  @import "./Radius1.scss";
}
</style>
