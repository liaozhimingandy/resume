<script setup>
import {computed} from "vue";

import {PhoneOutlined, MailOutlined} from '@ant-design/icons-vue';

import {AboutMeStore, BasicInfoStore, EduStore, SkillStore, WorkStore} from "../stores/index.js";


const basicInfoStore = BasicInfoStore();
const basicInfo = computed(() => basicInfoStore);

const workStore = WorkStore();
const experiences = computed(() => workStore.works.sort((a, b) => {
  let date1 = new Date(a.gmt_start);
  let date2 = new Date(b.gmt_start);
  if (date1 === date2) {
      return new Date(b.gmt_end) - new Date(a.gmt_end) ;
    }
    return date2 - date1;
}));

const eduStore = EduStore();
const educations = computed(() => eduStore.edus.sort((a, b) => {
  let date1 = new Date(a.gmt_start);
  let date2 = new Date(b.gmt_start);
  if (date1 === date2) {
      return new Date(b.gmt_end) - new Date(a.gmt_end) ;
    }
    return date2 - date1;
}));

const skillStore = SkillStore();
const skills = computed(() => skillStore.skills.sort((a, b) => b.percent - a.percent));

const aboutMeStore = AboutMeStore();
const aboutMeInfo = computed(() => aboutMeStore);

const hopes = computed(() => basicInfo.value.hopes.join(','));

// 随机颜色
const colors = ['processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
const tag_color = () => colors[Math.floor(Math.random() * colors.length)];

</script>
<template>
  <div style="text-align: start; background-color: white">
    <a-row style="background-color: #959FA8;">
      <a-col :span="16" style="padding: 8px;">
        <a-typography>
          <a-typography-title :level="3">{{ basicInfo.first_name }}{{ basicInfo.last_name }}</a-typography-title>
          <a-typography-title :level="4">{{ hopes }}</a-typography-title>
          <a-typography-paragraph>
            <PhoneOutlined/>&nbsp;&nbsp;
            <a-typography-link type="link" block :href="`tel:${basicInfo.tel_no}`">
              <a-typography-text strong>{{ basicInfo.tel_no }}</a-typography-text>
              <br/>
            </a-typography-link>
            <MailOutlined/>&nbsp;&nbsp;<a-typography-link type="link" block :href="`mailto:${basicInfo.email}`">
            <a-typography-text strong>{{ basicInfo.email }}</a-typography-text>
          </a-typography-link>
          </a-typography-paragraph>
        </a-typography>
      </a-col>
      <a-col :span="6" offset="2" style="text-align: center; align-content: center">
        <h1 style="font-size: 50px">简历</h1>
      </a-col>
    </a-row>
    <div style="padding: 8px;" v-show="aboutMeInfo.profile">
      <h3>自我描述</h3>
      <hr/>
      <div v-html="aboutMeInfo.profile"/>
    </div>
    <a-row style="padding: 8px;">
      <a-col :span="15" v-show="experiences.length>0">
        <h3>工作经历</h3>
        <hr/>
        <div v-for="(experience, index) in experiences">
          <a-row>
            <a-col :span="8">
              <h4>{{ experience.title }}</h4>
              <div>{{ experience.gmt_start }}~{{ experience.gmt_end ? experience.gmt_end : '至今' }}</div>
            </a-col>
            <a-col :span="16" style="justify-content: flex-end; display: flex">
              <h4>{{ experience.firm }}<a-tag :color="tag_color()">{{ `#${experiences.length-index}` }}</a-tag></h4>
            </a-col>
          </a-row>
          <div v-html="experience.desc"/>
          <a-typography-text v-if="experience.techs.length>0">
            <a-typography-text strong>使用到的技术</a-typography-text>
            <a-space wrap>
              <a-tag v-for="tag in experience.techs" :color="tag_color()">{{ tag }}</a-tag>
            </a-space>
          </a-typography-text>
          <a-divider v-if="index+1<experiences.length" style="height: 2px; background-color: coral; margin: 8px 0" :dashed="true"/>
        </div>
      </a-col>
      <a-col :span="8" :offset="1">
        <h3 v-if="skills.length>0">工作技能</h3>
        <hr v-if="skills.length>0"/>
        <div v-for="(skill) in skills">
          <h4 style="margin: 0">{{ skill.skill }}</h4>
          <a-progress
              :percent="skill.percent"
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
              }"
              status="active"
          />
        </div>
        <h3 v-if="educations.length>0">教育</h3>
        <hr v-if="educations.length>0"/>
        <div v-for="(education, index) in educations">
          <a-badge :value="index+1" :max="99" :offset="[10, 5]">
            <h4 style="margin: 0">{{ education.certificate }}</h4>
          </a-badge>
          <div>{{ education.edu_unit }}</div>
          <div>
            {{ education.gmt_start }}~{{ education.gmt_end ? education.gmt_end : '至今' }}
          </div>
          <div v-html="education.edu_desc"/>
        </div>
        <br/>
        <h3 v-if="aboutMeInfo.desc">兴趣爱好</h3>
        <hr v-if="aboutMeInfo.desc"/>
        <div v-html="aboutMeInfo.desc"/>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 2px;
  margin-bottom: 4px;
}

h4 {
  margin: 0;
}
</style>