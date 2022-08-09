import Index from '@/views/IndexPage.vue';

const routes = [
    {
        name: '首页',
        path: '/',
        redirect: 'index',
        meta: {
            title: 'YJXS的个人主页',
        },
    },
    {
        name: 'index',
        path: '/index',
        component: Index,
        meta: {
            title: 'YJXS的个人主页',
        },
    },
];

export default routes;
