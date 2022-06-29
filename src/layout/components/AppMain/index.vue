<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useTagsViewStore } from "@/stores/tagsView";

const route = useRoute();
const tagsViewStore = useTagsViewStore();

const key = computed(() => {
  return route.path;
});

const cachedViews = computed(() => {
  return tagsViewStore.cachedViews;
});

const cached = computed(() => {
  const name = route.name;
  if ((cachedViews as any).indexOf(name) > -1) {
    return true;
  } else {
    return false;
  }
});

console.log(cachedViews.value);
</script>

<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </transition> -->
    <router-view v-slot="{ Component }">
      <Transition name="fade-transform" mode="out-in">
        <!-- <div> -->
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
        <!-- </div> -->
      </Transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 84px);
  padding-top: 84px;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>