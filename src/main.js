import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router";

import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import piniaPluginPersist from 'pinia-plugin-persist'

import 'nprogress/nprogress.css' // 引入样式

import App from './App.vue'
import { registerStore } from '@/stores/app';

const app = createApp(App);

// 创建Pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia);

// 注册pinia状态管理库
registerStore();

app.use(router).use(CkeditorPlugin).mount('#app')
