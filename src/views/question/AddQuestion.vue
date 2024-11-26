<template>
  <div id="addQuestionView">
    <div id="container">
      <a-form :model="question" label-align="right" auto-label-width>
        <a-form-item field="title" label="标题" :style="{ width: '700px' }">
          <a-input
            v-model="question.title"
            allow-clear
            placeholder="请输入标题"
            style="border-radius: 10px"
            size="large"
          />
        </a-form-item>
        <a-form-item field="tags" label="标签" :style="{ width: '700px' }">
          <a-select
            size="large"
            v-model="question.tags"
            placeholder="请选择标签 ..."
            multiple
            style="border-radius: 10px"
          >
            <a-optgroup label="基本">
              <a-option>数组</a-option>
              <a-option>字符串</a-option>
              <a-option>排序</a-option>
              <a-option>矩阵</a-option>
              <a-option>模拟</a-option>
              <a-option>枚举</a-option>
              <a-option>字符串匹配</a-option>
              <a-option>桶排序</a-option>
              <a-option>计数排序</a-option>
              <a-option>基数排序</a-option>
            </a-optgroup>
            <a-optgroup label="算法">
              <a-option>动态规划</a-option>
              <a-option>贪心</a-option>
              <a-option>深度优先搜索</a-option>
              <a-option>二分查找</a-option>
              <a-option>广度优先搜索</a-option>
              <a-option>回溯</a-option>
              <a-option>递归</a-option>
              <a-option>分治</a-option>
              <a-option>记忆化瘦身</a-option>
              <a-option>归并排序</a-option>
              <a-option>快速旋转</a-option>
            </a-optgroup>
            <a-optgroup label="基础数据结构">
              <a-option>哈希表</a-option>
              <a-option>数</a-option>
              <a-option>二叉树</a-option>
              <a-option>栈</a-option>
              <a-option>堆 (优先队列)</a-option>
              <a-option>图</a-option>
              <a-option>链表</a-option>
              <a-option>单调栈</a-option>
              <a-option>有序集合</a-option>
              <a-option>二叉搜索树</a-option>
              <a-option>队列</a-option>
              <a-option>拓扑排序</a-option>
              <a-option>最短路</a-option>
              <a-option>单调队列</a-option>
              <a-option>双向链表</a-option>
              <a-option>最小生成树</a-option>
              <a-option>强连通分量</a-option>
              <a-option>欧拉回路</a-option>
              <a-option>双连通分量</a-option>
            </a-optgroup>
            <a-optgroup label="高级数据结构">
              <a-option>并查集</a-option>
              <a-option>字典树</a-option>
              <a-option>线段树</a-option>
              <a-option>树状数组</a-option>
              <a-option>后缀数组</a-option>
            </a-optgroup>
            <a-optgroup label="技巧">
              <a-option>双指针</a-option>
              <a-option>位运算</a-option>
              <a-option>前缀和</a-option>
              <a-option>滑动窗口</a-option>
              <a-option>计数</a-option>
              <a-option>状态压缩</a-option>
              <a-option>哈希函数</a-option>
              <a-option>滚动哈希</a-option>
              <a-option>扫描线</a-option>
            </a-optgroup>
            <a-optgroup label="数学">
              <a-option>数学</a-option>
              <a-option>数论</a-option>
              <a-option>几何</a-option>
              <a-option>组合</a-option>
            </a-optgroup>
          </a-select>
        </a-form-item>
        <a-form-item
          field="difficulty"
          label="难度"
          :style="{ width: '600px' }"
        >
          <a-radio-group v-model="question.difficulty" :options="options" />
        </a-form-item>
        <a-form-item field="content" label="题目内容">
          <AiEditor
            :value="question.content"
            :handle-change="onContentChange"
          />
        </a-form-item>
        <a-form-item field="answer" label="答案">
          <AiEditor :value="question.answer" :handle-change="onAnswerChange" />
        </a-form-item>
        <a-form-item field="frontendCode" label="前端代码">
          <div>
            <MonacoEditor
              :value="question.initialCode as string"
              :handle-change="onInitialCodeChange"
              style="
                width: 1200px;
                height: 500px;
                border: 1px solid #eeeeee;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </a-form-item>
        <a-form-item field="backendCode" label="判题代码">
          <div>
            <MonacoEditor
              :value="question.judgeCode as string"
              :handle-change="onJudgeCodeChange"
              style="
                width: 1200px;
                height: 500px;
                border: 1px solid #eeeeee;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          label="判题配置"-->
        <!--          :content-flex="false"-->
        <!--          :merge-props="false"-->
        <!--        >-->
        <!--          <a-space direction="vertical" style="min-width: 640px">-->
        <!--            <a-form-item field="judgeConfig.timeLimit" label="时间限制">-->
        <!--              <a-input-number-->
        <!--                v-model="question.judgeConfig.timeLimit"-->
        <!--                placeholder="请输入时间限制"-->
        <!--                mode="button"-->
        <!--                min="0"-->
        <!--                size="large"-->
        <!--                :style="{ width: '150px' }"-->
        <!--              />-->
        <!--            </a-form-item>-->
        <!--            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">-->
        <!--              <a-input-number-->
        <!--                v-model="question.judgeConfig.memoryLimit"-->
        <!--                placeholder="请输入内存限制"-->
        <!--                mode="button"-->
        <!--                min="0"-->
        <!--                size="large"-->
        <!--                :style="{ width: '150px' }"-->
        <!--              />-->
        <!--            </a-form-item>-->
        <!--            <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">-->
        <!--              <a-input-number-->
        <!--                v-model="question.judgeConfig.stackLimit"-->
        <!--                placeholder="请输入堆栈限制"-->
        <!--                mode="button"-->
        <!--                min="0"-->
        <!--                size="large"-->
        <!--                :style="{ width: '150px' }"-->
        <!--              />-->
        <!--            </a-form-item>-->
        <!--          </a-space>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          label="测试用例配置"-->
        <!--          :content-flex="false"-->
        <!--          :merge-props="false"-->
        <!--        >-->
        <!--          <a-button type="primary" shape="round" size="large" @click="doSubmit"-->
        <!--            >添加测试用例-->
        <!--          </a-button>-->
        <!--          <a-form-item-->
        <!--            v-for="(judgeCaseItem, index) of question.judgeCase"-->
        <!--            :key="index"-->
        <!--            no-style-->
        <!--          >-->
        <!--            <a-space direction="vertical" style="min-width: 640px">-->
        <!--              <a-form-item-->
        <!--                :field="`question.judgeCase[${index}].input`"-->
        <!--                :label="`输入用例-${index}`"-->
        <!--                :key="index"-->
        <!--              >-->
        <!--                <a-input-->
        <!--                  v-model="judgeCaseItem.input"-->
        <!--                  placeholder="请输入测试输入用例"-->
        <!--                />-->
        <!--              </a-form-item>-->
        <!--              <a-form-item-->
        <!--                :field="`question.judgeCase[${index}].input`"-->
        <!--                :label="`输出用例-${index}`"-->
        <!--                :key="index"-->
        <!--              >-->
        <!--                <a-input-->
        <!--                  v-model="judgeCaseItem.output"-->
        <!--                  placeholder="请输入测试输出用例"-->
        <!--                />-->
        <!--              </a-form-item>-->
        <!--              <a-button status="danger" @click="handleDelete(index)"-->
        <!--                >删除-->
        <!--              </a-button>-->
        <!--            </a-space>-->
        <!--          </a-form-item>-->
        <!--          <div style="margin-top: 32px">-->
        <!--            <a-button @click="handleAdd" type="outline" status="success"-->
        <!--              >新增测试用例-->
        <!--            </a-button>-->
        <!--          </div>-->
        <!--        </a-form-item>-->
        <div style="margin-top: 16px" />
        <a-form-item>
          <div style="min-width: 200px; z-index: 0">
            <a-button
              type="primary"
              @click="doSubmit"
              size="large"
              style="border-radius: 20px"
              >提交
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../request";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import MonacoEditor from "@/components/MonacoEditor.vue";
import AiEditor from "@/components/AiEditor.vue";

const route = useRoute();
const updatePage = route.path.includes("update");
const question = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  difficulty: 0,
  judgeCode: "",
  initialCode: "",
});

const options = [
  { label: "简单", value: 1 },
  { label: "中等", value: 2 },
  { label: "困难", value: 3 },
];

/**
 * 根据题目id获取老的数据
 */
// const loadData = async () => {
//   const id = route.query.id;
//   if (!id) {
//     return;
//   }
//   const res = await QuestionControllerService.getQuestionByIdUsingGet(
//     id as any
//   );
//   if (res.code === 0) {
//     question.value = res.data as any;
//     //json转js对象
//     if (!question.value.judgeConfig) {
//       question.value.judgeConfig = {
//         memoryLimit: 1200,
//         stackLimit: 1000,
//         timeLimit: 1000,
//       };
//     } else {
//       question.value.judgeConfig = JSON.parse(
//         question.value.judgeConfig as any
//       );
//     }
//     if (!question.value.judgeCase) {
//       question.value.judgeCase = [
//         {
//           input: "1 2 4",
//           output: "3 4 6",
//         },
//       ];
//     } else {
//       question.value.judgeCase = JSON.parse(question.value.judgeCase as any);
//     }
//     if (!question.value.tags) {
//       question.value.tags = [];
//     } else {
//       question.value.tags = JSON.parse(question.value.tags as any);
//     }
//   } else {
//     message.error("加载失败" + res.message);
//   }
// };

onMounted(() => {
  // loadData();
});

const doSubmit = async () => {
  //区分更新还是创建
  // if (updatePage) {
  //   const res = await QuestionControllerService.updateQuestionUsingPost(
  //     question.value
  //   );
  //   if (res.code === 0) {
  //     message.success("更新成功");
  //   } else {
  //     message.error("更新失败" + res.message);
  //   }
  // } else {
  const res = await QuestionControllerService.addQuestionUsingPost(
    question.value
  );
  if (res.code === 0) {
    message.success("创建成功");
  } else {
    message.error("创建失败" + res.message);
  }
  // }

  console.log(question);
};
// const handleAdd = () => {
//   question.value.judgeCase.push({
//     input: "",
//     output: "",
//   });
// };
// const handleDelete = (index: number) => {
//   question.value.judgeCase.splice(index, 1);
// };

const onContentChange = (value: string) => {
  question.value.content = value;
};

const onAnswerChange = (value: string) => {
  question.value.answer = value;
};

const onJudgeCodeChange = (value: string) => {
  question.value.judgeCode = value;
};

const onInitialCodeChange = (value: string) => {
  question.value.initialCode = value;
};
</script>
<style scoped>
#container {
  margin-top: 30px;
  margin-left: 100px;
  max-width: 1500px;
}
</style>
