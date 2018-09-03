<template>
  <div id="container" class="container" :style="{height: cheight + 'px'}">
    <div class="assembly-item" v-for="(item, i) in layoutData.elementList" :key="i" :style="item.style">
      <table>
        <tr>
          <td style="" :style="{height: item.style.height}">{{item.name}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 1920,
      height: 1080,
      cheight: 200,
      rate: 1,            // 缩放比例
      elementList: [
        {
          name: '组件一',
          style: {
            top: '10px',
            left: '10px',
            width: '100px',
            height: '100px',
            background: 'rgba(0,0,0,0.0.3)',
            'z-index': 0
          }
        }
      ]
    }
  },
  methods: {
    // 设置画布高度
    getLayoutHeight () {
      let container = document.getElementById('container')
      if (container) {
        let width = container.offsetWidth
        // let height = container.offsetHeight
        let rate = width / this.layoutData.width
        this.rate = rate
        this.cheight = Math.round(rate * this.layoutData.height)
      }
    },
    createElement () {

    }
  },
  mounted () {
    let self = this
    this.getLayoutHeight()
    console.log(this.layoutData);
    this._.each(this.layoutData.elementList, item => {
      item.style.zoom = self.rate
    })
  },
  props: ['layoutData'],
  watch: {
    // 监听画布宽度变化
    'layoutData.width' (val) {
      this.getLayoutHeight()
    },
    // 监听画布高度变化
    'layoutData.height' (val) {
      this.getLayoutHeight()
    },
    // 监听元素变化
    'layoutData.elementList' (val) {
      console.log(val)
      // this.getLayoutHeight()
    },
    // // 监听画布宽度变化
    // 'layoutData.elementList.style.height' (val) {
    //   console.log(val)
    //   this.getLayoutHeight()
    // }
  }

}
</script>

<style scoped>
  .container {
    position: relative;
    width: calc(100% - 2px);
    min-height: 100px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(151,151,151,1);
  }

  .assembly-item {
    position: absolute;
    float: left;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .assembly-item > table {
    width: 100%;
    border-spacing: 0;
  }

  .assembly-item > table td {
    vertical-align:middle;
    height:100%;
    text-align: center;
    font-size:14px;
    color: #ffffff;
  }
</style>
