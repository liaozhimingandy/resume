<script lang="ts" setup>
import {ISELFEVALUATION} from "../../../interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';

defineOptions({
  name: 'SELF_EVALUATION_1'
});

const props = defineProps<{
  modelData: ISELFEVALUATION; // 模块数据
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
 <div class="self-eavluation">
  <!-- 标题 -->
   <ModelTitle :title="modelData.title" :model-style="modelStyle"/>
   <!-- 兴趣爱好 -->
  {{ modelData.content }}
 </div>
</template>

<style scoped>
.self-eavluation {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>