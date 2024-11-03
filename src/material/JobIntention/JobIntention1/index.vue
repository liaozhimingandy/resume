<script lang="ts" setup>

import {IJOBINTENTION} from "../../../interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue"

defineOptions({
  name: 'JOB_INTENTION_1'
});

const props = defineProps<{
  modelData: IJOBINTENTION; // 模块数据
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
  <div class="job-intention">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <slot name="ModelTitle"></slot>
    <!-- 求职意向 -->
    <!-- 求职类型 -->
    <a-flex justify="space-between" style="margin-top: 8px">
      <a-typography-text v-show="modelData.isShow.jobSearchType" class="info">{{ modelData.jobSearchType }}</a-typography-text>
      <!-- 意向岗位 -->
      <a-typography-text v-show="modelData.isShow.intendedPositions" class="info">{{ modelData.intendedPositions }}</a-typography-text>
     <!-- 意向城市 -->
      <a-typography-text v-show="modelData.isShow.intendedCity" class="info">{{ modelData.intendedCity }}</a-typography-text>
       <!-- 期望薪资 -->
      <a-typography-text v-show="modelData.isShow.expectSalary" class="info">{{ modelData.expectSalary }}</a-typography-text>
      <!-- 求职状态 -->
      <a-typography-text v-show="modelData.isShow.jobStatus" class="info">{{ modelData.jobStatus }}</a-typography-text>
    </a-flex>
  </div>
</template>

<style scoped>
.job-intention {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  margin-top: v-bind('modelStyle.mTop');
  margin-bottom: v-bind('modelStyle.mBottom');
}

.info {
  font-size: v-bind('modelStyle.textFontSize');
  color: v-bind('modelStyle.textColor');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>