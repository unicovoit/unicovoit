<template>
    <v-list
        id="contact"
    >
        <h5
            class="text-h5"
        >
            {{ $t('profile.contactInfo.title') }}
        </h5>
        <p class="text-subtitle-2">
            {{ $t('profile.contactInfo.description') }}
        </p>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content>
                <v-list-item-subtitle>
                    {{ $t('profile.contactInfo.email') }}
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
                    {{ $t('profile.contactInfo.phone') }}
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
                        :placeholder="$t('profile.contactInfo.addPhone')"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    {{ $t('profile.contactInfo.snapchat') }}
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
                        :placeholder="$t('profile.contactInfo.addSnapchat')"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    {{ $t('profile.contactInfo.instagram') }}
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
                        :placeholder="$t('profile.contactInfo.addInstagram')"
                    ></v-text-field>
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            class="px-0"
        >
            <v-list-item-content class="py-0">
                <v-list-item-subtitle>
                    {{ $t('profile.contactInfo.messenger') }}
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
                        :placeholder="$t('profile.contactInfo.addMessenger')"
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
                    v => !v || /^\+?[\d]{10,}$/.test(v) || this.$t('error.invalid'),
                ],
                social: [
                    v => !v || /^[\w\-.éèà]+$/.test(v) || this.$t('error.invalid'),
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
