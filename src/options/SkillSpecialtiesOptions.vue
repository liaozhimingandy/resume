<script lang="ts" setup>
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem";
import CommonOptions from "./CommonOptions.vue";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

const activeKey = ref<string>('1');
defineOptions({name: 'SKILL_SPECIALTIES_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();

// 熟练度选择
const proficiencyList = ['了解', '一般', '熟悉', '精通'].map((item,) => {
  return {"value": item, "label": item}
});

// 增加技能
const addSkillSpec = () => {
  modelItem.data.LIST.push({
    skillName: '技能名称', // 技能名称
    proficiency: '熟练度', // 熟练度
    introduce: '介绍' // 介绍
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

// 删除技能
const delSkillSpec = (index: number): void => {
  modelItem.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

</script>
<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
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
                              :header="`技能${index+1}`">
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
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>