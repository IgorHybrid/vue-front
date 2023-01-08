//TODO: Move axios logic to a new folder
import axios from "axios";
import { getAllPodcasts, getDate, setDate, setPodcasts } from "../db";
export default {
    namespaced: true,
    state: {
        url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        list: []
    },
    mutations: {
        UPDATE_PODCASTS(state, payload) {
            state.list = payload;
            console.log('Podcasts loaded');
        },
        async UPDATE_PODCASTS_DB(state, payload){
            await setDate(0, Date.now());
            await setPodcasts(payload);
            state.list = payload;
            console.log('Podcasts saved');
        }
    }, 
    actions: {
        async initStore(context) {
            try {
                console.log('Init store for Podcasts');
                let list = [];
                const date = await getDate(0);
                const podcasts = await getAllPodcasts();
                if (date && (Date.now() - date < 86400000) && podcasts.length > 0) {
                    list = podcasts;
                    context.commit('UPDATE_PODCASTS', podcasts);
                } else {
                    const resp = await axios.get(context.state.url);
                    list = resp.data.feed.entry;
                    context.commit('UPDATE_PODCASTS_DB', resp.data.feed.entry);
                }
                return list;
            } catch (error) {
                console.error('Store podcast module error: ', error);
            }
        }
    },
    getters: {
        getList(state) {
            return state.list;
        }
    }
}  