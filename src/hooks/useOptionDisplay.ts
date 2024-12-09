import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// @ts-ignore
import appStore from '@/stores/app.ts';

export function useOptionDisplay(component_id: string) {
  // 引用 store 的状态
  const { resumeJsonStore } = storeToRefs(appStore.useResumeJsonStore);

  // 计算属性：根据 component_id 查找匹配的组件项
  const modelItem = computed(() => {
    return resumeJsonStore.value.COMPONENTS.find((item) => item["keyId"] === component_id);
  });



  return {
    modelItem,
  };
}