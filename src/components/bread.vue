<template>
	<div class="bread">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item
				v-for="item in breadList"
				:key="item.path"
        :to="item.meta.title === '首页' ? item.path : ''"
			>{{item.meta.title}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
export default {
	props: {
		breadList: {
			type: Array,
			default: function() {
				return []
			},
		},
	},
}
</script>
<style lang="less" scoped>
.bread{
  margin-bottom: 10px;
}
</style>
