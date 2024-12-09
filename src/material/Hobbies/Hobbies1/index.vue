<script lang="ts" setup>
import {IHOBBIES} from '@/interface/imaterialItems';
import IMaterialStyle from '@/interface/IMaterialStyle';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';
import {computed} from "vue";

const props = defineProps<{
  modelData: IHOBBIES;
  modelStyle: IMaterialStyle; // 模块样式
}>();

const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="hobbies">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 兴趣爱好 -->
    <div>
      <a-typography-text class="content">{{ modelData.content }}</a-typography-text>
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

.content{
  padding-left: 30px;
  padding-top: 8px;
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>