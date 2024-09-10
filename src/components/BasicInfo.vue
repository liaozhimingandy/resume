<script setup>
import {computed, reactive, ref} from 'vue';

import {MailOutlined, PhoneOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons-vue';

import {BasicInfoStore} from "../stores/index.js";
import Tags from "./Tags.vue";

// 省份信息
const provinces = reactive([{
  value: 'jiangxi', label: '江西省'
}])

// 城市信息
const cities = reactive({
  "jiangxi": [
    {value: 'nanchang', label: '南昌市'},]
})

// 城市选择项
const cityOptions = computed(() => {
  return cities[basicInfo.value.province] || [];
});

// 基本信息
const formRef = ref(null);
const basicInfoStore = BasicInfoStore();
const basicInfo = computed(() => basicInfoStore);

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
  hope: [
    {required: true, message: '请输入您期望从事岗位', trigger: 'blur'},
    {min: 1, max: 32, message: '长度必须介于1和32之间', trigger: 'blur'}
  ]
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
  <a-form :model="basicInfo" style="width: 100%" :rules="rules" ref="formRef">
    <h2>请填写你的基本信息</h2>
    <!--      姓名 -->
    <a-row>
      <a-col :xs="24" :sm="12" :md="11" :lg="11" :xl="11">
        <a-form-item name="first_name" has-feedback>
          <a-input
              v-model:value="basicInfo.first_name"
              size="large"
              placeholder="张">
            <template #addonBefore>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12" :md="{ span: 11, offset: 2 }" :lg="{ span: 11, offset: 2 }" :xl="{ span: 11, offset: 2 }">
        <a-form-item has-feedback name="last_name">
          <a-input
              v-model:value="basicInfo.last_name"
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
    <a-row>
      <a-col :xs="24" :sm="12" :md="11" :lg="11" :xl="11">
        <a-form-item name="province">
          <a-select v-model:value="basicInfo.province" placeholder="请选择省份" size="large">
            <a-select-option
                v-for="item in provinces"
                :value="item.value"
            >{{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12" :md="{ span: 11, offset: 2 }" :lg="{ span: 11, offset: 2 }" :xl="{ span: 11, offset: 2 }">
        <a-form-item name="city">
          <a-select v-model:value="basicInfo.city" placeholder="请选择城市" v-if="basicInfo.province.length"
                    size="large">
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
    <a-row>
      <!--      电话 -->
      <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <a-form-item name="tel_no" has-feedback>
          <a-input
              v-model:value="basicInfo.tel_no"
              size="large"
              placeholder="12345678901"
          >
            <template #addonBefore>
              <PhoneOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="12" :md="{ span: 15, offset: 1 }" :lg="{ span: 15, offset: 1 }" :xl="{ span: 15, offset: 1 }">
        <a-form-item name="email" has-feedback>
          <a-input
              v-model:value="basicInfo.email"
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
    <!-- 期待从事的岗位 -->
    <a-row>
        <a-form-item name="hopes" label="期待的岗位">
          <Tags v-model:tags="basicInfo.hopes" tips="期待的岗位"/>
        </a-form-item>
    </a-row>
  </a-form>
</template>

<style scoped>
.large-font-tag {
  font-size: 16px;
}
</style>