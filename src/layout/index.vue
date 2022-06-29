<script lang="ts" setup>
import { RouterView } from "vue-router";
import { SideBar, TagViews, NavBar, AppMain } from "./components";
import { useAppStore } from "@/stores/app";
import { menuBackgroundColor, mainBgColor } from "@/config/settings";

const appStore = useAppStore();

console.log(appStore);
</script>


<template>
  <SideBar
    class="sidebar-container"
    :style="{
      backgroundColor: menuBackgroundColor,
    }"
  />
  <div
    :class="[
      'main-container',
      appStore.sidebar.opened ? 'main-container-collapse' : '',
    ]"
    :style="{
      backgroundColor: mainBgColor
    }"
  >
    <div class="fixed-header">
      <NavBar />
      <TagViews />
    </div>

    <AppMain />
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";
.sidebar-container {
  transition: width 0.28s;
  width: 200px;
  // background-color: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: #f1f3f7;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.main-container-collapse {
  .fixed-header {
    width: calc(100% - 64px);
  }
}

.main-container-collapse {
  margin-left: 64px;
}
</style>