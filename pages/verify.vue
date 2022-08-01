<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Vérification
        </h2>


        <div
            v-if="verified"
        >
            <v-alert
                border="left"
                icon="mdi-check-circle"
                text
                type="success"
            >
                Statut étudiant vérifié
            </v-alert>
        </div>

        <div
            v-else
        >
            <v-window
                v-model="step"
                v-touch="{
                    right: () => {},
                    left: () => {},
                }"
            >
                <v-window-item
                    :value="1"
                >
                    <p
                        class="text-body-1 mt-3 mb-2"
                    >
                        Avant de pouvoir utiliser UniCovoit, vous devez vérifier votre statut étudiant.
                    </p>
                    <p
                        class="text-caption text--secondary mb-10"
                    >
                        Nous utilisons la vérification de votre adresse mail étudiante afin de valider votre profil
                        étudiant.
                        Cette vérification est renouvelée chaque année.<br>
                        Nous n'utiliserons pas cette adresse à l'avenir.
                    </p>
                    <h6
                        class="text-h6 font-weight-regular justify-space-between"
                    >
                        Entrez votre adresse mail universitaire
                    </h6>
                    <v-text-field
                        ref="email"
                        v-model="email"
                        :rules="rules"
                        label="Adresse mail"
                        placeholder="nom.e2111111@etud.univ-ubs.fr"
                    ></v-text-field>
                    <span class="text-caption grey--text text--darken-1"></span>

                    <div
                        class="d-flex flex-row"
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            :loading="loading"
                            color="primary"
                            elevation="0"
                            outlined
                            rounded
                            @click="sendCode"
                        >
                            Vérifier
                        </v-btn>
                    </div>

                    <v-alert
                        v-if="error"
                        border="left"
                        class="mt-5"
                        icon="mdi-alert-circle"
                        text
                        type="error"
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
                    <p
                        ref="timer"
                    >
                        {{ timer }}
                    </p>
                    <v-otp-input
                        v-model="code"
                        :disabled="loading"
                        class="my-4"
                        @finish="verify"
                    ></v-otp-input>
                    <v-overlay
                        :value="loading"
                        absolute
                    >
                        <v-progress-circular
                            color="primary"
                            indeterminate
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
                        border="left"
                        class="mt-5"
                        icon="mdi-alert-circle"
                        text
                        type="error"
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
            timer: '',
            step: 1,
            loading: false,
            error: false,
            resend: false,
            code: "",
            email: "",
            errorMessages: {
                teapot: `Le format de votre adresse mail n'est pas reconnu.
                    Votre université n'est peut-être pas encore prise en charge par UniCovoit.`,
                exists: `L'adresse mail entrée est déjà utilisée.`,
                generic: `Une erreur est survenue. Merci de réessayer plus tard.`
            },
            countdownInterval: setInterval(() => {}, 0),
            countdownDate: new Date(),
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
        countdown() {
            let now = new Date()
            this.countdownDate = new Date().setMinutes(now.getMinutes() + 5)
            clearInterval(this.countdownInterval)
            this.countdownInterval = setInterval(function () {
                let now = new Date().getTime()
                let timeleft = this.countdownDate - now

                // Calculating the days, hours, minutes and seconds left
                let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
                let seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

                // Result is output to the specific element
                this.timer = `${minutes}:${seconds}`

                // Display the message when countdown is over
                if (timeleft < 0) {
                    clearInterval(this.countdownInterval);
                    this.timer = "Le code a expiré."
                }
            }, 1000);
        },
        async fetch() {
            if (this.token) {
                const axios = this.$axios.create()
                delete axios.defaults.headers.common['Authorization']
                delete axios.defaults.headers.common['Cookie']
                let {data} = await axios.get('/api/v1/users/isVerified', {
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
                this.countdown()
                setTimeout(() => {
                    this.resend = true
                }, 15000)
            }).catch(err => {
                this.loading = false
                if (err.response.status === 418) {
                    this.error = this.errorMessages.teapot
                } else if (err.response.status === 409) {
                    this.error = this.errorMessages.exists
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
                state: this.$route.query.state,
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
