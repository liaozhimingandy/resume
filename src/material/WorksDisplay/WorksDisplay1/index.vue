<script lang="ts" setup>
import {IWORKSDISPLAY} from '@/interface/model';
import IMODELSTYLE from '@/interface/modelStyle';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

defineProps<{
  modelData: IWORKSDISPLAY;
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
  <div class="works-display">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 作品展示 -->
    <ul>
      <li v-for="(item, index) in modelData.LIST" :key="index">
        <h1>{{ item.worksName }}</h1>
        <a :href="item.worksLink" target="_blank">{{ item.worksLink }}</a>
      </li>
    </ul>
  </div>

</template>

<style scoped>
.works-display {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>