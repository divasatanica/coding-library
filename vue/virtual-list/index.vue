<template>
  <main class="component__virtual-list" :style="{ height }" ref="wrapper">
    <div class="component__virtual-list-scroll-wrapper" :style="{'padding-top': `${startIndex * itemHeight}px`, 'padding-bottom': `${(list.length - endIndex) * itemHeight}px`}">
      <slot :data="listToRender" />
    </div>
  </main>
</template>

<script>
/**
 * 虚拟列表组件
 * // TODO-comp
 * 1. 支持不定高子元素
 */
export default {
  props: {
    mode: {
      type: String,
      default: 'normal'
    },

    height: {
      type: String,
      default: '400px'
    },

    itemHeight: {
      type: Number,
      required: true
    },

    list: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      startIndex: 0,
      observer: null,
      itemNum: 0
    }
  },

  computed: {
    listToRender () {
      switch (this.mode) {
        case 'normal': {
          return this.list.slice(this.startIndex, this.endIndex)
        }
        default: {
          return this.list
        }
      }
    },

    endIndex () {
      switch (this.mode) {
        case 'normal': {
          // [startIndex, endIndex) using Array.prototype.slice
          return Math.min(this.startIndex + this.itemNum, this.list.length)
        }
        default: {
          return this.startIndex
        }
      }
    }
  },

  methods: {

    initObserver () {
      this.scrollCallback = window.utils.throttle((e) => {
        e.cancelable && e.preventDefault()
        if (this.$refs.wrapper.scrollTop > (this.startIndex + 1) * this.itemHeight) {
          this.startIndex = Math.floor(this.$refs.wrapper.scrollTop / this.itemHeight)
          return
        }

        if (this.$refs.wrapper.scrollTop < (this.startIndex) * this.itemHeight) {
          this.startIndex = Math.max(0, Math.floor(this.$refs.wrapper.scrollTop / this.itemHeight))
        }
      }, 60)
      this.$refs.wrapper.addEventListener('scroll', this.scrollCallback)
    }
  },

  beforeDestroy () {
    this.$refs.wrapper.removeEventListener('scroll', this.scrollCallback)
  },

  mounted () {
    this.initObserver()
    this.itemNum = Math.ceil(this.$refs.wrapper.offsetHeight / this.itemHeight) + 2
  }
}
</script>

<style lang="scss">
.component__virtual-list {
  overflow: scroll;
}
</style>
