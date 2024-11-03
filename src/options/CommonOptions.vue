<script lang="ts" setup>

import ColorPickerCustom from "../components/ColorPicker/ColorPickerCustom.vue";
import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
import {useFontSizeList} from "../hooks/useFontSizeList.js";
import {computed} from "vue";

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


// 上外边距
const handleChange = (value: number): void => {
    modelItem.style.modelMarginTop = value + 'px';
};
// 下外边距
const handleChangeMBottom = (value: number): void => {
    modelItem.style.modelMarginBottom = value + 'px';
};
const handleChangePTop = (value: number): void => {
    modelItem.style.pTop = value + 'px';
};
// 下边距
const handleChangePBottom = (value: number): void => {
    modelItem.style.pBottom = value + 'px';
};

// 左右内边距
const handleChangePLeftRight = (value: number): void => {
      modelItem.style.pLeftRight = value + 'px';
  };
</script>

<template>
  <a-form style="padding: 8px">
    <a-form-item label="字体颜色">
      <ColorPickerCustom v-model="modelItem.style.textColor"/>
    </a-form-item>
    <a-form-item label="字体大小">
      <a-select v-model:value="modelItem.style.textFontSize" :options='fontSizeOptions'/>
    </a-form-item>
    <!-- 字体粗细设置 -->
    <a-form-item label="字体粗细">
      <a-select v-model:value="modelItem.style.textFontWeight" :options='fontWeightList'/>
    </a-form-item>
    <!-- 模块上下边距设置 -->
    <a-form-item label="模块上外边距">
      <a-input-number v-model:value="modelItem.style.modelMarginTop"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      style="width: 100%"
                      @change="handleChange"></a-input-number>
    </a-form-item>
    <a-form-item label="模块下外边距">
      <a-input-number v-model:value="modelItem.style.modelMarginBottom"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      style="width: 100%"
                      @change="handleChangeMBottom"></a-input-number>
    </a-form-item>
    <!-- 模块上内边距 -->
    <a-form-item label="模块上内边距">
      <a-input-number v-model:value="modelItem.style.pTop"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      style="width: 100%"
                      @change="handleChangePTop"></a-input-number>
    </a-form-item>
    <!-- 模块下内边距 -->
    <a-form-item label="模块下内边距">
      <a-input-number v-model:value="modelItem.style.pBottom"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChangePBottom"
                      style="width: 100%"
      ></a-input-number>
    </a-form-item>
    <!--    左右内边距-->
    <a-form-item label="左右内边距">
      <a-input-number v-model:value="modelItem.style.pLeftRight" max="100" min="-100"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      style="width: 100%"
                      @change="handleChangePLeftRight"></a-input-number>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>