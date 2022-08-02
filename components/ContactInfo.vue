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
                <div class="d-flex flex-row mt-1">
                    <v-icon left color="primary">
                        mdi-email-outline
                    </v-icon>
                    <v-list-item-title>
                        {{ contact.email }}
                    </v-list-item-title>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="pb-0">
                <v-list-item-subtitle>
                    Téléphone
                </v-list-item-subtitle>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mt-2" left color="primary">
                        mdi-phone
                    </v-icon>
                    <v-text-field
                        class="mt-0 pt-0"
                        v-model="contact.phone"
                        clearable
                        :rules="rules.phone"
                        placeholder="Ajouter un numéro de téléphone"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Snapchat
                </v-list-item-subtitle>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mt-2" left color="rgb(201, 198, 19)">
                        mdi-snapchat
                    </v-icon>
                    <v-text-field
                        class="mt-0 pt-0"
                        v-model="contact.snapchat"
                        clearable
                        :rules="rules.social"
                        placeholder="Ajouter un compte Snapchat"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Instagram
                </v-list-item-subtitle>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mt-2" left color="rgb(220, 11, 66)">
                        mdi-instagram
                    </v-icon>
                    <v-text-field
                        class="mt-0 pt-0"
                        v-model="contact.instagram"
                        clearable
                        :rules="rules.social"
                        placeholder="Ajouter un compte Instagram"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    Facebook Messenger
                </v-list-item-subtitle>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mt-2" left color="#3e6efed6">
                        mdi-facebook-messenger
                    </v-icon>
                    <v-text-field
                        class="mt-0 pt-0"
                        v-model="contact.facebook"
                        clearable
                        :rules="rules.social"
                        placeholder="Ajouter un compte Facebook"
                    ></v-text-field>
                </div>
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
                    v => !v || /^\+?[\d]{10,}$/.test(v) || 'Merci de renseigner un numéro de téléphone valide',
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
                console.log(this.checkContacts())
                if (this.checkContacts())
                    await this.$axios.put("/api/v1/users/contact", this.contact)
            }, 800)
        },
        checkContacts() {
            if (this.rules.phone.some(r => typeof r(this.contact.phone) !== "boolean"))
                return false
            if (this.rules.social.some(r => typeof r(this.contact.instagram) !== "boolean"))
                return false
            if (this.rules.social.some(r => typeof r(this.contact.facebook) !== "boolean"))
                return false
            if (this.rules.social.some(r => typeof r(this.contact.snapchat) !== "boolean"))
                return false
            return true
        }
    },
}
</script>

<style scoped>

</style>
