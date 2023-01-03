import { createStore } from 'vuex'
import EpisodesModule from './episodes.module'
import PodcastsModule from './podcasts.module'

export default createStore({
  modules: {
    podcasts: PodcastsModule,
    episodes: EpisodesModule
  }
});