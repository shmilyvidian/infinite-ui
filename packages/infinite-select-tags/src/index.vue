<template>
  <div class="infinite-select-tags">
    <el-select
      ref="infiniteSekectTags"
      v-model="keys"
      multiple
      popper-class="infinite-select-popover"
      :placeholder="defaultPlaceholder"
      size="large"
    >
      <!-- popper展示核心内容 -->
      <div class="infinite-select-search" v-if="filterable">
          <el-input placeholder="请输入字段名称" prefix-icon="el-icon-search" @input="keyWordChange" />
      </div>
      <div class="infinite-select-group">
        <div
          v-for="(item, index) in options"
          :key="item.id"
          class="infinite-select-group-box"
        >
          <el-checkbox
            v-model="item.isChecked"
            :disabled="item.disabled"
            @change="checkChange(item, index, $event)"
          >
            {{ item.name }}
          </el-checkbox>
        </div>
      </div>

      <!-- popper占位符 start -->
      <el-option
        v-for="item in options"
        :key="item.id"
        :value="item.id"
      ></el-option>
      <!-- popper占位符 end -->
      <div class="infinite-select-button">
        <el-checkbox v-model="allChecked" @change="allSelect">全选</el-checkbox>
        <infinite-button type="primary" @click="makeSure">确定</infinite-button>
      </div>
      <template slot="prefix">
        <div slot="reference" class="infinite-selected">
          <div v-if="keys.length > 0" class="infinite-selected-tag">
            <el-tag
              v-for="(item, i) in keys"
              v-show="i < tagsNum"
              :key="item"
              >{{ item }}</el-tag
            >
            <el-tag v-if="keys.length > tagsNum" class="last-tag"
              >+{{ keys.length - tagsNum }}</el-tag
            >
          </div>
        </div>
      </template>
    </el-select>
  </div>
</template>

<script>
import ElInput from 'element-ui/lib/input'
import ElTag from 'element-ui/lib/tag'
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import ElCheckbox from 'element-ui/lib/checkbox'
import InfiniteButton from '../../infinite-button'

export default {
  name: 'InfiniteSelectTags',
  components: { ElInput, ElTag, ElSelect, ElOption, ElCheckbox, InfiniteButton },
  model: {
    prop: 'vModel',
    event: 'change'
  },
  props: {
    options: {
      // checkbox-group遍历的数据
      type: Array,
      default: () => []
    },
    tagsNum: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    vModel: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allHidden: false,
      allChecked: false, // 是否全选
      keys: [], // 输入框展示的tag
      selectedOption: [],
      codeArr: []
    }
  },
  computed: {
    defaultPlaceholder () {
      if (this.keys.length > 0) {
        return ''
      } else {
        return this.placeholder
      }
    }
  },
  watch: {
    options: {
      handler (val, oldval) {
        if (oldval.length === 0) {
          // 仅仅是首次进入时生效
          this.options.forEach((el) => {
            if (el.disabled) {
              el.isChecked = true
              this.keys.push(el.name)
            }
          })
        }
        if (val.every((el) => el.isChecked === true)) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      },
      deep: true
    }
  },
  created () {
    this.options.forEach((el) => {
      if (el.disabled) {
        el.isChecked = true
        this.keys.push(el.name)
      }
    })
  },
  methods: {
    checkChange (item, index, e) {
      console.log(item, e, 'eee')
      this.options.forEach((el) => {
        if (el.id === item.id) {
          el.isChecked = e
          this.$set(this.options, index, el)
        }
      })
    },
    makeSure () {
      // 点击确定按钮
      this.selectedOption = this.options.filter((el) => el.isChecked === true)
      this.keys = Array.from(this.selectedOption, ({ name }) => name) // 展示前五个+...
      this.$refs.infiniteSekectTags.blur()
      this.$emit('selectChange', this.selectedOption)
      this.$emit('change', this.keys)
    },
    allSelect (val) {
      // 全选按钮的点击事件
      this.options.forEach((el) => {
        (val || (!val && !el.disabled)) && (el.isChecked = val)
      })
    }
  }
}
</script>
