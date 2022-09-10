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
        <v-alert
            v-if="finished"
            border="left"
            class="mx-2 my-4"
            type="success"
        >
            Message envoyé !
        </v-alert>
        <v-form v-else>
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
                    :loading="loading"
                    color="primary"
                    large
                    rounded
                    @click="submit"
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
    head() {
        return {
            title: "Contact",
        }
    },
    auth: false,
    data() {
        return {
            action: this.$config.pageclipUrl,
            formData: {
                name: '',
                email: '',
                message: '',
            },
            loading: false,
            finished: false
        };
    },
    methods: {
        async submit() {
            try {
                this.loading = true
                const req = this.$axios.create({
                    maxRedirects: 0,
                })
                delete req.defaults.headers.common['Content-Type']
                await req.post(this.action, this.formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    maxRedirects: 0,
                })
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
                this.finished = true
            }
        }
    }
}
</script>

<style scoped>

</style>
