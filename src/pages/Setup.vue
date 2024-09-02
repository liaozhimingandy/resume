<template>
  <el-row style="width: 100vw; min-height: 100vh; background-color: darkgray">
    <el-col :span="12" style="background-color: #f9f9f9;">
      <el-main>
        <el-steps style="max-width: 46vw" :active="active" finish-status="success" align-center>
          <el-step v-for="(step, index) in steps" :title="step.title" :description="step.description" :key="index"/>
        </el-steps>
        <BasicInfo v-if="active==0" ref="basicInfoRef" :basicInfoData="basicInfoComputed"></BasicInfo>
        <WorkInfo v-else-if="active==1" ref="workInfoRef" :workInfos="workInfos"></WorkInfo>
        <EducationInfo v-else-if="active==2" ref="educationInfoRef" :educationInfos="educationInfos"></EducationInfo>
        <SkillInfo v-else-if="active==3" ref="skillInfoRef" :skillInfos="skillsComputed"></SkillInfo>
        <AboutMeInfo v-else-if="active==4" ref="aboutMeInfoRef" :aboutMeInfo="aboutMeInfo"></AboutMeInfo>
        <div style="display: flex; justify-content: flex-end; width: 45vw">
          <el-button style="margin-top: 12px" @click="next" type="primary" size="large">下一步</el-button>
        </div>
      </el-main>
    </el-col>
    <el-col :span="12" style="background-color: #888888;">
      <div style="background-color: darkcyan; text-align: center">
        <router-link :to="{name: 'preview'}">跳转到预览</router-link>
      </div>
      <el-col :span="18" :offset="3" style="background-color: #f9f9f9;">
        <ResumeTemplateA :basicInfo="basicInfoComputed"
                         :workInfos="workInfos"
                         :educationInfos="educationInfos"
                         :aboutMeInfo="aboutMeInfo"
                         :skillInfos="skillsComputed">
        </ResumeTemplateA>
      </el-col>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue'
import BasicInfo from "../components/BasicInfo.vue";
import ResumeTemplateA from "../components/ResumeTemplateA.vue";
import WorkInfo from "../components/WorkInfo.vue";
import EducationInfo from "../components/EducationInfo.vue";
import SkillInfo from "../components/SkillInfo.vue";
import AboutMeInfo from "../components/AboutMeInfo.vue";

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

// 从pinpa加载数据
import {BasicInfoStore, SkillStore} from '../stores';
const basicInfoStore = BasicInfoStore();
const basicInfoComputed = computed(() => basicInfoStore);

// 表单数据
// 基本信息
const basicInfoRef = ref(null);


// 工作经验
interface workForm {
  firm: string
  title: string,
  gmt_start: string
  gmt_end: string
  is_doing: boolean
  desc: string
}


const workInfoRef = ref(null);
const workInfos = ref(<workForm>[{
  firm: "xxx科技",
  title: "1",
  gmt_start: "2024-08-21",
  gmt_end: "2024-08-26",
  is_doing: false,
  desc: ""
}]);


// 教育信息
const educationInfoRef = ref(null);
const educationInfos = ref([{
  edu_unit: "教育单位/机构",
  edu_desc: "教育描述",
  certificate: "获取的证书名称",
  gmt_edu_start: "2024-05-06",
  gmt_edu_end: "2024-05-08"
}]);

// 技能信息
const skillStore = SkillStore();
const skillsComputed = computed(() => skillStore.skills);

// 关于我的
const aboutMeInfoRef = ref(null);
const aboutMeInfo = ref({
  desc: "test",
  profile: "abc"
});

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
      isValid = await skillInfoRef.value.validateForm();
    } else if (active.value == 4) {
      isValid = await aboutMeInfoRef.value.validateForm();
    }
    if (isValid) {
      if (active.value++ > 4) active.value = 0;
    } else {
      ElMessage({
        message: '请填写相关信息,然后再下一步',
        type: 'warning',
      });
    }
  } catch (err) {
    console.log(err);
    ElMessage({
      message: '系统错误',
      type: 'error',
    })
  }
}
</script>

<style scoped>

</style>
