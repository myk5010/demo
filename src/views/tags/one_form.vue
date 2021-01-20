<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="渠道" prop="channel">
          <el-input
            v-model="ruleForm.channel"
            placeholder="渠道"
            :disabled="formStatus"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="总数" prop="sums">
          <el-input
            v-model="ruleForm.sums"
            placeholder="总数"
            type="number"
            :disabled="formStatus"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            :disabled="formStatus"
            style="width: 100%"
            v-model="ruleForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="采集成功数" prop="success">
          <el-input
            :disabled="formStatus"
            v-model="ruleForm.success"
            placeholder="采集成功数"
            type="number"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="采集失败数" prop="fail">
          <el-input
            :disabled="formStatus"
            v-model="ruleForm.fail"
            placeholder="采集失败数"
            type="number"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    changeData: {
      type: Object,
      defalut: {},
    },
    formStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ruleForm: {
        channel: "",
        date: "",
        sums: "",
        success: "",
        fail: "",
      },
      rules: {
        channel: [
          {
            required: true,
            message: "请输入渠道",
            trigger: "blur",
          },
        ],
        sums: [
          {
            required: true,
            message: "请输入总数",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单信息
    resetForm() {
      // this.ruleForm = {
      //   channel: "",
      //   date: "",
      //   sums: "",
      //   success: "",
      //   fail: "",
      // };
      this.$refs.ruleForm.resetFields();
    },
    // 提交表单信息
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("data", this.ruleForm, true);
        } else {
          this.$emit("data", this.ruleForm, false);
        }
      });
    },
  },
  created() {
    this.ruleForm = JSON.parse(JSON.stringify(this.changeData));
  },
};
</script>
