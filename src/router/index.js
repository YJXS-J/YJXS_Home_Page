import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes'; // 导入 router 目录下的 router.js.
// import { useProfileStore } from '../store/profileStore';

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    /**
     * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
     */

    // const profileStore = useProfileStore(); // 获取到store的实例
    // console.log(profileStore.imgState); // 打印store里的数据
    // if (!profileStore.imgState) {
    //     next({
    //         name: 'loading',
    //     });
    // } else {
    //     next();
    // }
    window.document.title = to.meta.title;
    next();
});

export default router;
