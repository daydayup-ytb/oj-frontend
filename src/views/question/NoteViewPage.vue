<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        padding: 0 10px;
      "
    >
      <div style="display: flex; align-items: center">
        <a-trigger position="bl">
          <button style="width: 170px; height: 20px" class="clean-button">
            <span>所有状态</span>
            <icon-down
              style="margin-left: 5px"
              :size="16"
              :class="{
                'rotate-clockwise': false,
                'rotate-counterclockwise': !false,
              }"
            />
          </button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn">
                <span>所有状态</span>
                <img
                  v-if="status === ''"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>执行通过</span>
                <img
                  v-if="status === '执行通过'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>错误解答</span>
                <img
                  v-if="status === '错误解答'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>超出内存限制</span>
                <img
                  v-if="status === '超出内存限制'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>超出输出限制</span>
                <img
                  v-if="status === '超出输出限制'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>超出时间限制</span>
                <img
                  v-if="status === '超出时间限制'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>执行出错</span>
                <img
                  v-if="status === '执行出错'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>内部出错</span>
                <img
                  v-if="status === '内部出错'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>编译出错</span>
                <img
                  v-if="status === '编译出错'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>超时</span>
                <img
                  v-if="status === '超时'"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
            </div>
          </template>
        </a-trigger>
        <a-trigger position="bl">
          <button style="width: 92px" class="clean-button">
            <span>所有状态</span>
            <icon-down
              style="margin-left: 5px"
              :size="16"
              :class="{
                'rotate-clockwise': false,
                'rotate-counterclockwise': !false,
              }"
            />
          </button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn">
                <span>所有语言</span>
                <img
                  v-if="true"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>C ++</span>
                <img
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>Java</span>
                <img
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn">
                <span>Python</span>
                <img
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
            </div>
          </template>
        </a-trigger>
        <span
          style="
            width: 100px;
            text-align: left;
            color: #3c3c4399;
            margin-left: 5px;
          "
        >
          执行时间
        </span>
        <span style="width: 100px; text-align: left; color: #3c3c4399">
          消耗内存
        </span>
        <span style="color: #3c3c4399; white-space: nowrap">备注</span>
      </div>
      <div style="display: flex; align-items: flex-end">
        <icon-settings style="color: #3c3c4399" :size="15" />
      </div>
    </div>
    <a-divider style="margin-top: -2px" />
    <div style="margin-top: -20px; overflow: auto; height: 86vh">
      <a-list :bordered="false" :split="false" :data="dataList">
        <template #item="{ item, index }">
          <a-list-item
            :style="{ background: index % 2 === 1 ? '#F7F8FA' : 'transparent' }"
          >
            <div style="display: flex; align-items: center">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  height: 22px;
                  cursor: pointer;
                "
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    margin-top: -8px;
                    width: 170px;
                    height: 37px;
                    margin-left: -4px;
                  "
                >
                  <span
                    v-if="item.judgeInfo.message === 'Accepted'"
                    style="font-size: 14px; color: #2db55d"
                    >通过</span
                  >
                  <span
                    v-else-if="item.judgeInfo.message === 'Wrong Answer'"
                    style="font-size: 14px; color: #ef4743"
                    >错误解答</span
                  >
                  <span v-else style="font-size: 14px; color: #ef4743"
                    >编译错误</span
                  >
                  <span v-if="false" style="font-size: 14px; color: #ef4743"
                    >超出内存限制</span
                  >
                  <span v-if="false" style="font-size: 14px; color: #ef4743"
                    >超出时间限制</span
                  >
                  <span v-if="false" style="font-size: 14px; color: #ef4743"
                    >超出时间限制</span
                  >
                  <span v-if="false" style="font-size: 14px; color: #ef4743"
                    >执行错误</span
                  >
                  <span style="font-size: 13px; color: #262626bf">
                    30秒前
                  </span>
                </div>
                <div style="width: 92px">
                  <a-tag color="gray" style="border-radius: 20px">
                    {{ item.language }}
                  </a-tag>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    margin-left: -5px;
                    width: 100px;
                  "
                >
                  <icon-clock-circle
                    :size="18"
                    style="color: #262626bf; margin-right: 2px"
                  />
                  <span style="font-size: 14px; color: #262626bf">N/A</span>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    margin-left: 5px;
                    width: 100px;
                  "
                >
                  <icon-cpu
                    :size="18"
                    style="margin-right: 2px"
                    color="#5B5B5B"
                  />
                  <span style="font-size: 14px; color: #262626bf">N/A</span>
                </div>
              </div>
              <div>{{ item.remark }}</div>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../request";
import message from "@arco-design/web-vue/es/message";
import { defineProps, ref, watch, watchEffect, withDefaults } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment/moment";
import IconCpu from "@/icon/icon-cpu.vue";

// 设置moment本地化，以适应不同语言环境（可选）
moment.locale("zh-cn"); // 例如，设置为中文

interface Props {
  question?: any;
}

const props = withDefaults(defineProps<Props>(), {
  question: () => [],
});

const router = useRouter();

const store = useStore();

const userName = ref(store.state.user?.loginUser.userName);

const dataList = ref();

const total = ref();

const searchParams = ref<QuestionSubmitQueryRequest>({
  pageSize: 10,
  current: 1,
  userId: store.state.user?.loginUser?.id,
  questionId: props.question?.id,
});

const loadData = async () => {
  //抽屉数据
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  // 题目数据
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
.clean-button {
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  color: #3c3c4399;
}

.clean-button:hover {
  color: #000000;
}

.rotate-clockwise {
  animation: rotateClockwise 0.2s linear forwards;
}

.rotate-counterclockwise {
  animation: rotateCounterclockwise 0.2s linear forwards;
}

@keyframes rotateClockwise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes rotateCounterclockwise {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0);
  }
}

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.transparent-btn {
  width: 169px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.transparent-btn:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
}

.keyword-refer {
  color: #0000008c;
  cursor: pointer;
  white-space: nowrap;
}

.keyword-refer:hover {
  color: black;
}

.highlightjs-code {
  width: 750px;
  margin-top: -10px;
  font-size: 16px; /* 设置字体大小 */
  line-height: 24px;
  overflow: auto;
}

.custom-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #ffffff;
  border: none;
  outline: none;
  margin-left: 5px;
}

.custom-button:hover {
  background-color: #f0f0f0;
}

.time-box-show {
  width: 320px;
  height: 85px;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  color: #1a1a1a;
  background-color: #f5f5f5;
}

.time-box {
  width: 320px;
  height: 85px;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  color: #a3a3a3;
}

.time-box:hover {
  color: #1a1a1a;
}

.time-box-icon-show {
  color: #1a1a1a;
}

.custom-button-two {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #ffffff;
  border: 1px solid #e5e6eb; /* 添加 1px 实线边框 */
  outline: none;
  margin-left: 5px;
}

.custom-button-two:hover {
  background-color: #f0f0f0;
}
</style>
