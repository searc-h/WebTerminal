import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
