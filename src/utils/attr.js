export const styleData = [
    { key: 'left', label: 'x 坐标' },
    { key: 'top', label: 'y 坐标' },
    { key: 'rotate', label: '旋转角度' },
    { key: 'width', label: '宽' },
    { key: 'height', label: '高' },
    { key: 'color', label: '颜色' },
    { key: 'backgroundColor', label: '背景色' },
    { key: 'borderWidth', label: '边框宽度' },
    { key: 'borderStyle', label: '边框风格' },
    { key: 'borderColor', label: '边框颜色' },
    { key: 'borderRadius', label: '边框半径' },
    { key: 'fontSize', label: '字体大小' },
    { key: 'fontWeight', label: '字体粗细' },
    { key: 'lineHeight', label: '行高' },
    { key: 'letterSpacing', label: '字间距' },
    { key: 'textAlign', label: '左右对齐' },
    { key: 'verticalAlign', label: '上下对齐' },
    { key: 'opacity', label: '不透明度' },
    { key: 'otherColorLeft', label: '颜色1' },
    { key: 'otherColorRigth', label: '颜色2' },
    { key: 'otherBgColor', label: '背景色' },
    { key: 'reverse', label: '方向' },
    { key: 'borderTitle', label: '标题' },
    { key: 'borderTitleWidth', label: '边框标题宽度' },
    { key: 'dur', label: '单次动画时长(秒)' },
]

export const styleMap = {
    left: 'x 坐标',
    top: 'y 坐标',
    rotate: '旋转角度',
    width: '宽',
    height: '高',
    color: '颜色',
    backgroundColor: '背景色',
    borderWidth: '边框宽度',
    borderStyle: '边框风格',
    borderColor: '边框颜色',
    borderRadius: '边框半径',
    fontSize: '字体大小',
    fontWeight: '字体粗细',
    lineHeight: '行高',
    letterSpacing: '字间距',
    textAlign: '左右对齐',
    verticalAlign: '上下对齐',
    opacity: '不透明度',
}

export const textAlignOptions = [
    {
        label: '左对齐',
        value: 'left',
    },
    {
        label: '居中',
        value: 'center',
    },
    {
        label: '右对齐',
        value: 'right',
    },
]

export const borderStyleOptions = [
    {
        label: '实线',
        value: 'solid',
    },
    {
        label: '虚线',
        value: 'dashed',
    },
]

export const verticalAlignOptions = [
    {
        label: '上对齐',
        value: 'top',
    },
    {
        label: '居中对齐',
        value: 'middle',
    },
    {
        label: '下对齐',
        value: 'bottom',
    },
]

export const selectKey = ['textAlign', 'borderStyle', 'verticalAlign']

export const optionMap = {
    textAlign: textAlignOptions,
    borderStyle: borderStyleOptions,
    verticalAlign: verticalAlignOptions,
}
