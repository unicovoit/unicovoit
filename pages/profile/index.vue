<template>
    <v-container>
        <v-alert
            v-if="!$auth.user.email_verified"
            icon="mdi-alert-circle"
            type="error"
            border="left"
            text
        >
            {{ $t('profile.confirmEmail.short') }}
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
                    {{ $t('profile.confirmEmail.title') }}
                </v-card-title>
                <v-card-text>
                    <i18n path="profile.confirmEmail.description" tag="span">
                        <br>
                    </i18n>
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

        <v-container
            class="pt-0"
        >
            <v-row
                class="d-flex align-center"
            >
                <v-col
                    class="px-0"
                    cols="8"
                >
                    <span
                        v-if="!editNickname"
                        class="text-h3"
                    >
                        {{ user.nickname || user.name }}
                    </span>
                    <v-text-field
                        v-else
                        v-model="user.nickname"
                        :rules="nameRules"
                        :counter="30"
                        :label="$t('profile.nickname')"
                        style="width: 80%"
                        required
                        @keydown.enter="updateNickname"
                        @keydown.esc="editNickname = false"
                    ></v-text-field>
                </v-col>
                <v-col
                    class="d-flex justify-center pl-0"
                    cols="1"
                >
                    <v-btn
                        class="primary--text"
                        icon
                        x-small
                        @click="updateNickname"
                    >
                        <v-icon v-if="editNickname">mdi-check</v-icon>
                        <v-icon v-else>mdi-square-edit-outline</v-icon>
                    </v-btn>
                </v-col>
                <v-col
                    class="pr-0 d-flex flex-row"
                    cols="3"
                >
                    <v-spacer></v-spacer>
                    <v-avatar
                        size="80"
                        @click="$refs.avatar.click()"
                    >
                        <v-img
                            :src="user.picture"
                        ></v-img>
                        <v-btn
                            class="primary--text mr-n1"
                            absolute
                            fab
                            x-small
                            @click="$refs.avatar.click()"
                        >
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-btn>
                    </v-avatar>
                    <input
                        hidden
                        ref="avatar"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        @change="onAvatarChange"
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-list
            class="px-md-5"
        >
            <v-list-item class="px-0">
                <v-list-item-content>
                    <v-list-item-subtitle>
                        {{ $t('profile.university') }}
                    </v-list-item-subtitle>
                    <v-list-item-title>
                        {{ user.university || $t('error.unknown') }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <LazyContactInfo
            class="px-md-5"
            :contact="contact"
        />

        <LazyModifyProfile
            class="px-md-5"
            :user="user"
            @refresh="$fetch"
        />

        <v-divider class="mt-7"></v-divider>

        <LazySettings :user="user"/>
    </v-container>
</template>

<script>
export default {
    name: "account",
    head() {
        return {
            title: this.$t('profile.title'),
        }
    },
    auth: true,
    data() {
        return {
            user: {},
            emailExplanation: false,
            editNickname: false,
        }
    },
    computed: {
        nameRules() {
            return [
                v => !!v || this.$t('error.required'),
                v => v.length <= 30 || this.$t('error.tooLong'),
            ]
        },
        contact() {
            return this.user.contact || {}
        }
    },
    async fetch() {
        try {
            this.user = await this.$axios.$get(`/api/v1/users`)
        } catch (e) {
            console.error(e)
        }
    },
    activated() {
        if (!this.$fetchState.pending)
            this.$fetch()
    },
    methods: {
        toggleTheme() {
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict',
                    httpOnly: false,
                })
                this.$plausible.trackEvent('darkTheme', {
                    props: {
                        variation: this.$vuetify.theme.dark
                    },
                });
            } catch (e) {
                console.error(e)
            }
            return this.$vuetify.theme.dark
        },
        onAvatarChange(e) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (evt) => {
                this.$axios.put("/api/v1/users/picture", {
                    picture: evt.target.result
                }).then(res => {
                    this.$fetch()
                })
            }
            reader.readAsDataURL(file)
        },
        updateNickname() {
            if (this.editNickname) {
                if (this.user.nickname !== '' && this.user.nickname !== null) {
                    this.$axios.put("/api/v1/users/nickname", {
                        nickname: this.user.nickname
                    })
                }
            }
            this.editNickname = !this.editNickname
        },
    },
}
</script>

<style scoped lang="sass">
.v-avatar
    align-items: end
    justify-content: right
    overflow: visible

    .v-btn.v-btn--absolute.v-btn--fab
        bottom: 0
        right: 0

.v-list#main
    background: none

div.v-input__control div.v-text-field__details
    display: none !important
</style>
