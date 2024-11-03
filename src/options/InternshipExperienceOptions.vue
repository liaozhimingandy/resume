<script lang="ts" setup>

import CommonOptions from "./CommonOptions.vue";
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonTitleOptions from "./CommonTitleOptions.vue";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

const activeKey = ref<string>('1');
defineOptions({name: 'INTERNSHIP_EXPERIENCE_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();
const dateFormat = 'YYYY-MM';

const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 增加实习经验
const addInterExper = () => {
  modelItem.data.LIST.push({
    date: ['2024-09', '2024-10'], // 实习时间
    companyName: '公司名称', // 公司名称
    posts: '职位', // 职位
    jobContent: [
      {
        content: '主要工作内容'
      }
    ]
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

// 删除实习经验
const delInterExper = (index: number): void => {
  modelItem.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <CommonTitleOptions></CommonTitleOptions>
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
                              :header="`#${index+1}-${item.companyName}`">
              <template #extra>
                <DeleteOutlined @click="delInterExper(index)"/>
              </template>
              <a-form>
                <a-form-item label="日期选择">
                  <a-range-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"
                                  picker="month"/>
                </a-form-item>
                <a-form-item label="公司名称">
                  <a-space>
                    <a-input-number v-model:value="item.companyName" max="100" min="18"/>
                    <a-switch v-model:checked="modelItem.data.isShow.companyName"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="主要职责">
                  <a-textarea v-model:value="item.posts"
                              show-count allow-clear maxlength="255"
                              :auto-size="{ minRows: 2, maxRows: 5 }"/>
                  <a-switch v-model:checked="modelItem.data.isShow.posts"/>
                </a-form-item>
                <a-form-item label="工作内容" v-for="(content, cIndex) in item.jobContent" :key="cIndex">
                  <a-textarea v-model:value="content.content"
                              show-count allow-clear maxlength="255"
                              :auto-size="{ minRows: 2, maxRows: 5 }"/>
                </a-form-item>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </a-form-item>
        <!--      添加实习经验 -->
        <a-form-item>
          <a-button type="dashed" style="width: 100%" @click="addInterExper">
            <PlusOutlined/>
            添加实习经验
          </a-button>
        </a-form-item>
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>