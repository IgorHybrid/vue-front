<template>
    <div>
        <div>
            <h1>{{ title }}</h1>
            <div v-html="description"></div>
        </div>
        <audio controls>
            <source :src="source" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script>
export default {
    name: "PodcastDescriptionItem",
    props: {
        title: String,
        description: String,
        source: String
    }
}
</script>