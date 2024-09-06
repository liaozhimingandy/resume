<script lang="ts" setup>
import {PlusOutlined} from "@ant-design/icons-vue";
import {nextTick, reactive, ref} from "vue";

// 来自父组件的传参
const tags = defineModel("tags");
defineProps(
    {
      tips: String
    }
)

const inputRef = ref();
const state = reactive({
  inputVisible: false,
  inputValue: '',
});

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let items = tags.value;
  if (inputValue && items.indexOf(inputValue) === -1) {
    items = [...items, inputValue];
  }
  tags.value = items;
  Object.assign(state, {
    inputVisible: false,
    inputValue: '',
  });
};
const handleClose = (removedTag) => {
 tags.value = tags.value.filter(tag => tag !== removedTag);
};
const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};
</script>

<template>
  <template v-for="tag in tags" :key="tag">
    <a-tooltip v-if="tag.length > 20" :title="tag">
      <a-tag @close="handleClose(tag)" closable :bordered="false">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else @close="handleClose(tag)" closable :bordered="false" class="large-font-tag">
      {{ tag }}
    </a-tag>
  </template>
  <a-input
      v-if="state.inputVisible"
      ref="inputRef"
      v-model:value="state.inputValue"
      type="text"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
      class="large-font-tag"
  />
  <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput" class="large-font-tag">
    <plus-outlined/>
    {{tips}}
  </a-tag>
</template>

<style scoped>

</style>