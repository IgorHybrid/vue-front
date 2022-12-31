<template>
    <div>
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
        author: String
    }
}
</script>