<template>
  <div id="userRegisterView">
    <div style="display: flex; justify-content: flex-end">
      <icon-qr-code class="icon-qr-code" />
    </div>
    <img class="logo" :src="require('@/assets/我家哥哥的蛋.png')" alt="OJ" />
    <a-form
      style="width: 100%; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item field="userAccount" :rules="rulesUserAccount">
        <input
          class="input-login"
          v-model="form.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item field="userPassword" :rules="rulesUserPassword">
        <input
          class="input-login"
          v-model="form.userPassword"
          placeholder="请输入密码"
          type="password"
        />
      </a-form-item>
      <a-form-item field="userPassword" :rules="rulesCheckPassword">
        <input
          class="input-login"
          v-model="form.checkPassword"
          placeholder="请输入确认密码"
          type="password"
        />
      </a-form-item>
      <a-form-item style="display: flex">
        <a-button
          size="large"
          type="dashed"
          style="width: 168px; border-radius: 10px 0 0 10px"
          @click="goBack"
        >
          返回
        </a-button>
        <a-button
          @click="handleSubmit"
          size="large"
          type="primary"
          html-type="submit"
          style="width: 168px; border-radius: 0 10px 10px 0"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
    <span
      style="
        display: flex;
        align-items: flex-start;
        color: #262626bf;
        margin-left: 18px;
        margin-bottom: 30px;
      "
      >账号密码注册</span
    >
    <a-space :size="28">
      <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
        <icon-qq :size="19" style="color: #4a9afd; cursor: pointer" />
      </div>
      <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
        <icon-github :size="19" style="color: #202020; cursor: pointer" />
      </div>
      <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
        <icon-weibo-circle-fill
          :size="19"
          style="color: #e90e24; cursor: pointer"
        />
      </div>
      <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
        <icon-wechat :size="19" style="color: #00ca00; cursor: pointer" />
      </div>
      <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
        <icon-more :size="19" />
      </div>
    </a-space>
    <div style="margin-top: 30px">
      <span style="font-size: 13px; color: #3c3c4399; display: inline-block"
        >注册或登录即代表您同意</span
      >
      <span
        style="
          font-size: 13px;
          color: #262626bf;
          display: inline-block;
          cursor: pointer;
        "
        >《用户协议》</span
      >
      <span style="font-size: 13px; color: #3c3c4399; display: inline-block"
        >和</span
      >
      <span
        style="
          font-size: 13px;
          color: #262626bf;
          display: inline-block;
          cursor: pointer;
        "
      >
        《隐私协议》</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../req/user";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import IconQrCode from "@/icon/icon-qr-code.vue";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
/**
 * 提交表单
 * @param data
 */

const router = useRouter();

const Account_Verification = ref(false);
const Password_Verification = ref(false);
const CheckPassword_Verification = ref(false);

const rulesUserAccount = [
  {
    validator: (value: string, cb: (arg0: string) => void) => {
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (value == null) {
            cb("账号不可以为空！");
          } else if (value.trim() == "") {
            cb("不能包含空格！");
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            cb("账号必须包含字母、数字、符号中至少两种类型！");
          } else if (value.length < 5 || value.length > 16) {
            cb("账号长度应为5-16个字符！");
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            cb("账号不可以包含连续重复的6位及以上的字母或数字！");
          } else {
            Account_Verification.value = true;
          }
          resolve();
        }, 1000);
      });
    },
  },
];
const userPassword = ref();

const rulesUserPassword = [
  {
    validator: (value: string, cb: (arg0: string) => void) => {
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          userPassword.value = value;
          if (value == null) {
            cb("密码不可以为空！");
          } else if (value.trim() == "") {
            cb("不能包含空格！");
          } else if (value.length < 8 || value.length > 16) {
            cb("密码长度应为8-16个字符！");
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            cb("密码必须包含字母、数字、符号中至少两种类型！");
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            cb("密码不可以包含连续重复的6位及以上的字母或数字！");
          } else {
            Password_Verification.value = true;
          }
          resolve();
        }, 1000);
      });
    },
  },
];
const checkPassword = ref();

const rulesCheckPassword = [
  {
    validator: (value: string, cb: (arg0: string) => void) => {
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (value == null) {
            cb("确认密码不可以为空！");
          } else if (value.trim() == "") {
            cb("不能包含空格！");
          } else if (value.length < 8 || value.length > 16) {
            cb("确认密码长度应为8-16个字符！");
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            cb("确认密码必须包含字母、数字、符号中至少两种类型！");
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            cb("确认密码不可以包含连续重复的6位及以上的字母或数字！");
          } else {
            CheckPassword_Verification.value = true;
          }
          resolve();
        }, 1000);
      });
    },
  },
];

// 注册
const handleSubmit = async () => {
  if (
    Password_Verification.value == false &&
    Account_Verification.value == false &&
    CheckPassword_Verification.value == false
  ) {
    return; // 如果验证错误，禁止提交表单
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功跳转页面
  if (res.code === 0) {
    message.success("注册成功！");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败:" + res.message);
  }
};
const goBack = () => {
  router.back();
};
</script>

<style scoped>
#userRegisterView {
  width: 370px;
  height: 560px;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;

  .input-login {
    width: 330px;
    height: 40px;
    text-indent: 10px; /* 将文本和光标向右移动 5px */
    border-radius: 10px;
    border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
  }

  .input-login:focus,
  .input-login:active {
    border-color: #165dff; /* 输入框获取焦点时的边框颜色为蓝色 */
    outline: none; /* 去掉获取焦点时的外边框 */
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 24px;
    max-width: 55%; /* 图片的最大宽度为父元素的100%，这样可以实现等比缩放 */
    height: auto;
  }

  .icon-qr-code {
    transform: scale(1.2);
    color: #4d535d;
    cursor: pointer;
  }

  .icon-qr-code:hover {
    color: black;
  }
}
</style>
