<script lang="ts" setup>
import {IEDUBACKGROUND} from "@/interface/imaterialItems";
import IMaterialStyle from "@/interface/IMaterialStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";
import {computed} from "vue";

const props = defineProps<{
  modelData: IEDUBACKGROUND;
  modelStyle: IMaterialStyle; // 模块样式
}>();
const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="edu-background" v-if="modelData.LIST.length > 0">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <div class="content">
      <!-- 教育背景 -->
      <div v-for="(education, index) in modelData.LIST">
        <a-row>
          <a-col :span="6">
            <a-typography-text v-show="modelData.isShow.date" class="info">{{ education.date[0] }} -
              {{ education.date[1] }}
            </a-typography-text>
          </a-col>
          <a-col :span="6">
            <a-typography-text v-show="modelData.isShow.schoolName" class="info">{{
                education.schoolName
              }}
            </a-typography-text>
          </a-col>
          <a-col :span="10">
            <a-typography-text v-show="modelData.isShow.majorCourse" class="info">{{
                education.majorCourse
              }}
            </a-typography-text>
          </a-col>
          <a-col :span="2">
            <a-typography-text v-show="modelData.isShow.degree" class="info">{{ education.degree }}</a-typography-text>
          </a-col>
        </a-row>
        <a-divider v-if="index+1<modelData.LIST.length" class="divider" :dashed="true"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edu-background {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');
  box-sizing: border-box;

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

.content {
  padding-left: 30px;
  padding-top: 8px;
}


.info {
  width: auto;
  font-size: v-bind('modelStyle.titleFontSize');
  color: v-bind('modelStyle.textColor');
  font-weight: v-bind('modelStyle.titleFontWeight');
}

.divider {
  height: 1px;
  background-color: v-bind('modelStyle.themeColor');
  margin: 2px 0
}
</style>