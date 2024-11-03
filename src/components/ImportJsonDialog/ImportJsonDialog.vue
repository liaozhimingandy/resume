<template>
  <a-modal
      :open="dialogVisible"
      width="60%"
      @cancel="cancle"
      @ok="confirmJson"
      cancel-text="取消"
      ok-text="确认"
      title="导入数据"
  >
    <a-button @click="openTip">JSON示例</a-button>
    <a-button @click="resetJson">重置</a-button>
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <codemirror
          v-model="code"
          placeholder="请将你在自定义模板下载的JSON数据粘贴在此处哦~~"
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
      />

    </div>
  </a-modal>
  <!-- JSON提示弹窗 -->
  <TipJsonDialog
      :tip-dialog-visible="tipDialogVisible"
      @close-tip-dialog="closeTipDialog"
  ></TipJsonDialog>
  <contextHolder />
</template>

<script lang="ts" setup>
import {Codemirror} from 'vue-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';
import {json} from '@codemirror/lang-json';
import {ref} from 'vue';
import IMPORT_JSON from '@/data/import';
import {isJSON} from '@/utils/common';
import appStore from '@/stores/app';
import {v4 as uuid4} from 'uuid';
import TipJsonDialog from '@/components/TipJsonDialog/TipJsonDialog.vue';

const emit = defineEmits(['cancle']);

import {notification} from "ant-design-vue";
const [api, contextHolder] = notification.useNotification();

interface TDialog {
  dialogVisible: boolean;
}

withDefaults(defineProps<TDialog>(), {
  dialogVisible: false
});

// 代码编辑器
const code = ref<string>('');
const extensions = [javascript(), oneDark, json()];

// 取消
const cancle = () => {
  emit('cancle');
};

// 提示弹窗
const tipDialogVisible = ref<boolean>(false);
const openTip = () => {
  tipDialogVisible.value = true;
};
// 关闭提示弹窗
const closeTipDialog = () => {
  tipDialogVisible.value = false;
};

// 重置
const resetJson = () => {
  code.value = JSON.stringify(IMPORT_JSON, null, 4);
};

// 提交JSON
const {setUuid} = appStore.useUuidStore;
const {updateResumeJsonData, updateImportJsonData} = appStore.useResumeJsonStore;
const {resetSelectModel} = appStore.useSelectMaterialStore;
const confirmJson = () => {
  if (!code.value) {
api.info({
    message: '温馨提示',
    description: "数据不能为空！"
  })
    return;
  }
  let isCurrentJSON = isJSON(code.value);
  if (!isCurrentJSON) {
    api.info({
    message: '温馨提示',
    description: "JSON格式不正确！"
  })
    return;
  }
  // // 处理数据
  let importJson = JSON.parse(code.value);
  importJson.ID = uuid4();
  console.log('导入的最终JSON', importJson);
  updateResumeJsonData(importJson); // 更改store的数据
  updateImportJsonData(importJson); // 保存JSON数据
  setUuid(); // 重新渲染左侧列表和右侧属性面板设置
  resetSelectModel(); // 重置选中模块
  emit('cancle');
};
</script>
<style scoped>
</style>
