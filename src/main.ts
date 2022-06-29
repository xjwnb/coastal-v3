import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/styles/init.scss";


import SvgIcon from './components/SvgIcon/index.vue'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('svg-icon', SvgIcon)

app.mount("#app");
