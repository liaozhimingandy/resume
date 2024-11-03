<!-- 全局主题设置 -->

<script lang="ts" setup>
import {computed} from "vue";
import appStore from '@/stores/app';
import {useFontSizeList} from '@/hooks/useFontSizeList';
import ColorPickerCustom from "../components/ColorPicker/ColorPickerCustom.vue";
import {IMATERIALITEM} from "../interface/material";
// 字体大小
const fontSizeList = useFontSizeList();

const {resumeJsonStore} = appStore.useResumeJsonStore;

const fontSizeOptions = computed(() => fontSizeList.map((item,) => {
  return {"value": item, "label": item}
}));
// 字体粗细
const fontWeightList = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((item,) => {
  return {"value": item, "label": item}
});
// 二级标题颜色改变
const secondTitleColorChange = (item: { hex: string; rgba: string }) => {
  resumeJsonStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
    cptItem.style.titleColor = item.hex;
  });
};
// 正文字体颜色发生改变
const textColorChange = (item: { hex: string; rgba: string }) => {
  resumeJsonStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
    cptItem.style.textColor = item.hex;
  });
};

// 二级标题字体粗细
const secondTitleWeightChange = (value: number) => {
  resumeJsonStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
    cptItem.style.titleFontWeight = value;
  });
};

// 正文字体粗细
const textFontWeight = (value: number) => {
  resumeJsonStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
    cptItem.style.textFontWeight = value;
  });
};

// 上外边距
const handleChange = (value: number): void => {
  if (resumeJsonStore.GLOBAL_STYLE) {
    resumeJsonStore.GLOBAL_STYLE.modelMarginTop = value + 'px';
  }
  resumeJsonStore.COMPONENTS.forEach((item) => {
    item.style.mTop = resumeJsonStore.GLOBAL_STYLE.modelMarginTop;
  });
};
// 下外边距
const handleChangeMBottom = (value: number): void => {
  if (resumeJsonStore.GLOBAL_STYLE) {
    resumeJsonStore.GLOBAL_STYLE.modelMarginBottom = value + 'px';
  }
  resumeJsonStore.COMPONENTS.forEach((item) => {
    item.style.mBottom = resumeJsonStore.GLOBAL_STYLE.modelMarginBottom;
  });
};
const handleChangePTop = (value: number): void => {
  if (resumeJsonStore.GLOBAL_STYLE) {
    resumeJsonStore.GLOBAL_STYLE.pTop = value + 'px';
  }
  resumeJsonStore.COMPONENTS.forEach((item) => {
    item.style.pTop = resumeJsonStore.GLOBAL_STYLE.pTop;
  });
};
// 下边距
const handleChangePBottom = (value: number): void => {
  if (resumeJsonStore.GLOBAL_STYLE) {
    resumeJsonStore.GLOBAL_STYLE.pBottom = value + 'px';
  }
  resumeJsonStore.COMPONENTS.forEach((item) => {
    item.style.pBottom = resumeJsonStore.GLOBAL_STYLE.pBottom;
  });
};

// 左右内边距
const handleChangePLeftRight = (value: number): void => {
    if (resumeJsonStore.GLOBAL_STYLE) {
      resumeJsonStore.GLOBAL_STYLE.pLeftRight = value + 'px';
    }
    resumeJsonStore.COMPONENTS.forEach((item) => {
      item.style.pLeftRight = resumeJsonStore.GLOBAL_STYLE.pLeftRight;
    });
  };
</script>

<template>
  <a-form style="padding: 8px">
    <a-form-item label="模块标题字体大小" name="模块标题字体大小">
      <a-select v-model:value="resumeJsonStore.GLOBAL_STYLE.firstTitleFontSize"
                :options='fontSizeOptions'/>
    </a-form-item>
    <a-form-item label="二级标题字体大小" name="二级标题字体大小">
      <a-select v-model:value="resumeJsonStore.GLOBAL_STYLE.secondTitleFontSize"
                :options='fontSizeOptions'/>
    </a-form-item>
    <a-form-item label="正文字体大小" name="正文字体大小">
      <a-select v-model:value="resumeJsonStore.GLOBAL_STYLE.textFontSize"
                :options='fontSizeOptions'/>
    </a-form-item>
    <!-- 字体颜色设置 -->
    <a-form-item label="二级标题颜色" name="二级标题颜色">
      <ColorPickerCustom v-model="resumeJsonStore.GLOBAL_STYLE.secondTitleColor"
                         @change="secondTitleColorChange"></ColorPickerCustom>
    </a-form-item>
    <a-form-item label="正文字体颜色" name="正文字体颜色">
      <ColorPickerCustom v-model="resumeJsonStore.GLOBAL_STYLE.textFontColor"
                         @change="textColorChange"></ColorPickerCustom>
    </a-form-item>
    <!-- 字体粗细设置 -->
    <a-form-item label="二级标题字体粗细" name="二级标题字体粗细">
      <a-select v-model:value="resumeJsonStore.GLOBAL_STYLE.secondTitleWeight"
                :options='fontWeightList' @change="secondTitleWeightChange"/>
    </a-form-item>
    <a-form-item label="正文字体粗细" name="正文字体粗细">
      <a-select v-model:value="resumeJsonStore.GLOBAL_STYLE.textFontWeight"
                :options='fontWeightList' @change="textFontWeight"/>
    </a-form-item>
    <!-- 模块上下边距设置 -->
    <a-form-item label="模块上外边距" name="模块上外边距">
      <a-input-number v-model:value="resumeJsonStore.GLOBAL_STYLE.modelMarginTop"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChange"></a-input-number>
    </a-form-item>
    <a-form-item label="模块下外边距" name="模块下外边距">
      <a-input-number v-model:value="resumeJsonStore.GLOBAL_STYLE.modelMarginBottom"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChangeMBottom"></a-input-number>
    </a-form-item>
    <!-- 模块上内边距 -->
    <a-form-item label="模块上内边距" name="模块上内边距">
      <a-input-number v-model:value="resumeJsonStore.GLOBAL_STYLE.pTop"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChangePTop"></a-input-number>
    </a-form-item>
    <!-- 模块下内边距 -->
    <a-form-item label="模块下内边距" name="模块下内边距">
      <a-input-number v-model:value="resumeJsonStore.GLOBAL_STYLE.pBottom"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChangePBottom"></a-input-number>
    </a-form-item>
<!--    左右内边距-->
    <a-form-item label="左右内边距" name="左右内边距">
      <a-input-number v-model:value="resumeJsonStore.GLOBAL_STYLE.pLeftRight"
                      max="100" min="-100" default-value="0px"
                      :formatter="value => `${value}`"
                      :parser="value => value.replace('px', '')"
                      @change="handleChangePLeftRight"></a-input-number>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>