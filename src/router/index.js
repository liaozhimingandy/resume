import {createRouter, createWebHistory} from 'vue-router';

import Setup from "../pages/Setup.vue";
import HelloWorld from "../components/HelloWorld.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const routes = [
    {path: '/', name: 'index', component: HelloWorld, meta: {title: "创建简历"}},
     {path: '/setup/', name: 'setup', component: Setup, meta: {title: "创建简历"}},
    {path: '/:catchALL(.*)/', component: NotFoundPage, name: 'not-fond', meta: {title: "Not Found"}},
    ]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: createWebHistory(),
    routes: routes, // `routes: routes` 的缩写
    trailingSlash: true // 设置 URL 以斜杠结尾
});

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    if (to.meta.title) {
        document.title = to.meta.title + ' | alsoapp'
    }

    // 如果路径不是以 / 开头，则自动添加 /
    if (!to.path.endsWith('/')) {
        next({path: to.path + '/'});
    } else {
        next();
    }
})

export default router;