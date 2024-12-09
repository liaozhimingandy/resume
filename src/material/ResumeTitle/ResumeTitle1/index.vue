<script lang="ts" setup>
import {IRESUMETITLE} from '@/interface/imaterialItems';
import IMaterialStyle from '@/interface/IMaterialStyle';

defineProps<{
  modelData: IRESUMETITLE;
  modelStyle: IMaterialStyle; // 模块样式
}>();
</script>

<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ modelData.title }}</div>
  </div>
</template>

<style scoped>
.title {
    width: 100%;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    min-height: 32px;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    background-color: v-bind('modelStyle.themeColor');
    display: flex;
    .left {
      min-height: 32px;
      width: 54px;
      background-color: #027AFF;
      margin-right: 0;
    }

    .editor-resume {
      color: v-bind('modelStyle.textColor');
      outline: none;
      font-weight: v-bind('modelStyle.textFontWeight');
      font-size: v-bind('modelStyle.textFontSize');
      letter-spacing: 2px;
      word-break: break-all;
      width: 0;
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
</style>