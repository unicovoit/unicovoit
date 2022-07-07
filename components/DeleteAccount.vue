<template>
    <div>
        <v-btn
            class="my-4"
            depressed
            block
            outlined
            color="error"
            @click="confirmDeletion = true"
        >
            <v-icon class="mr-2">mdi-trash-can-outline</v-icon>
            Supprimer mon compte
        </v-btn>

        <!-- Confirm booking suppression -->
        <v-dialog
            v-model="confirmDeletion"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Voulez-vous vraiment supprimer votre compte ?
                </v-card-title>
                <v-card-text>
                    Cela supprimera tous vos trajets, réservations, et vos informations personnelles.<br>
                    <span class="font-weight-black text--primary">Cette action est irréversible.</span>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ma-1"
                        color="primary"
                        text
                        @click.prevent="confirmDeletion = false"
                    >
                        Annuler
                    </v-btn>

                    <v-btn
                        class="ma-1"
                        color="error"
                        @click="deleteAccount()"
                    >
                        Supprimer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "DeleteAccount",
    data() {
        return {
            confirmDeletion: false,
        }
    },
    methods: {
        deleteAccount() {
            console.log("Deleting account...")
            this.$auth.logout()
        },
    },
}
</script>

<style scoped>

</style>
