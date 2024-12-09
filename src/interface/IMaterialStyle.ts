// 组件样式
interface IMaterialStyle {
  themeColor: string; // 主题色
  firstTitleFontSize: string; // 一级标题
  textColor: string; // 正文颜色
  textFontSize: string; // 正文字体大小
  textFontWeight: number; // 正文粗细
  titleColor: string; // 标题颜色
  titleFontSize: string; // 标题字体大小
  titleFontWeight: number; // 标题字体粗细
  backgroundColor: string; // 背景颜色
  pLeftRight: string; // 左右内边距
  pTop: string; // 上内边距
  pBottom: string; // 下内边距
  mBottom: string; // 外下边距
  mTop: string;  // 外上边距
}
export default IMaterialStyle;