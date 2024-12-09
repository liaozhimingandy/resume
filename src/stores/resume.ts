// 简历信息
import {defineStore} from "pinia";
import {ref} from "vue";
import cloneDeep from 'lodash/cloneDeep';
import RESUME_JSON from "../data/resume";
import IRESUMEJSON from "../interface/iresume";
import {IMaterial} from "../interface/IMaterial";

export const useResumeJsonStore = defineStore("resumeJson", () => {
    let resume_json = cloneDeep(RESUME_JSON); // 新的简历数据
    let importJson = ref<IRESUMEJSON>(resume_json); // 导入的JSON数据
    let resumeJsonStore = ref<IRESUMEJSON>(resume_json); // 保存的数据

    // 修改简历操作
    function updateResumeJsonData(obj: IRESUMEJSON) {
        resumeJsonStore.value = cloneDeep(obj);
    }

    // 修改导入的简历数据
    function updateImportJsonData(obj: IRESUMEJSON) {
        importJson.value = cloneDeep(obj);
    }

    // 新增简历的组件信息
    function addComponent(data: IMaterial) {
        resumeJsonStore.value.COMPONENTS.push(data);
    }

    // 重置简历信息
    function resetResumeJson() {
        resumeJsonStore.value = cloneDeep(RESUME_JSON);
    }

    return {
        resumeJsonStore,
        importJson,
        updateResumeJsonData,
        updateImportJsonData,
        addComponent,
        resetResumeJson
    }
});

// 操作是选中的组件Store
export const useSelectMaterialStore = defineStore("selectMaterialStore", () => {
    const cptName = ref<string>(''); // 选中的模块名称
    const cptOptionsName = ref<string>(''); // 选中的组件属性面板名称
    const cptTitle = ref<string>('全局主题设置'); // 选中的模块名称
    const cptKeyId = ref<string>(''); // 选中的模块KeyID

    // 更新
    function updateSelectModel(
        cptNameTxt: string,
        cptOptionsNameTxt: string,
        cptTitleTxt: string,
        cptKeyIdTxt: string
    ) {
        cptName.value = cptNameTxt;
        cptOptionsName.value = cptOptionsNameTxt;
        cptTitle.value = cptTitleTxt;
        cptKeyId.value = cptKeyIdTxt;
    }

    // 重置
    function resetSelectModel() {
        cptName.value = '';
        cptOptionsName.value = '';
        cptTitle.value = '全局主题设置';
        cptKeyId.value = '';
    }

    return {
        cptName,
        cptOptionsName,
        cptTitle,
        cptKeyId,
        updateSelectModel,
        resetSelectModel
    };
});