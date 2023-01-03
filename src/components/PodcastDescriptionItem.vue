<template>
    <div>
        <img :src="imageUrl">
        <div>
            <h3>{{ name }}</h3>
            <p>by {{ author }}</p>
        </div>
        <div>
            <h4>Description: </h4>
            <div v-html="description"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PodcastDescriptionItem",
    props: {
        image: [Array, Object],
        name: String,
        author: String,
        description: String
    },
    data: () => {
        return {
            imageUrl: null
        }
    },
    mounted() {
        this.imageUrl = this.getImage()
    },
    methods:{
        getImage() {
            if (this.image.hasOwnProperty('_href')) {
                return this.image._href;
            }
            if (this.image[0].url) {
                return this.image[0].url;
            }

            return this.image[1].url;
        }
    }
}
</script>