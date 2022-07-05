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

        {{user}}
    </v-container>
</template>

<script>
export default {
    name: "account",
    auth: false,
    async asyncData({ $axios, route }) {
        try {
            const { data } = await $axios.get(`/api/v1/users/profile/${route.params.id}`);
            return {
                user: data,
            };
        } catch (error) {
            return {
                error: true,
            };
        }
    },
}
</script>

<style scoped>

</style>
