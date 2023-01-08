<template>
        <div class="card" @click="goDetails">
            <img :src="imageUrl"/>
            <div class="content">
                <h4>{{ name }}</h4>
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

<style scoped>
    .card {
        align-items: center;
        flex-flow: column;
        display: flex;
        cursor: pointer;
        padding-bottom: 20px;
        position: relative;
        min-width: 120px;
        height: 260px;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
            inset -5px -5px 15px rgba(255, 255, 255, 0.1),
            5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
        margin: 30px;
    }
    h4, p {
        text-align: center;
    }
    img {
        border-radius: 50%;
        width: 120px;
        height: 120px;
    }
</style>