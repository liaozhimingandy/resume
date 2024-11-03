<script lang="ts" setup>
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";

defineProps<{
  modelData: IWORKEXPERIENCE;
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
  <div class="work-experience">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <div v-for="(item, index) in modelData.LIST" :key="index" class="list">
      <a-flex justify="space-between">
        <!-- 经历时间 -->
        <div v-if="modelData.isShow.date" class="list-title">{{ item.date }}</div>
        <!-- 公司名称 -->
        <div v-if="modelData.isShow.companyName" class="list-title">{{ item.companyName }}</div>
        <!-- 主要职责 -->
        <div v-if="modelData.isShow.posts" class="list-title">{{ item.posts }}</div>
      </a-flex>
      <!-- 简述 -->
      <a-flex justify="flex-start" align="start">
        <h4>工作内容</h4>
        <ul>
          <li v-for="(content, key) in item.jobContent" :key="key">{{ content.content }}</li>
        </ul>
      </a-flex>
    </div>
  </div>

</template>

<style scoped>
.work-experience {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>