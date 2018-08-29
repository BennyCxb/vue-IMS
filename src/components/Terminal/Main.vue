<template>
  <el-container class="terminal-container">
    <el-header class="term-header">终端列表</el-header>
    <el-container class="terminal-table-container">
      <el-aside width="240px">
        <el-container class="term-sort">
          <el-header class="term-sort-header text-center">
            <el-button icon="el-icon-plus" plain>添加标签</el-button>
          </el-header>
          <el-main class="term-sort-main">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main>
        <el-header class="term-list-header">
          <el-row>
            <el-col :span="15" class="text-left">
              <el-button-group>
                <el-button plain>全部（1）</el-button>
                <el-button plain>在线（1）</el-button>
                <el-button plain>休眠（1）</el-button>
                <el-button plain>离线（1）</el-button>
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
                label="终端名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">
                    <label style="color: #52C41A">●</label>
                    <span>在线</span>
                  </span>
                  <span v-else-if="scope.row.status == 2">
                    <label style="color: #BFBFBF">●</label>
                    <span>休眠</span>
                  </span>
                  <span v-else-if="scope.row.status == 3">
                    <label style="color: #F5222D">●</label>
                    <span>离线</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="playing"
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
                <template slot-scope="scope">{{ scope.row.datatime }}</template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="openInfo(scope.row)" type="text">详情</el-button>
                  <el-button type="text">配置</el-button>
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
          <info :termInfoVisible="termInfoVisible" @closeInfo="closeInfo"></info>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import info from './info.vue'
export default {
  components: {
    info
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

  .term-sort-header > button {
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
