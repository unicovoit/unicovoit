<template>
    <v-container>
        <h2
            class="text-h2"
        >
            {{ $t("privacyPolicy") }}
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
    head: {
        title: "Politique de confidentialité"
    },
    auth: false,
    async asyncData({$content, error, i18n}) {
        const page = await $content(`${i18n.locale}/privacy-policy`)
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
        margin-top: 2rem !important
        margin-bottom: .5rem
    p
        text-align: justify !important

    a
        color: inherit

    ul
        margin-bottom: 1.5rem
</style>
