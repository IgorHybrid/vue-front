//TODO: Move axios logic to a new folder
import axios from "axios";
export default {
    namespaced: true,
    state: {
        url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        list: [],
        date: null
    },
    mutations: {
        UPDATE_PODCASTS(state, payload){
            state.list = payload;
            state.date = Date.now();
            console.log("Data saved: ", state.list);
        },
        INITIALIZE_STORE(state) {
            if (localStorage.getItem('podcasts')) {
                const localData = JSON.parse(localStorage.getItem('podcasts'));
                const diff = (Date.now() - localData.date)/1000/60;
                //TODO: mins to days
                // if localStorage has been created 5 mins ago is valid
                if (diff < 5) {
                    state.list = localData.list;
                    state.date = localData.date;
                }
            }
        }
    }, 
    actions: {
        async loadPodcasts(context){
            try {
                const resp = await axios.get(context.state.url);
                context.commit('UPDATE_PODCASTS', resp.data.feed.entry);
            } catch (error) {
                console.log('Store podcast module error: ', error);
            }
        }
    },
    getters: {
        getList(state) {
            return state.list;
        }
    }
}  