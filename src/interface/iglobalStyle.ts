interface IGlobalStyle {
  themeColor: string; // 主题色
  firstTitleFontSize: string; // 一级标题字体大小
  secondTitleFontSize: string; // 二级标题字体大小
  textFontSize: string; // 正文字体大小
  secondTitleColor: string; // 二级标题字体颜色
  textFontColor: string; // 正文字体颜色
  secondTitleWeight: number; // 二级标题字体粗细
  textFontWeight: number; // 正文字体粗细
  pTop: string; // 上内边距
  pBottom: string; // 下内边距
  pLeftRight: string; // 左右内边距
  modelMarginTop: string; // 外上边距
  modelMarginBottom: string; // 外下边距
  leftWidth: string; // 左右布局时左侧宽度
  rightWidth: string; // 左右布局时右侧宽度
  leftThemeColor: string; // 左侧布局时左侧背景色
  rightThemeColor: string; // 右侧布局时右侧背景色
}
export default IGlobalStyle;