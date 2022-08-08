import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // 从pinia中导入createPinia方法
import router from './router/index';

const app = createApp(App);
// 加载 router 底下的 index.js 路由配置文件
app.use(router);
app.use(createPinia()); // 使用vue实例的use方法，告诉vue我们要使用pinia

app.mount('#app');
