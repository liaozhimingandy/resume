import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router";

import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import piniaPluginPersist from 'pinia-plugin-persist'

import 'nprogress/nprogress.css' // 引入样式

import App from './App.vue'
// 创建Pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App).use(pinia).use(router).use(CkeditorPlugin).mount('#app')
