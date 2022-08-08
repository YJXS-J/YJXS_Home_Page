import Index from '@/views/IndexPage.vue';

const routes = [
    {
        name: '首页',
        path: '/',
        redirect: 'index',
        meta: { title: '首页' },
    },
    {
        name: 'index',
        path: '/index',
        component: Index,
        meta: { title: '首页' },
    },
];

export default routes;
