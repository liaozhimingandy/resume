<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import {useRoute} from "vue-router";
import IRESUMEJSON from "@/interface/iresume";
import {storeToRefs} from "pinia";
import {COMPONENTS} from "@/constants.ts";

import {notification} from "ant-design-vue";

const [api, contextHolder] = notification.useNotification();

import instance from '@/services/'
import appStore from '@/stores/app.ts';
import custom from '@/templates/custom/index.vue';
import BaseInfoDisaplays from "@/options/displays/BaseInfoDisaplay.vue";
import EduBackgroundDisplay from "@/options/displays/EduBackgroundDisplay.vue";
import SkillSpecialtiesDisplay from "@/options/displays/SkillSpecialtiesDisplay.vue";
import WorkExperienceDisplay from "@/options/displays/WorkExperienceDisplay.vue";
import JobIntentionDisplay from "@/options/displays/JobIntentionDisplay.vue";
import cloneDeep from "lodash/cloneDeep";
import SelfEvaluationDisplay from "@/options/displays/SelfEvaluationDisplay.vue";

const route = useRoute(); // 获取路由参数
const template_id = route.params.template_id

const {resumeJsonStore} = storeToRefs(appStore.useResumeJsonStore);
// 简历模板信息
let TEMPLATE_JSON: IRESUMEJSON;

// 步骤数据
const steps_need = ref<Array<any>>(['基础资料', '求职意向', '教育背景', '工作经验', '技能特长', '自我评价']);
const steps = computed(() => {
  let data = cloneDeep(resumeJsonStore.value.COMPONENTS.map((item) => ({
  "component_id": item["keyId"],
  "title": item["cptTitle"]
}))
    .filter((item) => steps_need.value.includes(item["title"])));
  data.push({
    "component_id": "finish",
    "title": "完成"
  });
  return data;
});

// 获取模板信息
const getResumeData = async () => {
  if (template_id) {
    instance.get(`/templates/${template_id}.json`).then((res) => {
      TEMPLATE_JSON = res.data as IRESUMEJSON;
      appStore.useResumeJsonStore.updateResumeJsonData(TEMPLATE_JSON);
      console.info(appStore.useResumeJsonStore)
    }).catch((err) => api.error({
      message: '温馨提示',
      description: "获取模板信息失败"
    }))
  }
};

onMounted(() => getResumeData());

// 目前激活的步骤
const active = ref(0);

</script>
<template>
  <contextHolder/>
  <a-row style="min-height: 100vh; background-color: darkgray">
    <a-col :xs="24" :sm="12" :md="12" style="background-color: #f9f9f9; padding: 8px">
      <a-steps size="small" label-placement="vertical" :current="active" :items="steps"/>

      <base-info-disaplays
          v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.BASE_INFO.ID"
          :is_editor="false"/>
      <job-intention-display
          v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.JOB_INTENTION.ID"
          :is_editor="false"></job-intention-display>
      <edu-background-display v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.EDU_BACKGROUND.ID"
        :is_editor="false" />
      <skill-specialties-display v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.SKILL_SPECIALTIES.ID" :is_editor="false" />
      <work-experience-display v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.WORK_EXPERIENCE.ID" :is_editor="false" />
      <self-evaluation-display v-if="steps.length > 0 && steps[active]['component_id'] === COMPONENTS.SELF_EVALUATION.ID" :is_editor="false" />
      <a-result v-if="active==steps.length-1"
                status="success"
                title="您的简历已完成,真棒!"
                sub-title="您现在可以去预览界面进行查看,并且保存到本地进行打印"
      />
      <a-space style="width: 100%; justify-content: space-between">
        <a-button v-show="active!=0" @click="active--" type="primary" size="large">上一步</a-button>
        <a-button @click="active++" type="primary" size="large">下一步</a-button>
      </a-space>
    </a-col>
    <a-col :xs="24" :sm="12" :md="12" style="background-color: #E9EBEE;">
      <a-layout>
        <a-layout-header style="background-color: #E9EBEE; text-align: center">
          <a-button type="primary">
            <router-link :to="{name: 'preview_v2'}">转到全屏预览界面</router-link>
          </a-button>
        </a-layout-header>
        <a-layout-content>
          <a-col style="background-color: #f9f9f9; margin-top: 3px; transform: scale(0.75); transform-origin: top;">
            <component :is="custom" is-preview="true"/>
          </a-col>
        </a-layout-content>
      </a-layout>
    </a-col>
  </a-row>
</template>
<style scoped>
</style>
