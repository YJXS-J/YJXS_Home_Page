import Index from '@/views/IndexPage.vue';
import Project from '@/components/ProjectPage.vue';

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
    {
        name: 'project',
        path: '/project',
        component: Project,
        meta: { title: '项目' },
    },
];

export default routes;
