<script setup>
import {reactive, ref, computed} from 'vue';

import {PhoneOutlined, MailOutlined, UserOutlined} from '@ant-design/icons-vue';


const provinces = reactive([{
  value: 'jiangxi', label: '江西省'
}])

const cities = reactive({
  "jiangxi": [
    {value: 'nanchang', label: '南昌市'},]
})

const cityOptions = computed(() => {
  return cities[model.value.province] || [];
});

const formRef = ref(null);
// 表单数据
const model = defineModel("basicInfoData");
// 校验规则
const rules = {
  first_name: [
    {required: true, message: '请填写姓', trigger: 'blur'},
    {min: 1, max: 16, message: '长度必须介于1和16之间', trigger: ['blur', 'change']},
  ],
  last_name: [
    {required: true, message: '请填写名', trigger: 'blur'},
    {min: 1, max: 32, message: '长度必须介于1和32之间', trigger: ['blur', 'change']},
  ],
  email: [
    {required: true, message: '请输入电子邮箱地址', trigger: 'blur'},
    {type: 'email', message: '请输入有效的电子邮箱地址', trigger: ['blur', 'change']}
  ],
  tel_no: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur'}
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
  <a-form :model="model" style="width: 45vw" :rules="rules" ref="formRef">
    <h2>请填写你的基本信息</h2>
    <!--      姓名 -->
    <a-row :gutter="24">
      <a-col :span="11">
        <a-form-item name="first_name" has-feedback>
          <a-input
              v-model:value="model.first_name"
              size="large"
              placeholder="张"
          >
            <template #addonBefore>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11" :offset="2">
        <a-form-item has-feedback name="last_name">
          <a-input
              v-model:value="model.last_name"
              size="large"
              placeholder="三"
          >
            <template #addonBefore>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <!--      目前所在城市-->
    <a-row :span="24">
      <a-col :span="11">
        <a-form-item name="province">
          <a-select v-model:value="model.province" placeholder="请选择省份" size="large">
            <a-select-option
                v-for="item in provinces"
                :value="item.value"
            >{{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="11" :offset="2">
        <a-form-item name="city">
          <a-select v-model:value="model.city" placeholder="请选择城市" v-if="model.province.length" size="large">
            <a-select-option
                v-for="item in cityOptions"
                :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <!--  联系方式  -->
    <a-row :span="24">
      <!--      电话 -->
      <a-col :span="8">
        <a-form-item name="tel_no" has-feedback>
          <a-input
              v-model:value="model.tel_no"
              size="large"
              placeholder="12345678901"
          >
            <template #addonBefore>
              <PhoneOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="15" :offset="1">
        <a-form-item name="email" has-feedback>
          <a-input
              v-model:value="model.email"
              size="large"
              placeholder="例如 admin@qq.com"
          >
            <template #addonBefore>
              <MailOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<style scoped>

</style>