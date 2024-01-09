<template>
  <AMenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </AMenuItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { itemProps } from '../props'

import MenuItemContent from './MenuItemContent.vue'
export default defineComponent({
  name: 'BasicMenuItem',
  components: { MenuItemContent },
  props: itemProps,
  setup() {
    return {}
  },
})
</script>
