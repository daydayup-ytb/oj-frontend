import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestion from "@/views/question/AddQuestion.vue";
import QuestionManage from "@/views/question/QuestionManage.vue";
import QuestionBank from "@/views/question/QuestionBank.vue";
import DoQuestionOnline from "@/views/question/DoQuestionOnline.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import UpdateQuestion from "@/views/question/UpdateQuestion.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: QuestionBank,
  },
  {
    path: "/question/bank",
    name: "题库",
    component: QuestionBank,
  },
  {
    path: "/question_submit",
    name: "题目提交状态",
    component: QuestionSubmitView,
  },
  {
    path: "/question/doOnline/:id",
    name: "在线做题",
    component: DoQuestionOnline,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/question/add",
    name: "创建题目",
    component: AddQuestion,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/manage",
    name: "管理题目",
    component: QuestionManage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/update/:id",
    name: "更新页面",
    component: UpdateQuestion,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  // {
  //   path: "/hide",
  //   name: "隐藏菜单",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/admin",
  //   name: "仅管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
