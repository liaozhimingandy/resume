<script lang="ts" setup>
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonOptions from "./CommonOptions.vue";
import ColorPickerCustom from "../components/ColorPicker/ColorPickerCustom.vue";

const activeKey = ref<string>('1');
defineOptions({name: 'RESUME_TITLE_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

</script>
<!-- 简历标题属性配置 -->
<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <a-form>
        <a-form-item label="背景颜色">
          <ColorPickerCustom v-model="modelItem.style.themeColor"></ColorPickerCustom>
        </a-form-item>
      </a-form>
      <a-divider/>
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置">
      <a-form>
        <a-form-item label="标题名称">
          <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
</style>