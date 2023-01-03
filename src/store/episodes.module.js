//TODO: Move axios logic to a new folder
import axios from "axios";
import X2JS from 'x2js';
export default {
    namespaced: true,
    state: {
        allOriginUrl: "https://api.allorigins.win/raw?url=",
        urlLookup: "https://itunes.apple.com/lookup?id=", 
        list:[]
    },
    mutations: {
        UPDATE_PODCAST_DETAILS (state, payload) {
            state.list = payload;
        },
        INITIALIZE_STORE(state) {
            if (localStorage.getItem('episodes')) {
                const localData = JSON.parse(localStorage.getItem('episodes'));
                state.list = localData.list;
            }
        }
    }, 
    actions: {
        async loadPodcastEpisodes(context, payload){
            try {
                const details = await axios.get(context.state.urlLookup + payload);
                if(details.data.resultCount === 0) {
                    // this.$router.push(NotFound)
                } else {
                    const x2js = new X2JS();
                    const feedUrl = details.data.results[0].feedUrl;
                    const episodes = await axios.get(feedUrl);
                    const list = context.state.list;
                    
                    const podcastEpisodes = {
                        id: payload,
                        date: Date.now(),
                        details: x2js.xml2js(episodes.data).rss.channel
                    }

                    list.push(podcastEpisodes);
                    context.commit('UPDATE_PODCAST_DETAILS', list);
                }
            } catch (error) {
                console.log('Store episodes module error: ', error);
            }
        }
    },
    getters: {
        getList(state) {
            return state.list;
        },
        getPodcastById: (state) => (id) => {
            return state.list.find(elm => elm.id === id);
        }, 
        getEpisodeById: (state) => (podcastId, episodeId) => {
            const episode = state.list.find(elm => elm.id === podcastId);
            if (!episode){
                return null
            }
            return episode.details.item.find(elm => elm.guid.toString() === episodeId)
        }
    }
}
  