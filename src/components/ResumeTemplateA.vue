<script setup>

const basicInfo = defineModel("basicInfo");
const workInfos = defineModel("workInfos");
const educationInfos = defineModel("educationInfos");
const skills = defineModel("skillInfos");
const aboutMeInfo = defineModel("aboutMeInfo")

</script>

<template>
  <div style="min-height: 297mm; padding: 8px">
    <el-row style="background-color: darkgray;">
      <el-col :span="16">
        <div>{{ basicInfo.first_name }}{{ basicInfo.last_name }}</div>
        <div>{{ basicInfo.tel_no }}</div>
        <div>{{ basicInfo.email }}</div>
      </el-col>
      <el-col :span="6" offset="2" style="text-align: center; align-content: center">个人简历</el-col>
    </el-row>
    <el-row>
      <h4 style="margin: 0">自我描述</h4>
      <el-divider border-style="dashed"/>
      {{ aboutMeInfo.desc }}
    </el-row>
    <el-row style="margin-top: 8px">
      <el-col :span="15">
        <h4 style="margin: 0">工作经历</h4>
        <el-divider border-style="dashed"/>
        <div v-for="(workinfo, index) in workInfos">
          <el-row>
            <el-col :span="13" :offset="1">
              <div>{{ workinfo.title }}</div>
              <div>{{ workinfo.gmt_start }}~{{ workinfo.gmt_end }}</div>
            </el-col>
            <el-col :span="9" style="justify-content: flex-end; display: flex">
              <el-badge :value="index+1" :max="99" :offset="[10, 5]">
                <h4 style="margin: 0">{{ workinfo.firm }}</h4>
              </el-badge>
            </el-col>
          </el-row>
          <div>
            {{ workinfo.desc }}
          </div>
        </div>
      </el-col>
      <el-col :span="8" :offset="1">
        <h4 style="margin: 0">工作技能</h4>
        <el-divider border-style="dashed"/>
        <div v-for="(skill) in skills">
          <h6 style="margin: 0">{{ skill.skill }}</h6>
          <el-progress
              :percentage="skill.percent"
              :stroke-width="8"
              striped
              striped-flow
              :duration="10"
          />
        </div>
        <h4>教育</h4>
        <el-divider border-style="dashed"/>
        <div v-for="(education, index) in educationInfos">
          <el-badge :value="index+1" :max="99" :offset="[10, 5]">
            <h4 style="margin: 0">{{ education.certificate }}</h4>
          </el-badge>
          <h5 style="margin: 0">{{ education.edu_unit }}</h5>
          <div>
            {{ education.gmt_edu_start }}~{{ education.gmt_edu_end }}
          </div>
          <p style="margin: 0">{{ education.edu_desc }} </p>
        </div>
        <br/>
        <h4 style="margin: 4px">兴趣爱好</h4>
        <el-divider border-style="dashed"/>
        <p style="margin: 0">{{ aboutMeInfo.desc }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-divider {
  margin: 0;
  padding: 0;
}
</style>