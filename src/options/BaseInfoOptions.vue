<script lang="ts" setup>
import {ref} from "vue";
import CommonOptions from "./CommonOptions.vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonTitleOptions from "./CommonTitleOptions.vue";

const activeKey = ref<string>('1');
defineOptions({name: 'BASE_INFO_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

/**
 * 数据配置
 */
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <CommonTitleOptions color-label="姓名字体颜色" font-size-label="姓名字体大小" font-weight-label="姓名字体粗细" />
      <a-divider />
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置">
      <a-form style="padding: 8px;">
        <a-form-item label="姓名">
          <a-input v-model:value="modelItem.data.name"/>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea v-model:value="modelItem.data.abstract"
                      show-count allow-clear maxlength="255"
                      :auto-size="{ minRows: 2, maxRows: 5 }" />
          <a-switch v-model:checked="modelItem.data.isShow.abstract"/>
        </a-form-item>
        <a-form-item label="年龄">
          <a-space>
            <a-input-number v-model:value="modelItem.data.age" max="100" min="14"/>
            <a-switch v-model:checked="modelItem.data.isShow.age"/>
          </a-space>
        </a-form-item>
        <a-form-item label="所在地址">
          <a-space>
            <a-input v-model:value="modelItem.data.address"/>
            <a-switch v-model:checked="modelItem.data.isShow.address"/>
          </a-space>
        </a-form-item>
        <a-form-item label="工作年限">
          <a-space>
            <a-input-number v-model:value="modelItem.data.workService" max="100" min="0"/>
            <a-switch v-model:checked="modelItem.data.isShow.workService"/>
          </a-space>
        </a-form-item>
        <a-form-item label="联系电话">
          <a-space>
            <a-input v-model:value="modelItem.data.phoneNumber"/>
            <a-switch v-model:checked="modelItem.data.isShow.phoneNumber"/>
          </a-space>
        </a-form-item>
        <a-form-item label="电子邮箱">
          <a-space>
            <a-input v-model:value="modelItem.data.email"/>
            <a-switch v-model:checked="modelItem.data.isShow.email"/>
          </a-space>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>