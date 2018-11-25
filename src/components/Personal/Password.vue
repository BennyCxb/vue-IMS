<template>
  <el-container>
    <el-header>账号信息</el-header>
    <el-main>
      <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
        <el-form-item label="帐号">
          {{username}}
        </el-form-item>
        <el-form-item label="原密码" prop="oldPsw">
          <el-input type="password" v-model="form.oldPsw" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="form.pass" placeholder="6-16位密码，区分大小写"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" placeholder="6-16位密码，区分大小写"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword">保存</el-button>
          <!--<el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      username: sessionStorage.getItem('ms_username'),
      form: {
        oldPsw: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        oldPsw: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    timer () {
      let self = this
      this.timeout--
      let timer = setTimeout(function () {
        self.timeout--
        if (self.timeout === 0) {
          timer.clear()
          self.timeout = 60
        }
      }, 1000)
    },
    updatePassword () {
      const self = this
      let params = {
        oldpassword: this.form.oldPsw,
        password: this.form.checkPass
      }
      this.$api.api2.updatePassword(this.username, params)
        .then(res => {
          if (res.status === 200) {
            self.form = {
              oldPsw: '',
              pass: '',
              checkPass: ''
            }
            self.$message({
              message: '修改密码成功!',
              type: 'success'
            })
          } else {
            self.$message.error('修改密码失败！')
          }
        })
        .catch(err => {
          self.$message.error('修改密码失败！')
        })
    }
  }
}
</script>

<style scoped>
  .info-container {
    background-color: #ffffff;
  }

  .el-header {
    height: 56px;
    line-height: 56px;
    background-color: #ffffff;
    border-bottom:1px solid rgba(0,0,0,0.1);
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    border-radius:2px;
    color:rgba(0,0,0,0.85);
    font-size:20px;
  }

  .el-main {
    background-color: #ffffff;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
    border-radius:2px;
  }

  .el-input {
    max-width: 250px;
  }

  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 104px;
    height: 104px;
    line-height: 104px;
    background:rgba(0,0,0,0.02);
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
