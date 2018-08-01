<template>
  <el-dialog title="终端详情" :visible.sync="termInfoVisible">
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
          <el-progress :percentage="form.cpu"></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="内存:" :label-width="formLabelWidth">
        <div class="term-progress">
        <el-progress :percentage="form.ram"></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="磁盘:" :label-width="formLabelWidth">
        <div class="term-progress">
        <el-progress :percentage="form.disk / form.diskTotal * 100"></el-progress>
        </div>
        {{form.disk}}MB / {{form.diskTotal}}MB
      </el-form-item>
      <el-form-item label="位置:" :label-width="formLabelWidth">
        <label>{{form.position}}</label>
      </el-form-item>
      <el-form-item label="安卓版本:" :label-width="formLabelWidth">
        <label>{{form.android}}</label>
      </el-form-item>
      <el-form-item label="软件版本:" :label-width="formLabelWidth">
        <label>{{form.version}}</label>
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
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: {
        name: '终端',
        mac: '12:AA:10:4F:08:DE',
        ip: '192.168.1.11',
        cpu: 20,
        ram: 20,
        disk: 2048,
        diskTotal: 4096,
        position: '徐汇',
        android: '6.0',
        version: 'v1.3',
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
    }
  },
  props: ['termInfoVisible']
}
</script>

<style scoped>
.term-progress {
  float: left;
  width: 300px;
  margin: 8px 0;
}
</style>
