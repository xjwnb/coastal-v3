<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$attrs" :style="{color: props.color}">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
export default {
  name: "SvgIcon",
};
</script>

<script setup lang="ts">
/**
 * 名称：SvgIcon
 * @param name String required
 * @param color String
 * 依赖：src/plugins/svgBuilder.js 需要在 vite中配置
 * 使用方式：
 * 在 template 中使用 <svg-icon name="bug"/>
 */
import { computed } from "vue";

interface Props {
  name: {
    type: string;
    required: true;
  };
  color: {
    type: string;
    default: "";
  };
  className: {
    type: string;
    default: "";
  };
}

/* data */
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: ""
  }
}); // 获取props defineProps<{ msg: string }>()
const iconName = computed((): string => `#icon-${props.name}`);
const svgClass = computed((): string => {
  if (props.className) {
    return `icon svg-icon icon-${props.className}`;
  } else {
    return "icon svg-icon";
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

