<template>
  <el-container class="playlist-container">
    <el-header class="term-header">
      播单列表
      <el-button type="danger" plain>紧急插播</el-button>
    </el-header>
    <el-container class="playlist-table-container">
      <el-main>
        <el-header class="term-list-header">
          <el-row>
            <el-col :span="15" class="text-left">
              <el-button-group>
                <el-button plain>全部（1）</el-button>
                <el-button plain>未审核（1）</el-button>
                <el-button plain>已审核（1）</el-button>
              </el-button-group>
              <el-select v-model="playValue" placeholder="播单类型">
                <el-option
                  v-for="item in playOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="text-right">
              <router-link to="/Playlist/Layout"><el-button type="primary">新建播单</el-button></router-link>
              <el-button>生成离线播单</el-button>
              <el-button>发布</el-button>
              <el-button>复制</el-button>
              <el-button>删除</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="term-list-main">
          <div class="term-list-box">
            <el-alert
              title="消息提示的文案"
              type="info"
              show-icon
              :closable="false">
            </el-alert>
          </div>

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
                label="播单名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="playing"
                label="播单类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="playing"
                label="提交人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="修改时间"
                sortable>
                <template slot-scope="scope">{{ scope.row.datatime }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="审核人">
              </el-table-column>
              <el-table-column
                prop="name"
                label="审核时间">
                <template slot-scope="scope">{{ scope.row.datatime }}</template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">
                    <span>未审核</span>
                  </span>
                  <span v-else-if="scope.row.status == 2">
                    <span>已审核</span>
                  </span>
                  <span v-else-if="scope.row.status == 3">
                    <span>未通过</span>

                    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="220">
                <template slot-scope="scope">
                  <el-button @click="openInfo(scope.row)" type="text">详情</el-button>
                  <el-button type="text">配置</el-button>
                  <el-button type="text">更多</el-button>
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
          <!--<info :termInfoVisible="termInfoVisible" @closeInfo="closeInfo"></info>-->
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
      tableData: [{
        datatime: '2016-05-02 10:30:00',
        name: '未命名终端',
        playing: '默认播单',
        status: 1,
        tags: ['分组标签一', '分组标签二']
      }, {
        datatime: '2016-05-04 10:30:00',
        name: '未命名终端',
        playing: '默认播单',
        status: 2,
        tags: ['分组标签二']
      }, {
        datatime: '2016-05-01 10:30:00',
        name: '终端1',
        playing: '默认播单',
        status: 1,
        tags: ['分组标签一']
      }, {
        datatime: '2016-05-03 10:30:00',
        name: '未命名终端2',
        playing: '默认播单',
        status: 3,
        tags: []
      }],
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
    }
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
