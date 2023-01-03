<template>
    <main>
        <PodcastDescriptionItem 
            :image="podcast.details.image"
            :name="podcast.details.title"
            :author="podcast.details.author.toString()"
            :description="podcast.details.summary.toString()"
        />
        <EpisodeDescriptionItem
            :source="episode.content[0]._url" 
            :title="episode.title[0]"
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
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            this.episode = this.$store.getters['episodes/getEpisodeById'](this.podcastId, this.episodeId);
        }
    }
}
</script>