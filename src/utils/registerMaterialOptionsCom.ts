// 注册每一个物料组件的属性面板

import BaseInfoOptionsVue from '@/options/BaseInfoOptions.vue'; // 基础资料模块属性设置
import EduBackgroundOptions from "@/options/EduBackgroundOptions.vue"; // 教育资料模块属性设置
import JobIntentionOptions from "@/options/JobIntentionOptions.vue";
import SkillSpecialtiesOptions from "@/options/SkillSpecialtiesOptions.vue";
import WorkExperienceOptions from "@/options/WorkExperienceOptions.vue";
import AwardsOptions from '@/options/AwardsOptions.vue';
import ProjectExperienceOptions from '@/options/ProjectExperienceOptions.vue';
import HobbiesOptions from '@/options/HobbiesOptions.vue';
import CampusExperienceOptions from '@/options/CampusExperienceOptions.vue';
import InternshipExperienceOptions from '@/options/InternshipExperienceOptions.vue';
import SelfEvalutionOptions from '@/options/SelfEvaluationOptions.vue';
import WorksDisplayOptions from "@/options/WorksDisplayOptions.vue";
import ResumeTitleOptions from '@/options/ResumeTitleOptions.vue';
import CustomOptionsVue from '@/options/CustomOptions.vue';

// 定义属性组件列表
const optionsComponents: any = {
  BASE_INFO_OPTIONS: BaseInfoOptionsVue,
  EDU_BACKGROUND_OPTIONS: EduBackgroundOptions,
  JOB_INTENTION_OPTIONS: JobIntentionOptions,
  SKILL_SPECIALTIES_OPTIONS: SkillSpecialtiesOptions,
  WORK_EXPERIENCE_OPTIONS: WorkExperienceOptions,
  AWARDS_OPTIONS: AwardsOptions,
  PROJECT_EXPERIENCE_OPTIONS: ProjectExperienceOptions,
  HOBBIES_OPTIONS: HobbiesOptions,
  CAMPUS_EXPERIENCE_OPTIONS: CampusExperienceOptions,
  INTERNSHIP_EXPERIENCE_OPTIONS: InternshipExperienceOptions,
  SELF_EVALUATION_OPTIONS: SelfEvalutionOptions,
  WORKS_DISPLAY_OPTIONS: WorksDisplayOptions,
  RESUME_TITLE_OPTIONS: ResumeTitleOptions,
  CUSTOM_OPTIONS_1: CustomOptionsVue,
};
export default optionsComponents;
