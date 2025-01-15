import "@/assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { reactive } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);

app.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
    position: "top-center",
    timeout: 5000,
    pauseOnHover: false,
    draggable: false,
});

const userState = reactive({
    userType: null,
    userId: null,
});

app.provide("userState", userState);

app.mount("#app");
