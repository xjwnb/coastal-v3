import { defineStore } from "pinia";
import { constantRoutes } from "@/router/index";
import type { RouteParamConfig } from "@/interfaces/route";

export const usePermissionStore = defineStore("permission", {
  state: () => {
    return {
      routes: constantRoutes as RouteParamConfig[],
    }
  },
  actions: {
    generateRoutes() {
      const routes = constantRoutes.concat(this.routes)
      this.routes = routes
    }
  }
})