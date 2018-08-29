<template>
  <el-container>
    <el-header>个人信息</el-header>
    <el-main>
      <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入您的称呼"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
          <el-button type="primary" v-if="timeout === 60" @click="timer">获取验证码</el-button>
          <el-button disabled v-else>重新发送({{timeout}})</el-button>
        </el-form-item>
        <el-form-item label="" prop="vcode">
          <el-input v-model="form.vcode" placeholder="验证码" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <!--<el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      timeout: 60,
      form: {
        name: '',
        imageUrl: '',
        phone: '',
        vcode: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        vcode: [
          { type: 'number', required: true, message: '请输入您的验证码', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
