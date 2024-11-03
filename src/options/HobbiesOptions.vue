<script lang="ts" setup>

import CommonOptions from "./CommonOptions.vue";
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem.js";

const activeKey = ref<string>('1');
defineOptions({name: 'HOBBIES_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <CommonOptions></CommonOptions>
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置">
      <a-form>
        <a-form-item label="标题名称">
          <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
        </a-form-item>
        <a-form-item label="兴趣爱好">
          <a-textarea v-model:value="modelItem.data.content"
                      show-count allow-clear maxlength="255"
                      :auto-size="{ minRows: 2, maxRows: 5 }"/>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>