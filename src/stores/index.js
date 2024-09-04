import {defineStore} from 'pinia';
import {ref} from 'vue';

// 第一个参数是应用程序中 stores 的唯一 id
// https://juejin.cn/post/7278246015182061583
const BasicInfoStore = defineStore({
    id: 'basicInfo',
    state: () => {
        const first_name = ref('张');
        const last_name = ref('三')
        const tel_no = ref('19507072137')
        const email = ref('aa@gg.com')
        const province = ref('jiangxi')
        const city = ref('nanchang')

        return {first_name, last_name, tel_no, email, province, city}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'basicInfo',
                storage: localStorage,
            },
        ],
    },
});

// 工作信息
const WorkStore = defineStore({
    id: 'works',
    state: () => {
        const works = ref([])
        return {works}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'works',
                storage: localStorage,
            },
        ],
    },
});

// 技能信息
const SkillStore = defineStore({
    id: 'skills',
    state: () => {
        const skills = ref([])
        return {skills}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'skills',
                storage: localStorage,
            },
        ],
    },
});

// 教育信息
const EduStore = defineStore({
    id: 'edus',
    state: () => {
        const edus = ref([])
        return {edus}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'edus',
                storage: localStorage,
            },
        ],
    },
});

// 关于我的
const AboutMeStore = defineStore({
    id: 'aboutMe',
    state: () => {
        const profile = ref(null);
        const desc = ref(null)
        return {profile, desc}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'aboutMe',
                storage: localStorage,
            },
        ],
    },
});

export {BasicInfoStore, SkillStore, EduStore, AboutMeStore, WorkStore}