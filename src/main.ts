import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router";
import store from "./store";
import "@/access";
import "bytemd/dist/index.css";

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .mount("#app");
