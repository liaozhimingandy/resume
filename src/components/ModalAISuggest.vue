<script lang="ts" setup>
import {ref, computed, CSSProperties, watch, watchEffect, reactive, onMounted} from 'vue';
import {useDraggable} from '@vueuse/core';

import {ArrowLeftOutlined} from "@ant-design/icons-vue";

import axios from "axios";
import {API_ENDPOINTS} from '@/services/api';

// 打开状态
const open = defineModel('open');
const suggest = defineModel("suggest");
const items = reactive([]);
const spinning = ref<boolean>(true);
const props = defineProps<{
  content: String
}>();

const modalTitleRef = ref<HTMLElement>(null);

const {x, y, isDragging} = useDraggable(modalTitleRef);

const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({left: 0, right: 0, top: 0, bottom: 0});
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value;
    transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});


const handleItemClick = (item) => {
  suggest.value += item;
  // 在此可以处理点击后的逻辑，比如展示 item 内容或进行其他操作
};

onMounted(() => {
  //  请求的参数
  const data = {
    "messages": [{
      "role": "user",
      "content": props.content
    }],
    "temperature": 0.95,
    "top_p": 0.7,
    "penalty_score": 1,
    "collapsed": true
  }

  axios.post(API_ENDPOINTS.BD_MODEL_URL, data).then(response => {
    items.push(`<p>${response.data.result}</p>`);
    spinning.value = false;
  })
});

</script>

<template>
  <a-modal ref="modalRef" v-model:open="open" :wrap-style="{ overflow: 'hidden' }" :footer="null">
    <a-spin tip="正在生成..." :spinning="spinning">
      <a-skeleton :loading="spinning" active avatar/>
      <a-list size="small" :data-source="items" :bordered="false">
        <template #renderItem="{ item }">
          <a-list-item class="custom-list-item" @dblclick="handleItemClick(item)">
            <ArrowLeftOutlined/>
            {{ item }}
          </a-list-item>
        </template>
      </a-list>
    </a-spin>
    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">推荐内容</div>
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode"/>
      </div>
    </template>
  </a-modal>
</template>

<style scoped>
.custom-list-item {
  transition: border-color 0.3s ease; /* 动画效果 */
}

.custom-list-item:hover {
  background-color: blue; /* 鼠标移入时，背景变为蓝色 */
  color: white; /* 可选：文本颜色变为白色，提升可读性 */
}
</style>