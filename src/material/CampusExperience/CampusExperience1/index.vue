<script lang="ts" setup>
import {ICAMPUSEXPERIENCE} from "../../../interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";

defineProps<{
  modelData: ICAMPUSEXPERIENCE;
  modelStyle: IMODELSTYLE; // 模块样式
}>();
</script>

<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <div v-for="(item, index) in modelData.LIST" :key="index">
      <a-flex justify="space-between">
        <div>{{item.date}}</div>
        <div>{{item.campusDuty}}</div>
        <div>{{item.campusBriefly}}</div>
      </a-flex>
      {{item.campusContent}}
      <hr />
    </div>
  </div>
</template>

<style scoped>
.campus-experience {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
}
</style>