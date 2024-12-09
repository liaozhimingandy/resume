<script lang="ts" setup>
import {ICUSTOM1} from '@/interface/imaterialItems';
import IMaterialStyle from '@/interface/IMaterialStyle';

import {GlobalOutlined, FileDoneOutlined, EditOutlined} from '@ant-design/icons-vue';

defineProps<{
  modelData: ICUSTOM1;
  modelStyle: IMaterialStyle; // 模块样式
}>();

defineOptions({name: 'CUSTOM_OPTIONS'});
</script>

<template>
  <div class="resume-title-word-box">
    <a-row align="middle">
      <a-col :span="16">
        <a-space align="baseline" style="padding-left: 16px">
          <a-typography-title >{{ modelData.name }} |</a-typography-title>
          <a-typography-text>{{ modelData.abstract }}</a-typography-text>
        </a-space>
      </a-col>
      <a-col :span="8" style="text-align: center">
        <a-space style="font-size: 28px" :size="18">
          <FileDoneOutlined></FileDoneOutlined>
          <GlobalOutlined />
          <EditOutlined />
        </a-space>
      </a-col>
    </a-row>
    <a-row :justify="12">
      <a-col :flex="3" class="left"/>
      <a-col :flex="2" class="right"/>
    </a-row>
  </div>
</template>

<style scoped>
.resume-title-word-box{
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
  color: v-bind('modelStyle.themeColor')
}

.left {
  height: 30px;
  background-color: v-bind('modelStyle.themeColor');
  background: linear-gradient(-45deg, transparent 20px, v-bind('modelStyle.themeColor') 0) top right;
}

.right {
  height: 25px;
  background-color: v-bind('modelStyle.textColor');
  background: linear-gradient(135deg, transparent 18px, v-bind('modelStyle.textColor') 0) top left;
}
</style>