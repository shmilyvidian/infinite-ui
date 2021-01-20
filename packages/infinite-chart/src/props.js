const propsConfig = {
  // 自适应
  autoFix: {
    type: Boolean,
    default: true
  },
  // 宽度
  width: {
    type: String | Number,
    default: 600
  },
  // 高度
  height: {
    type: String | Number,
    default: 400
  },
  // 数据来源
  chartData: {
    type: Array,
    require: true
  },
  // 接受度量衡缩放
  scale: {
    type: Array,
    default: () => {
      return []
    }
  }
}

export default propsConfig
