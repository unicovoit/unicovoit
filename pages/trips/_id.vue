<template>
    <div>
        Trip id n°{{$route.params.id}}
        <v-img
            aspect-ratio="1"
            contain
            max-width="600"
            src="/car-illustration.svg"
        ></v-img>
    </div>
</template>

<script>
export default {
    name: "book"
}
</script>

<style scoped>

</style>
