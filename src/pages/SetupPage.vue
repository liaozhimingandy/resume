<template>
  <contextHolder/>
  <a-row style="min-height: 100vh; background-color: darkgray">
    <a-col :xs="24" :sm="12" :md="12" style="background-color: #f9f9f9; padding: 8px">
      <a-steps size="small" label-placement="vertical" v-model:current="active" :items="steps"/>
      <BasicInfo v-if="active==0" ref="basicInfoRef"></BasicInfo>
      <WorkInfo v-else-if="active==1" ref="workInfoRef"></WorkInfo>
      <EducationInfo v-else-if="active==2" ref="educationInfoRef"></EducationInfo>
      <SkillInfo v-else-if="active==3" ref="skillRef"></SkillInfo>
      <AboutMeInfo v-else-if="active==4" ref="aboutMeInfoRef"></AboutMeInfo>
      <a-result v-else
                status="success"
                title="您的简历已完成,真棒!"
                sub-title="您现在可以去预览界面进行查看,并且保存到本地进行打印"
      />
      <a-space style="width: 100%; justify-content: space-between">
        <a-button v-show="active!=0" @click="()=> active--" type="primary" size="large">上一步</a-button>
        <a-button @click="next" type="primary" size="large">下一步</a-button>
      </a-space>
    </a-col>
    <a-col :xs="24" :sm="12" :md="12" style="background-color: #E9EBEE;">
      <a-layout>
        <a-layout-header style="background-color: #E9EBEE; text-align: center">
          <a-button type="primary">
            <router-link :to="{name: 'preview'}">转到预览界面</router-link>
          </a-button>
        </a-layout-header>
        <a-layout-content>
          <a-col :span="18" :offset="3" style="background-color: #f9f9f9; margin-top: 3px">
            <Default/>
          </a-col>
        </a-layout-content>
      </a-layout>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

import {notification} from "ant-design-vue";

const [api, contextHolder] = notification.useNotification();

import BasicInfo from "../components/BasicInfo.vue";
import Default from "../templates/Default.vue";
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
