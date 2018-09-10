<template>
  <el-dialog title="终端详情" :visible.sync="termInfoVisible" :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="终端名称:" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="MAC:" :label-width="formLabelWidth">
        <label>{{form.mac}}</label>
      </el-form-item>
      <el-form-item label="IP:" :label-width="formLabelWidth">
        <label>{{form.ip}}</label>
      </el-form-item>
      <el-form-item label="CPU:" :label-width="formLabelWidth">
        <div class="term-progress">
          <el-progress :percentage="Number(form.cpu)"></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="内存:" :label-width="formLabelWidth">
        <div class="term-progress">
          <el-progress :percentage="Number(form.memory)"></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="磁盘:" :label-width="formLabelWidth">
        <div class="term-progress">
          <el-progress :percentage="Number(form.disk)"></el-progress>
        </div>
        <!--{{form.disk}}MB / {{form.diskTotal}}MB-->
      </el-form-item>
      <el-form-item label="位置:" :label-width="formLabelWidth">
        <label>{{form.position}}</label>
      </el-form-item>
      <!--<el-form-item label="安卓版本:" :label-width="formLabelWidth">-->
        <!--<label>{{form.android}}</label>-->
      <!--</el-form-item>-->
      <el-form-item label="软件版本:" :label-width="formLabelWidth">
        <label>{{form.softwareVersion}}</label>
      </el-form-item>
      <div class="hr-0"></div>
      <el-form-item label="播放信息:" :label-width="formLabelWidth">
        <el-tag v-for="(item, i) in form.playList" :key="i">{{item.name}}</el-tag>
      </el-form-item>
      <div class="hr-0"></div>
      <el-form-item label="分组标签:" :label-width="formLabelWidth">
        <el-tag v-for="(item, i) in form.tags" :key="i">{{item.name}}</el-tag>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        mac: '',
        ip: '',
        cpu: 0,
        memory: 0,
        disk: 0,
        diskTotal: null,
        position: '',
        android: '',
        softwareVersion: '',
        tags: [],
        playList: [],
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeInfo', false)
    },
    getTermInfo () {
      const self = this
      const params = {
        id: this.termid
      }
      this.$api.api2.getTermInfo({}, this.termid)
        .then(response => {
          // console.log(response)
          self.form = Object.assign(self.form, response)
        })
        .catch(error => {
          console.log(error())
        })
    }
  },
  props: ['termInfoVisible', 'termid'],
  watch: {
    termInfoVisible (val) {
      if (val) {
        this.getTermInfo()
      }
    }
  }
}
</script>

<style scoped>
.term-progress {
  float: left;
  width: 300px;
  margin: 8px 0;
}
</style>
