<script setup>
import {reactive, ref, computed} from "vue";

import {v4 as uuidv4} from 'uuid';
import {DeleteOutlined} from "@ant-design/icons-vue";

import {SkillStore} from '../stores';

// 技能信息
// 当前激活项
const activeKey = ref(null);
const skillStore = SkillStore();
const skillsComputed = computed(() => skillStore.skills);
const formRefs = ref([]);
const marks = reactive({
  10: '新手',
  30: '初学者',
  50: '熟练',
  70: {
    style: {
      color: '#1989FA',
    },
    label: '有经验的',
  },
  90: {
    style: {
      color: '#1989FA',
    },
    label: '专家',
  }
})

// 校验规则
const rules = {
  skill: [
    {required: true, message: '请填写技能', trigger: 'blur'},
    {min: 2, max: 16, message: '长度必须介于2和16之间', trigger: ['blur', 'change']},
  ],
  percent: [
    {required: true, message: '请填写熟练程度', trigger: 'blur'},
  ]
};

// 添加技能
const addItem = () => {
  skillsComputed.value.push({
    id: uuidv4(),
    skill: "",
    percent: 0
  });
  activeKey.value = skillsComputed.value.at(-1)['id']
};

const delItem = (index) => {
  // skillInfos.value = skillInfos.value.filter(item => item.skill_id !== skillInfo.skill_id);
  skillsComputed.value.splice(index, 1)
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
  <h2>告诉我们您的技能</h2>
  <h4>从你最有经验的开始</h4>
  <a-divider/>
  <a-form v-for="(skillInfo, index) in skillsComputed" :model="skillInfo" :rules="rules" ref="formRefs">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel :header="`${skillInfo.skill}-${skillInfo.percent}`" :key="skillInfo.id">
        <template #extra>
          <DeleteOutlined @click="() => delItem(index)"/>
        </template>
        <a-row>
          <a-col :span="11">
            <a-form-item label="技能" name="skill" has-feedback>
              <a-input placeholder="在此处输入你的技能" v-model:value="skillInfo.skill"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="掌握程度" name="percent" has-feedback>
              <a-slider v-model:value="skillInfo.percent" :step="10" :marks="marks" show-stops/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
    <a-divider/>
  </a-form>
  <a-divider/>
  <a-button type="primary" @click="addItem">添加工作技能</a-button>
  <a-divider/>
</template>

<style scoped>
</style>