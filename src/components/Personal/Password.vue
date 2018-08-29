<template>
  <el-container>
    <el-header>账号信息</el-header>
    <el-main>
      <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
        <el-form-item label="帐号">
          {{username}}
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="form.oldPsw" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPsw" placeholder="6-16位密码，区分大小写"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confilmPsw" placeholder="6-16位密码，区分大小写"></el-input>
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
    return {
      username: 'zhangfuguan',
      form: {
        oldPsw: '',
        newPsw: '',
        confilmPsw: ''
      },
      rules: {}
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
