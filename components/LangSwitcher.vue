<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on: menu }">
                <v-btn
                    class="d-flex justify-center align-center mr-2"
                    icon
                    v-on="{ ...menu }"
                >
                    <v-list-item-avatar
                        v-if="currentLanguageIcon"
                        class="ma-0"
                        size="24"
                    >
                        <v-img
                            :src="currentLanguageIcon"
                            max-width="30"
                            max-height="30"
                        />
                    </v-list-item-avatar>
                    <v-icon v-else>mdi-earth</v-icon>
                </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="language in languages"
                :key="language.id"
                @click="changeLanguage(language.id)"
            >
                <v-list-item-avatar
                    size="24"
                >
                    <v-img :src="language.flagSrc"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ language.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    props: {
        languages: {
            type: Array,
            required: true
        },
        currentLanguage: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        currentLanguageIcon() {
            if (this.currentLanguage && this.currentLanguage)
                return this.languages.filter(x => x.id === this.currentLanguage)[0].flagSrc
        }
    },
    methods: {
        async changeLanguage(id) {
            await this.$router.push(this.switchLocalePath(id))
            console.log(this.$i18n.locale)
        }
    }
};
</script>

<style lang="scss" scoped></style>
