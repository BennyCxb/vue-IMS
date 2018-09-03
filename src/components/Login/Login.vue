<template>
  <div class="login-wrap">
    <div class="ms-title">信息管理系统</div>
    <div class="ms-subtitle">Information Management System</div>
    <div class="ms-login">
      <el-tabs v-model="activeName" stretch @tab-click="handleClick">
        <el-tab-pane label="帐号密码登录" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="username" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="password" v-model="ruleForm.password" clearable
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="second">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.phone" placeholder="手机号" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-row>
                <el-col :span="16">
                  <el-input placeholder="验证码" v-model="ruleForm.code" clearable
                            @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-col>
                <el-col :span="8">
                  <!--<el-button>获取验证码</el-button>-->
                  <el-button v-if="getcode" @click="getCode">获取验证码</el-button>
                  <el-button v-else class="count" disabled>{{count}} s</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activeName: 'first',
      getcode: true,
      count: '',
      timer: null,
      ruleForm: {
        username: '',
        password: '',
        phone: '',
        code: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    /**
     * 获取验证码
     */
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.getcode = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.getcode = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    submitForm (formName) {
      const self = this
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$api.api1.login({
      //       username: self.ruleForm.username,
      //       password: self.ruleForm.password
      //     })
      //       .then(function (response) {
      //         let data = response.data
      //         // console.log(data)
      //         if (data.code === 1) {
      //           self.$cookies.set('TZManage', data.object, {expires: 12})
      //           localStorage.setItem('ms_username', self.ruleForm.username)
      //           self.$router.push('/Home')
      //         } else {
      //           self.$alert(data.message, '温馨提示', {
      //             confirmButtonText: '确定'
      //           })
      //           return false
      //         }
      //       })
      //       .catch(function (error) {
      //         // console.log(error)
      //         self.$alert(error.message, '温馨提示', {
      //           confirmButtonText: '确定'
      //         })
      //       })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      self.$router.push('/Home')
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/login-bg.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -220px;
    text-align: center;
    font-size: 34px;
    color: #000000;

  }

  .ms-subtitle {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -170px;
    text-align: center;
    font-size: 18px;
    color: #000000;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 180px;
    margin: -130px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .el-tabs__header {
    padding: 0 50px;
  }

  .count {
    width: 92%;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
