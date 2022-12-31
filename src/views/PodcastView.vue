<template>
    <main>
      <PodcastDescriptionItem v-if="details !== null"
        :imageUrl="details.artworkUrl100"
        :name="details.collectionName"
        :author="details.artistName"
        description="Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Ut maximus vehicula sapien. 
        Etiam luctus rutrum porta. Nunc eros felis, volutpat non dictum vel, 
        fermentum laoreet sapien. Ut est felis, pulvinar vitae ligula eget, consectetur imperdiet nisi. 
        Aliquam justo purus, congue eget blandit vitae, mattis quis nibh. Donec non sem consectetur, sodales ligula nec, 
        interdum odio. Nunc urna mauris, aliquam at nisl ut, egestas facilisis justo. Integer convallis turpis eu ullamcorper accumsan. 
        Ut non rhoncus diam, et gravida sem. Pellentesque eu tempus nisi. Donec nec elit vitae odio pharetra lobortis id vitae mauris. "
      />
    </main>
</template>
<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
import axios from 'axios';
export default {
    data: () => {
        return {
            allOriginUrl: "https://api.allorigins.win/raw?url=",
            urlLookup: "https://itunes.apple.com/lookup?id=", 
            details: null
        }
    },
    components: {
        PodcastDescriptionItem
    },
    mounted() {
        console.log('PodcastView');
        this.getDetails();
    },
    methods: {
        async getDetails() {
            try {
                const response = await axios.get(this.allOriginUrl + encodeURIComponent(this.urlLookup + this.$route.params.id));
                if(response.data.resultCount === 0) {
                    // this.$router.push(NotFound)
                }
                this.details = response.data.results[0];
                console.log(this.details);
            } catch (error) {
                console.log(error);
            }
        }
    } 
}
</script>