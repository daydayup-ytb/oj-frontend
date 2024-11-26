<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 300px; height: 48vh"
  ></div>
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

/**
 * 定义组件类型
 */
interface Props {
  val: string;
  language: string;
  handleChange: (v: string) => void;
}

const codeEditorRef = ref();
const codeEditor = ref();

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  val: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.val,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });
  //设置主题
  monaco.editor.defineTheme("my-theme", {
    base: "vs",
    inherit: true, // 是否继承默认主题的样式
    rules: [
      { token: "comment", foreground: "#098658", fontStyle: "italic" }, // 注解颜色
      { token: "keyword", foreground: "#0000FF" }, // 关键字颜色
      { token: "Stings", foreground: "#af00d8" }, // 字符串
      { token: "type.identifier", foreground: "#267f99" },
      { token: "keyword.escape", foreground: "#267f99" }, // 自定义
      { token: "brackets", foreground: "#FFFFFF" }, // annotation
      { token: "annotation", foreground: "#1EBA40" }, // 注解
      { token: "number.float", foreground: "#098658" }, // 浮点数
      { token: "number.hex", foreground: "#098658" }, // 十六进制数
      { token: "number", foreground: "#098658" }, // 十六进制数
      { token: "delimiter", foreground: "#000000" }, // 分隔符
      { token: "operator", foreground: "#000000" }, // 符号
      { token: "string.invalid", foreground: "#a31515" }, // 无效字符
      { token: "string.quote", foreground: "#a31515" }, // 字符串的引号字符
      { token: "type", foreground: "#a31515" },
      { token: "identifier", foreground: "#000000" },
    ],
    colors: {
      "editor.background": "#FFFFFF", // 背景颜色
      "editor.foreground": "#262626", // 字体颜色
      "editorCursor.foreground": "#262626", // 光标颜色
      // "editor.lineHighlightBackground": "#transparent", //  当前行背景颜色
      "editorLineNumber.foreground": "#02B128", // 行号颜色
      "editor.selectionBackground": "#ADD6FF", // 选中的内容颜色
    },
  });
  monaco.editor.setTheme("my-theme");
  //编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});

watch(
  () => [props.val, props.language],
  () => {
    // if (codeEditor.value) {
    //   monaco.editor.setModelLanguage(
    //     toRaw(codeEditor.value).getModel(),
    //     props.language
    //   );
    // }
    monaco.editor.setModelLanguage(
      toRaw(codeEditor.value).getModel(),
      props.language
    );
    if (codeEditor.value && toRaw(codeEditor.value).getValue() !== props.val) {
      toRaw(codeEditor.value).setValue(props.val);
    }
  }
);
</script>
<style scoped></style>
