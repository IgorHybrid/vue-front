<template>
    <div>
        <img :src="imageUrl">
        <div>
            <h3>{{ name }}</h3>
            <p>by {{ author }}</p>
        </div>
        <div>
            <h4>Description: </h4>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "PodcastDescriptionItem",
    props: {
        imageUrl: String,
        name: String,
        author: String,
        description: String
    }
}
</script>