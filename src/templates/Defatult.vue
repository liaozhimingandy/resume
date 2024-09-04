<script setup>

import {AboutMeStore, BasicInfoStore, EduStore, SkillStore, WorkStore} from "../stores/index.js";
import {computed} from "vue";

const basicInfoStore = BasicInfoStore();
const basicInfoComputed = computed(() => basicInfoStore);

const workStore = WorkStore();
const workInfos = computed(() => workStore.works);

const eduStore = EduStore();
const educationInfos = computed(() => eduStore.edus);;

const skillStore = SkillStore();
const skillsComputed = computed(() => skillStore.skills);

const aboutMeStore = AboutMeStore();
const aboutMeInfo = computed(() => aboutMeStore);

</script>
<template>
  <div style="min-height: 297mm; padding: 8px">
    <a-row style="background-color: darkgray;">
      <a-col :span="16">
        <div>{{ basicInfoComputed.first_name }}{{ basicInfoComputed.last_name }}</div>
        <div>{{ basicInfoComputed.tel_no }}</div>
        <div>{{ basicInfoComputed.email }}</div>
      </a-col>
      <a-col :span="6" offset="2" style="text-align: center; align-content: center">个人简历</a-col>
    </a-row>
    <a-row>
      <h4>自我描述</h4>
      <a-divider :dashed="true"/>
      <div v-html="aboutMeInfo.desc"></div>
    </a-row>
    <a-row>
      <a-col :span="15">
        <h4>工作经历</h4>
        <a-divider :dashed="true"/>
        <div v-for="(workInfo, index) in workInfos">
          <a-row>
            <a-col :span="13" :offset="1">
              <div>{{ workInfo.title }}</div>
              <div>{{ workInfo.gmt_start }}~{{ workInfo.gmt_end }}</div>
            </a-col>
            <a-col :span="9" style="justify-content: flex-end; display: flex">
              <a-badge :count="index+1" :max="99" :offset="[10, 5]">
                <h4 style="margin: 0">{{ workInfo.firm }}</h4>
              </a-badge>
            </a-col>
          </a-row>
          <div v-html="workInfo.desc" />
        </div>
      </a-col>
      <a-col :span="8" :offset="1">
        <h4>工作技能</h4>
        <a-divider :dashed="true"/>
        <div v-for="(skill) in skillsComputed">
          <h6 style="margin: 0">{{ skill.skill }}</h6>
          <a-progress
              :percent="skill.percent"
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
              }"
              status="active"
          />
        </div>
        <h4>教育</h4>
        <a-divider :dashed="true"/>
        <div v-for="(education, index) in educationInfos">
          <a-badge :value="index+1" :max="99" :offset="[10, 5]">
            <h4 style="margin: 0">{{ education.certificate }}</h4>
          </a-badge>
          <h5 style="margin: 0">{{ education.edu_unit }}</h5>
          <div>
            {{ education.gmt_edu_start }}~{{ education.gmt_edu_end }}
          </div>
          <div v-html="education.edu_desc" />
        </div>
        <br/>
        <h4 style="margin: 4px">兴趣爱好</h4>
        <a-divider :dashed="true"/>
        <div v-html="aboutMeInfo.desc" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.ant-divider {
  margin: 0;
  padding: 0;
}

h4 {
  margin-bottom: 4px;
}
</style>