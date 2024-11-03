<template>
  <a-layout>
    <!-- 导航栏 -->
    <a-layout-header :style="{'background-color': '#E9EBEE'}">
      <DesignerNav @reset="reset"></DesignerNav>
    </a-layout-header>
    <!-- 内容区域 -->
    <a-layout>
      <!-- 左侧添加模块区域 -->
      <a-layout-sider :style="{'background-color': '#E9EBEE'}" :width="is_collapsed ? 80 : 200">
        <div ref="leftRef" style="height: calc(100vh - 90px)">
          <a-flex justify="center">
            <a-switch v-model:checked="is_collapsed" checked-children="折叠" un-checked-children="展开"/>
          </a-flex>
          <CScrollbar trigger="hover">
            <ModelList :key="refreshUuid" :left-show-status="!is_collapsed"></ModelList>
          </CScrollbar>
        </div>

      </a-layout-sider>
      <!-- 预览区域 -->
      <a-layout-content :style="{'background-color': '#E9EBEE'}">
        <div ref="html2Pdf">
          <a-flex justify="center">
            <div ref="htmlContentPdf" style="width:820px; min-height: 1160px;">
              <component :is="custom" @content-height-change="contentHeightChange"/>
              <!-- 分页线 -->
              <template v-if="linesNumber > 0">
                <div
                    v-for="(item, index) in linesNumber"
                    :ref="(el) => setLinesRef(el, index)"
                    :key="index"
                    class="lines"
                    :style="{ top: `${1128 + 1132 * index}px` }"
                >
                  <a-divider style="border-color: red" dashed>
                    {{ index + 1 }}/{{ linesNumber }}-如果分割线遮挡内容，请通过调整模块上下边距以显示内容!
                  </a-divider>
                </div>
              </template>
            </div>
          </a-flex>
        </div>
      </a-layout-content>
      <!-- 属性设置面板 -->
      <a-layout-sider width="300" :style="{'background-color': '#E9EBEE'}">
        <div :key="refreshUuid" style="height: calc(100vh - 130px);">
          <a-flex justify="center">
            <Title :title="cptTitle==='' ?  'test' : cptTitle"></Title>
          </a-flex>
          <c-scrollbar
              trigger="hover"
              :h-thumb-style="{
            'background-color': 'rgba(0,0,0,0.4)'
          }"
          >
            <!-- 模块样式 -->
            <component
                :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
                v-if="appStore.useSelectMaterialStore.cptName"
                :key="appStore.useSelectMaterialStore.cptKeyId"
            />
            <!-- 全局主题样式设置 -->
            <GlobalStyleOptionsVue v-else />
          </c-scrollbar>
        </div>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {nextTick, ref, onMounted, onBeforeUnmount, onBeforeUpdate} from 'vue';
import appStore from '@/stores/app';
import {storeToRefs} from 'pinia';
import DesignerNav from "./components/DesignerNav.vue";
import IRESUMEJSON from "@/interface/resume";
import {useRoute} from "vue-router";

const {setUuid} = appStore.useUuidStore;
import custom from "../../templates/custom/index.vue";
import cloneDeep from 'lodash/cloneDeep';
import IMPORT_JSON from "../../data/import";
import {CScrollbar} from 'c-scrollbar'; // 滚动条
import ModelList from "./components/ModelList.vue";
import optionsComponents from "../../utils/registerMaterialOptionsCom";
import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
import Title from "./components/Title.vue";

const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore); // 选中的模块标题
const {refreshUuid} = storeToRefs(appStore.useUuidStore);
const route = useRoute();
const {id} = route.query; // 模板id和模板名称

const is_collapsed = ref<boolean>(false);

// 查询简历数据，有草稿返回草稿，没有草稿返回简历数据
const resetStoreAndLocal = (isReset = false) => {
  let TEMPLATE_JSON: IRESUMEJSON;
  let data;
  // 如果是重置操作
  if (isReset) {
    data = cloneDeep(IMPORT_JSON);
    setUuid();
  } else {
    // 从本地存储中获取
    const store_local = localStorage.getItem('resume_data');
    if (store_local) {
      data =  JSON.parse(store_local);
    } else {
      data = cloneDeep(IMPORT_JSON);
      // 重置模板uuid
      setUuid();
    }
  }
  TEMPLATE_JSON =data as IRESUMEJSON;
  // 修改store的内容
  appStore.useResumeJsonStore.updateResumeJsonData(TEMPLATE_JSON);
}

resetStoreAndLocal();


// 属性设置
const {resetSelectModel} = appStore.useSelectMaterialStore;
// 全局样式设置
const globalStyleSetting = () => {
  // 重置store选中模块
  resetSelectModel();
};

// 导出pdf
const html2Pdf = ref<any>(null); // 获取元素节点
let lineRefs: Array<any> = []; // 分割线的ref
const setLinesRef = (el: any, index: number) => {
  if (el) {
    if (linesNumber.value === index + 1) {
      el.style.top = linesNumber.value * 1160 + 'px'; // 最后一条分割线出现在底部
    }
    lineRefs.push(el);
  }
};

// 监听内容元素高度变化，绘制分割线
const htmlContentPdf = ref<any>(null);
let observer: ResizeObserver | null = null;
let height = 0;
let linesNumber = ref<number>(0);
const resizeDOM = () => {
  observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      height = (entry.target as HTMLElement).offsetHeight;
      linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
      html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
      htmlContentPdf.value.style.height = html2Pdf.value.style.height;
    }
  });
  observer.observe(htmlContentPdf.value); // 监听元素
};

// 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
const contentHeightChange = async (height: number) => {
  htmlContentPdf.value.style.height = height + 'px';
  await nextTick();
  resizeDOM();
  // console.log('子组件内容高度发生变化---需要重新计算高度', htmlContentPdf.value.style.height);
};

// 生命周期函数
onMounted(async () => {
  resizeDOM();
  initClickListen();
  await nextTick();
});
onBeforeUnmount(() => {
  observer?.disconnect();
});
onBeforeUpdate(() => {
  lineRefs = [];
});
onBeforeUnmount(() => {
  window.removeEventListener('click', dealClick);
});
// 点击其它区域，取消模块选择，即取消模块选中效果
const initClickListen = () => {
  window.addEventListener('click', dealClick);
};
const dealClick = (e: MouseEvent) => {
  const bool = getTargetNode(htmlContentPdf.value, e.target);
  if (bool) {
    globalStyleSetting();
  }
};
const getTargetNode = (ele: any, target: any): boolean => {
  if (!ele || ele === document) return false;
  return ele === target ? true : getTargetNode(ele.parentNode, target);
};

// 重置数据
const reset = async () => {
  resetStoreAndLocal(true); // 重置store数据
  globalStyleSetting(); // 重置选中模块
  setUuid(); // 重新渲染左侧列表和右侧属性面板设置
  await nextTick();
  resizeDOM();
};

</script>
<style scoped>
.lines {
  z-index: 10;
  width: 820px;
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;

}
</style>