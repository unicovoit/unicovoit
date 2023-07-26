<template>
    <v-container>
        <h2
            class="text-h2"
        >
            {{ $t("appBar.about") }}
        </h2>

        <div
            class="mt-6"
        >
            <i18n
                v-for="(item,i) in $t('aboutPage.content')"
                :key="i"
                :path="`aboutPage.content[${i}]`"
                tag="p"
            >
                <template #privacyPolicy>
                    <NuxtLink
                        :to="localePath('/legal/privacy')"
                        style="color: inherit"
                    >
                        {{ $t("privacyPolicy") }}</NuxtLink>
                </template>
                <template #termsOfUse>
                    <NuxtLink
                        :to="localePath('/legal')"
                        style="color: inherit"
                    >
                        {{ $t("termsOfUse") }}</NuxtLink>
                </template>
                <template #contactForm>
                    <NuxtLink
                        :to="localePath('/contact')"
                        style="color: inherit"
                    >
                        {{ $t("contactForm") }}</NuxtLink>
                </template>
                <template #finxol>
                    <a
                        class="text--secondary"
                        href="https://github.com/unicovoit/unicovoit"
                        rel="noopener noreferrer"
                        target="_blank"
                    >finxol</a>
                </template>
                <template #logoDesigner>
                    <a
                        class="text--secondary"
                        href="https://www.instagram.com/feun_art/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >Enora Couloigner</a>
                </template>
            </i18n>

            <p>
                <span
                    class="red--text"
                >
                    ❤
                </span>
                <span
                    class="font-weight-bold"
                >
                    {{ $t("aboutPage.thankYouDonors") }} :
                </span>
                Raven,
                Tanguy,
                Liam,
                Azgulute,
                François,
                Elouann
                <br>
                <span
                    class="body-2"
                >
                    {{ $t('aboutPage.makeADonation') }} <a
                        class="text--secondary"
                        href="https://ko-fi.com/unicovoit"
                        rel="noopener noreferrer"
                        target="_blank"
                    >Ko-Fi</a>.
                </span>
            </p>

            <v-alert
                class="mx-auto mt-9 mt-md-14"
                color="green"
                icon="mdi-leaf"
                outlined
            >
                <span
                >
                    <i18n path="aboutPage.unicovoitIsGreen">
                        <template #cleanerThan>{{ cleanerThan }}</template>
                    </i18n>
                    <a
                        href="https://www.websitecarbon.com/website/unicovoit-fr/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Website Carbon</a>.
                </span>
            </v-alert>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "about",
    auth: false,
    head() {
        return {
            title: this.$t("appBar.about"),
        }
    },
    data: () => ({
        cleanerThan: "82",
    }),
}
</script>

<style lang="sass" scoped>
</style>
