<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { Close } from "@element-plus/icons-vue";
import { useTagsViewStore } from "@/stores/tagsView";
import { usePermissionStore } from "@/stores/permission";
import path from "path";
import { tagActiveColor } from "@/config/settings";

const tagsViewStore = useTagsViewStore();
const { visitedViews } = storeToRefs(tagsViewStore);

const permissionStore = usePermissionStore();

const route = useRoute();
const router = useRouter();

let routes = ref<any>([]);

const isActive = (route: any) => {
  return route.path === useRoute().path;
};

const isAffix = (route: any) => {
  return route.meta.affix;
};

const closeSelectedTag = (tag: any) => {
  const preTagsView = JSON.parse(JSON.stringify(visitedViews.value));
  const closeIndex = visitedViews.value.findIndex(
    (item) => item.path === tag.path
  );
  tagsViewStore.deleteView(tag);
  if (route.path === preTagsView[closeIndex].path) {
    if (visitedViews.value[closeIndex]) {
      router.push(visitedViews.value[closeIndex].path);
    } else if (visitedViews.value[closeIndex - 1]) {
      router.push(visitedViews.value[closeIndex - 1].path);
    } else {
      router.push("/");
    }
  }
};

const initTag = () => {
  routes.value = permissionStore.routes.filter(
    (item: any) => item.meta && item.meta.affix
  );
  const tags = filterAffixTags(permissionStore.routes);
  tags.forEach((item: any) => {
    tagsViewStore.addView(item);
  })
};

const filterAffixTags = (routes: any, basePath: string = "/") => {
  let tags: any = [];
  routes.forEach((item: any) => {
    if (item.meta && item.meta.affix) {
      const tagPath = path.resolve(basePath, item.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: item.name,
        meta: { ...item.meta },
      });
    }

    if (item.children) {
      const tempTags = filterAffixTags(item.children, item.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

onMounted(() => {
  initTag();
  tagsViewStore.addView(route);
});

watch(
  () => route.path,
  (newVal) => {
    tagsViewStore.addView(route);
  }
);
</script>


<template>
  <div class="tags-view-container" id="tags-view-container">
    <el-scrollbar>
      <div class="tag-view-wrapper">
        <router-link
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          :style="{
            backgroundColor: isActive(tag) ? tagActiveColor : '',
            borderColor: isActive(tag) ? tagActiveColor : '',
          }"
        >
          {{ tag.title }}
          <!-- <span
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          /> -->
          <el-icon
            class="el-icon-close"
            @click.prevent="closeSelectedTag(tag)"
            :color="isActive(tag) ? '#fff' : '#000'"
            v-if="!isAffix(tag)"
            ><close
          /></el-icon>
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>


<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tag-view-wrapper {
    display: flex;
  }
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    text-decoration: none;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      // background-color: #002FA7;
      color: #fff;
      // border-color: #002FA7;
      // &::before {
      //   content: "";
      //   background: #fff;
      //   display: inline-block;
      //   width: 8px;
      //   height: 8px;
      //   border-radius: 50%;
      //   position: relative;
      //   margin-right: 2px;
      // }
      &::before {
        display: none;
      }
    }
  }
}

.el-icon-close {
  margin-left: 3px;
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    display: flex;
    align-items: center;
    // .el-icon-close {
    //   width: 16px;
    //   height: 16px;
    //   vertical-align: 2px;
    //   border-radius: 50%;
    //   text-align: center;
    //   transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    //   transform-origin: 100% 50%;
    //   &:before {
    //     transform: scale(0.6);
    //     display: inline-block;
    //     vertical-align: -3px;
    //   }
    //   &:hover {
    //     background-color: #b4bccc;
    //     color: #fff;
    //   }
    // }
  }
}
</style>