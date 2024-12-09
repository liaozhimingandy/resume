import IGlobalStyle from './iglobalStyle';
import { IMaterial } from './IMaterial';

interface IRESUME {
  ID: string; // 模板Id
  NAME: string; // 名称
  TITLE: string; // 标题
  LAYOUT: string; // 布局
  COMPONENTS: Array<IMaterial | any>; // 模板内组件列表
  GLOBAL_STYLE: IGlobalStyle | any; // 全局样式
}
export default IRESUME
;