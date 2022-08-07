import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index'; // 加载 router 底下的 index.js 路由配置文件

const app = createApp(App);
app.use(router);
app.mount('#app');
