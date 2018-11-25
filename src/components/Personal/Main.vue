<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <div class="main-logo">
        <i class="icon iconfont icon-crown" @click="goHome"></i>
        <span slot="title" >Info Display Pro</span>
        <span slot="title">个人帐号中心</span>
      </div>
      <!--<el-dropdown>-->
        <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<a @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></a>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <el-dropdown>
        <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
        <span class="el-dropdown-link">{{nickname}}</span>
        <el-dropdown-menu slot="dropdown">
          <a @click="goHome"><el-dropdown-item>返回首页</el-dropdown-item></a>
          <a @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></a>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<span>{{nickname}}</span>-->
    </el-header>
    <!--main-->
    <el-main>
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="personal-name">
                <el-row>
                  <el-col :span="10" class="text-center personal-header">
                    <img src="../../assets/images/default_header.png" />
                  </el-col>
                  <el-col :span="14">
                    <h4>{{nickname}}</h4>
                    <p>{{phone}}</p>
                  </el-col>
                </el-row>
              </div>

              <el-menu default-active="Info" class="personal-menu" router>
                <el-menu-item index="Info">
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="Password">
                  <span slot="title">帐号密码</span>
                </el-menu-item>
                <!--<el-menu-item index="3">-->
                  <!--<span slot="title">第三方登陆</span>-->
                <!--</el-menu-item>-->
              </el-menu>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      active: 0,
      username: sessionStorage.getItem('ms_username'),
      nickname: '',
      phone: '',
    }
  },
  methods: {
    goHome () {
      this.$router.push({path: '/Home'})
    },
    logout () {
      this.$cookies.remove('Info')
      this.$router.replace({ path: '/Login' })
    },
    getUser () {
      let self = this
      this.$api.api2.getUser({}, this.username)
        .then(res => {
          self.nickname = res.nickname || '未命名'
          self.phone = res.phone || ''
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

  .main-logo {
    float: left;
    height: 60px;
    line-height: 60px;
    padding: 0 11px;
    font-size: 24px;
  }

  .main-logo .iconfont {
    display: inline-block;
    margin-top: -5px;
    margin-right: 5px;
    font-size: 40px;
    vertical-align: middle;
    color: #F0656F;
  }

  .container {
    min-width: 680px;
  }

  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .personal-name {
    height:100px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    border-radius:2px;
  }

  .personal-header {
    height: 100px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    /*border:1px solid #000;*/
  }

  .personal-header > img {
    position: relative;
    top: 50%;
    margin-top: -35px;
    width: 70px;
    height: 70px;
  }

  .personal-menu {
    margin-top: 24px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    border-radius:2px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  /* 小屏幕（平板，大于等于 768px） */
  @media (min-width: 768px) {
    .container {
      width: 720px;
    }
  }

  /* 中等屏幕（桌面显示器，大于等于 992px） */
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }

  /* 大屏幕（大桌面显示器，大于等于 1200px） */
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
</style>
