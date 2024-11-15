import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "主界面",
      component: () => import("@/views/HP.vue"),
    },
    {
      path: "/system",
      component: () => import("@/views/System/SystemView.vue"),
      redirect: "/system/home",
      children: [
        {
          path: "home",
          name: "主页",
          component: () => import("@/views/System/Home.vue"),
          meta: {
            i: "HomeTwoTone",
          },
        },
        {
          path: "file",
          name: "文件管理",
          component: () => import("@/views/System/FileManage.vue"),
        },
        {
          path: "about",
          name: "关于",
          component: () => import("@/views/System/About.vue"),
        },
      ],
    },
    {
      path: "/user",
      name: "用户",
      children: [
        {
          path: "login",
          name: "登录",
          component: () => import("@/views/User/Login.vue"),
        },
        {
          path: "register",
          name: "注册",
          component: () => import("@/views/User/Register.vue"),
        },
      ],
    },
  ],
});

export default router