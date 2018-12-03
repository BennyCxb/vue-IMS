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
          纯色 <el-color-picker v-model="background" show-alpha></el-color-picker>
        </el-radio>
        <el-radio v-model="radio" label="2">
          图片 <el-button icon="el-icon-upload">上传图片</el-button>
        </el-radio>
      </el-col>
    </el-row>
    <!--画布控制区域-->
    <div id="container" class="container">
      <div class="list" id="list">
        <vue-drag-resize v-for="(rect, index) in rects"
                       :w="rect.width"
                       :h="rect.height"
                       :x="rect.left"
                       :y="rect.top"
                       :parentW="listWidth"
                       :parentH="listHeight"
                       :axis="rect.axis"
                       :isActive="rect.active"
                       :minw="rect.minw"
                       :minh="rect.minh"
                       :isDraggable="rect.draggable"
                       :isResizable="rect.resizable"
                       :parentLimitation="rect.parentLim"
                       :aspectRatio="rect.aspectRatio"
                       :z="rect.zIndex"
                       :key="index"
                       @activated="activateEv(index)"
                       @deactivated="deactivateEv(index)"
                       @dragging="changePosition($event, index)"
                       @resizing="changeSize($event, index)"
        >
          <div class="filler" :style="{backgroundColor:rect.color}"></div>
        </vue-drag-resize>
      </div>
    </div>
    <div class="layout-main-assembly">
      已插入组件：
      <el-button v-for="(rect, index) in rects"
                 :key="index"
                 :style="{border: `1px solid ${rect.color}`}"
                 :type="rect.active ? 'primary' : ''"
                 @click="activateEv(index)"
                 plain>
        {{rect.name}}
      </el-button>
    </div>
  </div>
</template>

<script>
import VueDragResize from './vue-drag-resize.vue'
import toolbar from '../Toolbar/toolbar.vue'
export default {
  components: {
    VueDragResize,
    toolbar
  },
  data () {
    return {
      radio: '1',
      screenWidth: document.body.clientWidth,
      width: 1920,
      height: 1080,
      background: 'rgba(216, 216, 216, 1)',
      cheight: 200,
      rate: 1, // 缩放比例
      elementList: [],
      listWidth: 0,
      listHeight: 0
    }
  },
  computed: {
    rects () {
      return this.$store.state.rect.rects
    }
  },
  methods: {
    // 设置画布高度
    getLayoutHeight () {
      // const self = this
      // let container = document.getElementById('container')
      // if (container) {
      //   let width = container.offsetWidth
      //   // let height = container.offsetHeight
      //   let rate = Math.round(width / this.layoutData.width * 100) / 100
      //   this.rate = rate
      //   this.cheight = Math.round(rate * this.layoutData.height * 100) / 100
      //   this.$nextTick(() => {
      //     // self.resetLayoutSize()
      //   })
      // }
      // const widget = [{
      //   tpye: 1, // 控件类型
      //   style: { // 控件样式，json字符串
      //     'width': '100px', // 宽
      //     'height': '100px', // 高
      //     'top': '50px', // x
      //     'left': '50px', // y
      //     'z-index': 1 // 层级
      //   },
      //   attr: { // 控件属性，json字符串，包含方向、速度等
      //     'speed': 1, // 速度
      //     'direction': 'RightToLeft', // 方向
      //     'fontFamily': '宋体', // 字体
      //     'background': '#FFF', // 背景颜色
      //     'color': '#000', // 字体颜色
      //     'switchType': 1, // 切换方式
      //     'switchAnimation': '随机', // 切换动画
      //     'switchAnimation': '01:15:30', //切换间隔
      //   },
      //   playlist: [ // 播放列表，主要是文件顺序
      //     {
      //       id: 1, // 文件id
      //       name: 'xxx.jpg', // 文件名
      //       type: 1, // 文件类型
      //       size: '1MB', // 文件大小
      //       duration: 15, // 文件时长（视频、音乐独有）
      //       url: '', // 网址（网页独有）
      //       groupId: 1 // 排序号
      //     }
      //   ]
      // }]
    },
    resetLayoutSize () {
      const self = this
      this._.each(this.elementList, item => {
        console.log(self.rate)
        let width = Math.round(item.style.width * self.rate * 100) / 100
        let height = Math.round(item.style.height * self.rate * 100) / 100
        let top = Math.round(item.style.top * self.rate * 100) / 100
        let left = Math.round(item.style.left * self.rate * 100) / 100
        item.style.width = width
        item.style.height = height
        item.style.top = top
        item.style.left = left
      })
      console.log(this.elementList)
    },
    onResize (x, y, width, height) {
      let activeWeight = this._.find(this.elementList, item => {
        return item.active
      })
      if (activeWeight) {
        activeWeight.style.left = x
        activeWeight.style.top = y
        activeWeight.style.width = width
        activeWeight.style.height = height
      }
    },
    onDrag (x, y) {
      this.x = x
      this.y = y
    },
    activateEv (index) {
      this.$store.dispatch('rect/setActive', {id: index})
    },
    deactivateEv (index) {
      this.$store.dispatch('rect/unsetActive', {id: index})
    },
    changePosition (newRect, index) {
      this.$store.dispatch('rect/setTop', {id: index, top: newRect.top})
      this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left})
      this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width})
      this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height})
    },
    changeSize (newRect, index) {
      this.$store.dispatch('rect/setTop', {id: index, top: newRect.top})
      this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left})
      this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width})
      this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height})
    }
  },
  created () {
    this.elementList = this.layoutData.elementList
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
    let listEl = document.getElementById('list')
    this.listWidth = listEl.clientWidth
    this.listHeight = listEl.clientHeight
    window.addEventListener('resize', () => {
      this.listWidth = listEl.clientWidth
      this.listHeight = listEl.clientHeight
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
    width: 1022px;
    height: 602px;
    /*min-height: 200px;*/
    margin: 0 auto;
    background:rgba(242,242,242,1);
    border:1px solid rgba(151,151,151,1);
    box-sizing: border-box;
  }

  .assembly-item {
    position: absolute !important;
    /*float: left;*/
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }

  .assembly-item.active {
    border: 1px solid rgba(0, 0, 0, 0.5) !important;
    cursor: move;
  }

  /*.assembly-item > table {*/
    /*width: 100%;*/
    /*border-spacing: 0;*/
  /*}*/

  /*.assembly-item > table td {*/
    /*vertical-align:middle;*/
    /*height:100%;*/
    /*text-align: center;*/
    /*font-size:14px;*/
    /*color: #ffffff;*/
  /*}*/

  .filler {
    width: 100%;
    height: 100%;
    display: inline-block;
    position: absolute;
  }

  .list {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    box-shadow: 0 0 2px #AAA;
    background-color: white;
  }

  /*组件按钮样式*/
  .layout-main-assembly {
    margin-top: 20px;
    font-size:14px;
    color:rgba(0,0,0,0.85);
  }
</style>
