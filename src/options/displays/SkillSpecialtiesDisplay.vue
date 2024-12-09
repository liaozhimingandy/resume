<script lang="ts" setup>
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
import {COMPONENTS} from "@/constants";
const {modelItem} = useOptionDisplay(COMPONENTS.SKILL_SPECIALTIES.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

const activeKeyCollapse = ref<string>('0');
// 熟练度选择
const proficiencyList = ['了解', '一般', '熟悉', '精通'].map((item,) => {
  return {"value": item, "label": item}
});

// 增加技能
const addSkillSpec = () => {
  modelItem.value.data.LIST.push({
    skillName: '技能名称', // 技能名称
    proficiency: '熟练度', // 熟练度
    introduce: '介绍' // 介绍
  });
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};

// 删除技能
const delSkillSpec = (index: number): void => {
  modelItem.value.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};
</script>

<template>
  <a-form style="margin-top: 20px">
    <a-form-item label="标题名称" v-if="is_editor">
      <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
    </a-form-item>
    <a-form-item>
      <a-collapse v-model:activeKey="activeKeyCollapse" accordion>
        <a-collapse-panel v-for="(item, index) in modelItem.data.LIST" :key="`${index+1}`"
                          :header="`技能-${index+1}`">
          <template #extra>
            <DeleteOutlined @click="delSkillSpec(index)"/>
          </template>
          <a-form>
            <a-form-item label="技能">
              <a-input v-model:value="item.skillName" type="text" maxlength="20" show-count></a-input>
            </a-form-item>
            <a-form-item label="熟练度">
              <a-select v-model:value="item.proficiency" :options='proficiencyList'/>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </a-form-item>
    <!--      添加技能信息 -->
    <a-form-item>
      <a-button type="dashed" style="width: 100%" @click="addSkillSpec">
        <PlusOutlined/>
        添加技能信息
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>