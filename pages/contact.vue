<template>
    <v-container>
        <h2
            class="text-h2 mt-5 mb-3"
        >
            Contact
        </h2>
        <p
            class="text-caption text--secondary mb-8"
        >
            Utilisez ce formulaire pour nous contacter.<br>
            Laissez-nous une adresse mail afin que nous puissions vous répondre.
        </p>
        <v-form
            :action="action"
            method="POST"
        >
            <v-text-field
                v-model="formData.name"
                :rules="[
                    v => !!v || 'Veuillez entrer votre nom',
                ]"
                label="Nom"
                name="name"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="formData.email"
                :rules="[
                    v => !!v || 'Veuillez entrer votre email',
                    v => /.+@.+/.test(v) || 'Veuillez entrer un email valide',
                ]"
                label="Email"
                name="email"
                outlined
            ></v-text-field>
            <v-textarea
                v-model="formData.message"
                :rules="[
                    v => !!v || 'Veuillez entrer votre message',
                ]"
                label="Message"
                multi-line
                name="message"
                outlined
                rows="4"
            ></v-textarea>
            <div
                class="d-flex align-content-space-between"
            >
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="!formData.name || !formData.email || !formData.message"
                    color="primary"
                    large
                    rounded
                    type="submit"
                >
                    Envoyer
                </v-btn>
            </div>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "contact",
    auth: false,
    data() {
        return {
            action: this.$config.pageclipUrl,
            formData: {
                name: '',
                email: '',
                message: '',
            },
        };
    },
}
</script>

<style scoped>

</style>
