const animationClassData = [
  {
    label: '进入',
    children: [
      { label: '渐显', value: 'fadeIn' },
      { label: '向右进入', value: 'fadeInLeft' },
      { label: '向左进入', value: 'fadeInRight' },
      { label: '向上进入', value: 'fadeInUp' },
      { label: '向下进入', value: 'fadeInDown' },
      { label: '向右长距进入', value: 'fadeInLeftBig' },
      { label: '向左长距进入', value: 'fadeInRightBig' },
      { label: '向上长距进入', value: 'fadeInUpBig' },
      { label: '向下长距进入', value: 'fadeInDownBig' },
      { label: '旋转进入', value: 'rotateIn' },
      { label: '左顺时针旋转', value: 'rotateInDownLeft' },
      { label: '右逆时针旋转', value: 'rotateInDownRight' },
      { label: '左逆时针旋转', value: 'rotateInUpLeft' },
      { label: '右逆时针旋转', value: 'rotateInUpRight' },
      { label: '弹入', value: 'bounceIn' },
      { label: '向右弹入', value: 'bounceInLeft' },
      { label: '向左弹入', value: 'bounceInRight' },
      { label: '向上弹入', value: 'bounceInUp' },
      { label: '向下弹入', value: 'bounceInDown' },
      { label: '光速从右进入', value: 'lightSpeedIn' },
      { label: '光速从右退出', value: 'lightSpeedOut' },
      { label: '中心X轴旋转', value: 'flipInX' },
      { label: '中心Y轴旋转', value: 'flipInY' },
      { label: '左长半径旋转', value: 'rollIn' },
      { label: '由小变大进入', value: 'zoomIn' },
      { label: '左变大进入', value: 'zoomInLeft' },
      { label: '右变大进入', value: 'zoomInRight' },
      { label: '向上变大进入', value: 'zoomInUp' },
      { label: '向下变大进入', value: 'zoomInDown' },
      { label: '向右滑动展开', value: 'slideInLeft' },
      { label: '向左滑动展开', value: 'slideInRight' },
      { label: '向上滑动展开', value: 'slideInUp' },
      { label: '向下滑动展开', value: 'slideInDown' }
    ]
  },
  {
    label: '强调',
    children: [
      { label: '弹跳', value: 'bounce' },
      { label: '闪烁', value: 'flash' },
      { label: '放大缩小', value: 'pulse' },
      { label: '放大缩小弹簧', value: 'rubberBand' },
      { label: '左右晃动', value: 'headShake' },
      { label: '左右扇形摇摆', value: 'swing' },
      { label: '放大晃动缩小', value: 'tada' },
      { label: '扇形摇摆', value: 'wobble' },
      { label: '左右上下晃动', value: 'jello' },
      { label: 'Y轴旋转', value: 'flip' }
    ]
  },
  {
    label: '退出',
    children: [
      { label: '渐隐', value: 'fadeOut' },
      { label: '向左退出', value: 'fadeOutLeft' },
      { label: '向右退出', value: 'fadeOutRight' },
      { label: '向上退出', value: 'fadeOutUp' },
      { label: '向下退出', value: 'fadeOutDown' },
      { label: '向左长距退出', value: 'fadeOutLeftBig' },
      { label: '向右长距退出', value: 'fadeOutRightBig' },
      { label: '向上长距退出', value: 'fadeOutUpBig' },
      { label: '向下长距退出', value: 'fadeOutDownBig' },
      { label: '旋转退出', value: 'rotateOut' },
      { label: '左顺时针旋转', value: 'rotateOutDownLeft' },
      { label: '右逆时针旋转', value: 'rotateOutDownRight' },
      { label: '左逆时针旋转', value: 'rotateOutUpLeft' },
      { label: '右逆时针旋转', value: 'rotateOutUpRight' },
      { label: '弹出', value: 'bounceOut' },
      { label: '向左弹出', value: 'bounceOutLeft' },
      { label: '向右弹出', value: 'bounceOutRight' },
      { label: '向上弹出', value: 'bounceOutUp' },
      { label: '向下弹出', value: 'bounceOutDown' },
      { label: '中心X轴旋转', value: 'flipOutX' },
      { label: '中心Y轴旋转', value: 'flipOutY' },
      { label: '左长半径旋转', value: 'rollOut' },
      { label: '由小变大退出', value: 'zoomOut' },
      { label: '左变大退出', value: 'zoomOutLeft' },
      { label: '右变大退出', value: 'zoomOutRight' },
      { label: '向上变大退出', value: 'zoomOutUp' },
      { label: '向下变大退出', value: 'zoomOutDown' },
      { label: '向左滑动收起', value: 'slideOutLeft' },
      { label: '向右滑动收起', value: 'slideOutRight' },
      { label: '向上滑动收起', value: 'slideOutUp' },
      { label: '向下滑动收起', value: 'slideOutDown' }
    ]
  }
];

animationClassData.forEach((item) => {
  item.children.forEach((e) => {
    // 是否在运行动画
    e.pending = false;

    // 动画默认运行时间
    e.animationTime = 1;
  });
});

export default animationClassData;
