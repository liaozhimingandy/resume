<script setup>
import {reactive, ref} from "vue";
import {Plus, Delete} from "@element-plus/icons-vue";

import {v4 as uuidv4} from 'uuid';

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
    let isValidT = await formRefs.value[index].validate(((valid, fields) => {
      console.info(fields);
    }));
    if (!isValidT) {
      isValid = false;
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
  <el-divider border-style="dashed"/>
  <el-collapse accordion v-if="skillInfos.length>0">
    <div v-for="(skillInfo, index) in skillInfos" :key="skillInfo.skill_id">
      <el-form ref="formRefs" :model="skillInfo" :rules="rules" status-icon>
        <el-collapse-item :name="index">
          <template #title>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ skillInfo.skill }}-{{ skillInfo.percent }}</span>
              <el-button @click="()=>{ delSkillInfo(index) }" :icon="Delete" text/>
            </div>
          </template>
            <el-row>
              <el-col :span="11">
                <el-form-item label="技能" prop="skill">
                  <el-input placeholder="在此处输入你的技能" v-model="skillInfo.skill"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="掌握程度" prop="percent" style="max-width: 20vw">
                  <el-slider v-model="skillInfo.percent" :step="10" :marks="marks" show-stops/>
                </el-form-item>
              </el-col>
            </el-row>
        </el-collapse-item>
        <el-divider border-style="dashed"/>
      </el-form>
    </div>
  </el-collapse>
  <el-button type="primary" :icon="Plus" @click="addSkillInfo">添加工作经验</el-button>
  <el-divider border-style="dashed"/>
</template>

<style scoped>

</style>