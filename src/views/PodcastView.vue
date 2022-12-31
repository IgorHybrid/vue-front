<template>
    <main v-if="details !== null">
      <PodcastDescriptionItem
        :imageUrl="getImage()"
        :name="details.title"
        :author="details.author.toString()"
        :description="details.summary.toString()"
      />
      <div>
        <h1>Episodes: {{ details.item.length }}</h1>
      <ul>
        <li v-for="episode in details.item">
            <label>{{ episode.title.toString() }}</label>
            <label>{{ episode.pubDate }}</label>
            <label>{{ episode.duration }}</label>
        </li>
      </ul>
      </div>
    </main>
</template>
<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
import axios from 'axios';
import X2JS from 'x2js';
export default {
    data: () => {
        return {
            corsUrl: "https://cors-anywhere.herokuapp.com/",
            allOriginUrl: "https://api.allorigins.win/raw?url=",
            urlLookup: "https://itunes.apple.com/lookup?id=", 
            feedUrl: null,
            details: null,
        }
    },
    components: {
        PodcastDescriptionItem
    },
    async mounted() {
        console.log('PodcastView');
        await this.getDetails();
        await this.getEpisodes();
    },
    methods: {
        async getDetails() {
            try {
                const response = await axios.get(this.allOriginUrl + encodeURIComponent(this.urlLookup + this.$route.params.id));
                if(response.data.resultCount === 0) {
                    // this.$router.push(NotFound)
                }
                this.feedUrl = response.data.results[0].feedUrl;
            } catch (error) {
                console.log(error);
            }
        },
        async getEpisodes() {
            try {
                const x2js = new X2JS();
                const response = await axios.get(this.corsUrl + this.feedUrl);
                this.details = x2js.xml2js(response.data).rss.channel;
                console.log(this.details);
            } catch (error) {
                console.log(error);
            }
        },
        getImage() {
            if (this.details.thumbnail) {
                return this.details.thumbnail._url;
            }
            
            if (this.details.image[0].url) {
                return this.details.image[0].url
            }

            return this.details.image[1].url
        }
    } 
}
</script>