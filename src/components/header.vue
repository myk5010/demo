<template>
  <div class="header">
    <i class="el-icon-setting" style="margin-right: 15px"></i>
				<span>admin</span>
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						<i
							class="el-icon-arrow-down el-icon--right"
						></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>