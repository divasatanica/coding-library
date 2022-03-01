<template>
  <div class="component__photo-picker" @click="upload(false)">
    <slot :img="image" />
    <div v-if="image" class="component__photo-picker_modify" @click.stop="modify">
      <slot name="modify" />
    </div>
    <div v-if="clearable && image" @click.stop="clear">
      <slot name="clear" />
    </div>
  </div>
</template>

<script>
import * as SDK from '@yy/yijian-app-sdk'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    clearable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      image: this.value || ''
    }
  },

  watch: {
    value (newVal) {
      this.image = newVal || ''
    }
  },

  methods: {
    async upload (isModify = false) {
      // 如果在 modify 插槽传入了内容,那么在点击整体时,就不应该再走重新上传图片的流程
      // 而是在点击 modify 中内容时再走修改图片的流程
      const withContentInModifySlot = !!this.$slots.modify
      if (!isModify && this.image && withContentInModifySlot) {
        return
      }
      
      const response = await this.customeUploader()
      const { code, data } = response || {}
      this.$emit('afterUpload', response || {})
      if (code !== 1) {
        SDK.UI.toast('图片上传失败，请重试')
        return
      }

      const image = data[0]
      this.image = image
      this.$emit('input', image)
    },

    modify () {
      console.log('Modify **********')
      this.upload(/* isModify= */true)
    },

    clear () {
      this.image = ''
      this.$emit('input', '')
      this.$emit('cleared')
    }
  }
}
</script>

<style lang="scss">
.component__photo-picker {
  position: relative;
}
</style>
