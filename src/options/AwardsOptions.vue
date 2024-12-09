<script lang="ts" setup>

import CommonOptions from "./CommonOptions.vue";
import {ref} from "vue";
import useDesignSelectModelItem from "../hooks/material/useDesignSelectModelItem.js";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import CommonTitleOptions from "@/options/CommonTitleOptions.vue";

const activeKey = ref<string>('1');
defineOptions({name: 'AWARDS_OPTIONS'});
// 选中的模块
const {modelItem} = useDesignSelectModelItem();
const dateFormat = 'YYYY-MM-DD';

const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 增加荣誉奖项
const addAward = () => {
  modelItem.data.LIST.push({
    date: '2024-06', //获奖时间
    awardsName: '', // 奖项名称
    awardsGrade: '', // 所获奖项
  });
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};

// 删除荣誉奖项
const delAward = (index: number): void => {
  modelItem.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.data.LIST.length.toString();
};
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
    <a-tab-pane key="1" tab="样式设置">
      <!-- 标题样式属性 -->
      <CommonTitleOptions />
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
                              :header="`#${index+1}-${item.awardsName}`">
              <template #extra>
                <DeleteOutlined @click="delAward(index)"/>
              </template>
              <a-form>
                <a-form-item label="日期选择">
                  <a-date-picker v-model:value="item.date" :format="dateFormat" :valueFormat="dateFormat"/>
                </a-form-item>
                <a-form-item label="奖项名称">
                  <a-space>
                    <a-input v-model:value="item.awardsName" maxlength="64" show-count/>
                    <a-switch v-model:checked="modelItem.data.isShow.awardsName"/>
                  </a-space>
                </a-form-item>
                <a-form-item label="所获奖项">
                  <a-space>
                    <a-input v-model:value="item.awardsGrade" maxlength="64" show-count/>
                    <a-switch v-model:checked="modelItem.data.isShow.awardsGrade"/>
                  </a-space>
                </a-form-item>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </a-form-item>
        <!--      添加荣誉奖项 -->
        <a-form-item>
          <a-button type="dashed" style="width: 100%" @click="addAward">
            <PlusOutlined/>
            添加荣誉奖项
          </a-button>
        </a-form-item>
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>

</style>