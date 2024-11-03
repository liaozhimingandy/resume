<script lang="ts" setup>
import {IINTERNSHIPEXPERIENCE} from "../../../interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";

defineProps<{
  modelData: IINTERNSHIPEXPERIENCE;
  modelStyle: IMODELSTYLE; // 模块样式
}>();

</script>

<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 校园经历 -->
     <div v-for="(item, index) in modelData.LIST" :key="index">
       <a-flex justify="space-between">
         <div>{{ item.date }}</div>
         <div>{{ item.companyName }}</div>
         <div>{{ item.posts }}</div>
       </a-flex>
       <ul>
         <li v-for="content in item.jobContent">{{ content.content }}</li>
       </ul>
       <hr />
     </div>
  </div>
</template>

<style scoped>
.internship-experience {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>