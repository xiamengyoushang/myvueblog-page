import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue';
import Blogs from "../views/Blogs";
import BlogDetail from "../views/BlogDetail";
import BlogEdit from "../views/BlogEdit";

Vue.use(VueRouter)

// 页面路由
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name:"Blogs"}  // 默认路由页面
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',    // name需要唯一，component可以一样
    component: BlogEdit,
    meta:{
      requireAuth:true  // 路由拦截
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta:{
      requireAuth:true  // 路由拦截
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
