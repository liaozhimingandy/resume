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

const SkillStore = defineStore({
    id: 'skill',
    state: () => {
        const skills = ref([])
        return {skills}
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'skill',
                storage: localStorage,
            },
        ],
    },
});

export {BasicInfoStore, SkillStore}