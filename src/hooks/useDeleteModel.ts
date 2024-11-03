/**
 * @description 删除或关闭当前模块
 */

// @ts-ignore
import appStore from "@/stores/app";

// 删除当前模块
export const useDeleteModel = (modelItem: any) => {
  const { resumeJsonStore } = appStore.useResumeJsonStore;
  let index = resumeJsonStore.COMPONENTS.findIndex((item) => item.keyId === modelItem.keyId); // 需要复制的模块的索引
  let sum: number = 0; // 是否有相同的模块
  resumeJsonStore.COMPONENTS.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    resumeJsonStore.COMPONENTS.splice(index, 1);
  } else {
    resumeJsonStore.COMPONENTS[index].show = false;
  }
};
