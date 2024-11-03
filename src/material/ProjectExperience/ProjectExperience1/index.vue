<script lang="ts" setup>
import {IPROJECTEXPERIENCE} from '@/interface/model';
import IMODELSTYLE from '@/interface/modelStyle';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

defineProps<{
  modelData: IPROJECTEXPERIENCE;
  modelStyle: IMODELSTYLE; // 模块样式
}>();

</script>

<template>
  <div class="project-experience">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!--项目经验-->
    <!-- 校园经历 -->

    <div v-for="(item, index) in modelData.LIST" :key="index">
      <a-flex justify="space-between">
        <!-- 经历时间 -->
        <div class="list-title"> {{ item.date }}</div>
        <!-- 公司名称 -->
        <div class="list-title">{{ item.projectName }}</div>
        <!-- 主要职责 -->
        <div class="list-title">{{ item.posts }}</div>
      </a-flex>
      <!-- 简述 -->
      <a-flex justify="flex-start" align="start">
        <h4>项目内容</h4>
        <ul>
          <li v-for="(list, j) in item.projectContent" :key="j">{{ list.content }}</li>
        </ul>
      </a-flex>
    </div>
  </div>
</template>

<style scoped>
.project-experience {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>