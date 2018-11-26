<template>
  <el-container class="playlist-container">
    <el-header class="term-header">
      模版列表
      <div class="pull-right">
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          v-model="search"
          @blur="getTemplateList"
          @keyup.enter.native="getTemplateList"
          clearable>
        </el-input>
      </div>
    </el-header>
    <el-container class="playlist-table-container">
      <el-main>
        <el-header class="term-list-header">
          <el-row>
            <el-col :span="24" class="text-right">
              <el-button type="primary">新建模版</el-button>
              <el-button>复制</el-button>
              <el-button>删除</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="term-list-main">
          <!--<div class="term-list-box">-->
            <!--<el-alert-->
              <!--title="消息提示的文案"-->
              <!--type="info"-->
              <!--show-icon-->
              <!--:closable="false">-->
            <!--</el-alert>-->
          <!--</div>-->

          <div class="term-list-box">
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
                label="模版名称">
              </el-table-column>
              <el-table-column
                label="创建时间"
                sortable>
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column
                label="修改时间"
                sortable>
                <template slot-scope="scope">{{ scope.row.updateTime }}</template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="220">
                <template slot-scope="scope">
                  <el-button @click="openInfo(scope.row)" type="text">详情</el-button>
                  <el-button type="text">配置</el-button>
                  <el-dropdown>
                    <el-button type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>删除</el-dropdown-item>
                      <el-dropdown-item>复制</el-dropdown-item>
                      <el-dropdown-item>生成离线播单</el-dropdown-item>
                      <el-dropdown-item>选择终端</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import info from './info.vue'
export default {
  components: {
    // info
  },
  data () {
    return {
      search: '',
      data: [{
        label: '所有终端',
        children: [{
          label: '未命名终端',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '分组标签一',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }],
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
      termInfoVisible: false
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
      this.termInfoVisible = true
    },
    closeInfo () {
      this.termInfoVisible = false
    },
    getTemplateList () {
      const self = this
      let params = {
        month: '',
        keyword: this.search,
        page: this.currentPage,
        rows: this.pageSize
      }
      this.$api.api2.getTemplateList(params)
        .then(response => {
          // console.log(response)
          self.currentPage = response.page
          self.total = response.total
          self.tableData = response.terms
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getTemplateList()
  }
}
</script>

<style scoped>
  .playlist-container {
    margin-top: 3px;
    background: #F0F2F5;
  }

  .playlist-container .term-header {
    height: 77px !important;
    line-height: 77px !important;
    border-radius: 2px;
    background-color: #ffffff;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }

  .term-sort {
    height: 100%;
    margin-right: 16px;
  }

  .term-sort-header, .term-list-header {
    height: 65px !important;
    line-height: 60px !important;
    border-radius: 2px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }

  .term-sort-header > button {
    width: 100%;
    border-style: dashed;
  }

  .term-sort-main {
    height: 100%;
    background-color: #ffffff;
  }

  .playlist-table-container {
    padding: 20px;
  }

  .el-main {
    padding: 0;
  }

  .term-sort-main .el-tree-node__content {
    padding: 10px;
  }

  .term-list-main {
    height: calc(100% - 65px);
    background-color: #ffffff;
  }

  .term-list-box {
    padding: 10px;
  }

  .term-list-box .el-alert {
    background: #E6F7FF;
    color: #1890FF;
  }

  .pagination {
    padding: 10px;
    text-align: right;
  }
</style>
