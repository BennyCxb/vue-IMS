<template>
  <div>
    <!--画布控制区域-->
    <el-row class="layout-main-top">
      <el-col :lg="12" :md="24" class="text-left">
        画布大小：宽：
        <el-input-number v-model="width" controls-position="right" :min="320"></el-input-number>
        <i class="icon iconfont icon-swap"></i>
        高：
        <el-input-number v-model="height" controls-position="right" :min="320"></el-input-number>
      </el-col>
      <el-col :lg="12" :md="24" class="text-right">
        画布背景：
        <el-radio v-model="radio" label="1">
          纯色 <el-color-picker v-model="background"></el-color-picker>
        </el-radio>
        <el-radio v-model="radio" label="2">
          图片 <el-button icon="el-icon-upload">上传图片</el-button>
        </el-radio>
      </el-col>
    </el-row>
    <!--画布控制区域-->
    <div id="container" class="container" :style="{height: cheight + 'px'}">
      <!--<div class="assembly-item noselect" v-for="(item, i) in layoutData.elementList" :key="i" :style="item.style">-->
      <!--<table>-->
      <!--<tr>-->
      <!--<td class="noselect" :style="{height: item.style.height}">{{item.name}}</td>-->
      <!--</tr>-->
      <!--</table>-->
      <!--<div class="">{{item.name}}</div>-->
      <!--{{item.name}}-->
      <!--</div>-->
      <template v-for="(item, i) in layoutData.elementList">
        <vue-draggable-resizable
          class="assembly-item"
          :key="i"
          :active.sync="item.active"
          :parent="true"
          :resizable="true"
          :x="item.style.left"
          :y="item.style.top"
          :w="item.style.width"
          :h="item.style.height"
          :z="item.style['z-index']"
          :style="{background: item.style.background}"
          @dragging="onDrag"
          @resizing="onResize">
          <p class="noselect">{{ item.name }}</p>
        </vue-draggable-resizable>
      </template>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  components: {
    VueDraggableResizable
  },
  data () {
    return {
      radio: '1',
      screenWidth: document.body.clientWidth,
      width: 1920,
      height: 1080,
      background: '#D8D8D8',
      cheight: 200,
      rate: 1, // 缩放比例
      elementList: []
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
        this.resetLayoutSize()
      }
    },
    resetLayoutSize () {
      const self = this
      this._.each(this.layoutData.elementList, item => {
        // let width = Number(item.style.width.replace('px', ''))
        // let height = Number(item.style.height.replace('px', ''))
        // let top = Number(item.style.top.replace('px', ''))
        // let left = Number(item.style.left.replace('px', ''))
        // item.style.width = width * self.rate + 'px'
        // item.style.height = height * self.rate + 'px'
        // item.style.top = top * self.rate + 'px'
        // item.style.left = left * self.rate + 'px'
        let width = Number(item.style.width)
        let height = Number(item.style.height)
        let top = Number(item.style.top)
        let left = Number(item.style.left)
        item.style.width = width * self.rate
        item.style.height = height * self.rate
        item.style.top = top * self.rate
        item.style.left = left * self.rate
      })
    },
    createElement () {

    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  },
  mounted () {
    const self = this
    this.getLayoutHeight()
    // console.log(this.layoutData);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        self.screenWidth = window.screenWidth
        this.getLayoutHeight()
      })()
    }
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
    // },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let self = this
        setTimeout(function () {
          self.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
  .layout-main-top {
    line-height: 40px;
    margin-bottom: 20px;
  }

  .el-color-picker {
    margin-top: -10px;
    position: relative;
    top: 11px;
  }

  .container {
    position: relative;
    width: calc(100% - 2px);
    min-height: 100px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(151,151,151,1);
  }

  .assembly-item {
    position: absolute !important;
    /*float: left;*/
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    color: #ffffff;
    /*cursor: pointer;*/
  }

  .assembly-item.active {
    border: 1px solid rgba(0, 0, 0, 0.5) !important;
    /*cursor: pointer;*/
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
