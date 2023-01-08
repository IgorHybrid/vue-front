<template>
    <main v-if="podcast && podcast.details">
        <div class="podcast-details">
            <PodcastDescriptionItem
                :image="podcast.details.image"
                :name="podcast.details.title"
                :author="podcast.details.author.__text"
                :description="podcast.details.description"
            />
            <div class="episodes">
                <h1>Episodes: {{ podcast.details.item.length }}</h1>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                    <tr v-for="episode in podcast.details.item">
                        <td><a @click="go2Episode(episode)">{{ getTitle(episode.title) }}</a></td>
                        <td>{{ this.formatDate(episode.pubDate) }}</td>
                        <td>{{ this.formatDuration(episode.duration) }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </main>
</template>
<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
import moment from 'moment';
export default {
    data: () => {
        return {
            podcast: null,
            podcastId: null
        }
    },
    components: {
        PodcastDescriptionItem
    },
    async created() {
        this.podcastId = this.$route.params.id;
        await this.getDetails();
    },
    methods: {
        async getDetails() {
            this.$emit('loader', true);
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            if (!this.podcast){
                this.podcast = await this.$store.dispatch('episodes/loadPodcastEpisodes', this.podcastId);
                if (!this.podcast) {
                    this.$router.push({name: 'not-found', params: {pathMatch: this.$route.path}});
                }
            }
            this.$emit('loader', false);
        },
        getTitle(title) {
            if (typeof title === 'string') {
                return title;
            }

            return title[0];
        },
        getEpisodeId(episodeGuid){
            if (episodeGuid.hasOwnProperty('__text')) {
                return episodeGuid.__text;
            }
            if (episodeGuid.hasOwnProperty('__cdata')){
                return episodeGuid.__cdata;
            }
            return episodeGuid;
        },
        go2Episode(episode) {
            this.$router.push({
                name: 'episode',
                params: {
                    podcastid: this.podcastId,
                    episodeid: this.getEpisodeId(episode.guid)
                }
            });
        },
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        formatDuration(time) {
            if (!time) {
                return '';
            }
            
            if (time.__text.includes(':')) {
                return time.__text;
            }

            const h = Math.floor(time.__text / 3600).toString().padStart(2,'0');
            const m = Math.floor(time.__text % 3600 / 60).toString().padStart(2,'0');
            const s = Math.floor(time.__text % 60).toString().padStart(2,'0');
            
            return h + ':' + m + ':' + s;
        }
    } 
}
</script>

<style scoped>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        text-align: left;
        padding: 8px;
    }
    a {
       cursor: pointer;
    }
    .podcast-details {
        display: flex;
        flex-direction: row;
    }
    .episodes {
        width: 65%
    }
</style>