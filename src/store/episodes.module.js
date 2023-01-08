//TODO: Move axios logic to a new folder
import axios from "axios";
import X2JS from 'x2js';
import { getAllEpisodes, setEpisodes } from "../db";
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
        async UPDATE_PODCAST_DETAILS_DB (state, payload) {
            let stateList = state.list;
            await setEpisodes(payload.id, payload)
            stateList.push(payload);
            state.list = stateList;
        }
    }, 
    actions: {
        async loadPodcastEpisodes(context, payload){
            try {
                const details = await axios.get(context.state.urlLookup + payload);
                if(details.data.resultCount !== 0) {
                    const x2js = new X2JS();
                    const feedUrl = details.data.results[0].feedUrl;
                    const episodes = await axios.get(feedUrl);
                    
                    const podcastEpisodes = {
                        id: payload,
                        date: Date.now(),
                        details: x2js.xml2js(episodes.data).rss.channel
                    }

                    context.commit('UPDATE_PODCAST_DETAILS_DB', podcastEpisodes);

                    return podcastEpisodes;
                }
            } catch (error) {
                console.error('Store episodes module error: ', error);
            }
        },
        async initStore(context) {
            try {
                const episodes = await getAllEpisodes();
                if (episodes) {
                    context.commit('UPDATE_PODCAST_DETAILS', episodes);
                }
            } catch (error) {
                console.error('Store episodes module error: ', error);
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
            return episode.details.item.find(elm =>
                elm.guid.hasOwnProperty('__text') && elm.guid.__text === episodeId
                ||
                elm.guid.hasOwnProperty('__cdata') && elm.guid.__cdata === episodeId
                ||
                elm.guid === episodeId
            )
        }
    }
}
  