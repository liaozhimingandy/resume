<script lang="ts" setup>
import {IAWARDS} from '@/interface/imaterialItems';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

import IMaterialStyle from '@/interface/IMaterialStyle';
import {computed} from "vue";

const props = defineProps<{
  modelData: IAWARDS;
  modelStyle: IMaterialStyle; // 模块样式
}>();

const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="awards">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 荣誉奖项 -->
    <div class="content">
      <a-flex justify="space-between" v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 获奖日期 -->
        <a-typography-text v-show="modelData.isShow.date" class="info">{{ item.date }}</a-typography-text>
        <!-- 奖项名称 -->
        <a-typography-text v-show="modelData.isShow.awardsName" class="info">{{ item.awardsName }}</a-typography-text>
        <!-- 奖项等级 -->
        <a-typography-text v-show="modelData.isShow.awardsGrade" class="info">{{ item.awardsGrade }}</a-typography-text>
      </a-flex>
    </div>
  </div>
</template>

<style scoped>
.awards {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: v-bind('modelStyle.themeColor');
    left: v-bind('left');
    top: 5px;
  }
}

.content {
  padding-left: 30px;
  padding-top: 8px;

}

.info {
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>