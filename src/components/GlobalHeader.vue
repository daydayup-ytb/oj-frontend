<template>
  <a-row id="global-header" align="center" justify="center" :wrap="false">
    <a-col flex="6">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img
              class="logo"
              :src="require('@/assets/我家哥哥的蛋.png')"
              alt="OJ"
              @click="goToHomePage"
            />
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="1"></a-col>
    <a-col flex="2"></a-col>
    <a-col flex="3">
      <div style="display: flex; justify-content: center; margin-left: 120px">
        <a-space size="middle">
          <div class="searchBar">
            <div class="icon">
              <icon-search
                size="20"
                style="margin-top: 3px; margin-left: 3px; color: #000000"
              />
            </div>
            <div class="textInput">
              <input
                v-model="searchParams.searchText"
                class="inp"
                type="text"
                placeholder="请输入搜索关键字"
                style="font-size: 13px; width: 170px; margin-right: auto"
              />
              <button class="goBtn" @click="doSearch">go</button>
              <div class="clear">
                <icon-close style="color: #999" />
              </div>
            </div>
          </div>
          <div
            v-if="store.state.user?.loginUser?.id"
            class="icon-css-small"
            @mouseover="smallColor = 'black'"
            @mouseout="smallColor = '#737373'"
          >
            <icon-small-bell
              size="20"
              :color="smallColor"
              style="stroke: currentColor; stroke-width: 15px"
            />
          </div>
          <div
            v-if="store.state.user?.loginUser?.id"
            class="icon-css"
            @mouseover="color = 'black'"
            @mouseout="color = '#737373'"
          >
            <icon-flame
              size="20"
              :color="color"
              style="stroke: currentColor; stroke-width: 15px"
            />
            <span
              style="
                font-weight: bold;
                margin-left: 5px;
                margin-right: 5px;
                font-size: 16px;
              "
              >{{ submitNumber }}</span
            >
          </div>
          <div v-if="!store.state.user?.loginUser?.id" style="height: 20px">
            <span class="registration-text" @click="doRegister">注册</span>
            <a-divider direction="vertical" size="0" :margin="5" />
            <span style="color: #0000008c; font-size: 14px">或</span>
            <a-divider direction="vertical" size="0" :margin="5" />
            <span class="registration-text" @click="doLogin">登录</span>
          </div>
          <a-trigger v-else :popup-translate="[-130, 20]" :popup-visible="show">
            <a-avatar
              :imageUrl="store.state.user?.loginUser?.userAvatar"
              :size="27"
              style="cursor: pointer"
              @click="show = !show"
            >
              <img
                alt="avatar"
                src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <SetCenter @click="show = !show" />
            </template>
          </a-trigger>
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import SetCenter from "@/components/SetCenter.vue";
import IconFlame from "@/icon/icon-flame.vue";
import IconSmallBell from "@/icon/icon-small-bell.vue";

const router = useRouter();
const store = useStore();

const searchParams = ref({
  searchText: undefined,
});

const goBtn = ref();
const searchBar = ref();

const show = ref(false);

const color = ref("#737373");
const smallColor = ref("#737373");

const submitNumber = ref(0);

document.addEventListener("DOMContentLoaded", () => {
  // 1.获取元素
  const searchIcon = document.querySelector(".icon") as HTMLInputElement;
  const clearIcon = document.querySelector(".clear") as HTMLInputElement;
  searchBar.value = document.querySelector(".searchBar") as HTMLInputElement;
  goBtn.value = document.querySelector(".goBtn") as HTMLInputElement;
  const inp = document.querySelector(".inp") as HTMLInputElement;

  // 2.点击，切换类 => 动态设置宽度，实现展开效果
  searchIcon.addEventListener("click", () => {
    searchBar.value.classList.toggle("changeWidth");
  });

  goBtn.value.addEventListener("click", () => {
    searchBar.value.classList.toggle("changeWidth");
  });

  // 3.点击清空
  clearIcon.addEventListener("click", () => {
    inp.value = "";
  });
});

// 跳转到搜索页面
const doSearch = () => {
  router.push({
    path: "/search",
    query: searchParams.value,
  });
};

//展示显示的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//默认主页
const selectedKeys = ref(["/"]);

//路由跳转后更新默认的主页
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

//菜单点击
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

//去主页
const goToHomePage = () => {
  router.push("/");
};

// 切换到登录页
const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};

// 切换到注册页
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title {
  color: #444;
  margin-left: 36px;
}

#globalHeader .title-bar .logo {
  height: 40px;
}

#global-header {
  background-clip: padding-box;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 36px;
  cursor: pointer;
}

.searchBar {
  width: 250px;
  height: 25px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  margin-top: -3px;
}

.icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.textInput {
  width: 220px;
  height: 25px;
  position: absolute;
  top: 0;
  left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textInput input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
}

.clear {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goBtn {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background: #3491fa;
  cursor: pointer;
  font-size: 12px;
  padding-left: 3px; /* 调整此属性来改变文本的左移程度 */
  padding-bottom: 3px;
}

.searchBar {
  width: 25px;
}

.changeWidth {
  width: 250px;
}

.registration-text {
  color: #0000008c;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.registration-text:hover {
  color: black;
}

.icon-css {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css:hover {
  background-color: #f2f3f4;
  color: black;
}

.icon-css-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css-small:hover {
  background-color: #f2f3f4;
  color: black;
}
</style>
