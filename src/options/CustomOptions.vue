<script lang="ts" setup>
import {ref} from "vue";
import CommonOptions from "./CommonOptions.vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonTitleOptions from "./CommonTitleOptions.vue";

const activeKey = ref<string>('1');
defineOptions({name: 'CUSTOM_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <CommonTitleOptions color-label="姓名字体颜色" font-size-label="姓名字体大小" font-weight-label="姓名字体粗细"/>
      <a-divider/>
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置">
      <a-form style="padding: 8px;">
        <a-form-item label="名称">
          <a-input v-model:value="modelItem.data.name"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="modelItem.data.abstract"/>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>