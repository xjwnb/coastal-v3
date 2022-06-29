<script lang="ts" setup name="SideBar">
import { computed, ref } from "vue";
import "@/styles/sideBar.module.scss";
import SideBarItem from "./SideBarItem.vue";
import Styles from "@/styles/variables.module.scss";
import { usePermissionStore } from "@/stores/permission";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";
import {
  menuBackgroundColor,
  menuTextColor,
  menuActiveTextColor,
  showLogo,
} from "@/config/settings";
import { Logo } from "../index";

const appStore = useAppStore();

const isCollapse = computed(() => {
  return appStore.sidebar.opened;
});

const permissionStore = usePermissionStore();

const activeMenu = computed(() => useRoute().path);
</script>


<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    :class="isCollapse ? 'scrollbar-wrapper-collapse' : ''"
  >
    <Logo v-if="showLogo" />
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :background-color="menuBackgroundColor"
      :text-color="menuTextColor"
      :active-text-color="menuActiveTextColor"
    >
      <SideBarItem
        v-for="route in permissionStore.routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;

  ul {
    border: none;
  }

  /* .el-menu--collapse {

    .el-menu-item {
      span {
        display: none;
      }
    }
  } */
}
</style>

<style lang="scss">
.el-menu--collapse {
  .el-sub-menu .el-sub-menu__icon-arrow {
    display: none;
    font-size: 0;
  }
}

.scrollbar-wrapper-collapse {
  width: 64px !important;
}

.router-link-active {
  position: relative;
  &::before {
    content: "";
    width: 3px;
    position: absolute;
    // height: 50px;
    height: 50%;
    background-color: #fff;
    top: 25%;
    
  }
}
</style>