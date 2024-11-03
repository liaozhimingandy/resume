<script lang="ts" setup>
import {IEDUBACKGROUND} from "../../../interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";

defineProps<{
  modelData: IEDUBACKGROUND;
  modelStyle: IMODELSTYLE; // 模块样式
}>();

</script>

<template>
  <div class="edu-background">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 教育背景 -->
    <div v-for="(education, index) in modelData.LIST" >
      <a-flex justify="space-between" align="flex-start">
        <a-typography-text v-show="modelData.isShow.date" class="info">{{ education.date }}</a-typography-text>
        <a-typography-text v-show="modelData.isShow.schoolName" class="info">{{ education.schoolName }}</a-typography-text>
        <a-typography-text v-show="modelData.isShow.majorCourse" class="info">{{ education.majorCourse }}</a-typography-text>
        <a-typography-text v-show="modelData.isShow.degree" class="info">{{ education.degree }}</a-typography-text>
      </a-flex>
    </div>
  </div>
</template>

<style scoped>
.edu-background {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}

.info {
  width: auto;
  font-size: v-bind('modelStyle.titleFontSize');
  color: v-bind('modelStyle.titleColor');
  font-weight: v-bind('modelStyle.titleFontWeight');
}
</style>