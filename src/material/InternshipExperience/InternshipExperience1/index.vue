<script lang="ts" setup>
// 实习经验

import {IINTERNSHIPEXPERIENCE} from "@/interface/imaterialItems";
import IMaterialStyle from "@/interface/IMaterialStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";
import {computed} from "vue";

const props = defineProps<{
  modelData: IINTERNSHIPEXPERIENCE;
  modelStyle: IMaterialStyle; // 模块样式
}>();
const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 校园经历 -->
    <div class="content">
      <div v-for="(item, index) in modelData.LIST" :key="index">
        <a-row>
          <a-col :span="6">
            <a-typography-title class="info">{{ item.date[0] }} - {{ item.date[1] }}</a-typography-title>
          </a-col>
          <a-col :span="12">
            <a-typography-title class="info">{{ item.companyName }}</a-typography-title>
          </a-col>
          <a-col :span="6">
            <a-typography-title class="info">{{ item.posts }}</a-typography-title>
          </a-col>
        </a-row>
        <ul>
          <li v-for="content in item.jobContent">
            <a-typography-text class="info">{{ content.content }}</a-typography-text>
          </li>
        </ul>
        <a-divider v-if="index+1<modelData.LIST.length" class="divider" :dashed="false"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.internship-experience {
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
}

.divider {
  height: 1px;
  background-color: v-bind('modelStyle.themeColor');
  margin: 2px 0
}

.info {
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>