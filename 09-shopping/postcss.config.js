module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏幕宽度 iphonex
      // 设计图750,调成1倍 => 适配375的标准屏幕
      // 设计图600，调成1倍 => 适配300的标准屏幕
      viewportWidth: 375
    }
  }
}
