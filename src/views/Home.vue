<template>
  <div class="home">
    <el-container class="container">
      <!-- 头部 -->
      <el-header style="text-align: right">
        <Header></Header>
      </el-header>
      <el-container>
        <!-- 左边导航栏 -->
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <!-- 内容 -->
        <el-main>
          <!-- 面包屑 -->
          <Bread :breadList="breadData"></Bread>
          <el-row>
            <el-col :span="24" style="margin-bottom: 10px">
              <!-- <i class="el-icon-arrow-left left-buttom" @click="left_move"></i>
              <div style="overflow: hidden; height: 35px; width: 95%; float: left">
                <div
                  :class="{ active: current_tag == index }"
                  v-for="(tag, index) in tags"
                  :key="tag.name"
                  @click="changeTag(index)"
                  class="tagBox"
                >
                  <div class="container">
                    <span :class="{ active: current_tag == index }">{{ tag.name }}</span>
                    <i
                      class="el-icon-close"
                      @click="closeTag"
                      v-if="current_tag == index"
                    ></i>
                  </div>
                </div>
              </div>
              <i
                class="el-icon-arrow-right right-buttom"
                @click="right_move"
                v-show="right_bt_status"
              ></i> -->
              <el-tabs
                type="card"
                v-model="editableTabsValue"
                closable
                class="tabs"
                @tab-remove="closeTag"
                @tab-click="changeTag"
              >
                <el-tab-pane
                  v-for="item in tags"
                  :key="item.name"
                  :label="item.name"
                  :title="item.name"
                  :name="item.name"
                >
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="24">
              <router-view />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Menu from "@/components/menu.vue";
import Bread from "@/components/bread.vue";

export default {
  name: "Home",
  components: {
    Header,
    Menu,
    Bread,
  },
  data() {
    return {
      routeList: [
        { name: "首页", path: "/menu/index" },
        { name: "菜单1-1", path: "/menu1/1-1" },
        { name: "菜单1-2", path: "/menu1/1-2" },
        { name: "菜单2-1", path: "/menu2/2-1" },
        { name: "菜单2-2", path: "/menu2/2-2" },
        { name: "菜单3-1", path: "/menu3/3-1" },
        { name: "菜单3-2", path: "/menu3/3-2" },
        { name: "菜单4-1", path: "/menu4/4-1" },
        { name: "菜单4-2", path: "/menu4/4-2" },
        { name: "菜单4-3", path: "/menu4/4-3" },
        { name: "菜单4-4", path: "/menu4/4-4" },
        { name: "菜单4-5", path: "/menu4/4-5" },
        { name: "菜单4-6", path: "/menu4/4-6" },
        { name: "菜单4-7", path: "/menu4/4-7" },
        { name: "菜单4-8", path: "/menu4/4-8" },
        { name: "菜单4-9", path: "/menu4/4-9" },
        { name: "菜单4-10", path: "/menu4/4-10" },
        { name: "菜单4-11", path: "/menu4/4-11" },
      ],
      editableTabsValue: "",
      breadData: [],
      tags: [
        {
          name: "首页",
          type: "success",
          effect: "dark",
          closable: true,
        },
      ],
      tag_routes: ["/menu/index"],
      current_tag: 0,
      right_bt_status: false,
    };
  },
  watch: {
    $route: "updateRouter",
  },
  methods: {
    // 路由更新
    updateRouter() {
      let matched = this.$route.matched;
      if (matched[0].name === "Home") {
        this.breadData = [{ path: "/", meta: { title: "首页" } }];
      } else {
        this.breadData = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      const path = this.$route.fullPath;
      const index = this.tag_routes.indexOf(path);
      if (index != -1) {
        for (let index = 0; index < this.routeList.length; index++) {
          const items = this.routeList[index];
          if (items.name == this.editableTabsValue) {
            // this.$router.push(items.path);
            this.changeTag(index);
          }
        }
      } else {
        this.addTag(this.$route);
      }
    },
    // 切换标签
    changeTag() {
      for (let index = 0; index < this.routeList.length; index++) {
        const items = this.routeList[index];
        if (items.name == this.editableTabsValue) {
          this.$router.push(items.path);
        }
      }
      // 去除当前页的选中状态
      // this.tags[this.current_tag].type = "";
      // this.tags[this.current_tag].effect = "plain";
      // this.tags[this.current_tag].closable = false;
      // 把新的选中页加上状态
      // this.tags[index].type = "success";
      // this.tags[index].effect = "dark";
      // this.tags[index].closable = true;
      // 变更当前页下标值
      // this.current_tag = index;

      // 跳转路由
      // this.$router.push(this.tag_routes[index]);
    },
    // 新增标签页
    addTag(routeMsg) {
      this.tag_routes.push(routeMsg.fullPath);
      this.tags.push({
        name: routeMsg.meta.title,
      });
    this.editableTabsValue = routeMsg.meta.title
      this.changeTag(this.tag_routes.length - 1);
    },
    // 关闭标签页array 
    closeTag(name) {
      // const index = this.current_tag;
      // 如果关的是第一个标签页
      // if (index == 0) {
      //   // 所有标签都被关了
      //   if (this.tag_routes.length == 1) {
      //     this.$router.push("/menu/index");
      //   }
      //   // else {
      //   //   // 跳到后一个标签页
      //   //   this.changeTag(index + 1);
      //   // }
      // } else {
      //   // 跳到前一个标签页
      //   this.changeTag(index - 1);
      // }
      // 关闭当前标签页
      for (let index = 0; index < this.routeList.length; index++) {
        const items = this.routeList[index];
        if (items.name == name) {
          console.log(this.tag_routes);
          console.log(this.tags);
          this.routeList.splice(index, 1);
          this.tags.splice(index, 1);
          this.tag_routes.splice(index, 1);
          this.$router.push(this.routeList[index - 1].path);
        }
      }
      // this.tags.splice(index, 1);
      // this.tag_routes.splice(index, 1);
    },
    left_move() {},
    right_move() {},
  },
  created() {
    this.$nextTick(() => {
      if (this.$route.matched[0].name === "Home") {
        this.breadData = [{ path: "/", meta: { title: "首页" } }];
      }
    });
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #4491e0;
  color: #333;
  line-height: 60px;
}
.el-aside {
  height: calc(100vh - 61px);
  background-color: #f6f6f6;
}
.el-main {
  background: #ededed;
}
.el-tag {
  margin-right: 5px;
}
.tagBox {
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 2px;
  float: left;
  background: #ffffff;
  line-height: 22px;
  color: #000;
  text-align: center;
  span {
    display: inline-block;
    margin-right: 2px;
  }
}
.active {
  color: #409eff;
  background: #ccc;
}
.left-buttom {
  float: left;
  display: block;
  background: #ffffff;
  line-height: 32px;
  margin-right: 2px;
}
.right-buttom {
  float: left;
  display: block;
  background: #ffffff;
  line-height: 32px;
}
/deep/ .el-tabs__item {
  background: #ffffff;
}
/deep/ .el-tabs__nav-wrap.is-scrollable {
  background: #ffffff;
}
// /deep/ .tabs{
//   color: #fff !important;
// }
</style>
