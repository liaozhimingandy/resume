<script lang="ts" setup>
import {reactive, computed} from "vue";

import {useFontSizeList} from "@/hooks/useFontSizeList";
import useDesignSelectModelItem from "@/hooks/material/useDesignSelectModelItem";
import ColorPickerCustom from "../components/ColorPicker/ColorPickerCustom.vue";

interface IProps {
  colorLabel?: string;
  fontSizeLabel?: string;
  fontWeightLabel?: string;
}

withDefaults(defineProps<IProps>(), {
  colorLabel: '标题字体颜色',
  fontSizeLabel: '标题字体大小',
  fontWeightLabel: '标题字体粗细'
});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();
// 字体大小
const fontSizeList = useFontSizeList();
const fontSizeOptions = computed(() => fontSizeList.map((item,) => {
  return {"value": item, "label": item}
}));
// 字体粗细
const fontWeightList = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((item,) => {
  return {"value": item, "label": item}
});

</script>

<template>
  <a-form>
    <a-form-item :label="colorLabel">
      <ColorPickerCustom v-model:modelValue="modelItem.style.titleColor"/>
    </a-form-item>
    <a-form-item :label="fontSizeLabel">
      <a-select v-model:value="modelItem.style.titleFontSize" :options='fontSizeOptions'/>
    </a-form-item>
    <a-form-item :label="fontWeightLabel">
      <a-select v-model:value="modelItem.style.titleFontWeight" :options='fontWeightList'/>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>