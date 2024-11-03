<script lang="ts" setup>

import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem.js";
import CommonOptions from "./CommonOptions.vue";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

const activeKey = ref<string>('1');
defineOptions({name: 'HOBBIES_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 增加作品内容
const addWorkDisplay = () => {
  modelItem.data.LIST.push({
    worksName: '', // 作品名称
    worksLink: '', // 作品链接
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

// 删除作品内容
const delWorkDisplay = (index: number): void => {
  modelItem.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

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
      <a-space direction="vertical">
        <a-form-item label="标题名称">
          <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
        </a-form-item>
        <a-form-item>
          <a-collapse v-model:activeKey="activeKeyCollapse" accordion>
            <a-collapse-panel v-for="(item, index) in modelItem.data.LIST" :key="`${index+1}`"
                              :header="`作品-#${index+1}`">
              <template #extra>
                <DeleteOutlined @click="delWorkDisplay(index)"/>
              </template>
              <a-form>
                <a-form-item label="作品名称">
                  <a-input v-model:value="item.worksName" maxlength="64" show-count/>
                </a-form-item>
                <a-form-item label="作品链接">
                  <a-input v-model:value="item.worksLink" maxlength="64" show-count/>
                </a-form-item>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
          <!--      添加作品内容 -->
          <a-form-item>
            <a-button type="dashed" style="width: 100%" @click="addWorkDisplay">
              <PlusOutlined/>
              添加作品内容
            </a-button>
          </a-form-item>
        </a-form-item>
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>