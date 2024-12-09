<script lang="ts" setup>
import {computed, ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonOptions from "./CommonOptions.vue";
import CommonTitleOptions from "./CommonTitleOptions.vue";
import {useDegreeList} from '@/hooks/useDegreeList';

const dateFormat = 'YYYY-MM';
const activeKey = ref<string>('1');

defineOptions({name: 'EDU_BACKGROUND_OPTIONS'});

// 选中的模块
const {modelItem} = useDesignSelectModelItem();
const {degreeList} = useDegreeList(); // 学历列表
const degreeListOptions = computed(() => degreeList.map((item,) => {
  return {"value": item, "label": item}
}));
const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 导入icon
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

// 增加教育背景信息
const addEducation = () => {
  modelItem.data.LIST.push({
    date: ['2015-05', '2019-06'],
    schoolName: '', // 学校名称
    specialized: '', // 专业
    degree: '', // 学历
    majorCourse: '' // 主修课程
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

// 删除教育背景信息
const delEducation = (index: number): void => {
  modelItem.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置" name="style">
      <!-- 标题样式属性 -->
      <CommonTitleOptions color-label="二级标题颜色" font-size-label="二级标题字体大小"
                          font-weight-label="二级标题字体粗细"/>
      <a-divider/>
      <!-- 公共样式属性 -->
      <CommonOptions/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据配置" name="data" style="padding: 8px">
      <a-space direction="vertical">
        <a-form-item label="标题名称">
          <a-input v-model:value="modelItem.data.title"/>
        </a-form-item>
        <a-form-item>
          <a-collapse v-model:activeKey="activeKeyCollapse" accordion>
            <a-collapse-panel v-for="(item, index) in modelItem.data.LIST" :key="`${index+1}`"
                              :header="`#${index+1}-${item.schoolName}`">
              <template #extra>
                <DeleteOutlined @click="delEducation(index)"/>
              </template>
              <a-form>
                <a-form-item label="学校名称">
                  <a-space>
                    <a-input v-model:value="item.schoolName"/>
                    <a-switch v-model:checked="modelItem.data.isShow.schoolName"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="日期选择">
                  <a-range-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"
                                  picker="month"/>
                </a-form-item>
                <a-form-item label="学历">
                  <a-space>
                    <a-select v-model:value="item.degree" :options='degreeListOptions'/>
                    <a-switch v-model:checked="modelItem.data.isShow.degree"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="专业">
                  <a-space>
                    <a-input v-model:value="item.specialized"/>
                    <a-switch v-model:checked="modelItem.data.isShow.specialized"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="主修课程">
                  <a-space>
                    <a-input v-model:value="item.majorCourse"/>
                    <a-switch v-model:checked="modelItem.data.isShow.majorCourse"/>
                  </a-space>
                </a-form-item>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </a-form-item>
        <!--      添加教育背景 -->
        <a-form-item>
          <a-button type="dashed" style="width: 100%" @click="addEducation">
            <PlusOutlined/>
            添加教育背景
          </a-button>
        </a-form-item>
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>