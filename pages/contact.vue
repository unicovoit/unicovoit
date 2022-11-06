<template>
    <v-container>
        <h2
            class="text-h2 mt-5 mb-3"
        >
            {{ $t('contact.title') }}
        </h2>
        <i18n
            path="contact.subtitle"
            tag="p"
            class="text-caption text--secondary mb-8"
        >
            <br>
        </i18n>
        <v-alert
            v-if="finished"
            border="left"
            class="mx-2 my-4"
            type="success"
        >
            {{ $t('contact.sent') }}
        </v-alert>
        <v-form v-else>
            <v-text-field
                v-model="formData.name"
                :rules="[
                    v => !!v || $t('error.required'),
                ]"
                :label="$t('contact.name')"
                name="name"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="formData.email"
                :rules="[
                    v => !!v || $t('error.required'),
                    v => /.+@.+/.test(v) || $t('error.invalid'),
                ]"
                :label="$t('contact.email')"
                name="email"
                outlined
            ></v-text-field>
            <v-textarea
                v-model="formData.message"
                :rules="[
                    v => !!v || $t('error.required'),
                ]"
                :label="$t('contact.message')"
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
                    {{ $t('contact.send') }}
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
