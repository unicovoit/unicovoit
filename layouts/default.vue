<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
                >
                    <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
                </v-btn>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
                <v-divider fill-height></v-divider>
                <v-list-item
                    @click="toggleTheme"
                    exact
                >
                    <v-list-item-action>
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Changer le thème</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-img
                src="/wave.svg"
                max-height="40"
                max-width="100"
                :aspect-ratio="16/9"
                contain
            ></v-img>
            <v-toolbar-title v-text="title"/>
        </v-app-bar>

        <v-main>
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>

        <v-footer
            :absolute="!fixed"
            app
        >
            <span>
                <v-icon>mdi-copyright</v-icon>
                <a
                    class="text--secondary"
                    href="https://github.com/finxol/iucovoit"
                    target="_blank"
                    rel="noopener noreferrer"
                >finxol</a>
            </span>
            <v-spacer></v-spacer>
            <span class="text--secondary">v{{ version }}</span>
        </v-footer>
    </v-app>
</template>

<script>
const { version } = require('../package.json')

export default {
    name: 'DefaultLayout',
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'mdi-home',
                    title: 'Accueil',
                    to: '/'
                },
                {
                    icon: 'mdi-car-outline',
                    title: 'Trajets disponibles',
                    to: '/trips'
                }
            ],
            miniVariant: false,
            title: 'IUCovoit',
        }
    },
    computed: {
        version () {
            return version || '' + (process.env.NODE_ENV !== 'production' ? ' dev' : '')
        }
    },
    beforeMount () {
        try {
            if (this.$cookies.get('dark', { parseJSON: false }) === 'true') {
                this.$vuetify.theme.dark = true;
            }
        } catch (e) {console.error(e);}
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict'
                })
            } catch (e) {console.error(e);}
        }
    },
}
</script>
