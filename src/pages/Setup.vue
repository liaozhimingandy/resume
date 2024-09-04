<template>
  <contextHolder />
  <a-row style="min-height: 100vh; background-color: darkgray">
    <a-col :span="12" style="background-color: #f9f9f9; padding: 8px">
      <a-steps size="small" label-placement="vertical" :current="active" :items="steps"/>
      <BasicInfo v-if="active==0" ref="basicInfoRef"></BasicInfo>
      <WorkInfo v-else-if="active==1" ref="workInfoRef"></WorkInfo>
      <EducationInfo v-else-if="active==2" ref="educationInfoRef" ></EducationInfo>
      <SkillInfo v-else-if="active==3" ref="skillRef"></SkillInfo>
      <AboutMeInfo v-else-if="active==4" ref="aboutMeInfoRef"></AboutMeInfo>
      <div style="display: flex; justify-content: flex-end; width: 45vw">
        <a-button style="margin-top: 12px" @click="next" type="primary" size="large">下一步</a-button>
      </div>
    </a-col>
    <a-col :span="12" style="background-color: #888888;">
      <div style="background-color: darkcyan; text-align: center">
        <router-link :to="{name: 'preview'}">跳转到预览</router-link>
      </div>
      <a-col :span="18" :offset="3" style="background-color: #f9f9f9;">
        <Default />
      </a-col>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

import {notification} from "ant-design-vue";
const [api, contextHolder] = notification.useNotification();

import BasicInfo from "../components/BasicInfo.vue";
import Default from "../templates/Defatult.vue";
import WorkInfo from "../components/Experience.vue";
import EducationInfo from "../components/Education.vue";
import SkillInfo from "../components/Skill.vue";
import AboutMeInfo from "../components/AboutMe.vue";

// 步骤数据
const steps = ref([
  {title: "第一步", description: "基本信息"},
  {title: "第二步", description: "工作经验"},
  {title: "第三步", description: "教育信息"},
  {title: "第四步", description: "工作技能"},
  {title: "第五步", description: "关于我的"},
  {title: "第六步", description: "简历完成"},
]);

// 目前激活的步骤
const active = ref(0);
// 基本信息
const basicInfoRef = ref(null);
// 工作经验
const workInfoRef = ref(null);
// 教育信息
const educationInfoRef = ref(null);
// 技能信息
const skillRef = ref(null)
// 关于我的
const aboutMeInfoRef = ref(null);

// 按钮点击下一步操作
const next = async () => {
  try {
    let isValid = true;
    if (active.value == 0) {
      isValid = await basicInfoRef.value.validateForm();
    } else if (active.value == 1) {
      isValid = await workInfoRef.value.validateForm();
    } else if (active.value == 2) {
      isValid = await educationInfoRef.value.validateForm();
    } else if (active.value == 3) {
      isValid = await skillRef.value.validateForm();
    } else if (active.value == 4) {
      isValid = await aboutMeInfoRef.value.validateForm();
    }
    if (isValid) {
      if (active.value++ > 4) active.value = 0;
    } else {
      api.info({
        message: '温馨提示',
        description: '请填写相关信息,然后再下一步'
      })
    }
  } catch (err) {
    console.log(err)
    api.error({
      message: '提示信息',
      description: '系统错误'
    })
  }
}
</script>

<style scoped>

</style>
