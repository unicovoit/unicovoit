<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Politique de confidentialité
        </h2>

        <nuxt-content
            :document="page"
            class="text-body-1 mt-5"
        />
    </v-container>
</template>

<script>
export default {
    name: "legal",
    auth: false,
    async asyncData({$content, error}) {
        const page = await $content("privacy-policy")
            .fetch()
            .catch(err => {
                error({statusCode: 404, message: "Page not found"})
            })

        return {
            page: page
        }
    }
}
</script>

<style lang="sass">
.nuxt-content
    h2
        text-align: left !important
        margin-bottom: .5rem
    p
        text-align: justify !important

    a
        color: inherit

    ul
        margin-bottom: 1.5rem
</style>
