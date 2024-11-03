<script lang="ts" setup>
import {IAWARDS} from '@/interface/model';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

import IMODELSTYLE from '@/interface/modelStyle';

defineProps<{
  modelData: IAWARDS;
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
  <div class="awards">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 荣誉奖项 -->
    <a-flex justify="space-between" v-for="(item, index) in modelData.LIST" :key="index">
      <!-- 获奖日期 -->
      <span v-show="modelData.isShow.date">{{ item.date }}</span>
      <!-- 奖项名称 -->
      <span v-show="modelData.isShow.awardsName">{{ item.awardsName }}</span>
      <!-- 奖项等级 -->
      <span v-show="modelData.isShow.awardsGrade">{{ item.awardsGrade }}</span>
    </a-flex>
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
}
</style>