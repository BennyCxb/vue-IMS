<template>
  <el-container class="resource-container">
    <!-- URL开始 -->
    <el-header>{{header}}</el-header>
    <el-main>
      <template v-if="infoForm.type === 'URL'">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" :label-width="formLabelWidth">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="infoForm.name" autocomplete="off" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="网址：">
            <el-input v-model="infoForm.data" autocomplete="off" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-if="!disabled">确认提交</el-button>
            <el-button @click="backMain">取 消</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-else-if="infoForm.type === 'RICHTEXT'">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" :label-width="formLabelWidth">
          <el-form-item label="名称" prop="name">
            <el-input v-model="infoForm.name" :disabled="disabled"></el-input>
          </el-form-item>
          <!--使用编辑器-->
          <el-form-item label="内容">
            <div class="edit_container">
              <quill-editor v-model="infoForm.data"
                            ref="myQuillEditor"
                            class="editer"
                            :disabled="disabled"
                            @ready="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-if="!disabled">确认提交</el-button>
            <el-button @click="backMain">取 消</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="infoForm.type === 'MARQUEE'">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" :label-width="formLabelWidth">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="infoForm.name" autocomplete="off" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input v-model="infoForm.data" autocomplete="off" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-if="!disabled">确认提交</el-button>
            <el-button @click="backMain">取 消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-main>
    <!-- URL结束 -->
  </el-container>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      resouceid: '',
      infoForm: {
        name: '',
        data: '',
        type: '',
        size: 0,
        parentid: 0
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
      },
      disabled: false,
      formLabelWidth: '120px',
      isOpenInfo: false,
      header: '网页'
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) {

    },
    getInfo () {
      const self = this
      this.$api.api2.getResourceInfo({}, this.resouceid)
        .then(res => {
          console.log(res)
          self.infoForm = {
            name: res.name,
            data: res.data,
            type: res.type,
            size: res.size,
            parentid: res.parentid
          }
        })
    },
    backMain () {
      this.$router.back(-1)
    },
    onSubmit () {
      // 提交
      let self = this
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          console.log(self.resouceid)
          if (self.resouceid === '' || self.resouceid === undefined) { // 新增
            this.$api.api2.addResource(this.infoForm)
              .then(res => {
                console.log(res)
                self.$message('添加成功')
                self.backMain()
              })
              .catch(error => {
                console.log(error)
                self.$alert('添加失败', '温馨提示', {
                  confirmButtonText: '确定'
                })
              })
          } else { // 修改
            this.$api.api2.updateResource(self.resouceid, self.infoForm)
              .then(res => {
                console.log(res)
                self.$message('修改成功')
                self.backMain()
              })
              .catch(error => {
                console.log(error)
                self.$alert('修改失败', '温馨提示', {
                  confirmButtonText: '确定'
                })
              })
          }
        }
      })
    }
  },
  created () {
    console.log(this.$route)
    let params = this.$route.params
    if (params.type === 'info') {
      this.disabled = true
      this.resouceid = params.resourceid
      this.infoForm.type = params.fileType
      this.getInfo()
    } else if (params.type === 'add') {
      this.disabled = false
      this.infoForm.type = params.fileType
    } else if (params.type === 'edit') {
      this.disabled = false
      this.resouceid = params.resourceid
      this.infoForm.type = params.fileType
      this.getInfo()
    } else {
      this.backMain()
    }
  }
}
</script>

<style lang="less" scoped>
  .resource-container {
    margin-top: 3px;
    background: #F0F2F5;
    .el-header {
      height: 77px !important;
      line-height: 77px !important;
      border-radius: 2px;
      background-color: #ffffff;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }

    .el-main {
      background-color: #ffffff;
    }
  }
</style>
