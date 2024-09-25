import {createRouter, createWebHistory} from 'vue-router';

// 引入nprogress
import NProgress from 'nprogress'

import Setup from "../pages/SetupPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import PreviewPage from "../pages/PreviewPage.vue";
import TestPage from "../pages/TestPage.vue";
import HomePage from "../pages/HomePage.vue";

// 进度条配置（可选）
NProgress.configure({
    speed: 500,            // 进度条增加的速度
    showSpinner: false,    // 是否显示加载小图标
    trickle: true,        // 是否显示一个小的进度条在顶部
    trickleSpeed: 200,     // 顶部小进度条的更新速度
    minimum: 0.08,         // 进度条开始时的最小百分比
    ease: 'ease',         // 动画的缓动效果
    easeFrom: '1.4',      // 动画开始的缓动效果
    easeTo: '0.35',       // 动画结束的缓动效果
    color: '#f00',        // 进度条的颜色
    positionUsing: '',    // CSS选择器或DOM元素，进度条将使用其边界进行定位
    prepend: false        // 是否将进度条插入到选择器或元素的子元素的最前面
}); // 不显示默认的spinner

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
    // 开始进度条
    NProgress.start();
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

router.afterEach(() => {
    // 完成进度条
    NProgress.done();
});

export default router;