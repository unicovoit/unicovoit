<template>
<v-container>
    <h2
        class="text-h2"
    >
        Déconnexion...
    </h2>
</v-container>
</template>

<script>
export default {
    name: "logout",
    mounted() {
        this.$auth.logout()
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>
