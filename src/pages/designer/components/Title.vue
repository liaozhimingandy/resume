<script lang="ts" setup>

interface ITitle {
  title?: string;
  showCollapse?: boolean;
}

withDefaults(defineProps<ITitle>(), {
  title: '模块选择'
});
</script>

<template>
  <a-typography-text>{{ title }}</a-typography-text>
</template>

<style scoped>
</style>