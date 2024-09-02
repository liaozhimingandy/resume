<script setup>
import {reactive, ref} from "vue";
import {v4 as uuidv4} from 'uuid';
import {DeleteOutlined} from "@ant-design/icons-vue";

const skillInfos = defineModel("skillInfos");
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

// 添加技能
const addSkillInfo = () => {
  skillInfos.value.push({
    skill_id: uuidv4(),
    skill: "",
    percent: 0
  });
};

// 校验规则
const rules = {
  skill: [
    {required: true, message: '请填写技能', trigger: 'blur'},
    {min: 1, max: 16, message: '长度必须介于1和16之间', trigger: ['blur', 'change']},
  ],
  percent: [
    {required: true, message: '请填写熟练程度', trigger: 'blur'},
  ]
};

const delSkillInfo = (index) => {
  // skillInfos.value = skillInfos.value.filter(item => item.skill_id !== skillInfo.skill_id);
  skillInfos.value.splice(index, 1)
}

// 校验表单
const validateForm = async () => {
  let isValid = true;
  for (let index in formRefs.value) {
    let isValidT = await formRefs.value[index].validate();
    if (!isValidT) {
      isValid = false;
    }
  }
  return isValid;
  // return new Promise((resolve,reject) => {
  //   let valid = formRefs.value[index].validate(((valid, fields)=> valid))
  //   resolve(valid)
  // })
}

// 暴露方法
defineExpose({validateForm})
</script>

<template>
  <h2>告诉我们您的技能</h2>
  <h4>从你最有经验的开始</h4>
  <a-divider/>
  <a-collapse v-if="skillInfos.length>0">
    <a-collapse-panel v-for="(skillInfo, index) in skillInfos" :key="index"
                      :header="`${skillInfo.skill}-${skillInfo.percent}`">
      <template #extra>
        <DeleteOutlined @click="() => delSkillInfo(index)"/>
      </template>
      <a-form ref="formRefs" :model="skillInfo" :rules="rules">
        <a-row :span="24">
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
      </a-form>
    </a-collapse-panel>
  </a-collapse>
  <a-divider/>
  <a-button type="primary" @click="addSkillInfo">添加工作技能</a-button>
  <a-divider/>
</template>

<style scoped>

</style>