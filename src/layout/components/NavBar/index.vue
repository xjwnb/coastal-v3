<script lang="ts" setup name="NavBar">
import { useRouter } from "vue-router";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import { logoUrl } from "@/config/settings";

const appStore = useAppStore();
const userStore = useUserStore();

const router = useRouter();

const handleToggleClick = () => {
  console.log("handleToggleClick");
  appStore.changeSidebarOpened();
};

const handleLoginOut = () => {
  userStore.loginOut();
  router.push({ path: "/login" });
};
</script>

<template>
  <div class="navbar-container">
    <div class="navbar-wrapper">
      <Hamburger
        id="hamburger-container"
        class="hamburger-container"
        @toggle-click="handleToggleClick"
      />
      <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="navbar-right-wrapper">
      <el-dropdown>
        <div class="user-wrapper">
          <el-image :src="logoUrl" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLoginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-wrapper {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.user-wrapper {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px;
  background-color: #fff;
  margin-right: 20px;
}
</style>