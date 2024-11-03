<script lang="ts" setup>
import CommonOptions from "./CommonOptions.vue";
import {ref, reactive} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem.js";

const activeKey = ref<string>('1');
defineOptions({name: 'JOB_INTENTION_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

/**
 * 数据配置
 */
const jobSearchTypeList = ['全职', '兼职', '实习'].map((item,) => {
  return {"value": item, "label": item}
});
const jobStatusList = ['随时入职', '一周内到岗', '一个月内到岗', '面议'].map((item,) => {
  return {"value": item, "label": item}
});
const expectSalaryList =[
  '2000-4000￥',
  '4000-6000￥',
  '6000-8000￥',
  '8000-10000￥',
  '10000-12000￥',
  '12000-15000￥',
  '15000￥以上'
].map((item,) => {
  return {"value": item, "label": item}
});
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置">
      <a-form>
        <a-form-item label="标题名称">
          <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
        </a-form-item>
        <a-form-item label="求职类型">
          <a-space>
            <a-select v-model:value="modelItem.data.jobSearchType" :options='jobSearchTypeList'/>
            <a-switch v-model:checked="modelItem.data.isShow.jobSearchType"/>
          </a-space>
        </a-form-item>
        <a-form-item label="意向岗位">
          <a-space>
            <a-input v-model:value="modelItem.data.intendedPositions" type="text" maxlength="20" show-count></a-input>
            <a-switch v-model:checked="modelItem.data.isShow.intendedPositions"/>
          </a-space>
        </a-form-item>
        <a-form-item label="意向城市">
          <a-space>
            <a-input v-model:value="modelItem.data.intendedCity" type="text" maxlength="20" show-count></a-input>
            <a-switch v-model:checked="modelItem.data.isShow.intendedCity"/>
          </a-space>
        </a-form-item>
        <a-form-item label="期望薪酬">
          <a-space>
            <a-select v-model:value="modelItem.data.expectSalary" :options='expectSalaryList'/>
            <a-switch v-model:checked="modelItem.data.isShow.expectSalary"/>
          </a-space>
        </a-form-item>
      <a-form-item label="求职状态">
          <a-space>
            <a-select v-model:value="modelItem.data.jobStatus" :options='jobStatusList'/>
            <a-switch v-model:checked="modelItem.data.isShow.jobStatus"/>
          </a-space>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>