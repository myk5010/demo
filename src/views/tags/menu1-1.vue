<template>
  <div class="one_container">
    <el-container>
      <el-aside width="200px">
        <div draggable="true">
          <el-tree
            style="width: 100%"
            show-checkbox
            :data="channelTree"
            node-key="id"
            accordion
            @check-change="handleCheckChange"
            ref="tree"
          >
          </el-tree>
        </div>
      </el-aside>
      <el-container style="height: calc(100vh - 160px)">
        <!-- <el-header>
     
        </el-header> -->
        <el-main>
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="3">
              <el-select v-model="channel" placeholder="渠道" style="width: 100%">
                <el-option
                  v-for="item in channelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                style="width: 100%"
                v-model="date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="1.5">
              <el-button @click="reset">重置</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button @click="search">查询</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button @click="addForm">添加</el-button>
            </el-col>
          </el-row>
          <el-card class="box-card1 common">
            <span> 用户信息采集分析 </span>
            <charts-plugin
              :chartData="echarts_data[0]"
              ref="fluorescence_chart"
            ></charts-plugin>
            <!-- <div id="main" style="height: 300px"></div> -->
          </el-card>

          <el-card class="box-card2 common">
            <el-button type="primary" @click="isShowEditor">自定义表单</el-button>
            <rich-text-editor v-if="editorStatus"></rich-text-editor>
          </el-card>

          <el-card class="box-card2">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="50" label="#"> </el-table-column>
              <el-table-column label="日期" prop="date"> </el-table-column>
              <el-table-column prop="channel" label="渠道"> </el-table-column>
              <el-table-column prop="sums" label="总数"> </el-table-column>
              <el-table-column prop="success" label="采集成功数"> </el-table-column>
              <el-table-column prop="fail" label="采集失败数"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleCheck(scope.$index, scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
      </el-container>
      <el-dialog
        v-dialogDrag
        :title="addFormTitle"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <one-form
          v-if="isShow"
          ref="oneform"
          @data="getFormData"
          :changeData="changeData"
          :formStatus="formStatus"
        ></one-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="resetForm" v-if="formStatus === false">重置</el-button>
          <el-button type="primary" @click="submitForm" v-if="formStatus === false"
            >保存</el-button
          >
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script></script>
<script>
import echarts from "echarts";
import richTextEditor from "@/components/richTextEditor";
import oneForm from "./one_form";
import "../../utils/dialog";
// echarts
import chartsPlugin from "@/components/charts_plugin";
import { echarts_data, initial_table } from "./menu1-1.data";

export default {
  components: {
    richTextEditor,
    oneForm,
    chartsPlugin,
  },
  data() {
    return {
      isShow: true,
      formStatus: false,
      index: -1,
      changeData: {},
      addFormTitle: "",
      dialogFormVisible: false,
      // 富文本是否显示
      editorStatus: false,
      channelTreeValue: "",
      channelTreeList: [],
      channelTree: [
        {
          label: "全部渠道",
          id: 0,
          children: [
            {
              id: 1,
              label: "渠道一",
            },
            {
              id: 2,
              label: "渠道二",
            },
            {
              id: 3,
              label: "渠道三",
            },
          ],
        },
      ],
      // 渠道
      channel: "",
      channelList: [
        {
          value: "1",
          label: "渠道一",
        },
        {
          value: "2",
          label: "渠道二",
        },
        {
          value: "3",
          label: "渠道三",
        },
      ],
      // 日期
      date: "",
      // 表格数据
      tableData: JSON.parse(JSON.stringify(initial_table)),
      initial_table,
      // echarts
      echarts_data,
    };
  },
  mounted() {
    this.userLine();
  },
  methods: {
    // 保存按钮
    submitForm() {
      this.$refs.oneform.submitForm();
    },
    // 子组件返回的数据
    getFormData(data, status) {
      // 结果为真push
      if (status && this.addFormTitle == "新增") {
        let data1 = JSON.parse(JSON.stringify(data));
        this.tableData.push(data1);
        this.channelTree[0].children.push({ label: data.channel });
        this.dialogFormVisible = false;
      } else if (status && this.addFormTitle == "修改") {
        let data1 = JSON.parse(JSON.stringify(data));
        // this.tableData[this.index] = data1
        this.tableData.splice(this.index, 1, data1);
        this.dialogFormVisible = false;
      }
    },
    // 重置表单按钮
    resetForm() {
      this.$refs.oneform.resetForm();
    },
    // 添加按钮
    addForm() {
      this.addFormTitle = "新增";
      this.formStatus = false;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.oneform.resetForm();
      });
    },
    // 自定义表单按钮
    isShowEditor() {
      this.editorStatus = !this.editorStatus;
    },
    // 删除按钮
    handleDelete(index) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改按钮
    handleEdit(index, row) {
      this.index = index;
      this.isShow = false;
      this.formStatus = false;
      this.changeData = JSON.parse(JSON.stringify(row));
      this.addFormTitle = "修改";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    // 查看按钮
    handleCheck(index, row) {
      this.addFormTitle = "预览";
      this.changeData = JSON.parse(JSON.stringify(row));
      this.formStatus = true;
      this.isShow = false;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    // 重置按钮
    reset() {
      this.channel = "";
      this.date = "";
      this.channelTreeValue = "";
      let initialValue = JSON.parse(JSON.stringify(this.channelTree));
      this.channelTree = initialValue;
      this.tableData = JSON.parse(JSON.stringify(initial_table));
    },
    //  查询
    search() {
      const channel = this.channel
      let start_date = 0
      let end_date = 0
      if (this.date.length > 0) {
        start_date = new Date(this.date[0])
        end_date = new Date(this.date[1])
      }
      this.tableData = this.initial_table.filter(function (item) {
        if (start_date == 0 & end_date == 0) {
          if (channel.length == 0) {
            return item
          } else {
            if (channel == item.channel) {
              return item
            }
          }
        } else {
          if (channel.length == 0) {
            if (new Date(item.date) >= start_date && new Date(item.date) <= end_date) {
              return item
            }
          } else {
            if (channel == item.channel && new Date(item.date) >= start_date && new Date(item.date) <= end_date) {
              return item
            }
          }
        }
      });
    },
    // 用户信息图表
    userLine() {
      this.echarts_data[0].option.legend.data = [];
      const arr = ["渠道一", "渠道二", "渠道三"];
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   // TODO: legend代表线条数量
      // }
    },
    // 树形控件选中/取消选中
    handleCheckChange(data, checked, indeterminate) {
      // 过滤父级的选中
      if (!data.hasOwnProperty("children")) {
        // 选中
        if (checked) {
          this.channelTreeList.push(data.label);
        } else {
          // 取消选中
          const index = this.channelTreeList.indexOf(data);
          this.channelTreeValue.splice(index, 1);
        }
        this.changeTableData();
      }
    },
    // 过滤表单
    changeTableData() {
      const list = this.channelTreeList;
      this.tableData = this.initial_table.filter(function (item) {
        if (list.indexOf(item.channel) != -1) {
          return item;
        }
      });
    },
    // 过滤echarts数据
    changeEcharts() {},
  },
};
</script>
<style lang="less" scoped>
.one_container {
  height: 100%;
  overflow: auto;
}
.el-aside {
  height: calc(98vh - 134px);
  background-color: #fff;
}
.box-card1 {
  text-align: center;
  span {
    display: inline-block;
    font-size: 14px;
    color: #58aaff;
  }
}
/deep/ .el-header {
  height: 30px !important;
}
/deep/ .el-dialog__header {
  background: #4491e0;
}
/deep/ .el-dialog__title {
  color: #fff;
}
/deep/ .el-dialog__footer {
  text-align: center;
}
.common {
  margin-bottom: 10px;
}
.el-main {
  padding-top: 0;
}
// /deep/ .el-dialog__wrapper{
//   z-index: 99999999 !important;
// }
/deep/ .w-e-toolbar {
  z-index: 1001 !important;
}
/deep/ .w-e-text-container {
  z-index: 100 !important;
}
</style>
