<script lang="ts" setup name="SideBarItem">
import { defineProps, toRefs, ref } from "vue";
import { RouterLink } from "vue-router";
import path from "path";
import Item from "./Item.vue";

const props = defineProps({
  item: Object,
  basePath: String,
});

const { item, basePath } = toRefs(props);

const onlyOneChild = ref<any>({});

const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(String(basePath?.value))) {
    if (basePath?.value) {
      return basePath.value;
    }
  }
  let reg = new RegExp(`${routePath}$`);
  let flag = reg.test(String(basePath?.value));
  routePath = flag ? "" : routePath;
  return path.resolve(basePath?.value, routePath);
};

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item?.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};
</script>

<template>
  <div v-if="!(item && item.hidden)">
    <template
      v-if="
        hasOneShowingChild(item?.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <RouterLink
        v-if="onlyOneChild?.meta"
        :to="resolvePath(item?.path)"
        rel="noopener"
        style="text-decoration: none"
      >
        <el-menu-item :index="resolvePath(onlyOneChild?.path)">
          <Item :item="onlyOneChild" />
        </el-menu-item>
      </RouterLink>
    </template>

    <el-sub-menu
      class="sub-menu"
      v-else
      popper-append-to-body
      :index="resolvePath(item?.path)"
    >
      <template #title>
        <Item v-if="item?.meta" :item="item" />
      </template>
      <SideBarItem
        v-for="child in item?.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>


<style lang="scss">

</style>