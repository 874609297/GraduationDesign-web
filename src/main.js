import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//pinia实现状态管理
import store from '../src/store/index'

import VForm3 from 'vform3-builds'  //引入VForm3库
import 'vform3-builds/dist/designer.style.css'  //引入VForm3样式

const app = createApp(App)
app.use(VForm3).use(router).use(ElementPlus,{
    locale: zhCn,
}).use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount("#app")