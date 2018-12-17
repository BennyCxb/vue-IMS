<template>
  <el-container class="playlist-container">
    <el-header class="term-header">
      播单列表
      <el-button type="danger" plain>紧急插播</el-button>

      <div class="pull-right">
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          v-model="search"
          @blur="getPlayList"
          @keyup.enter.native="getPlayList"
          clearable>
        </el-input>
      </div>
    </el-header>
    <el-container class="playlist-table-container">
      <el-main>
        <el-header class="term-list-header">
          <el-row>
            <el-col :span="14" class="text-left">
              <el-button-group>
                <el-button plain :type="!status ? 'primary' : ''" @click="changeStatus(null)">全部（{{total}}）</el-button>
                <el-button plain :type="status === 'unreview' ? 'primary' : ''" @click="changeStatus('unreview')">未审核</el-button>
                <el-button plain :type="status === 'accept' ? 'primary' : ''" @click="changeStatus('accept')">已通过</el-button>
                <el-button plain :type="status === 'refuse' ? 'primary' : ''" @click="changeStatus('refuse')">未通过</el-button>
                <el-button plain :type="status === 'publish' ? 'primary' : ''" @click="changeStatus('publish')">已发布</el-button>
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
            <el-col :span="10" class="text-right">
              <router-link to="/Playlist/Info"><el-button type="primary">新建播单</el-button></router-link>
              <el-button>生成离线播单</el-button>
              <el-button>发布</el-button>
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
                label="播单名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="type"
                label="播单类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="提交人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="修改时间"
                sortable>
                <template slot-scope="scope">{{ scope.row.updateTime }}</template>
              </el-table-column>
              <el-table-column
                prop="reviewer"
                label="审核人">
              </el-table-column>
              <el-table-column
                prop="reviewTime"
                label="审核时间">
                <template slot-scope="scope">{{ scope.row.reviewTime }}</template>
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
                    <span>已通过</span>
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
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {
    // info
  },
  data () {
    return {
      tableData: [],
      playOptions: [{
        value: 'ordinary',
        label: '普通'
      }, {
        value: 'intercut',
        label: '随机'
      }, {
        value: 'loop',
        label: '循环'
      }, {
        value: 'emergent',
        label: '紧急'
      }],
      search: '',
      status: '',
      playValue: 'ordinary',
      currentPage: 1,
      pageSize: 20,
      total: 0,
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
    /**
     * 获取播单列表
     */
    getPlayList () {
      const self = this
      const parmes = {
        type: this.playValue,
        keyword: this.search,
        page: this.currentPage,
        rows: this.pageSize
      }
      if (this.status) {
        parmes.status = this.status
      }
      this.$api.api2.getPlayList(parmes)
        .then(res => {
          console.log(res)
          self.currentPage = res.pages
          self.total = res.total
          self.tableData = res.terms
          // self._.each(res.terms, item => {
          //   if (item.status === 'Online') {
          //     self.num.online++
          //   } else if (item.status === 'Offline') {
          //     self.num.offline++
          //   } else if (item.status === 'Sleep') {
          //     self.num.sleep++
          //   }
          // })
        })
    },
    // 切换状态
    changeStatus (status) {
      this.status = status
      this.getPlayList()
    }
  },
  created () {
    this.getPlayList()
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
    /*height: 65px !important;*/
    line-height: 57px;
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
    min-width: 1080px;
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
