<template>
  <el-container class="playlist-container">
    <el-header class="playlist-header">
      <span>未命名播单</span>
      <el-button type="text"><i class="el-icon-edit-outline"></i></el-button>
    </el-header>
    <div class="steps el-row">
      <el-col :span="6" class="text-center">
        <div class="steps-item active">1. 制作节目单</div>
      </el-col>
      <el-col :span="6" class="text-center">
        <div class="steps-item">2. 播单设置</div>
      </el-col>
      <el-col :span="6" class="text-center">
        <div class="steps-item">3. 选择终端</div>
      </el-col>
      <el-col :span="6" class="text-center">
        <div class="steps-item">4. 审核发布</div>
      </el-col>
    </div>
    <el-container class="playlist-table-container">
      <el-main>
        <el-header class="playlist-list-header">
          <el-row>
            <el-col :span="15" class="text-left">
              <el-button>选择模版</el-button>
              <el-dropdown>
                <el-button type="primary">
                  插入组件<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>字幕</el-dropdown-item>
                  <el-dropdown-item>图片/PDF</el-dropdown-item>
                  <el-dropdown-item>视频/音频</el-dropdown-item>
                  <el-dropdown-item>网页</el-dropdown-item>
                  <el-dropdown-item>富文本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="9" class="text-right">
              <el-button>保存为模版</el-button>
              <el-button>预览效果</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-container class="layout-container">
          <el-aside width="115px">
            <div class="layout-aside-title">节目单</div>
            <div class="playlist-item">
              <div class="playlist-item-num">1</div>
              <div class="playlist-item-box"></div>
            </div>
            <div class="playlist-item active">
              <div class="playlist-item-num">2</div>
              <div class="playlist-item-box"></div>
            </div>
            <div class="playlist-item add">
              <div class="playlist-item-box"></div>
            </div>
          </el-aside>
          <el-main class="layout-main">
            <!-- Layout begin -->

            <!--画布模块 begin-->
            <layout :layoutData="layoutData"></layout>
            <!--画布模块 end-->

          </el-main>
          <el-aside class="layout-main-right">
            <!--组件属性-->
            <div class="layout-assembly-attribute">
              <div class="attribute-group">
                <label>对齐</label>
                <span>
                  <i class="icon iconfont icon-align-left"></i>
                  <i class="icon iconfont icon-align-center"></i>
                  <i class="icon iconfont icon-align-right"></i>
                </span>
              </div>
              <div class="attribute-group">
                <label>位置</label>
                <span>
                  X&nbsp;&nbsp;<el-input v-model="selectElement.style.left" size="mini" class="attribute-position-input"></el-input>
                </span>
                <span>
                  Y&nbsp;&nbsp;<el-input v-model="selectElement.style.top" size="mini" class="attribute-position-input"></el-input>
                </span>
              </div>
              <div class="attribute-group">
                <label>大小</label>
                <span>
                  宽 <el-input v-model="selectElement.style.width" size="mini" class="attribute-position-input"></el-input>
                </span>
                <span>
                  高 <el-input v-model="selectElement.style.height" size="mini" class="attribute-position-input"></el-input>
                </span>
              </div>
              <div class="attribute-group">
                <el-button>上移一层</el-button>
                <el-button>下移一层</el-button>
              </div>
            </div>
            <!--组件参数-->
            <!--字幕组建参数-->
            <div class="layout-assembly-attribute" v-if="selectElement.type === 1">
              <div class="attribute-group">
                <label>方向</label>
                <span>
                  <el-radio v-model="selectElement.parames.direction" label="1">从右到左</el-radio>
                  <el-radio v-model="selectElement.parames.direction" label="2">从下到上</el-radio>
                </span>
              </div>
              <div class="attribute-group">
                <label>速度</label>
                <span>
                  <el-input-number v-model="selectElement.parames.speed" controls-position="right" :min="0" :max="10" size="mini"></el-input-number>
                </span>
              </div>
              <div class="attribute-group">
                <label>字体</label>
                <span>
                  <el-select class="attribute-position-select" v-model="selectElement.parames.fontFamily" placeholder="请选择" size="mini">
                    <el-option label="默认字体" value="1"></el-option>
                  </el-select>
                </span>
              </div>
              <div class="attribute-group">
                <label>背景颜色</label>
                <span>
                  <el-color-picker v-model="selectElement.parames.backgroundColor"></el-color-picker>
                </span>
                <label>字体颜色</label>
                <span>
                  <el-color-picker v-model="selectElement.parames.color"></el-color-picker>
                </span>
              </div>
              <div class="attribute-group">
                <label>切换方式</label>
                <span>
                  <el-select class="attribute-position-select" v-model="selectElement.parames.fontFamily" placeholder="请选择" size="mini">
                    <el-option label="顺序" value="1"></el-option>
                    <el-option label="随机" value="2"></el-option>
                  </el-select>
                </span>
              </div>
            </div>
            <!--图片/PDF组件参数-->
            <div class="layout-assembly-attribute" v-if="selectElement.type === 2">
              <div class="attribute-group">
                <label>切换动画</label>
                <span>
                  <el-select class="attribute-position-select" v-model="selectElement.parames.animation" placeholder="请选择" size="mini">
                    <el-option label="随机" value="1"></el-option>
                  </el-select>
                </span>
              </div>
              <div class="attribute-group">
                <label>切换间隔</label>
                <span>
                  <el-input class="attribute-position-time" v-model="selectElement.parames.h" :prefix="'H'" :min="0" :max="23" :controls="false" size="mini"></el-input>
                  <el-input class="attribute-position-time" v-model="selectElement.parames.m" :prefix="'H'" :min="0" :max="59" :controls="false" size="mini"></el-input>
                  <el-input class="attribute-position-time" v-model="selectElement.parames.s" :prefix="'H'" :min="0" :max="59" :controls="false" size="mini"></el-input>
                </span>
              </div>
              <div class="attribute-group">
                <label>切换方式</label>
                <span>
                  <el-select class="attribute-position-select" v-model="selectElement.parames.fontFamily" placeholder="请选择" size="mini">
                    <el-option label="顺序" value="1"></el-option>
                    <el-option label="随机" value="2"></el-option>
                  </el-select>
                </span>
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import info from './info.vue'
import Layout from '../common/Layout'
export default {
  components: {
    // info,
    Layout
  },
  data () {
    return {
      radio: '1',
      layoutData: {
        width: 1920,
        height: 1080,
        background: '#D8D8D8',
        elementList: [
          {
            name: '滚动字幕一',
            active: true,
            style: {
              top: 10,
              left: 10,
              width: 200,
              height: 200,
              background: this.randomBgColor(),
              'z-index': 0
            }
          },
          {
            name: '视频一',
            active: false,
            style: {
              top: 70,
              left: 70,
              width: 400,
              height: 400,
              background: this.randomBgColor(),
              'z-index': 1
            }
          }
        ]
      },
      selectElement: {
        name: '组件一', // 组件名字
        active: true, // 是否被选中
        type: 2, // 组件类型
        style: { // 组件样式
          top: 10,
          left: 10,
          width: 200,
          height: 200,
          background: this.randomBgColor(),
          'z-index': 0
        },
        // parames: {// 字幕组件参数
        //   direction: '1',                       //方向{1: 从右到左, 2: 从下到上}
        //   speed: 3,                             //速度
        //   fontFamily: '1',                      //字体
        //   backgroundColor: '#D8D8D8',
        //   color: '#D8D8D8',
        //   switchType: '1'                       //切换方式{1:顺序,2:随机}
        // },
        parames: { // 图片组件参数
          animation: '1', // 动画类型{1: 从右到左, 2: 从下到上}
          h: 3, // 小时
          m: 3, // 分钟
          s: 3, // 秒数
          switchType: '1' // 切换方式{1:顺序,2:随机}
        }
      },
      playlistInfoVisible: false
    }
  },
  methods: {
    // 随机背景色
    randomBgColor () {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return `rgba(${r}, ${g}, ${b}, 0.6)`
    }
  }
  // mounted () {
  //
  // }
}
</script>

<style scoped>
  .playlist-container {
    margin-top: 3px;
    background: #F0F2F5;
  }

  .playlist-container .playlist-header {
    height: 77px !important;
    line-height: 77px !important;
    border-radius: 2px;
    background-color: #ffffff;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }

  .playlist-sort-header, .playlist-list-header {
    height: 65px !important;
    line-height: 60px !important;
    border-radius: 2px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }

  .playlist-sort-header > button {
    width: 100%;
    border-style: dashed;
  }

  .steps {
    padding: 20px 20px 0;
  }

  .steps-item {
    height:56px;
    line-height: 56px;
    margin: 0 10px;
    background: #EBE9E9;
    border-radius: 4px;
  }

  .steps-item.active {
    background: rgba(24,144,255,1);
    color: #ffffff;
  }

  .playlist-table-container {
    padding: 20px
  }

  .el-main {
    padding: 0;
  }

  .playlist-sort-main .el-tree-node__content {
    padding: 10px;
  }

  .layout-container {
    height: calc(100% - 65px);
    background-color: #ffffff;
  }

  .layout-aside-title {
    padding: 10px 20px;
    color:rgba(0,0,0,0.45);
    font-size:12px;
  }

  .playlist-item {
    padding: 10px 0 15px;
    overflow: auto;
  }

  .playlist-item-num {
    float: left;
    height:41px;
    line-height: 21px;
    margin-left: 3px;
    margin-right: 8px;
    font-size:12px;
    font-weight:600;
    color:rgba(0,0,0,0.65);
  }

  .playlist-item-box {
    float: left;
    width:72px;
    height:41px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(0,0,0,0.1);
    cursor: pointer;
  }

  .playlist-item.active .playlist-item-box {
    border:2px solid rgba(24,144,255,1);
  }

  .playlist-item.add .playlist-item-box {
    margin-left: 18px;
    border:2px dotted rgba(0,0,0,0.1);
    background:rgba(255,255,255,1);
  }

  .playlist-item.add .playlist-item-box:before {
    content: "+";
    position: relative;
    line-height: 41px;
    left: 26px;
    font-size: 32px;
    color:rgba(0,0,0,0.45);
  }

  .layout-main {
    padding: 20px 30px;
    border-left: 1px solid rgba(0,0,0,0.1);
    border-right: 1px solid rgba(0,0,0,0.1);
  }

  /*画布右侧模块*/
  .layout-main-right {
    width: 260px;
    background:rgba(247,247,247,1);
  }

  /*组件属性*/
  .layout-assembly-attribute {
    padding: 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
    font-size:14px;
    color:rgba(0,0,0,0.65);
  }

  .layout-assembly-attribute:nth-of-type(1) {
    border-top: none;
  }

  .layout-assembly-attribute label {
    padding-right: 5px;
  }

  .layout-assembly-attribute span {
    padding-left: 5px;
    padding-right: 10px;
  }

  .layout-assembly-attribute .icon {
    padding-left: 2px;
    padding-right: 2px;
  }

  .attribute-group {
    margin-bottom: 15px;
  }

  /*位置*/
  .attribute-position-input {
    width: 70px;
  }

  .attribute-position-select {
    width: 120px;
  }

  .attribute-position-time {
    width: 100px;
  }

  /*.attribute-position-time .el-input-number.is-controls-right .el-input__inner {*/
    /*padding: 0;*/
  /*}*/
</style>
