<script lang="ts" setup>
import {IWORKSDISPLAY} from '@/interface/imaterialItems';
import IMaterialStyle from '@/interface/IMaterialStyle';
import ModelTitle from '../../ModelTitle/ModelTitle1/index.vue';
import {computed} from "vue";

const props = defineProps<{
  modelData: IWORKSDISPLAY;
  modelStyle: IMaterialStyle; // 模块样式
}>();

const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="works-display">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 作品展示 -->
    <div class="content">
      <ul>
        <li v-for="(item, index) in modelData.LIST" :key="index">
          <a-typography-text class="info">{{ item.worksName }}</a-typography-text>
          <a :href="item.worksLink" target="_blank" class="info">{{ item.worksLink }}</a>
        </li>
      </ul>
    </div>
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
  padding-top: 8px;
}

.info {
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>