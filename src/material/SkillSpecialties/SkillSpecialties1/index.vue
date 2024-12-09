<script lang="ts" setup>
import {ISKILLSPECIALTIES} from "@/interface/imaterialItems";
import IMaterialStyle from "../../../interface/IMaterialStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";
import {computed} from "vue";

const props = defineProps<{
  modelData: ISKILLSPECIALTIES;
  modelStyle: IMaterialStyle; // 模块样式
}>();

defineOptions({
  name: 'SKILL_SPEC_1'
});
const left = computed(()=> (Number(props.modelStyle.pLeftRight.split('px')[0]))+ 23 + 'px');
</script>

<template>

  <div class="skill-specialties" v-if="modelData.LIST.length > 0">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <!-- 技能特长 -->
    <div>
    <a-flex justify="space-between">
      <span v-for="data in modelData.LIST">
        <span class="content"> {{data.skillName}} </span>
      </span>
    </a-flex>
    </div>
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
  &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
}

.content{
  padding-left: 30px;
  padding-top: 8px;
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>