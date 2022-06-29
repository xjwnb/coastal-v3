<script lang="ts" setup name="Item">
import { defineProps, toRefs } from "vue";

const props = defineProps({
  item: Object,
});

const { item } = toRefs(props);
</script>

<template>
  <!-- <i
    v-if="item && item.meta.icon"
    :class="'iconfont icon-' + item.meta.icon"
  ></i> -->
  <el-icon>
    <svg-icon
      :name="item?.meta.icon"
      width="300"
      height="300"
      className="el-svg-icon"
    />
  </el-icon>

  <span>{{ item && item.meta.title }}</span>
</template>

<style lang="scss" scoped>
.el-svg-icon {
  color: currentColor;
  width: 1rem;
  height: 1rem;
}

span {
  margin-left: 0.5rem;
}

.el-menu--collapse {
  .el-menu-item {
    span {
      display: none;
    }
  }
}

.el-menu--collapse {
  .el-sub-menu__title {
    span {
      display: none;
    }
  } 
}
</style>