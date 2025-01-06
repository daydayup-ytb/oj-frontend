<template>
  <div v-if="isShowedQuestionSubmitList">
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
      <a-list :bordered="false" :split="false" :data="questionSubmitList">
        <template #item="{ item, index }">
          <a-list-item
            :style="{ background: index % 2 === 1 ? '#F7F8FA' : 'transparent' }"
          >
            <div style="display: flex; align-items: center">
              <div
                @click="queryQuestionSubmitVoDetails(item.id)"
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
  <div v-else>
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
        <span class="keyword-refer" @click="queryQuestionSubmitVoList()"
          ><icon-arrow-left
            :size="18"
            style="margin-right: 10px"
          />全部提交记录</span
        >
      </div>
      <div style="display: flex; align-items: flex-end">
        <a-tooltip
          v-if="true"
          background-color="#FFFFFF"
          position="tr"
          :content-style="{
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            borderRadius: '10px',
          }"
        >
          <template #content
            ><span style="color: black; font-size: 13px"
              >复制链接</span
            ></template
          >
          <button
            style="
              display: flex;
              justify-content: center;
              height: 28px;
              width: 28px;
              cursor: pointer;
            "
            class="custom-button"
          >
            <icon-reproduce style="color: #3c3c4399" :size="25" />
          </button>
        </a-tooltip>
        <a-tooltip
          v-else
          background-color="#FFFFFF"
          position="tr"
          :content-style="{
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            borderRadius: '10px',
          }"
        >
          <template #content
            ><span style="color: black; font-size: 13px">已复制</span></template
          >
          <img
            :src="require('@/assets/对号.png')"
            alt=""
            style="margin-right: 5px"
          />
        </a-tooltip>
      </div>
    </div>
    <a-divider style="margin-top: -2px" />
    <div
      style="
        margin-top: -20px;
        overflow-x: hidden; /* 隐藏水平方向的滚动条 */
        overflow-y: auto; /* 在垂直方向上自动显示滚动条，仅当内容溢出时 */
        height: 87vh;
        display: flex;
        justify-content: center;
      "
    >
      <div
        style="width: 750px; height: 800px; padding: 12px 16px; margin: 0 51px"
      >
        <a-space direction="vertical" size="large">
          <div style="width: 409px; height: 44px">
            <span
              v-if="questionSubmit?.judgeInfo?.message == 'Compile Error'"
              style="font-size: 24px; font-weight: bold; color: #f63636"
              >编译出错</span
            >
            <span
              v-if="questionSubmit?.judgeInfo?.message == 'Time Limit Exceeded'"
              style="font-size: 24px; font-weight: bold; color: #f63636"
              >超时时间限制</span
            >
            <span
              v-if="
                questionSubmit?.judgeInfo?.message == 'Memory Limit Exceeded'
              "
              style="font-size: 24px; font-weight: bold; color: #f63636"
              >超时内存限制</span
            >
            <span
              v-if="questionSubmit?.judgeInfo?.message == 'Wrong Answer'"
              style="font-size: 24px; font-weight: bold; color: #f63636"
              >错误解答</span
            >
            <span
              v-if="questionSubmit?.judgeInfo?.message == 'Execution Error'"
              style="font-size: 24px; font-weight: bold; color: #f63636"
              >执行出错</span
            >
            <span
              v-if="questionSubmit?.judgeInfo?.message == 'Accepted'"
              style="font-size: 24px; font-weight: bold; color: #2db55d"
              >通过</span
            >
            <div style="margin-top: 5px">
              <span style="font-size: 13px; margin-right: 5px; margin-left: 5px"
                >张三</span
              >
              <span style="font-size: 13px; color: #0000008c"
                >提交于
                {{
                  moment(questionSubmit?.createTime).format(
                    "YYYY.MM.DD HH:mm:ss"
                  )
                }}</span
              >
            </div>
          </div>
          <div
            v-if="questionSubmit?.judgeInfo?.message == 'Accepted'"
            style="
              overflow: hidden;
              width: 720px;
              min-height: 370px;
              padding: 12px;
              border-radius: 10px;
              border: 1px solid #ebebeb;
            "
          >
            <div
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div
                @click="isShowBox = true"
                :class="{ 'time-box-show': isShowBox, 'time-box': !isShowBox }"
              >
                <div style="display: flex; align-items: center">
                  <icon-clock-circle :size="18" style="margin-right: 5px" />
                  <span>执行用时分布</span>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 20px"
                >
                  <span style="font-size: 18px; font-weight: 550"
                    >{{ questionSubmit?.judgeInfo?.time }}
                  </span>
                  <span style="margin-left: 3px">ms</span>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    margin-top: 8px;
                    font-size: 13px;
                  "
                >
                  <span>击败 {{ timePercentageSum }}% 使</span>
                  <span>用 {{ questionSubmit.language }} 的用户</span>
                </div>
              </div>
              <div
                @click="isShowBox = false"
                :class="{ 'time-box-show': !isShowBox, 'time-box': isShowBox }"
              >
                <div style="display: flex; align-items: center">
                  <icon-dashboard :size="18" style="margin-right: 5px" />
                  <span>消耗内存分布</span>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 20px"
                >
                  <span style="font-size: 18px; font-weight: 550"
                    >{{ questionSubmit?.judgeInfo?.memory }}
                  </span>
                  <span style="margin-left: 3px">MB</span>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    margin-top: 8px;
                    font-size: 13px;
                  "
                >
                  <span>击败 {{ memoryPercentageSum }}% 使</span>
                  <span>用 {{ questionSubmit.language }} 的用户</span>
                </div>
              </div>
            </div>
            <div style="width: 100%" v-if="isShowBox">
              <time-e-charts
                :value="questionSubmit?.judgeInfo?.time"
                :x-data="timeList"
                :series-data="timePercentageList"
                :language="questionSubmit?.language"
              />
              <time-min-e-charts
                style="margin-left: 52px"
                :value="questionSubmit?.judgeInfo?.time"
                :x-data="timeList"
                :series-data="timePercentageList"
              />
            </div>
            <div style="width: 100%" v-else>
              <memory-e-charts
                :value="questionSubmit?.judgeInfo?.memory"
                :x-data="memoryList"
                :series-data="memoryPercentageList"
                :language="questionSubmit?.language"
              />
              <memory-min-e-charts
                style="margin-left: 52px"
                :x-data="memoryList"
                :series-data="memoryPercentageList"
              />
            </div>
          </div>
          <div
            v-if="
              questionSubmit.judgeInfo?.message == 'Compile Error' ||
              questionSubmit.judgeInfo?.message == 'Execution Error'
            "
            style="
              overflow: auto;
              width: 720px;
              min-height: 132px;
              padding: 16px;
              background-color: #f7f7f8;
              border-radius: 10px;
            "
          >
            <span
              v-if="questionSubmit.judgeInfo.message == 'Compile Error'"
              style="color: #262626bf"
              >编译出错信息</span
            >
            <span
              v-if="questionSubmit.judgeInfo.message == 'Execution Error'"
              style="color: #262626bf"
              >执行出错信息</span
            >
            <a-divider :margin="10" />
            <pre style="height: 100%; color: #ef4743; line-height: 21px">{{
              questionSubmit?.judgeInfo?.message
            }}</pre>
          </div>
          <div
            v-if="questionSubmit?.judgeInfo?.message == 'Wrong Answer'"
            style="
              width: 720px;
              min-height: 132px;
              padding: 16px;
              background-color: #f7f7f8;
              border-radius: 10px;
            "
          >
            <span style="color: #262626bf">实际的输出用例</span>
            <a-divider :margin="10" />
            <!--            <p-->
            <!--              style="white-space: pre-line; color: #ef4743"-->
            <!--              v-for="(item, index) in JSON.parse(questionSubmit?.outPut)"-->
            <!--              :key="index"-->
            <!--            >-->
            <!--              {{ item }}-->
            <!--            </p>-->
          </div>
          <div style="border-radius: 10px; background-color: #f6f6f6">
            <div style="padding: 8px 16px">
              <span
                style="font-size: 12px; font-weight: bold"
                v-if="questionSubmit?.language === 'java'"
              >
                Java
              </span>
            </div>
            <div
              style="position: relative"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            >
              <highlightjs
                class="highlightjs-code"
                language="java"
                :code="questionSubmit?.code"
              />
              <div
                style="position: absolute; top: 10px; right: 25px"
                v-if="isShowedCopyButton"
              >
                <a-tooltip
                  v-if="isInitializedCopyButton"
                  background-color="#FFFFFF"
                  position="tr"
                  :content-style="{
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                  }"
                >
                  <template #content
                    ><span style="color: black; font-size: 13px"
                      >复制</span
                    ></template
                  >
                  <button
                    @click="copyCodeToClipboard"
                    style="
                      display: flex;
                      justify-content: center;
                      height: 28px;
                      width: 28px;
                      cursor: pointer;
                    "
                    class="custom-button-two"
                  >
                    <icon-copy style="color: #373737" :size="25" />
                  </button>
                </a-tooltip>
                <a-tooltip
                  v-else
                  background-color="#FFFFFF"
                  position="tr"
                  :content-style="{
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                  }"
                >
                  <template #content
                    ><span style="color: black; font-size: 13px"
                      >已复制</span
                    ></template
                  >
                  <img
                    :src="require('@/assets/对号.png')"
                    alt=""
                    style="margin-right: 5px; margin-top: 5px"
                  />
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
  QuestionSubmitVO,
} from "../../../req/question";
import "highlight.js/lib/common";
import message from "@arco-design/web-vue/es/message";
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment/moment";
import IconCpu from "@/icon/icon-cpu.vue";
import TimeECharts from "@/components/TimeECharts.vue";
import TimeMinECharts from "@/components/TimeMinECharts.vue";
import MemoryECharts from "@/components/MemoryECharts.vue";
import MemoryMinECharts from "@/components/MemoryMinECharts.vue";
import IconReproduce from "@/icon/icon-reproduce.vue";
import MdView from "@/components/MdViewer.vue";

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

const questionSubmitList = ref();

const total = ref();
// 当前提交题目的信息
const questionSubmit = ref<QuestionSubmitVO>({
  code: "",
});
//是否展示题目提交列表
const isShowedQuestionSubmitList = ref(true);
const code = ref<string>();
const analyseData = ref();
const visible = ref(false);
const timeList = ref([]);
const timePercentageList = ref([]);
const memoryList = ref([]);
const memoryPercentageList = ref([]);
const timePercentageSum = ref();
const memoryPercentageSum = ref();
const isShowBox = ref(true);
//是否展示复制按钮
const isShowedCopyButton = ref(false);
//是否初始化复制按钮
const isInitializedCopyButton = ref(true);
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
    questionSubmitList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};

//查看题目提交列表
const queryQuestionSubmitVoList = () => {
  isShowedQuestionSubmitList.value = true;
};

//查看题目提交详情
const queryQuestionSubmitVoDetails = async (id: number) => {
  const res = await QuestionControllerService.getQuestionSubmitVoByIdUsingGet(
    id
  );
  if (res.code === 0 && res.data) {
    isShowedQuestionSubmitList.value = false;
    questionSubmit.value = res.data;
  } else {
    message.error("加载失败：" + res.message);
  }
};

const handleMouseEnter = () => {
  isShowedCopyButton.value = true;
};

const handleMouseLeave = () => {
  isShowedCopyButton.value = false;
};

const copyCodeToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(questionSubmit.value.code as string);
  } catch (err) {
    console.error("Failed to copy: ", err);
    message.error("代码复制失败");
  }

  // 将 isInitializedCopyButton 的值设为 false
  isInitializedCopyButton.value = false;

  // 在 2 秒后将 isInitializedCopyButton 的值恢复为 true
  setTimeout(() => {
    isInitializedCopyButton.value = true;
  }, 2000);
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
.demo-basic {
  margin-top: 4px;
  width: 120px;
  background-color: var(--color-bg-popup);
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

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
  width: 120px;
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
