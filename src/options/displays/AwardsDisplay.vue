<script lang="ts" setup>
import {COMPONENTS} from "@/constants";
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";

const {modelItem} = useOptionDisplay(COMPONENTS.AWARDS.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

const dateFormat = 'YYYY-MM-DD';

const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 增加荣誉奖项
const addAward = () => {
  modelItem.value.data.LIST.push({
    date: '2024-06', //获奖时间
    awardsName: '', // 奖项名称
    awardsGrade: '', // 所获奖项
  });
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};

// 删除荣誉奖项
const delAward = (index: number): void => {
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
                <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.awardsName"/>
              </a-space>
            </a-form-item>
            <a-form-item label="所获奖项">
              <a-space>
                <a-input v-model:value="item.awardsGrade" maxlength="64" show-count/>
                <a-switch v-if="is_editor" v-model:checked="modelItem.data.isShow.awardsGrade" v-if="is_editor"/>
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
  </a-form>
</template>

<style scoped>

</style>