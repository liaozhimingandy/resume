<script lang="ts" setup>
import {COMPONENTS} from "@/constants";
import {useOptionDisplay} from "@/hooks/useOptionDisplay";
const {modelItem} = useOptionDisplay(COMPONENTS.SELF_EVALUATION.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

</script>

<template>
  <a-form style="margin-top: 20px">
    <a-form-item label="标题名称" v-if="is_editor">
      <a-input v-model:value="modelItem.data.title" type="text" maxlength="20" show-count></a-input>
    </a-form-item>
    <a-form-item label="自我评价">
      <a-textarea v-model:value="modelItem.data.content"
                  show-count allow-clear maxlength="255"
                  :auto-size="{ minRows: 5, maxRows: 8 }"/>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>