import {useResumeJsonStore, useSelectMaterialStore} from "./resume";
import {useUuidStore} from "./uuid"
import {initResetFun} from "@/utils/storeTools";

export interface IAppStore {
    useSelectMaterialStore: ReturnType < typeof useSelectMaterialStore >;
    useResumeJsonStore: ReturnType < typeof useResumeJsonStore >;
    useUuidStore: ReturnType<typeof useUuidStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
    appStore.useResumeJsonStore = useResumeJsonStore();
    appStore.useSelectMaterialStore = useSelectMaterialStore();
    appStore.useUuidStore = useUuidStore();

    // 重写reset方法
    initResetFun(appStore);
}

export default appStore;