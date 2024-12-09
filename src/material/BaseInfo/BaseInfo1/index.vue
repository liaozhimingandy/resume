<script lang="ts" setup>
import {computed, reactive} from "vue";

import {IBASEINFO} from "@/interface/imaterialItems";
import IMaterialStyle from "@/interface/IMaterialStyle";
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

defineOptions({
  name: 'BASE_INFO_1'
});

const props = defineProps<{
  modelData: IBASEINFO; // 模块数据
  modelStyle: IMaterialStyle; // 模块样式
}>();

const isShow = reactive(props.modelData.isShow);
const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <!-- 个人头像 -->
  <div class="base-info">
    <!-- 模块标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <div style="padding-left: 30px;">
      <a-row align="middle">
        <a-col :span="16">
          <a-typography-title class="name">{{ modelData.name }}</a-typography-title>
          <!-- 一句话简介 -->
          <a-typography-text v-show="isShow.abstract" class="content">{{ modelData.abstract }}</a-typography-text>
          <!-- 年龄、地点、经验等信息 -->
          <a-space class="content">
            <div v-show="isShow.age" class="li-border">{{ modelData.age }}岁</div>
            <span>|</span>
            <div v-show="isShow.address" class="li-border">{{ modelData.address }}</div>
            <span>|</span>
            <div v-show="isShow.workService" class="li-border">{{ modelData.workService }}年经验</div>
            <span>|</span>
            <div v-show="isShow.phoneNumber" class="li-border">{{ modelData.phoneNumber }}</div>
            <span>|</span>
            <div v-show="isShow.email">{{ modelData.email }}</div>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: center">
            <a-avatar v-show="modelData.isShow.avatar" style="width: 115px; height: 115px" :src="modelData.avatar"/>
        </a-col>
      </a-row>
    </div>
  </div>

</template>

<style scoped>
.base-info {
  width: 100%;
  box-sizing: border-box;
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
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

  .name{
    font-size: v-bind('modelStyle.titleFontSize');
    color: v-bind('modelStyle.titleColor');
    font-weight: v-bind('modelStyle.titleFontWeight');
  }

  .content{
    font-size: v-bind('modelStyle.textFontSize');
    color: v-bind('modelStyle.textColor');
    font-weight: v-bind('modelStyle.textFontWeight');
  }
}
</style>