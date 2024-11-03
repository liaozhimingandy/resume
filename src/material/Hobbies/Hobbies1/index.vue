<script lang="ts" setup>
import {IHOBBIES} from '@/interface/model';
import IMODELSTYLE from '@/interface/modelStyle';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

defineProps<{
  modelData: IHOBBIES;
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
   <div class="hobbies">
     <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
     <!-- 兴趣爱好 -->
    <div class="hobbies-content">
      <p>{{ modelData.content }}</p>
    </div>
   </div>
</template>

<style scoped>
.hobbies {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>