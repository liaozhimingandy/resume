<script lang="ts" setup>
import {COMPONENTS} from "@/constants";
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";

const {modelItem} = useOptionDisplay(COMPONENTS.CAMPUS_EXPERIENCE.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});
const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项
// 添加校园经历
const addCampusExper = () => {
  modelItem.value.data.LIST.push({
    date: ['2024-09', '2022-10'], // 经历时间
    campusBriefly: '经历简要，如社团名称',
    campusDuty: '主要职责',
    campusContent: '经历经历'
  });
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};

// 删除校园经历
const delCampusExper = (index: number): void => {
  modelItem.value.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};
</script>

<template>
  <a-form style="margin-top: 8px">
    <a-form-item label="标题名称" v-if="is_editor">
      <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
    </a-form-item>
    <a-form-item>
      <a-collapse v-model:activeKey="activeKeyCollapse" accordion>
        <a-collapse-panel v-for="(item, index) in modelItem.data.LIST" :key="`${index+1}`"
                          :header="`#${index+1}-${item.campusDuty}`">
          <template #extra>
            <DeleteOutlined @click="delCampusExper(index)"/>
          </template>
          <a-form>
            <a-form-item label="日期选择">
              <a-range-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"
                              picker="month" showToday/>
            </a-form-item>
            <a-form-item :label="`经历简要${index+1}`">
              <a-textarea v-model:value="item.campusBriefly"
                          show-count allow-clear maxlength="255"
                          :auto-size="{ minRows: 2, maxRows: 5 }"/>
              <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.campusBriefly"/>
            </a-form-item>
            <a-form-item :label="`主要职责${index+1}`">
              <a-space>
                <a-input v-model:value="item.campusDuty" type="text" maxlength="20" show-count></a-input>
                <a-switch v-model:checked="modelItem.data.isShow.campusDuty"/>
              </a-space>
            </a-form-item>
            <a-form-item :label="`经历简述${index+1}`">
              <a-textarea v-model:value="item.campusContent"
                          show-count allow-clear maxlength="255"
                          :auto-size="{ minRows: 2, maxRows: 5 }"/>
              <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.campusContent"/>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </a-form-item>
    <!--      添加校园经历 -->
    <a-form-item>
      <a-button type="dashed" style="width: 100%" @click="addCampusExper">
        <PlusOutlined/>
        添加校园经历
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>