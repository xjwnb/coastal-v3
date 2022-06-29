import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      sidebar: {
        opened: false,
      }
    }
  },

  actions: {
    changeSidebarOpened() {
      this.sidebar.opened = !this.sidebar.opened;
    }
  }
})