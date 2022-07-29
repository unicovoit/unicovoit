<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Mon compte
        </h2>

        <v-alert
            v-if="!$auth.user.email_verified"
            icon="mdi-alert-circle"
            type="error"
            border="left"
            text
        >
            Cliquez sur le lien reçu pour vérifier votre adresse mail
            <v-icon
                dense
                color="error"
                @click="emailExplanation = true"
            >mdi-help-circle-outline
            </v-icon>
        </v-alert>
        <!-- Explain why user needs to verify email -->
        <v-dialog
            v-model="emailExplanation"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Pourquoi vérifier votre adresse mail ?
                </v-card-title>
                <v-card-text>
                    Vérifier votre adresse mail nous permet de nous assurer que vous êtes bien le propriétaire du compte,
                    et que l'adresse ne contient pas d'erreur.<br>
                    Si l'adresse est incorrecte, vous ne recevrez pas nos mails de confirmation et de notification.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="emailExplanation = false"
                    >
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card
            v-if="!$config.isProd"
            class="overflow-auto"
            outlined
            max-height="100px"
        >
            <v-container>
                {{ user }}
            </v-container>
        </v-card>

        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        Nom
                    </v-list-item-subtitle>
                    <v-list-item-title>
                        {{ user.nickname || user.name }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        Avatar
                    </v-list-item-subtitle>

                    <v-list-item-group>
                        <v-avatar>
                            <v-img
                                :src="user.picture"
                            ></v-img>
                        </v-avatar>
                    </v-list-item-group>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        Email
                    </v-list-item-subtitle>
                    <v-list-item-title>
                        {{ user.email }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <LazyModifyProfile :user="user"/>
        <LazyDisplayBookingsAndTrips/>

        <v-divider class="mt-7"></v-divider>
        <DeleteAccount/>
    </v-container>
</template>

<script>
export default {
    name: "account",
    auth: true,
    data() {
        return {
            emailExplanation: false,
        }
    },
    async asyncData({ store, $auth }) {
        return {
            user: await store.dispatch('user', $auth.strategy.token.get())
        }
    }
}
</script>

<style scoped>

</style>
