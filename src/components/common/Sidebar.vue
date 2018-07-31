<template>
  <el-menu default-active="1"
           class="el-menu-vertical"
           background-color="#001529"
           text-color="#fff"
           :collapse="isCollapse">
    <el-menu-item index="1">
      <i class="icon iconfont icon-dashboard"></i>
      <span slot="title">总览</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="icon iconfont icon-edit-square"></i>
      <span slot="title">终端管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="icon iconfont icon-table"></i>
      <span slot="title">播单管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="icon iconfont icon-detail"></i>
      <span slot="title">模版管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="icon iconfont icon-folder"></i>
      <span slot="title">资源管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="icon iconfont icon-barchart"></i>
      <span slot="title">数据分析</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="icon iconfont icon-file-exception"></i>
      <span slot="title">系统日志</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
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
    width: 200px;
    height: 100%;
    min-height: 400px;
  }

  .el-menu, .el-menu-vertical, .el-menu--collapse {
    background: #001529;
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
