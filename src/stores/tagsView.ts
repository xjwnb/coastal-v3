import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

export const useTagsViewStore = defineStore("tagsView", {
  state() {
    return {
      visitedViews: [] as any[],
      cachedViews: [] as string[],
    };
  },

  actions: {
    addView(view: any) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },

    addVisitedView(view: any) {
      if (
        this.visitedViews.some((item: RouteRecordRaw) => item.path == view.path)
      )
        return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },

    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) return;
      // if (!view.meta.noCache) {
      this.cachedViews.push(view.name);
      // }
    },

    deleteView(view: any) {
      // this.visitedViews = this.visitedViews.filter(item => item.path !== view.path);
      // console.log(this.visitedViews, view.path);
      const deleIndex = this.visitedViews.findIndex(
        (item) => item.path === view.path
      );
      this.visitedViews.splice(deleIndex, 1);
    },
  },
});
