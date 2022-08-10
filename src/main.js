import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // 从pinia中导入createPinia方法
import router from './router/index';
import data from './store/data'; // 导入数据

const app = createApp(App);

app.config.globalProperties.$data = data; // 注册全局方法

// 加载 router 底下的 index.js 路由配置文件
app.use(router);
// 使用vue实例的use方法，告诉vue我们要使用pinia
app.use(createPinia());
app.mount('#app');
