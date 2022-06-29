import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import type { RouteParamConfig } from "@/interfaces/route";
import Layout from "@/layout/index.vue";
import Login from "@/views/Login/index.vue";
import { Local } from "@/utils/storage";

/**
 * 基础路由设置
 */
export const constantRoutes: RouteParamConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    name: "home",
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/login",
    hidden: true,
    component: Login,
    name: "login",
    meta: {
      title: "登录",
    },
  },
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: {
      icon: "system",
      title: "系统管理",
    },
    children: [
      {
        path: "roleAdmin",
        name: "roleAdmin",
        component: () => import("@/views/System/RoleAdmin/index.vue"),
        meta: {
          title: "角色管理",
          icon: "role",
        },
      },
      {
        path: "menuAdmin",
        name: "menuAdmin",
        component: () => import("@/views/System/MenuAdmin/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "menu",
        },
      },
    ],
  },
  {
    path: "/404",
    hidden: true,
    name: "404",
    meta: {
      icon: "404",
      title: "404",
    },
    component: () => import("@/views/ErrorPage/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

const asyncRoutes: RouteParamConfig[] = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

router.beforeEach((to, from) => {
  console.log(to, from)

  if (to.name === "login") {
    if (Local.get("username")) {
      return {
        name: "home",
      };
    } else {
      return true;
    }
  } else {
    if (!Local.get("username")) {
      return {
        name: "login"
      }
    }
  }

  return true;
});

export default router;
