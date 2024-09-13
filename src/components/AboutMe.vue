<script setup>
import {ref, computed} from 'vue';

import {AboutMeStore} from "../stores/index.js";
import MEditor from "@/components/MEditor.vue";
import ModalAISuggest from "@/components/ModalAISuggest.vue";

// 基本信息
const aboutMeStore = AboutMeStore();
const aboutMeInfo = computed(() => aboutMeStore);
const formRef = ref(null);

// 校验规则
const rules = {
  profile: [
    {required: true, message: '写一段你的职业总结', trigger: 'blur'},
    {min: 1, max: 1024, message: '长度必须介于1和1024之间', trigger: ['blur', 'change']},
  ],
  desc: [
    {required: true, message: '请填写你的兴趣爱好', trigger: 'blur'},
    {min: 1, max: 1024, message: '长度必须介于1和024之间', trigger: ['blur', 'change']},
  ],
};

// 表单校验
const validateForm = async () => {
  try {
    // 调用 validate 方法，该方法返回 Promise
    await formRef.value.validate();
    return true;
    // 处理表单提交逻辑，例如发送表单数据到服务器
  } catch (errors) {
    return false;
    // 处理表单校验失败的逻辑，例如显示错误信息给用户
  }
};

const open = ref(false);
const open1 = ref(false);

// 暴露方法
defineExpose({
  validateForm
})
</script>

<template>
  <h2>写下你的职业总结</h2>
  <a-form :model="aboutMeInfo" :rules="rules" ref="formRef">
    <a-form-item label="自我描述" name="profile" has-feedback>
      <MEditor v-model:data="aboutMeInfo.profile"/>
      <a-flex justify="flex-end" style="margin-top: 10px">
        <a-button type="link" @click="()=> open = !open">人工智能帮你生成</a-button>
        <ModalAISuggest v-model:open="open" v-model:suggest="aboutMeInfo.profile" content="帮我写一份简历中自我描述部分" v-if="open"/>
      </a-flex>
    </a-form-item>
    <a-divider/>
    <a-form-item label="兴趣爱好" name="desc" has-feedback>
      <!--      <ckeditor v-if="isLayoutReady" v-model="aboutMeInfo.desc" :editor="editor" :config="config"/>-->
      <MEditor v-model:data="aboutMeInfo.desc"/>
      <a-flex justify="flex-end" style="margin-top: 10px">
        <a-button type="link" @click="()=> open1 = !open1">人工智能帮你生成</a-button>
        <ModalAISuggest v-model:open="open1" v-model:suggest="aboutMeInfo.desc" content="帮我写一份简历中关于兴趣爱好的部分" v-if="open1"/>
      </a-flex>
    </a-form-item>
    <a-divider/>
  </a-form>
</template>

<style scoped>

</style>