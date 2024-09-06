import {createRouter, createWebHistory} from 'vue-router';

import Setup from "../pages/Setup.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import PreviewPage from "../pages/PreviewPage.vue";
import TestPage from "../pages/TestPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
    {path: '/', name: 'home', component: HomePage, meta: {title: "首页"}},
    {path: '/setup/', name: 'setup', component: Setup, meta: {title: "创建简历"}},
    {path: '/preview/', name: 'preview', component: PreviewPage, meta: {title: "预览简历"}},
    {path: '/test/', name: 'test', component: TestPage, meta: {title: "测试页"}},
    {path: '/:catchALL(.*)/', component: NotFoundPage, name: 'not-fond', meta: {title: "Not Found"}},
    ]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes, // `routes: routes` 的缩写
    trailingSlash: true // 设置 URL 以斜杠结尾
});

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    if (to.meta.title) {
        document.title = to.meta.title + ' | 简历生成器'
    }

    // 如果路径不是以 / 开头，则自动添加 /
    if (!to.path.endsWith('/')) {
        next({path: to.path + '/'});
    } else {
        next();
    }
})

export default router;