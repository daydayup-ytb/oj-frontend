<template>
  <div id="exampleView">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    {{ codeValue }}
    <CodeEditor :value="codeValue" :handle-change="handleCodeChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue"; // @ is an alias to /src

const mdValue = ref();
const codeValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
const handleCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
</script>
