<script setup>
import {ref, computed} from 'vue';

import {DeleteOutlined} from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import {v4 as uuidv4} from 'uuid';

import {EduStore} from "../stores/index.js";
import MEditor from "@/components/MEditor.vue";

// 基本信息
const eduStore = EduStore();
const educations = computed(() => eduStore.edus);
const formRefs = ref([]);
// 当前激活项
const activeKey = ref(null);

// 校验规则
const rules = {
  edu_unit: [
    {required: true, message: '请填写教育单位/机构', trigger: 'blur'},
    {min: 1, max: 36, message: '长度必须介于1和36之间', trigger: ['blur', 'change']},
  ],
  certificate: [
    {required: true, message: '请填写获取的证书名称', trigger: 'blur'},
    {min: 1, max: 36, message: '长度必须介于1和36之间', trigger: ['blur', 'change']},
  ],
  edu_desc: [
    {required: true, message: '请填写教育描述', trigger: 'blur'},
    {min: 1, max: 255, message: '长度必须介于1和255之间', trigger: ['blur', 'change']},
  ],
  gmt_start: [
    {required: true, message: '教育开始时间不能为空', trigger: 'blur'}
  ]

};

// 添加元素
const addItem = () => {
  educations.value.push(
      {
        id: uuidv4(),
        edu_unit: "",
        edu_desc: "",
        certificate: "",
        gmt_start: "",
        gmt_end: ""
      }
  );
  activeKey.value = educations.value.at(-1)['id']
}

// 删除元素
const delItem = (index) => {
  educations.value.splice(index, 1)
}

// 校验表单
const validateForm = async () => {
  let isValid = true;
  for (let index in formRefs.value) {
    try {
      await formRefs.value[index].validateFields();
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }
  return isValid;
}
// 暴露方法
defineExpose({validateForm})
</script>

<template>
  <h2>增加您的教育信息</h2>
  <h4>首先输入你最后的文凭</h4>
  <a-divider/>
  <a-form v-for="(education, index) in educations" :rules="rules" :model="education" ref="formRefs">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel :header="`${education.edu_unit}-${education.gmt_edu_start}`" :key="education.id">
        <template #extra>
          <DeleteOutlined @click="() => delItem(index)"/>
        </template>
        <a-row>
          <a-col :span="11">
            <a-form-item label="学校/机构" name="edu_unit">
              <a-input placeholder="在此处输入你的学校/机构" v-model:value="education.edu_unit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="证书名称" name="certificate">
              <a-input placeholder="在此处您获取的证书名称" v-model:value="education.certificate"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="11">
            <a-form-item label="开始日期" name="gmt_start">
              <a-date-picker v-model:value="education.gmt_start" value-format="YYYY-MM-DD" :locale="locale"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="2" style="text-align: center">
            -
          </a-col>
          <a-col :span="11">
            <a-form-item label="结束日期">
              <a-date-picker v-model:value="education.gmt_end" value-format="YYYY-MM-DD" :locale="locale"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="教育描述" name="edu_desc">
          <MEditor v-model:data="education.edu_desc" />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
    <a-divider/>
  </a-form>
  <a-divider/>
  <a-button type="primary" @click="addItem">添加教育信息</a-button>
  <a-divider/>
</template>

<style scoped>
</style>