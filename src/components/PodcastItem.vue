<template>
        <div @click="goDetails">
            <img :src="imageUrl">
            <div>
                <h3>{{ name }}</h3>
                <p>Author: {{ author }}</p>
            </div>
        </div>
</template>

<script>
export default {
    name: "PodcastItem",
    props: {
        imageUrl: String,
        name: String,
        author: String,
        id: String
    },
    methods: {
        goDetails() {
            this.$router.push('/podcast/' + this.id);
        }
    }
}
</script>