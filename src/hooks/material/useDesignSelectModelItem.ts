// @ts-ignore
import appStore from '@/stores/app';
import { storeToRefs } from 'pinia';

// 获取选中的组件数据
const useDesignSelectModelItem = () => {
  // 选中的模块
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore);
  const { resumeJsonStore } = storeToRefs(appStore.useResumeJsonStore);
  const modelItem = resumeJsonStore.value.COMPONENTS.find((item) => item.keyId === cptKeyId.value); // 通过keyId获取选中的模块

  return {
    modelItem
  };
};
export default useDesignSelectModelItem;
