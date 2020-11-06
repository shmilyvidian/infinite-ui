<script>
import ElInput from 'element-ui/lib/input'
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import DatePicker from 'element-ui/lib/date-picker'
import ElSwitch from 'element-ui/lib/switch'
import InfiniteSelectTags from '../../infinite-select-tags/src'

export default {
  name: 'InfiniteFormItem',
  data () {
    return {
      models: this.formModels
    }
  },
  components: {
    ElInput,
    ElSelect,
    ElOption,
    DatePicker,
    ElSwitch,
    InfiniteSelectTags
  },
  props: {
    itemData: {
      type: Object,
      default: () => { },
      required: true
    },
    formModels: {
      type: Object,
      default: () => { }
    }
  },
  render (h, context) {
    const { itemData, formModels } = this
    const placeholder = itemData.placeholder || ''
    formModels[itemData.key] = formModels[itemData.key] || itemData.defaultValue
    switch (itemData.type) {
      case 'component':
        return itemData.component((vNode, option = {}, children = []) => {
          const component = h(vNode, option, children)
          let flag = vNode.model && vNode.model.event && vNode.model.prop
          component.componentOptions.propsData[flag ? vNode.model.prop : 'value'] = formModels[itemData.key]
          component.componentOptions.listeners[flag ? vNode.model.event : 'input'] = (val) => {
            formModels[itemData.key] = val
          }
          console.log(22222, component)
          return component
        })
      case 'input':
        return (<el-input placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      case 'select':
        return (<el-select placeholder={placeholder} class={itemData.class} clearable={itemData.clearable} v-model={formModels[itemData.key]}>
          {
            (itemData.options || []).map(o => (<el-option label={o.label} value={o.id} />))
          }
        </el-select>)
      case 'switch':
        return (<el-switch v-model={formModels[itemData.key]}></el-switch>)
      case 'textarea':
        return (<el-input type="textarea" placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      case 'radio':
        return (<el-input placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      case 'own':
        return ''
      case 'date':
        return (
          <el-date-picker
            v-model={formModels[itemData.key]}
            align="right"
            type="date"
            placeholder="选择日期"
          // picker-options={}
          >
          </el-date-picker>
        )

      default:
        return null
    }
  }
}
</script>
