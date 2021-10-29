import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/characters",
    name: "Characters",
    alias: "/",
    component: () => import("@/views/Characters.vue"),
  },
  {
    path: "/characters/:id",
    name: "Character",
    component: () => import("@/views/Character.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
