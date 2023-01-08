<template>
    <div class="details">
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
<style scoped>
    .details {
        width: 30%;
        margin-right: 5%;
        display: flex;
        flex-direction: column;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
            inset -5px -5px 15px rgba(255, 255, 255, 0.1),
            5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
        height: min-content;
        padding: 30px;
    }
    .details > div {
        margin-top: 10px;
        border-top-style: solid;
        border-top-width: 0.2mm;
    }
    h3, h4 {
        font-weight: bold;
    }
    img {
        align-self: center;
        height: 120px;
        width: 120px;
    }
</style>