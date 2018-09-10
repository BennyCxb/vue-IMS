<template>
  <el-container class="terminal-container">
    <el-header class="term-header">终端列表</el-header>
    <el-container class="terminal-table-container">
      <el-aside width="240px">
        <el-container class="term-sort">
          <el-header class="term-sort-header text-center">
            <!--<el-button icon="el-icon-plus" plain>添加标签</el-button>-->
            <el-popover
              placement="top"
              width="160"
              v-model="tagsAddVisible">
              <p><el-input v-model="tagsAddName" placeholder="请输入标签名"></el-input></p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="tagsAddVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="termTagsAdd">确定</el-button>
              </div>
              <el-button slot="reference" icon="el-icon-plus" class="btn-tags-add">添加标签</el-button>
            </el-popover>
          </el-header>
          <el-main class="term-sort-main">
            <!--<el-tree :data="tags" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
            <el-menu
              default-active="99"
              class="el-menu-vertical-demo">
              <el-menu-item index="99" @click="changeTags('')">
                <template slot="title">
                  <span>所有终端</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="i.toString()" v-for="(item, i) in tags" :key="i" @click="changeTags(item.name)">
                <!--<i class="el-icon-menu"></i>-->
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-main>
        </el-container>
      </el-aside>
      <el-main>
        <el-header class="term-list-header">
          <el-row>
            <el-col :span="15" class="text-left">
              <el-button-group>
                <el-button :type="!status ? 'primary' : ''" @click="changeStatus(null)">全部（{{total}}）</el-button>
                <el-button :type="status === 1 ? 'primary' : ''" @click="changeStatus(1)">在线（）</el-button>
                <el-button :type="status === 2 ? 'primary' : ''" @click="changeStatus(2)">休眠（）</el-button>
                <el-button :type="status === 3 ? 'primary' : ''" @click="changeStatus(3)">离线（）</el-button>
              </el-button-group>
            </el-col>
            <el-col :span="9" class="text-right">
              <el-button plain>唤醒</el-button>
              <el-button plain>休眠</el-button>
              <el-button plain>打标签</el-button>
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
                label="终端名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status.id == 1">
                    <label style="color: #52C41A">●</label>
                    <span>在线</span>
                  </span>
                  <span v-else-if="scope.row.status.id == 2">
                    <label style="color: #BFBFBF">●</label>
                    <span>休眠</span>
                  </span>
                  <span v-else-if="scope.row.status.id == 3">
                    <label style="color: #F5222D">●</label>
                    <span>离线</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="currentPlayList"
                label="正在播放"
                width="120">
              </el-table-column>
              <el-table-column
                label="所属分组标签"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span style="margin-right: 5px" v-for="(item, i) in scope.row.tags" :key="i">
                    <el-tag type="info" disable-transitions>{{item}}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="最后上线时间">
                <template slot-scope="scope">{{ scope.row.lastOnlineTime }}</template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="openInfo(scope.row)" type="text">详情</el-button>
                  <el-button @click="openConfig(scope.row)" type="text">配置</el-button>
                  <el-button type="text">截屏</el-button>
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
          <info :termInfoVisible="termInfoVisible" :termid="termid" @closeInfo="closeInfo"></info>
          <config :termConfigVisible="termConfigVisible" :termid="termid" @closeConfig="closeConfig"></config>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import info from './info.vue'
import config from './config.vue'
export default {
  components: {
    info,
    config
  },
  data () {
    return {
      tagsAddVisible: false,
      tagsAddName: '',
      tags: [],
      tagsName: '',
      status: null,
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示条数
      total: 0, // 总数
      termInfoVisible: false,
      termConfigVisible: false,
      termid: ''
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
      // console.log(row)
      this.termid = row.id
      this.termInfoVisible = true
    },
    closeInfo () {
      this.termInfoVisible = false
    },
    openConfig (row) {
      this.termid = row.id
      this.termConfigVisible = true
    },
    closeConfig () {
      this.termConfigVisible = false
    },
    // 获取终端标签列表
    getTermTagslist () {
      const self = this
      this.$api.api2.getTermTagslist()
        .then(response => {
          console.log(response)
          self.tags = [].concat(response)
        })
    },
    // 获取终端列表
    getTermlist () {
      const self = this
      let params = {
        status: this.status,
        tagname: this.tagsName,
        page: this.currentPage,
        rows: this.pageSize
      }
      this.$api.api2.getTermlist(params)
        .then(response => {
          // console.log(response)
          self.currentPage = response.page
          self.total = response.total
          self.tableData = response.terms
        })
    },
    termTagsAdd () {
      const self = this
      let params = {
          name: this.tagsAddName
      }
      this.$api.api2.termTagsAdd(params)
        .then(response => {
          console.log(response)
          self.getTermTagslist()
          self.tagsAddVisible = false
        })
      // this.$axios
    },
    // 切换状态
    changeTags (name) {
      this.tagsName = name
      this.getTermlist()
    },
    // 切换状态
    changeStatus (status) {
      this.status = status
      this.getTermlist()
    }
  },
  created () {
    this.getTermTagslist()
    this.getTermlist()
  }
}
</script>

<style scoped>
  .terminal-container {
    margin-top: 3px;
    background: #F0F2F5;
  }

  .terminal-container .term-header {
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

  .term-sort-header .btn-tags-add {
    width: 100%;
    border-style: dashed;
  }

  .term-sort-main {
    height: 100%;
    background-color: #ffffff;
  }

  .terminal-table-container {
    padding: 20px;
  }

  .el-main {
    padding: 0;
  }

  /*终端标签*/
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
