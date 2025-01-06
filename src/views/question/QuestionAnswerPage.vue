<template>
  <MdView :value="props.question.answer" style="padding: 0 20px" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import MdView from "@/components/MdViewer.vue";

interface Props {
  question?: any;
}

const props = withDefaults(defineProps<Props>(), {
  question: () => [],
});
</script>

<style scoped></style>
