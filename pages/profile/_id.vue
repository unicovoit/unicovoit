<template>
    <v-container
        v-touch="{
            right: () => $router.go(-1),
        }"
    >
        <h2
            class="text-h2"
        >
            User Profile
        </h2>
    </v-container>
</template>

<script>
export default {
    name: "account",
    auth: false,
}
</script>

<style scoped>

</style>
