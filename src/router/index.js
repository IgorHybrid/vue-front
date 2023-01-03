import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/podcast/:id",
      name: "podcast",
      component: () => import("../views/PodcastView.vue"),
    },
    {
      path: "/podcast/:podcastid/episode/:episodeid",
      name: "episode",
      component: () => import("../views/EpisodeView.vue")
    }
  ],
});

export default router;
