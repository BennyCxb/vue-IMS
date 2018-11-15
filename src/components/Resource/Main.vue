<template>
  <el-container class="resource-container">
    <el-header class="resource-header">
      资源列表
      <div class="pull-right">
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          v-model="search"
          clearable>
        </el-input>
      </div>
    </el-header>
    <el-container class="resource-table-container">
      <el-main>
        <el-header class="resource-list-header">
          <el-row>
            <el-col :span="24" class="text-right">
              <el-button type="primary">上传</el-button>
              <el-dropdown>
                <el-button type="primary">
                  添加<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <a @click="dialogUrl = true"><el-dropdown-item>网址</el-dropdown-item></a>
                  <a @click="dialogEditor = true"><el-dropdown-item>富文本</el-dropdown-item></a>
                  <el-dropdown-item>滚动字幕</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button>新建文件夹</el-button>
              <el-button>移动到</el-button>
              <el-button>下载</el-button>
              <el-button>删除</el-button>
            </el-col>
            <!--网址-->
            <el-dialog title="网址" :visible.sync="dialogUrl">
              <el-form :model="formUrl">
                <el-form-item label="名称：" :label-width="formLabelWidth">
                  <el-input v-model="formUrl.name" autocomplete="off" :disabled="isOpenInfo"></el-input>
                </el-form-item>
                <el-form-item label="网址：" :label-width="formLabelWidth">
                  <el-input v-model="formUrl.data" autocomplete="off" :disabled="isOpenInfo"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUrl = false">取 消</el-button>
                <el-button type="primary" @click="addUrl">确 定</el-button>
              </div>
            </el-dialog>
            <!--网址-->
            <!--富文本-->
            <el-dialog title="富文本" :visible.sync="dialogEditor">
              <editor></editor>
            </el-dialog>
            <!--富文本-->
          </el-row>
        </el-header>
        <el-container class="resource-list-container">
          <el-aside class="resource-list-category" width="160px">
            <!--<ul>-->
              <!--<li class="resource-list-category-item">全部文件</li>-->
              <!--<li class="resource-list-category-item">视频</li>-->
            <!--</ul>-->
            <el-main class="term-sort-main">
              <el-menu
                default-active="99"
                class="el-menu-vertical-demo">
                <el-menu-item index="99" @click="changeTags('')">
                  <template slot="title">
                    <span>全部文件</span>
                  </template>
                </el-menu-item>
                <el-menu-item :index="i.toString()" v-for="(item, i) in tags" :key="i" @click="changeTags(item.id)">
                  <!--<i class="el-icon-menu"></i>-->
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-menu>
            </el-main>
          </el-aside>
          <el-main class="resource-list-main">
            <div class="resource-list-box">
              <el-alert
                title="消息提示的文案"
                type="info"
                show-icon
                :closable="false">
              </el-alert>
            </div>

            <div class="resource-list-box">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                align="left"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名称">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="资源类型">
                </el-table-column>
                <el-table-column
                  prop="size"
                  label="大小"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  :formatter="createTimeToTime"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="修改时间"
                  :formatter="updateTimeToTime"
                  sortable>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="openInfo(scope.row)" type="text">预览</el-button>
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
            <!--<info :resourceInfoVisible="resourceInfoVisible" @closeInfo="closeInfo"></info>-->
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import info from './info.vue'
import editor from './Editor.vue'
export default {
  components: {
    // info,
    editor
  },
  data () {
    return {
      search: '',
      isOpenInfo: false,
      tagsName: '',
      tags: [
        {
          id: 'VIDEO',
          name: '视频',
          checked: false
        },
        {
          id: 'IMAGE',
          name: '图片',
          checked: false
        },
        {
          id: 'AUDIO',
          name: '音频',
          checked: false
        },
        {
          id: 'PDF',
          name: 'PDF',
          checked: false
        },
        {
          id: 'URL',
          name: '网址',
          checked: false
        },
        {
          id: 'RICHTEXT',
          name: '富文本',
          checked: false
        },
        {
          id: 'MARQUEE',
          name: '滚动字幕',
          checked: false
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      playOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      playValue: '',
      currentPage: 1,
      pageSize: 20,
      total: 50,
      resourceInfoVisible: false,
      dialogUrl: false,
      dialogEditor: false,
      formLabelWidth: '120px',
      formUrl: {
        name: '',
        data: '',
        type: 'URL',
        size: 0,
        parentid: 0
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    openInfo (row) {
      console.log(row)
      if (row.type === 'URL') {
        this.openInfoUrl(row)
      }
      this.resourceInfoVisible = true
    },
    closeInfo () {
      this.resourceInfoVisible = false
    },
    openInfoUrl (row) {
      this.dialogUrl = true
      this.isOpenInfo = true
      this.formUrl.name = row.name
    },
    // 切换状态
    changeTags (name) {
      this.tagsName = name
      this.getResourceList()
    },
    getResourceList () {
      let self = this
      let params = {
        parent: 0,
        keyword: this.search,
        page: this.currentPage,
        rows: this.pageSize
      }
      if (this.tagsName) {
        params.type = this.tagsName
      }
      this.$api.api2.getResourceList(params)
        .then(res => {
          // console.log(res)
          self.currentPage = res.page
          self.total = res.total
          self.tableData = res.resources
        })
        .catch(error => {
          console.log(error)
          self.$alert('获取资源列表失败', '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    addUrl () {
      let self = this
      this.$api.api2.addResource(this.formUrl)
        .then(response => {
          // console.log(response)
          self.dialogUrl = false
        })
        .catch(error => {
          console.log(error)
          self.$alert('获取资源列表失败', '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    createTimeToTime (row, column) {
      var date = new Date(row.createTime)
      return this.timestampToTime(date)
    },
    updateTimeToTime (row, column) {
      var date = new Date(row.updateTime)
      return this.timestampToTime(date)
    },
    // 时间戳转换成时间
    timestampToTime (date) {
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
  },
  created () {
    this.getResourceList()
  }
}
</script>

<style scoped>

  .resource-container {
    margin-top: 3px;
    background: #F0F2F5;
  }

  .resource-container .resource-header {
    height: 77px !important;
    line-height: 77px !important;
    border-radius: 2px;
    background-color: #ffffff;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }

  .resource-sort {
    height: 100%;
    margin-right: 16px;
  }

  .resource-sort-header, .resource-list-header {
    height: 65px !important;
    line-height: 60px !important;
    border-radius: 2px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }

  .resource-sort-header > button {
    width: 100%;
    border-style: dashed;
  }

  .resource-sort-main {
    height: 100%;
    background-color: #ffffff;
  }

  .resource-table-container {
    padding: 20px;
  }

  .el-main {
    padding: 0;
  }

  .resource-list-container {
    height: calc(100% - 65px);
  }

  .resource-list-category {
    width: 160px;
    border-right: 1px solid rgba(0,0,0,0.1);
    background: #ffffff;
  }

  .resource-list-category-item {
    padding: 14px 14px 14px 50px;
    width:56px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    line-height:20px;
    cursor: pointer;
  }

  .resource-sort-main .el-tree-node__content {
    padding: 10px;
  }

  .resource-list-main {
    height: 100%;
    background-color: #ffffff;
  }

  .resource-list-box {
    padding: 10px;
  }

  .resource-list-box .el-alert {
    background: #E6F7FF;
    color: #1890FF;
  }

  .pagination {
    padding: 10px;
    text-align: right;
  }
</style>
