import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); //pinia状态持久化-刷新不丢失
app.use(pinia);

app.use(router)

app.mount('#app')
