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
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="每天" value="1"></el-option>
          <el-option label="每周" value="2"></el-option>
          <!--<el-option label="每月" value="3"></el-option>-->
        </el-select>
      </el-form-item>
      <div class="hr-0"></div>
      <!--每日-->
      <template v-if="form.type == 1">
        <el-form-item label="" v-for="(item, i) in form.workdays" :key="i" :label-width="formLabelWidth">
          <el-time-picker
            is-range
            v-model="item.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          <el-button type="text" icon="el-icon-remove" style="color: #f56c6c"
                     @click="daysDelete(form.workdays, i)"></el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="text" icon="el-icon-plus" @click="daysAdd(form.workdays)">添加</el-button>
        </el-form-item>
      </template>
      <!--每周-->
      <template v-if="form.type == 2">
        <template>
          <el-form-item v-for="(item, index) in form.workweeks" :key="index">
            <template>
              <div class="week-left">
                <label class="week-laebl">
                  <el-checkbox v-model="item.checked">{{item.label}}：</el-checkbox>
                </label>
              </div>
              <div class="week-right">
                <el-button type="text" icon="el-icon-plus" v-if="0 === item.timelist.length"
                           @click="daysAdd(item.timelist)">添加
                </el-button>
                <template v-for="(subitem, i) in item.timelist" v-else>
                  <div class="week-time-picker" :key="i">
                    <el-time-picker
                      is-range
                      v-model="subitem.time"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                    </el-time-picker>
                    <el-button type="text" icon="el-icon-remove" style="color: #f56c6c"
                               @click="daysDelete(item.timelist, i)"></el-button>
                    <el-button type="text" icon="el-icon-plus" v-if="i === item.timelist.length-1"
                               @click="daysAdd(item.timelist)">添加
                    </el-button>
                  </div>
                </template>
              </div>
            </template>
          </el-form-item>
        </template>

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
        type: '2',
        workdays: [],
        workweeks: [
          {
            label: '周一',
            checked: false,
            timelist: []
          },
          {
            label: '周二',
            checked: false,
            timelist: []
          },
          {
            label: '周三',
            checked: false,
            timelist: []
          },
          {
            label: '周四',
            checked: false,
            timelist: []
          },
          {
            label: '周五',
            checked: false,
            timelist: []
          },
          {
            label: '周六',
            checked: false,
            timelist: []
          },
          {
            label: '周日',
            checked: false,
            timelist: []
          }
        ]
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
      this.$api.api2.getTermInfo({}, this.termid)
        .then(response => {
          // console.log(response)
          self.form = Object.assign(self.form, response)
        })
        .catch(error => {
          console.log(error())
        })
    },
    daysAdd (item) {
      item.push({
        time: ''
      })
    },
    daysDelete (item, index) {
      item.splice(index, 1)
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

.week-left {
  float: left;
  width: 120px;
}

.week-right {
  float: left;
  width: calc(100% - 120px);
}

.week-laebl {
  width: 120px;
  height: 100%;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.week-time-picker {
  margin-bottom: 18px;
}

.week-time-picker:last-of-type {
  margin-bottom: 0px;
}
</style>
