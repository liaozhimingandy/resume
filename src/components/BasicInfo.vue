<script setup>
import {reactive, ref, computed} from 'vue';

import {Cellphone} from '@element-plus/icons-vue'

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
    {required: true, message: '请填写姓', trigger:'blur'},
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
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
};
// 表单校验
const validateForm = () => {
    return new Promise((resolve, reject) => {
      formRef.value.validate((valid) => {
        if (valid) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

// 暴露方法
defineExpose({
	validateForm
})
</script>

<template>
  <el-form label-width="auto" :model="model" style="width: 45vw" :rules="rules" status-icon ref="formRef">
    <h2>请填写你的基本信息</h2>
    <!--      姓名 -->
    <el-form-item>
      <el-col :span="11">
        <el-form-item prop="fist_name">
          <el-input
              v-model="model.first_name"
              size="large"
              placeholder="张"
          >
            <template #prepend style="background-color: #535bf2">
              姓
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item prop="last_name">
          <el-input
              v-model="model.last_name"
              size="large"
              placeholder="三"
          >
            <template #prepend style="background-color: #535bf2">
              名
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--      目前所在城市-->
    <el-form-item>
      <el-col :span="11">
        <el-form-item prop="province">
          <el-select v-model="model.province" placeholder="请选择省份" size="large">
            <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item prop="city">
          <el-select v-model="model.city" placeholder="请选择城市" v-if="model.province.length" size="large">
            <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--  联系方式  -->
    <el-form-item prop="联系方式">
      <!--      电话 -->
      <el-col :span="8">
        <el-form-item prop="tel_no">
          <el-input
              v-model="model.tel_no"
              size="large"
              placeholder="12345678901"
              :suffix-icon="Cellphone"
          />
        </el-form-item>
      </el-col>

      <el-col :span="15" :offset="1">
        <el-form-item prop="email">
          <el-input
              v-model="model.email"
              size="large"
              placeholder="例如 admin@qq.com"
          >
            <template #prepend style="background-color: #535bf2">
              邮箱
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>