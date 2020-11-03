## selectTags

### 基础用法

下拉标签用法。
:::demo

```html
<template>
  <infinite-select-tags
    :options="options"
    :tags-num="4"
    :width="420"
 />
</template>
<script>
  export default {
    data() {
      return {
        options: [
          {
            id:'USD',
            name:'美元'
          },
          {
            id:'GBP',
            name:'英镑'
          },
          {
            id:'RMB',
            name:'人民币'
          },          
          {
            id:'EUR',
            name:'欧元'
          },
          {
            id:'CAD',
            name:'加元'
          },
          {
            id:'AUD',
            name:'澳大利亚元'
          }
        ]
      };
    },
  };
</script>
```

