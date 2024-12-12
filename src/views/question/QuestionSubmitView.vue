<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题号">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题号"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="language" label="编程语言">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="doSubmit"
          >搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../req/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    console.log(res.data);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};

/**
 * 监听searchParams变量发生改变时,触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});
/**
 *
 */
const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目编号",
    dataIndex: "questionId",
  },
  {
    title: "用户编号",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];
const router = useRouter();

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doSubmit = () => {
  //修改searchParams改变，被watchEffect监听到触发loadData
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
<style scoped>
#questionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
