<template>
  <el-container style="height: 100%;">
    <!--<el-aside style="background-color: rgb(238, 241, 246)">-->
      <v-sidebar :isCollapse="isCollapse"></v-sidebar>
    <!--</el-aside>-->

    <el-container>
      <!--<vHead></vHead>-->
      <el-header style="text-align: right; font-size: 12px">
        <div class="btn-menu-collapse">
          <i class="icon iconfont icon-outdent" @click="isCollapse = true" v-if="!isCollapse"></i>
          <i class="icon iconfont icon-indent" @click="isCollapse = false" v-else></i>
        </div>

        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/PersonalInfo">查看</router-link></el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <!--<el-main>-->
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      <!--</el-main>-->
    </el-container>
  </el-container>

</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
export default {
  components: {
    vHead, vSidebar
  },
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #FFFFFF;
    color: #333;
    line-height: 60px;
    box-shadow:0px 1px 4px 0px rgba(0,21,41,0.12);
  }

  .btn-menu-collapse .iconfont {
    float: left;
    font-size: 20px;
    cursor: pointer;
  }

  .el-aside {
    color: #333;
  }
</style>
