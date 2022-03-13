<template>
    <v-app dark>
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else>
            {{ otherError }}
        </h1>
        <NuxtLink to="/">
            Retour à l'accueil
        </NuxtLink>
    </v-app>
</template>

<script>
export default {
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            pageNotFound: '404 Page non trouvée',
            otherError: 'Une erreur est survenue'
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
