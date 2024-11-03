<script lang="ts" setup>
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem.js";
import CommonOptions from "./CommonOptions.vue";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

const activeKey = ref<string>('1');
defineOptions({name: 'WORK_EXPERIENCE_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();
const dateFormat = 'YYYY-MM';

// 折叠板默认的激活项
const activeKeyCollapse = ref<string>('1');

// 增加工作经验
const addWorKExper = () => {
  modelItem.data.LIST.push({
    date: ['2021-09', '2022-10'], // 实习时间
    companyName: '业绩公司', // 公司名称
    posts: '前端开发工程师', // 职位
    jobContent: [
      {
        content: '主要工作内容是打杂'
      }
    ]
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
}

// 删除工作经验
const delWorkExper = (index: number): void => {
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
                              :header="`#${index+1}-${item.companyName}`">
              <template #extra>
                <DeleteOutlined @click="delWorkExper(index)"/>
              </template>
              <a-form>
                <a-form-item label="日期选择">
                  <a-range-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"
                                  picker="month"/>
                </a-form-item>
                <a-form-item label="公司名称:">
                  <a-space>
                    <a-input v-model:value="item.companyName" type="text" maxlength="35" show-count/>
                    <a-switch v-model:checked="modelItem.data.isShow.companyName"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="主要职责:">
                  <a-textarea v-model:value="item.posts"
                              show-count allow-clear maxlength="255"
                              :auto-size="{ minRows: 2, maxRows: 5 }"/>
                  <a-switch v-model:checked="modelItem.data.isShow.posts"/>

                </a-form-item>
                <a-form-item label="工作内容:" v-for="(content, cIndex) in item.jobContent" :key="cIndex">
                  <a-textarea v-model:value="content.content"
                              show-count allow-clear maxlength="255"
                              :auto-size="{ minRows: 2, maxRows: 5 }"/>
                </a-form-item>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </a-form-item>
        <!--      添加教育背景 -->
        <a-form-item>
          <a-button type="dashed" style="width: 100%" @click="addWorKExper">
            <PlusOutlined/>
            添加工作经验
          </a-button>
        </a-form-item>
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>