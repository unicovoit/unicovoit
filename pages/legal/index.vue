<template>
    <v-container>
        <h2
            class="text-h2 mb-3"
        >
            Conditions Générales d'utilisation
        </h2>

        <nuxt-content
            :document="page"
            class="text-body-1"
        />
    </v-container>
</template>

<script>
export default {
    name: "legal",
    auth: false,
    head: {
        title: "Conditions Générales d'utilisation - UniCovoit",
    },
    async asyncData({$content, error}) {
        const page = await $content("legal")
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
