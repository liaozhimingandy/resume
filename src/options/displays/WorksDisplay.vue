<script lang="ts" setup>
import {COMPONENTS} from "@/constants";
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
import {ref} from "vue";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

const {modelItem} = useOptionDisplay(COMPONENTS.WORKS_DISPLAY.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
})

const activeKeyCollapse = ref<string>('1'); // 折叠板默认的激活项

// 增加作品内容
const addWorkDisplay = () => {
  modelItem.value.data.LIST.push({
    worksName: '', // 作品名称
    worksLink: '', // 作品链接
  });
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};

// 删除作品内容
const delWorkDisplay = (index: number): void => {
  modelItem.value.data.LIST.splice(index, 1);
  activeKeyCollapse.value = modelItem.value.data.LIST.length.toString();
};
</script>

<template>
  <a-form style="margin-top: 8px;">
    <a-form-item v-if="is_editor" label="标题名称">
      <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
    </a-form-item>
    <a-form-item>
      <a-collapse v-model:activeKey="activeKeyCollapse" accordion>
        <a-collapse-panel v-for="(item, index) in modelItem.data.LIST" :key="`${index+1}`"
                          :header="`作品-#${index+1}`">
          <template #extra>
            <DeleteOutlined @click="delWorkDisplay(index)"/>
          </template>
          <a-form>
            <a-form-item label="作品名称">
              <a-input v-model:value="item.worksName" maxlength="64" show-count/>
            </a-form-item>
            <a-form-item label="作品链接">
              <a-input v-model:value="item.worksLink" maxlength="64" show-count/>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
      <!--      添加作品内容 -->
      <a-form-item>
        <a-button type="dashed" style="width: 100%" @click="addWorkDisplay">
          <PlusOutlined/>
          添加作品内容
        </a-button>
      </a-form-item>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>