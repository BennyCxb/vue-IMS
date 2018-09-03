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
            <el-row class="layout-main-top">
              <el-col :lg="12" :md="24" class="text-left">
                画布大小：宽：
                <el-input-number v-model="layoutData.width" controls-position="right" :min="320"></el-input-number>
                <i class="icon iconfont icon-swap"></i>
                高：
                <el-input-number v-model="layoutData.height" controls-position="right" :min="320"></el-input-number>
              </el-col>
              <el-col :lg="12" :md="24" class="text-right">
                画布背景：
                <el-radio v-model="radio" label="1">
                  纯色 <el-color-picker v-model="layoutData.background"></el-color-picker>
                </el-radio>
                <el-radio v-model="radio" label="2">
                  图片 <el-button icon="el-icon-upload">上传图片</el-button>
                </el-radio>
              </el-col>
            </el-row>
            <!--画布模块 begin-->
            <layout :layoutData="layoutData"></layout>
            <!--画布模块 end-->
            <div class="layout-main-assembly">
              已插入组件：
              <el-button :type="item.active ? 'primary' : ''" plain v-for="(item, i) in layoutData.elementList" :key="i" :style="{border: `1px solid ${item.style.background}`}">{{item.name}}</el-button>
            </div>
          </el-main>
          <el-aside class="layout-main-right">
            <!--组件属性-->
            <div class="layout-assembly-attribute">
              <div>
                <label>对齐</label>
                <span>
                  <i class="icon iconfont icon-align-left"></i>
                  <i class="icon iconfont icon-align-center"></i>
                  <i class="icon iconfont icon-align-right"></i>
                </span>
              </div>
              <div>
                <label>位置</label>
                <span>
                  X <el-input v-model="selectElement.style.left" size="mini"></el-input>
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
            name: '组件一',
            active: true,
            style: {
              top: '10px',
              left: '10px',
              width: '200px',
              height: '200px',
              background: this.randomBgColor(),
              'z-index': 0
            }
          },
          {
            name: '组件二',
            active: false,
            style: {
              top: '70px',
              left: '70px',
              width: '200px',
              height: '200px',
              background: this.randomBgColor(),
              'z-index': 1
            }
          }
        ]
      },
      selectElement: {
        name: '组件一',
        active: true,
        style: {
          top: '10px',
          left: '10px',
          width: '200px',
          height: '200px',
          background: this.randomBgColor(),
          'z-index': 0
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
      return `rgba(${r}, ${g}, ${b}, 0.4)`
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

  .layout-main-top {
    line-height: 40px;
    margin-bottom: 20px;
  }

  .el-color-picker {
    margin-top: -10px;
    position: relative;
    top: 11px;
  }

  /*组件按钮样式*/
  .layout-main-assembly {
    margin-top: 20px;
    font-size:14px;
    color:rgba(0,0,0,0.85);
  }

  /*画布右侧模块*/
  .layout-main-right {
    width: 260px;
    background:rgba(247,247,247,1);
  }

  /*组件属性*/
  .layout-assembly-attribute {
    padding: 20px;
    font-size:14px;
    color:rgba(0,0,0,0.65);
  }

  .layout-assembly-attribute label {
    padding-right: 10px;
  }

  .layout-assembly-attribute .icon {
    padding-left: 2px;
    padding-right: 2px;
  }
</style>
