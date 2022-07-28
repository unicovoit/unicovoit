<template>
    <v-container>
        <h2
            class="text-h2 mb-8"
        >
            Vérification
        </h2>

        <div
            v-if="verified"
        >
            <v-alert
                icon="mdi-check-circle"
                type="success"
                border="left"
                text
            >
                Statut étudiant vérifié
            </v-alert>
        </div>

        <div
            v-else
        >
            <v-window
                v-model="step"
            >
                <v-window-item
                    :value="1"
                >
                    <h6
                        class="text-h6 font-weight-regular justify-space-between"
                    >
                        Entrez votre adresse mail universitaire
                    </h6>
                    <v-text-field
                        v-model="email"
                        :rules="rules"
                        ref="email"
                        label="Adresse mail"
                        placeholder="nom.e2111111@etud.univ-ubs.fr"
                    ></v-text-field>
                    <span class="text-caption grey--text text--darken-1"></span>

                    <div
                        class="d-flex flex-row "
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            :loading="loading"
                            color="primary"
                            fab
                            small
                            elevation="0"
                            @click="sendCode"
                        >
                            <v-icon>
                                mdi-arrow-right
                            </v-icon>
                        </v-btn>
                    </div>

                    <v-alert
                        v-if="error"
                        class="mt-5"
                        icon="mdi-alert-circle"
                        type="error"
                        border="left"
                        text
                    >
                        {{ error }}
                    </v-alert>
                </v-window-item>

                <v-window-item
                    :value="2"
                >
                    <h6
                        class="text-h6 font-weight-regular justify-space-between"
                    >
                        Entrez le code reçu par mail
                    </h6>
                    <v-otp-input
                        class="my-4"
                        v-model="code"
                        :disabled="loading"
                        @finish="verify"
                    ></v-otp-input>
                    <v-overlay
                        absolute
                        :value="loading"
                    >
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </v-overlay>

                    <div
                        v-if="resend"
                        class="text-body-2"
                    >
                        Vous n'avez rien reçu ?
                        <span
                            class="text--secondary text-decoration-underline cursor-pointer"
                            @click="sendCode"
                        >
                            Renvoyer le code
                        </span>
                    </div>

                    <v-alert
                        v-if="error"
                        class="mt-5"
                        icon="mdi-alert-circle"
                        type="error"
                        border="left"
                        text
                    >
                        Le code entré est incorrect.<br>
                        <span
                            class="text-decoration-underline cursor-pointer"
                            @click="firstStep"
                        >
                            Corriger l'adresse mail ?
                        </span>
                    </v-alert>
                </v-window-item>
            </v-window>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "verify",
    auth: false,
    data() {
        return {
            verified: false,
            token: this.$route.query.token,
            step: 1,
            loading: false,
            error: false,
            resend: false,
            code: "",
            email: "",
            errorMessages: {
                teapot: `Le format de votre adresse mail n'est pas reconnu.
                    Votre université n'est peut-être pas encore prise en charge par UniCovoit.`,
                generic: `Une erreur est survenue. Merci de réessayer plus tard.`
            }
        }
    },
    computed: {
        rules() {
            return [
                v => !!v || "L'adresse mail est obligatoire",
                v => /^[\dA-Za-z\-.]+@[\da-z\-.]+\.[a-z]+$/.test(v) || "L'adresse mail doit être valide",
            ]
        }
    },
    activated() {
        this.fetch()
    },
    methods: {
        async fetch() {
            if (!this.token && !this.$config.isProd) {
                this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg4NzIxNDUsImlzcyI6Iml1Y292b2l0LmF1dGgwLmNvbSIsInN1YiI6ImF1dGgwfDVmN2M4ZWM3YzMzYzZjMDA0YmJhZmU4MiIsImV4cCI6MTY1OTk5OTk5OSwiaXAiOiIxMy4zMy44Ni40NyJ9.qoTr16G5TdgrmtSkmVZmhdHsX7rZ86J0IMYnDX-VG9g'
            }

            if (this.token) {
                const axios = this.$axios.create()
                delete axios.defaults.headers.common['Authorization']
                delete axios.defaults.headers.common['Cookie']
                let { data } = await axios.get('/api/v1/users/isVerified', {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                        Cookie: undefined
                    }
                })
                this.verified = data.verified
                this.token = data.token
            } else {
                await this.$router.push('/profile')
            }
        },
        firstStep() {
            this.loading = false
            this.error = false
            this.step = 1
        },
        verifyRules() {
            let valid = true
            this.rules.forEach(rule => {
                let v = rule(this.email)
                if (typeof v !== "boolean" && v !== true) {
                    valid = false
                }
            })
            return valid
        },
        async sendCode() {
            if (!this.verifyRules()) return

            this.loading = true
            const axios = this.$axios.create()
            delete axios.defaults.headers.common['Authorization']
            delete axios.defaults.headers.common['Cookie']
            await axios.post('/api/v1/users/sendVerificationCode', {
                email: this.email,
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            }).then(res => {
                this.loading = false
                this.error = false
                this.step = 2
                this.token = res.data.token
                setTimeout(() => {
                    this.resend = true
                }, 6000)
            }).catch(err => {
                this.loading = false
                if (err.response.status === 418) {
                    this.error = this.errorMessages.teapot
                } else {
                    this.error = this.errorMessages.generic
                }
                console.error(err)
            })

        },
        async verify() {
            this.loading = true
            const axios = this.$axios.create()
            delete axios.defaults.headers.common['Authorization']
            delete axios.defaults.headers.common['Cookie']
            await axios.post('/api/v1/users/verify', {
                code: this.code,
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            }).then(res => {
                this.verified = true
                this.error = false
                this.loading = false

                setTimeout(() => {
                    const state = this.$route.query.state
                    window.location.replace(`https://${this.$config.AUTH0_DOMAIN}/continue?state=${state}&token=${res.data.token}`)
                }, 2000)
            }).catch(err => {
                this.loading = false
                this.code = ""
                console.error(err.message)
                this.error = true
            })
        }
    },
}
</script>

<style scoped>

</style>
