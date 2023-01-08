<template>
    <div class="episode-details">
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
<style>
    .episode-details {
        width: 65%;
        padding: 10px;
    }
    .episode-details > div {
        padding-bottom: 10px;
    }
    h1 {
        font-weight: bold;
    }
    audio {
        border-top-style: solid;
        border-width: 0.1mm;
        width: 100%;
        padding-top: 10px;
    }
</style>