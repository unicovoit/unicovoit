<template>
    <v-container>
        <v-main
            class="text-h2"
            color="primary"
            style="margin-top:-3rem"
        >
            Compte
        </v-main>
        <v-alert
            v-if="!this.$store.state.auth.user.email_verified"
            border="left"
            colored-border
            color="warning"
            elevation="4"
        >
            <v-icon>mdi-alert-circle-outline</v-icon>
            Cliquez sur le lien reçu pour vérifier votre adresse mail
        </v-alert>

        <v-card
            v-if="!$config.isProd"
        >
            {{ this.$store.state.auth.user }}
        </v-card>

        <v-card
            class="mx-auto"
            outlined
            elevation="4"
            style="margin:2rem 0;padding:1rem"
        >
            <v-row
                align="center"
                justify="center"
            >
                <v-col>
                    <v-avatar>
                        <v-img
                            class="rounded-lg"
                            :src="this.$store.state.auth.user.picture"
                            contain
                        ></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <v-card-title>
                        {{ this.$store.state.auth.user.nickname }}
                    </v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-card-subtitle>
                    <v-text-field
                        :value="this.$store.state.auth.user.email"
                        label="Email"
                        outlined
                        readonly
                    ></v-text-field>
                </v-card-subtitle>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "account"
}
</script>

<style scoped>

</style>
