<template>
    <v-container>
        <div class="text-h4 ml-1">
            FAQ
        </div>
        <v-row
            class="my-2"
            justify="center"
        >
            <v-expansion-panels
                accordion
            >
                <v-expansion-panel
                    v-for="item in faq"
                    :key="item.title"
                >
                    <v-expansion-panel-header
                        class="text-subtitle-1"
                        disable-icon-rotate
                    >
                        {{ item.title }}
                        <template v-slot:actions>
                            <v-icon color="primary">
                                {{ item.icon || "mdi-help-circle-outline" }}
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                        class="text-body-2"
                    >
                        <span v-html="item.content"></span>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "FAQ",
    data() {
        return {
            faq: this.$t("faq.content", { returnObjects: true }),
        }
    }
}
</script>

<style scoped>

</style>
