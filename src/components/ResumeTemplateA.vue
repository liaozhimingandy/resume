<script setup>

const basicInfo = defineModel("basicInfo");
const workInfos = defineModel("workInfos");
const educationInfos = defineModel("educationInfos");
const skills = defineModel("skillInfos");
const aboutMeInfo = defineModel("aboutMeInfo")

</script>
<template>
  <div style="min-height: 297mm; padding: 8px">
    <a-row style="background-color: darkgray;">
      <a-col :span="16">
        <div>{{ basicInfo.first_name }}{{ basicInfo.last_name }}</div>
        <div>{{ basicInfo.tel_no }}</div>
        <div>{{ basicInfo.email }}</div>
      </a-col>
      <a-col :span="6" offset="2" style="text-align: center; align-content: center">个人简历</a-col>
    </a-row>
    <a-row>
      <h4 style="margin: 0">自我描述</h4>
      <a-divider/>
      {{ aboutMeInfo.desc }}
    </a-row>
    <a-row style="margin-top: 8px">
      <a-col :span="15">
        <h4 style="margin: 0">工作经历</h4>
        <a-divider/>
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
          <div>
            {{ workInfo.desc }}
          </div>
        </div>
      </a-col>
      <a-col :span="8" :offset="1">
        <h4 style="margin: 0">工作技能</h4>
        <a-divider/>
        <div v-for="(skill) in skills">
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
        <a-divider/>
        <div v-for="(education, index) in educationInfos">
          <a-badge :value="index+1" :max="99" :offset="[10, 5]">
            <h4 style="margin: 0">{{ education.certificate }}</h4>
          </a-badge>
          <h5 style="margin: 0">{{ education.edu_unit }}</h5>
          <div>
            {{ education.gmt_edu_start }}~{{ education.gmt_edu_end }}
          </div>
          <p style="margin: 0">{{ education.edu_desc }} </p>
        </div>
        <br/>
        <h4 style="margin: 4px">兴趣爱好</h4>
        <a-divider/>
        <p style="margin: 0">{{ aboutMeInfo.desc }}</p>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.a-divider {
  margin: 0;
  padding: 0;
}
</style>