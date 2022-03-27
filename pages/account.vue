<template>
    <v-container>
        <v-main
            class="text-h2"
            color="primary"
            style="margin-top:-3rem"
        >
            Compte
        </v-main>

        {{ this.$store.state.auth.user }}
    </v-container>
</template>

<script>
export default {
    name: "account"
}
</script>

<style scoped>

</style>
