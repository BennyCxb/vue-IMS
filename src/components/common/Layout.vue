<template>
  <div id="container" class="container" :style="{height: cheight}">

  </div>
</template>

<script>
export default {
  computed: {
    cheight () {
      console.log(1)
      let container = document.getElementById('container')
      if (container) {
        let width = container.offsetWidth
        console.log(width)
      }

      // let height = Math.round(width / this.width * this.height)
      return '30px'
    }
  },
  data () {
    return {
      width: 1920,
      height: 1080
    }
  },
  props: ['data']
}
</script>

<style scoped>
  .container {
    width: calc(100% - 2px);
    min-height: 100px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(151,151,151,1);
  }
</style>
