<template>
    <main>
        <PodcastDescriptionItem 
            :image="podcast.details.image"
            :name="podcast.details.title"
            :author="podcast.details.author.toString()"
            :description="podcast.details.description"
        />
        <EpisodeDescriptionItem
            :source="getSource()" 
            :title="getTitle()"
            :description="episode.description"
        />
    </main>
</template>

<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
import EpisodeDescriptionItem from '../components/EpisodeDescriptionItem.vue';
export default {
    data: () => {
        return {
            podcast: null,
            episode: null,
            podcastId: null,
            episodeId: null
        }
    },
    components: {
        PodcastDescriptionItem,
        EpisodeDescriptionItem
    },  
    created(){
        this.podcastId = this.$route.params.podcastid;
        this.episodeId = this.$route.params.episodeid;
        this.getDetails();
    },
    methods: {
        getDetails() {
            this.$emit('loader', true);
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            this.episode = this.$store.getters['episodes/getEpisodeById'](this.podcastId, this.episodeId);
            console.log(this.episode)
            this.$emit('loader', false);
        },
        getSource() {
            if (!this.episode.content) {
                return this.episode.enclosure._url;
            }
            return this.episode.content[0]._url;
        },
        getTitle() {
            if (typeof this.episode.title === 'string') {
                return this.episode.title;
            }
            return this.episode.title[0]
        }
    }
}
</script>