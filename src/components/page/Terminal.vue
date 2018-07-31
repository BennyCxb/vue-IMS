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
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
</style>
