<script lang="ts" setup>
import {ISKILLSPECIALTIES} from "@/interface/model";
import IMODELSTYLE from "../../../interface/modelStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";

defineProps<{
  modelData: ISKILLSPECIALTIES;
  modelStyle: IMODELSTYLE; // 模块样式
}>();

defineOptions({
  name: 'SKILL_SPEC_1'
});

</script>

<template>

  <div class="skill-specialties">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 技能特长 -->
    <a-flex justify="space-between">
      <span v-for="data in modelData.LIST">
        <a-button type="text" > {{data.skillName}} </a-button>
      </span>
    </a-flex>
  </div>
</template>

<style scoped>
.skill-specialties {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-top: v-bind('modelStyle.mTop');
  margin-bottom: v-bind('modelStyle.mBottom');
}
</style>