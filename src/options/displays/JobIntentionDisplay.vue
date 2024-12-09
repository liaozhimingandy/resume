<script lang="ts" setup>
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {COMPONENTS} from "@/constants";
const { modelItem } = useOptionDisplay(COMPONENTS.JOB_INTENTION.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

/**
 * 数据配置
 */
const jobSearchTypeList = ['全职', '兼职', '实习'].map((item,) => {
  return {"value": item, "label": item}
});
const jobStatusList = ['随时入职', '一周内到岗', '一个月内到岗', '面议'].map((item,) => {
  return {"value": item, "label": item}
});
const expectSalaryList = [
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
  <a-form STYLE="margin-top: 20px;background-color: white">
    <a-form-item label="标题名称" v-if="is_editor">
      <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
    </a-form-item>
    <a-form-item label="求职类型">
      <a-flex>
        <a-select v-model:value="modelItem.data.jobSearchType" :options='jobSearchTypeList'/>
        <a-switch v-model:checked="modelItem.data.isShow.jobSearchType" v-show="is_editor"/>
      </a-flex>
    </a-form-item>
    <a-form-item label="意向岗位">
      <a-flex>
        <a-input v-model:value="modelItem.data.intendedPositions" type="text" maxlength="20" show-count></a-input>
        <a-switch v-model:checked="modelItem.data.isShow.intendedPositions" v-show="is_editor"/>
      </a-flex>
    </a-form-item>
    <a-form-item label="意向城市">
      <a-flex>
        <a-input v-model:value="modelItem.data.intendedCity" type="text" maxlength="20" show-count></a-input>
        <a-switch v-model:checked="modelItem.data.isShow.intendedCity" v-show="is_editor"/>
      </a-flex>
    </a-form-item>
    <a-form-item label="期望薪酬">
      <a-flex>
        <a-select v-model:value="modelItem.data.expectSalary" :options='expectSalaryList'/>
        <a-switch v-model:checked="modelItem.data.isShow.expectSalary" v-show="is_editor"/>
      </a-flex>
    </a-form-item>
    <a-form-item label="求职状态">
      <a-flex>
        <a-select v-model:value="modelItem.data.jobStatus" :options='jobStatusList'/>
        <a-switch v-model:checked="modelItem.data.isShow.jobStatus" v-show="is_editor"/>
      </a-flex>
    </a-form-item>
  </a-form>
</template>
<style scoped>

</style>