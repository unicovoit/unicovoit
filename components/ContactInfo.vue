<template>
    <v-list
        id="contact"
    >
        <h5
            class="text-h5"
        >
            Informations de contact
        </h5>
        <p class="text-subtitle-2">
            Ces informations seront transmises à vos conducteurs ou passagers une fois la réservation confirmée.
        </p>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content>
                <v-list-item-subtitle>
                    Email
                </v-list-item-subtitle>
                <v-list-item-title>
                    {{ contact.email }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="pb-0">
                <v-list-item-subtitle>
                    Téléphone
                </v-list-item-subtitle>
                <v-text-field
                    class="mt-0 pt-0"
                    v-model="contact.phone"
                    clearable
                    :rules="rules.phone"
                    placeholder="Ajouter un numéro de téléphone"
                ></v-text-field>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Snapchat
                </v-list-item-subtitle>
                <v-text-field
                    class="mt-0 pt-0"
                    v-model="contact.snapchat"
                    clearable
                    :rules="rules.social"
                    placeholder="Ajouter un compte Snapchat"
                ></v-text-field>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Instagram
                </v-list-item-subtitle>
                <v-text-field
                    class="mt-0 pt-0"
                    v-model="contact.instagram"
                    clearable
                    :rules="rules.social"
                    placeholder="Ajouter un compte Instagram"
                ></v-text-field>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Facebook
                </v-list-item-subtitle>
                <v-text-field
                    class="mt-0 pt-0"
                    v-model="contact.facebook"
                    clearable
                    :rules="rules.social"
                    placeholder="Ajouter un compte Facebook"
                ></v-text-field>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: "ContactInfo",
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            sendContact: setTimeout(() => {}, 0),
            rules: {
                phone: [
                    v => !!v || 'Merci de renseigner un numéro de téléphone',
                    v => /^\+?[\d]{10,}$/.test(v) || 'Merci de renseigner un numéro de téléphone valide',
                ],
                social: [
                    v => !v || /^[\w\-.éèà]+$/.test(v) || 'Merci de renseigner un compte valide',
                ],
            },
        }
    },
    watch: {
        contact: {
            handler(contact) {
                this.updateContact()
            },
            deep: true,
        },
    },
    methods: {
        async updateContact() {
            clearTimeout(this.sendContact)
            this.sendContact = setTimeout(async () => {
                await this.$axios.put("/api/v1/users/contact", this.contact)
            }, 800)
        }
    },
}
</script>

<style scoped>

</style>
