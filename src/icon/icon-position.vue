<template>
  <svg
    t="1711684394651"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6657"
    :width="size"
    :height="size"
  >
    <path
      d="M629.824 256H394.176a32 32 0 0 1-31.232-25.152l-42.176-192A32 32 0 0 1 352 0h320a32.128 32.128 0 0 1 31.296 38.912l-42.176 192A32.192 32.192 0 0 1 629.824 256z m-209.92-64h184.128l28.096-128H391.808l28.096 128zM512 1024a32.192 32.192 0 0 1-23.616-10.368l-224-244.416a32.128 32.128 0 0 1-7.68-28.352l85.568-395.584A32 32 0 0 1 373.568 320h276.864a32 32 0 0 1 31.232 25.28l85.568 395.584a31.808 31.808 0 0 1-7.68 28.352l-224 244.416A31.936 31.936 0 0 1 512 1024z m-189.248-285.888L512 944.64l189.248-206.528L624.64 384H399.36l-76.608 354.112z"
      p-id="6658"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IIconProps {
  size?: string | number;
  color?: string;
}

withDefaults(defineProps<IIconProps>(), {
  size: 16,
  color: "#333333",
});
</script>

<style scoped></style>
