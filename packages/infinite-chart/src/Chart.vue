<template>
  <div class="chart">
    <div :id="id"></div>
    <slot></slot>
  </div>
</template>

<script>
import { Chart } from '@antv/g2'
import propsConfig from './props'

export default {
  name: 'Chart',
  props: Object.assign(
    {
      id: String
    },
    propsConfig
  ),
  data () {
    return {
      // TODO 组成默认配置，还是继续合并
      componentConfig: {
        Axis: null,
        ToolTips: null
      }
    }
  },
  mounted () {
    const tooltip = this.getSlots('ToolTips')
    const axis = this.getSlots('Axis')
    const line = this.getSlots('ChartLine')
    console.log('====================================')
    console.log(axis)
    console.log('====================================')
    // 设置当前的对象配置信息
    this.componentConfig = {
      Axis: this.getSlotAttrs(axis),
      ToolTips: this.getSlotAttrs(tooltip),
      Line: this.getSlotAttrs(line)
    }
    this.render()
  },
  methods: {
    render () {
      const { autoFit, id, width, height, chartData, componentConfig, scale } = this
      const chart = new Chart({
        container: id,
        autoFit,
        width,
        height
      })
      chart.data(chartData)
      // 配置坐标轴
      const {
        Axis,
        ToolTips,
        Line
      } = componentConfig
      // 坐标轴会是一个数组，可以针对多坐标轴
      if (Axis && Axis.length) {
        Axis.map(axisConfig => {
          const { name } = axisConfig
          console.log('====================================');
          console.log(name, axisConfig);
          console.log('====================================');
          // 如果没有配置name, 那么针对的就是所有的坐标轴
          if (!name) {
            chart.axis(axisConfig)
          } else {
            chart.axis(name, axisConfig)
          }
        })
      }
      console.log('====================================');
      console.log('scale', scale);
      console.log('====================================');
      // 获取scale
      scale.map(item => {
        const { name, config } = item
        if (name) {
          console.log('====================================');
          console.log('config-->', config);
          console.log('====================================');
          chart.scale(name, config)
        }
      })
      // 配置提示框
      if (!ToolTips.length) {
        chart.tooltip(false)
      } else {
        // 读取slot 对应的配置信息
        // 获取 itemTplFunc
        const itemTpl = ToolTips[0].itemTplFunc()
        ToolTips[0].itemTpl = itemTpl
        chart.tooltip(ToolTips[0])
      }
      // 获取line 相关的配置
      let {
        position,
        size = 1,
        shape = 'smooth',
        color
      } = Line[0]
      let line = chart.line({
        sortable: true
      })
      if (position) {
        line.size(size).position(position).shape(shape)
      }
      if (color) {
        line.color(color)
      }
      this.chart = chart
      chart.render()
    },
    /**
     * @description 获取内部的slots以及配置类型
     * @param {String} slotName
     * @param {String} type
     * @version 当组件内部同名组件多于一个，只会使用第一个的配置
     */
    getSlots (slotName, type = 'default') {
      const { $slots } = this
      // 获取所有的slots
      const slots = $slots[type]
      const result = slots.filter(item => {
        const { componentOptions } = item
        return componentOptions.tag.includes(slotName)
      }) || []
      return result
    },
    /**
     * @param {Array} 传入的slot
     * @description 获取组件上的配置以及props
     *
     */
    getSlotAttrs (slot) {
      if (!slot.length) return
      const result = []
      slot.map(item => {
        const { componentOptions = {}, data = {} } = item
        const { propsData = {} } = componentOptions
        const { attrs = {} } = data
        result.push(Object.assign(propsData, attrs))
      })
      return result
    }
  }
}
</script>

<style>

</style>
