<template>
  <el-dialog title="终端配置" :visible.sync="termConfigVisible" :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="定时重启:" :label-width="formLabelWidth">
        <el-time-picker
          v-model="form.restart"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="屏幕旋转:" :label-width="formLabelWidth">
        <el-select v-model="form.rotate" clearable placeholder="请选择">
          <el-option label="0°" value="0"></el-option>
          <el-option label="90°" value="90"></el-option>
          <el-option label="180°" value="180"></el-option>
          <el-option label="270°" value="270"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作时间:" :label-width="formLabelWidth">
        <el-select v-model="form.type" clearable placeholder="请选择">
          <el-option label="每天" value="1"></el-option>
          <el-option label="每周" value="2"></el-option>
          <!--<el-option label="每月" value="3"></el-option>-->
        </el-select>
      </el-form-item>
      <template v-if="form.type == 1">
        <el-form-item label="" v-for="(item, i) in form.workdays" :label-width="formLabelWidth">
          <el-time-picker
            is-range
            v-model="item.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          <el-button type="text" icon="el-icon-remove" style="color: #f56c6c" @click="daysDelete(i)"></el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="text" icon="el-icon-plus" @click="daysAdd">添加</el-button>
        </el-form-item>
      </template>
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
        restart: '',
        rotate: '',
        volume: '',
        type: '1',
        workdays: [],
        worktime: {
          start: '',
          end: ''
        },
        worktimeMon: {
          start: '',
          end: ''
        },
        worktimeTue: {
          start: '',
          end: ''
        },
        worktimeWed: {
          start: '',
          end: ''
        },
        worktimeThu: {
          start: '',
          end: ''
        },
        worktimeFri: {
          start: '',
          end: ''
        },
        worktimeSat: {
          start: '',
          end: ''
        },
        worktimeSun: {
          start: '',
          end: ''
        }
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeConfig', false)
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
    },
    daysAdd () {
      this.form.workdays.push({
        time: ''
      })
    },
    daysDelete (index) {
      this.form.workdays.splice(index, 1)
    }
  },
  props: ['termConfigVisible', 'termid'],
  watch: {
    termConfigVisible (val) {
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
