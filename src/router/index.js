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
      //TODO: Check here if route exist with beforeEnter and store 
      path: "/podcast/:id",
      name: "podcast",
      component: () => import("../views/PodcastView.vue"),
    },
    {
      //TODO: Check here if route exist with beforeEnter and store 
      path: "/podcast/:podcastid/episode/:episodeid",
      name: "episode",
      component: () => import("../views/EpisodeView.vue")
    },
    { 
      path: '/:pathMatch(.*)', 
      name: 'not-found', 
      component: () => import("../views/NotFoundView.vue")
    }
  ],
});

export default router;
