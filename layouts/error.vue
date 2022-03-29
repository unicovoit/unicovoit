<template>
    <v-app dark>
        <h1>
            <v-main
                class="text-h2"
                color="primary"
                style="margin-top:-3rem"
            >
                <span v-if="error.statusCode === 404">
                    {{pageNotFound}}
                </span>
                <span v-else>
                    {{otherError}}
                </span>
            </v-main>
            <v-img
                :src="illustration"
                aspect-ratio="1"
                max-width="500"
            >
            </v-img>
        </h1>
        <v-btn
            text
            @click="$router.go(-1)"
        >
            Retour à la page précédente
        </v-btn>
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
    computed: {
        illustration() {
            return this.error.statusCode === 404 ? '/lost.svg' : '/loading.svg'
        }
    },
    data() {
        return {
            pageNotFound: 'Page introuvable',
            otherError: 'Une erreur est survenue'
        }
    },
    head() {
        return {
            title: this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
