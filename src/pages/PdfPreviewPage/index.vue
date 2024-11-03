<script lang="ts" setup>
import {ref, nextTick} from "vue";
import appStore from '@/stores/app.ts';
import {storeToRefs} from 'pinia';

const {refreshUuid} = storeToRefs(appStore.useUuidStore);

// 简历模板信息
let TEMPLATE_JSON: IRESUMEJSON;
const getResumeData = async () => {
  // 从本地存储获取简历数据
  TEMPLATE_JSON = JSON.parse(localStorage.getItem('resume_data')) as IRESUMEJSON;
  // 同步数据到store
  appStore.useResumeJsonStore.updateResumeJsonData(TEMPLATE_JSON);
}
getResumeData();

import custom from '@/templates/custom/index.vue';
import IRESUMEJSON from "@/interface/resume";
// 监听内容元素高度变化，绘制分割线
const htmlContentPdf = ref<any>(null);
const html2Pdf = ref<any>(null); // 获取元素节点
let observer: ResizeObserver | null = null;
const resizeDOM = () => {
  observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      html2Pdf.value.style.height = (entry.target as HTMLElement).offsetHeight; // 整个简历的高度
      htmlContentPdf.value.style.height = html2Pdf.value.style.height;
    }
  });
  observer.observe(htmlContentPdf.value); // 监听元素
};

// 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
const contentHeightChange = async () => {
  await nextTick();
  resizeDOM();
};

// 传递给动态组件的参数
const customProps = ref({
  isPreview: true
});
</script>

<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-flex justify="center" align="center">
        <div>
          <a-button type="primary" size="large">预览</a-button>
        </div>
      </a-flex>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-flex justify="center">
        <div :key="refreshUuid" ref="html2Pdf">
          <div ref="htmlContentPdf">
            <component :is="custom" @content-height-change="contentHeightChange" v-bind="customProps"/>
          </div>
        </div>
      </a-flex>
    </a-layout-content>
  </a-layout>
</template>

<style lang="less" scoped>

</style>