import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 参考文档
// https://juejin.cn/post/6844903823966732302

// 安装element-ui
// https://element.eleme.cn/#/zh-CN/component/installation
// npm install element-ui --save
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// 安装axios
// npm install axios --save
import axios from "axios"
import "./axios"

// 安装Markdown编辑器
// npm install mavon-editor --save
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

// 安装解析Markdown插件
// npm install markdown-it --save
// 安装Markdown样式插件
// npm install github-markdown-css

// 导入路由拦截则生效
import "./permission"

// 配置全局使用
Vue.use(Element);
Vue.use(mavonEditor);

Vue.config.productionTip = false
Vue.prototype.$axios = axios; // 配置$axios全局使用

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
