<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Profile
        </h2>
        <v-alert
            v-if="!this.$store.state.auth.user.email_verified"
            icon="mdi-alert-circle"
            type="error"
            border="left"
            text
        >
            Cliquez sur le lien reçu pour vérifier votre adresse mail
        </v-alert>

        <v-card
            v-if="!$config.isProd"
            outlined
        >
            <v-container>
                {{ this.$store.state.auth.user }}
            </v-container>
        </v-card>

        <v-card
            class="mx-auto"
            outlined
            style="margin:2rem 0;padding:1rem"
        >
            <v-row
                align="center"
                justify="center"
            >
                <v-col>
                    <v-avatar>
                        <v-img
                            :src="this.$store.state.auth.user.picture"
                            class="rounded-lg"
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
