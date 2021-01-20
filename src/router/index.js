import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决重复路由引起的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

const routes = [
	{
		path: '/',
		redirect: '/menu/index',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/menu/index',
				components: require('@/views/tags/index'),
				meta: { title: '首页' },
			},
		],
	},
	{
		path: '/menu1',
		name: '菜单一',
		meta: { title: '菜单一' },
		component: () => import('@/views/Home.vue'),
		children: [
			{
				path: '1-1',
				components: require('@/views/tags/menu1-1'),
				meta: { title: '菜单1-1' },
			},
			{
				path: '1-2',
				components: require('@/views/tags/menu1-2'),
				meta: { title: '菜单1-2' },
			},
		],
	},
	{
		path: '/menu2',
		name: '菜单二',
		meta: { title: '菜单二' },
		component: () => import('@/views/Home.vue'),
		children: [
			{
				path: '2-1',
				components: require('@/views/tags/menu2-2'),
				meta: { title: '菜单2-1' },
			},
			{
				path: '2-2',
				components: require('@/views/tags/four'),
				meta: { title: '菜单2-2' },
			},
		],
	},
	{
		path: '/menu3',
		name: '菜单三',
		meta: { title: '菜单三' },
		component: () => import('@/views/Home.vue'),
		children: [
			{
				path: '3-1',
				components: require('@/views/tags/five'),
				meta: { title: '菜单3-1' },
			},
			{
				path: '3-2',
				components: require('@/views/tags/six'),
				meta: { title: '菜单3-2' },
			},
		],
	},
	{
		path: '/menu4',
		name: '菜单四',
		meta: { title: '菜单四' },
		component: () => import('@/views/Home.vue'),
		children: [
			{
				path: '4-1',
				components: require('@/views/tags/seven'),
				meta: { title: '菜单4-1' },
			},
			{
				path: '4-2',
				components: require('@/views/tags/eight'),
				meta: { title: '菜单4-2' },
			},
			{
				path: '4-3',
				components: require('@/views/tags/nine'),
				meta: { title: '菜单4-3' },
			},
			{
				path: '4-4',
				components: require('@/views/tags/ten'),
				meta: { title: '菜单4-4' },
			},
			{
				path: '4-5',
				components: require('@/views/tags/11'),
				meta: { title: '菜单4-5' },
			},
			{
				path: '4-6',
				components: require('@/views/tags/12'),
				meta: { title: '菜单4-6' },
			},
			{
				path: '4-7',
				components: require('@/views/tags/13'),
				meta: { title: '菜单4-7' },
			},
			{
				path: '4-8',
				components: require('@/views/tags/14'),
				meta: { title: '菜单4-8' },
      },
      {
				path: '4-9',
				components: require('@/views/tags/15'),
				meta: { title: '菜单4-9' },
      },
      {
				path: '4-10',
				components: require('@/views/tags/16'),
				meta: { title: '菜单4-10' },
      },
      {
				path: '4-11',
				components: require('@/views/tags/17'),
				meta: { title: '菜单4-11' },
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
