<template>
    <v-app>
        <v-container>
            <h2
                class="text-h2"
            >
                <span v-if="error.statusCode === 404">
                    {{ pageNotFound }}
                </span>
                <span v-else>
                    {{ otherError }}
                </span>
            </h2>
            <v-card
                flat
            >
                <v-card-actions
                    class="text-subtitle-1"
                    @click="details = !details"
                >
                    <v-btn
                        icon
                    >
                        <v-icon>mdi-chevron-{{ details ? 'down' : 'right' }}</v-icon>
                    </v-btn>
                    Voir plus de détails
                </v-card-actions>
                <v-expand-transition>
                    <div
                        v-show="details"
                        :class="`accent ${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`"
                    >
                        <v-card-text>
                            {{ error.message }}
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
            <v-img
                :src="illustration"
                aspect-ratio="1"
                max-width="500"
            >
            </v-img>
        </v-container>
        <v-btn
            text
            @click="$router.go(-1)"
        >
            Retour à la page précédente
        </v-btn>

        <v-container
            class="text--secondary text-caption ma-0 pa-0 mt-5"
        >
                <v-icon
                    size="18"
                >mdi-image-outline</v-icon>
                Illustration de la collection
                <a class="text--secondary" target="_blank" rel="noreferrer noopener"
                   href="https://icons8.com/illustrations">
                    Ouch!
                </a>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'Error',
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
            otherError: 'Une erreur est survenue',
            details: false
        }
    },
    head() {
        return {
            title: this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        }
    },
    activated() {
        if(!this.$config.isProd) {
            console.error(this.error)
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
