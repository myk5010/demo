<template>
  <div class="menu" style="overflow:hidden">
    <el-menu
      :unique-opened="true"
      class="el-menu-vertical-demo"
      background-color="#f6f6f6"
      router
      :default-active="default_active"
      text-color="#000"
      active-text-color="#999"
    >
      <el-submenu :index="item.route" v-for="item in meunList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.text }}</span>
        </template>
        <el-menu-item-group v-for="childItem in item.children" :key="childItem.id">
          <el-menu-item :index="childItem.route">{{ childItem.childText }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      default_active: "",
      meunList: [
        {
          text: "菜单一",
          route: "/tags",
          id: 1,
          children: [
            {
              childText: "菜单1-1",
              route: "/menu1/1-1",
              id: 2,
            },
            {
              childText: "菜单1-2",
              route: "/menu1/1-2",
              id: 3,
            },
          ],
        },
        {
          text: "菜单二",
          route: "2",
          id: 4,
          children: [
            {
              childText: "菜单2-1",
              route: "/menu2/2-1",
              id: 5,
            },
            {
              childText: "菜单2-2",
              route: "/menu2/2-2",
              id: 6,
            },
          ],
        },
        {
          text: "菜单三",
          route: "3",
          id: 7,
          children: [
            {
              childText: "菜单3-1",
              route: "/menu3/3-1",
              id: 8,
            },
            {
              childText: "菜单3-2",
              route: "/menu3/3-2",
              id: 9,
            },
          ],
        },
        {
          text: "菜单四",
          route: "4",
          id: 10,
          children: [
            {
              childText: "菜单4-1",
              route: "/menu4/4-1",
              id: 11,
            },
            {
              childText: "菜单4-2",
              route: "/menu4/4-2",
              id: 12,
            },
              {
              childText: "菜单4-3",
              route: "/menu4/4-3",
              id: 13,
            },
              {
              childText: "菜单4-4",
              route: "/menu4/4-4",
              id: 14,
            },
              {
              childText: "菜单4-5",
              route: "/menu4/4-5",
              id: 15,
            },
              {
              childText: "菜单4-6",
              route: "/menu4/4-6",
              id: 16,
            },
              {
              childText: "菜单4-7",
              route: "/menu4/4-7",
              id: 17,
            },
              {
              childText: "菜单4-8",
              route: "/menu4/4-8",
              id: 18,
            },
              {
              childText: "菜单4-9",
              route: "/menu4/4-9",
              id: 19,
            },
            {
              childText: "菜单4-10",
              route: "/menu4/4-10",
              id: 20,
            },
            {
              childText: "菜单4-11",
              route: "/menu4/4-11",
              id: 21,
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route: "updateRouter",
  },
  methods: {
    // 路由更新
    updateRouter() {
      // console.log(this.$route)
      this.default_active = this.$route.fullPath;
    },
    // handleOpen(key, keyPath) {
    // 	console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    // 	console.log(key, keyPath)
    // },
  },
};
</script>

<style lang="less" scoped>
// /deep/ .el-menu {
// 	height: calc(100vh - 61px) !important;
// }
</style>
