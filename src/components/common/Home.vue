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
          <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
          <span class="el-dropdown-link">{{nickname}}</span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/Personal"><el-dropdown-item>查看</el-dropdown-item></router-link>
            <a @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></a>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<span>王小虎</span>-->
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
      isCollapse: false,
      username: sessionStorage.getItem('ms_username'),
      nickname: ''
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('Info')
      this.$router.replace({ path: '/Login' })
    },
    getUser () {
      let self = this
      this.$api.api2.getUser({}, this.username)
        .then(res => {
          self.nickname = res.nickname || '未命名'
        })
    }
  },
  created () {
    this.getUser()
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

  .el-dropdown-link {
    cursor: pointer;
  }
</style>
