<script lang="ts" setup>
import {computed, ref} from "vue";

import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {COMPONENTS} from "@/constants";
const {modelItem} = useOptionDisplay(COMPONENTS.EDU_BACKGROUND.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

const {degreeList} = useDegreeList(); // 学历列表
const degreeListOptions = computed(() => degreeList.map((item,) => {
  return {"value": item, "label": item}
}));
const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 导入icon
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useDegreeList} from "@/hooks/useDegreeList";

const dateFormat = 'YYYY-MM';

// 增加教育背景信息
const addEducation = () => {
  modelItem.value.data.LIST.push({
    date: ['2015-05', '2019-06'],
    schoolName: '', // 学校名称
    specialized: '', // 专业
    degree: '', // 学历
    majorCourse: '' // 主修课程
  });
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};

// 删除教育背景信息
const delEducation = (index: number): void => {
  modelItem.value.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};
</script>

<template>
  <a-form style="margin-top: 20px">
    <a-form-item label="标题名称" v-if="is_editor">
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
                <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.schoolName"/>
              </a-space>
            </a-form-item>
            <a-form-item label="日期选择">
              <a-range-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"
                              picker="month"/>
            </a-form-item>
            <a-form-item label="学历">
              <a-space>
                <a-select v-model:value="item.degree" :options='degreeListOptions'/>
                <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.degree"/>
              </a-space>
            </a-form-item>
            <a-form-item label="专业" v-if="modelItem.data.isShow.specialized">
              <a-space>
                <a-input v-model:value="item.specialized"/>
                <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.specialized"/>
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
  </a-form>
</template>

<style scoped>

</style>