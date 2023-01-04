<template>
    <div>
        <div>
            <h1 style="font-weight: bold">404 - Page not found</h1>
            <p>It seems the page you are trying to reach does not exist. Please, try again!</p>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$emit('loader', false);
    }
}
</script>