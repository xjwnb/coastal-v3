<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index > 0" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationMatched } from "vue-router";
import * as pathToRegexp from "path-to-regexp";

const route = useRoute();
const router = useRouter();

const levelList = ref<any>(null);

watch(
  () => route.path,
  (newVal: any) => {
    getBreadcrumb();
  }
);

onMounted(() => {
  getBreadcrumb();
});

const getBreadcrumb = () => {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }

  levelList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

const isDashboard = (route: RouteLocationMatched) => {
  const name: any = route && route.name;
  if (!name) {
    return false;
  }
  // return name.trim().toLocaleLowerCase() === "首页".toLocaleLowerCase();
  return name === "首页";
};

const pathCompile = (path: string) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route;
  var toPath = pathToRegexp.compile(path);
  return toPath(params);
};

const handleLink = (item: any) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};
/* import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
} */
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
