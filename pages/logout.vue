<template>
<v-container>
    <v-main
        class="text-h2 mt-n10"
        color="primary"
    >
        Déconnexion...
    </v-main>
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
