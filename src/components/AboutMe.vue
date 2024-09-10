<script setup>
import {ref, computed} from 'vue';

import {AboutMeStore} from "../stores/index.js";
import MEditor from "@/components/MEditor.vue";

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
    {required: true, message: '请填写名', trigger: 'blur'},
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

// 暴露方法
defineExpose({
  validateForm
})
</script>

<template>
  <h2>写下你的职业总结</h2>
  <a-form :model="aboutMeInfo" :rules="rules" ref="formRef">
    <a-form-item label="自我描述" name="profile" has-feedback>
      <div style="width:100%;">
         <MEditor v-model:data="aboutMeInfo.profile" />
      </div>
    </a-form-item>
    <a-divider/>
    <a-form-item label="兴趣爱好" name="desc" has-feedback>
<!--      <ckeditor v-if="isLayoutReady" v-model="aboutMeInfo.desc" :editor="editor" :config="config"/>-->
      <MEditor v-model:data="aboutMeInfo.desc" />
    </a-form-item>
    <a-divider/>
  </a-form>
</template>

<style scoped>

</style>