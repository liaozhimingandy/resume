<script lang="ts" setup>
import {ref} from 'vue';

interface ITitle {
  title?: string;
  showCollapse?: boolean;
}

const pros = withDefaults(defineProps<ITitle>(), {
  title: '模块选择'
});
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style scoped>
</style>