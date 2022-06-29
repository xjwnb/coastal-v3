import { defineStore } from "pinia";
import { Local } from "@/utils/storage";

export const useUserStore = defineStore("user", {
  state() {
    return {
      name: "",
    };
  },

  actions: {
    setUser(name: string) {
      return new Promise((resolve, reject) => {
        console.log(name);
        this.name = name;
        Local.set("username", name);
        resolve("");
      });
    },

    loginOut() {
      Local.clear();
      this.name = "";
    }
  },
});
