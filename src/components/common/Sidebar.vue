<template>
  <el-menu :default-active="route"
           class="el-menu-vertical"
           background-color="#001529"
           text-color="#fff"
           router
           :collapse="isCollapse">
    <div class="main-logo">
      <i class="icon iconfont icon-crown"></i>
      <span slot="title" v-if="!isCollapse">Info Display Pro</span>
    </div>
    <el-menu-item index="/Home" route="/Home">
      <i class="icon iconfont icon-dashboard"></i>
      <span slot="title">总览</span>
    </el-menu-item>
    <el-menu-item index="/Terminal" route="/Terminal">
      <i class="icon iconfont icon-edit-square"></i>
      <span slot="title">终端管理</span>
    </el-menu-item>
    <el-menu-item index="/Playlist" route="/Playlist">
      <i class="icon iconfont icon-table"></i>
      <span slot="title">播单管理</span>
    </el-menu-item>
    <el-menu-item index="/Template" route="/Template">
      <i class="icon iconfont icon-detail"></i>
      <span slot="title">模版管理</span>
    </el-menu-item>
    <el-menu-item index="/Resource" route="/Resource">
      <i class="icon iconfont icon-folder"></i>
      <span slot="title">资源管理</span>
    </el-menu-item>
    <!--<el-menu-item index="/Analysis" route="Analysis">-->
      <!--<i class="icon iconfont icon-barchart"></i>-->
      <!--<span slot="title">数据分析</span>-->
    <!--</el-menu-item>-->
    <!--<el-menu-item index="/Log" route="Log">-->
      <!--<i class="icon iconfont icon-file-exception"></i>-->
      <!--<span slot="title">系统日志</span>-->
    <!--</el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  computed: {
    route () {
      return this.$route.path
    }
  },
  data () {
    return {

    }
  },
  props: ['isCollapse']
}
</script>

<style scoped>
  .el-menu {
    border: none;
    text-align: left;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 250px;
    height: 100%;
    min-height: 400px;
  }

  .el-menu, .el-menu-vertical, .el-menu--collapse {
    background: #001529;
  }

  .main-logo {
    height: 60px;
    line-height: 60px;
    padding: 0 11px;
    background:rgba(0,33,64,1);
    font-size: 24px;
    color: #ffffff;
  }

  .main-logo .iconfont {
    display: inline-block;
    margin-top: -5px;
    margin-right: 5px;
    font-size: 40px;
    vertical-align: middle;
    color: #F0656F;
  }

  .el-menu-item .iconfont {
    display: inline-block;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    color: #ffffff;
  }
</style>
