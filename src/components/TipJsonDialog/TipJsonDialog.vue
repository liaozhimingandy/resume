<template>
  <!-- 提示弹窗 -->
  <a-modal
    :open="tipDialogVisible"
    width="40%"
    cancel-text="取消"
    ok-text="确认"
    title="示例JSON"
    @cancel="close"
  >
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <codemirror
        ref="codemirrorRef"
        v-model="code"
        placeholder="请将你的简历JSON写在此处～～"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        :disabled="true"
      />
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import IMPORT_JSON from '@/data/import';
  import { javascript } from '@codemirror/lang-javascript';
  import { json } from '@codemirror/lang-json';
  import { ref } from 'vue';

  const emit = defineEmits(['closeTipDialog']);

  interface TDialog {
    tipDialogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    tipDialogVisible: false
  });

  // 代码编辑器
  const code = ref<string>(JSON.stringify(IMPORT_JSON, null, 4));
  const extensions = [javascript(), json()];

  // 关闭
  const close = () => {
    emit('closeTipDialog');
  };
</script>
<style scoped></style>
