import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/main.css";

const app = createApp(App);

store.subscribe((mutation, state) => {
    localStorage.setItem('podcasts', JSON.stringify(state.podcasts));  
    localStorage.setItem('episodes', JSON.stringify(state.episodes));  
});

app.use(router).use(store);

app.mount("#app");
