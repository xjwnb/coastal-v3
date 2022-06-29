import { defineStore } from 'pinia'
import { showLogo } from "@/config/settings";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      showLogo
    }
  }
})
