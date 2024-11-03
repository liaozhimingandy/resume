<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import draggable from 'vuedraggable';

// store相关数据
import appStore from '@/stores/app';
import MaterialComponents from '@/utils/registerMaterialCom';
import ModelBox from "./ModelBox.vue";
import {storeToRefs} from "pinia"; // 所有物料组件
const {resumeJsonStore} = storeToRefs(appStore.useResumeJsonStore);
defineOptions({name: 'custom'});
const emit = defineEmits(['contentHeightChange']);

/**
 * 左右两列布局
 */
// 左侧列表
const leftList = ref<any>([]);
// 右侧列表
const rightList = ref<any>([]);
if (resumeJsonStore.LAYOUT === 'leftRight') {
  leftList.value = resumeJsonStore.COMPONENTS.filter((item) => item.layout === 'left');
  rightList.value = resumeJsonStore.COMPONENTS.filter((item) => item.layout === 'right');
}

// 监听内容高度发生变化
const customContentPdf = ref<any>(null);
let observer: ResizeObserver | null = null;
let height = 0;
const changeHeight = () => {
  observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      height = (entry.target as HTMLElement).offsetHeight;
      emit('contentHeightChange', height);
    }
  });
  observer.observe(customContentPdf.value); // 监听元素
};

// 设置组件属性
withDefaults(defineProps<{
  isPreview?: Boolean, // 声明 isPreview 为布尔类型
}>(), {
  isPreview: false, // 默认值为 false
});


// 生命周期函数
onMounted(() => {
  changeHeight();
});

</script>

<template>
  <div ref="customContentPdf" class="content-box">
    <!-- 传统上下布局 -->
    <template v-if="resumeJsonStore.LAYOUT === 'classical'">
      <draggable
          class="dragArea list-group"
          :list="resumeJsonStore.COMPONENTS"
          animation="500"
          group="custom"
          :sort="true"
          item-key="id"
          :disabled="isPreview"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <ModelBox :components="MaterialComponents" :item="element" :is-preview="isPreview"></ModelBox>
          </div>
        </template>
      </draggable>
    </template>
  </div>
</template>

<style scoped>
.content-box {
  .dragArea {
    min-width: 820px;
    width: 820px;
    min-height: 300px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
  }
}

.left-box {
  width: v-bind('resumeJsonStore.GLOBAL_STYLE.leftWidth');
  box-sizing: border-box;
  background-color: v-bind('resumeJsonStore.GLOBAL_STYLE.leftThemeColor');
  min-height: 1160px;
  position: absolute;
  height: 100%;

  .left-drag-area {
    min-height: 1160px;
    width: 100%;
  }
}

.right-box {
  min-height: 1160px;
  width: v-bind('resumeJsonStore.GLOBAL_STYLE.rightWidth');
  margin-left: v-bind('resumeJsonStore.GLOBAL_STYLE.leftWidth');
  background-color: v-bind('resumeJsonStore.GLOBAL_STYLE.rightThemeColor');

  .right-drag-area {
    min-height: 1160px;
    width: 100%;
  }
}

</style>