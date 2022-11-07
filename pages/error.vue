<template>
<div></div>
</template>

<script>
export default {
    name: "error",
    head: {
        title: "Error",
    },
    auth: false,
    async asyncData({ error }) {
        error({ statusCode: 500, message: 'Unspecified error' })
    },
}
</script>

<style scoped>

</style>
