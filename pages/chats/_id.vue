<template>
    <div
        class=""
    >
        <v-container
            class="d-flex align-center justify-space-evenly grey lighten-5 chat-header"
            :class="$vuetify.theme.dark ? 'darken-4' : 'lighten-5'"
        >
            <v-btn
                @click="$router.go(-1)"
                icon
            >
                <v-icon
                    class="mr-2"
                >
                    mdi-arrow-left
                </v-icon>
            </v-btn>
            <v-avatar
                size="50"
                class="mr-2"
            >
                <img
                    :src="chat.avatar"
                    alt="avatar"
                >
            </v-avatar>
            <v-toolbar-title>
                {{ chat.name }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-container>

        <v-container
            class="fill-height d-flex align-end pb-14 mb-14"
        >
            <v-row
                v-for="msg in messages"
                :key="msg.id"
                class="px-4 py-2 d-flex fill-height"
                :class="{
                    'justify-end': msg.isMine,
                    'justify-start': !msg.isMine
                }"
            >
                <v-col
                    cols="7"
                    class="message"
                    :class="[
                        msg.isMine ? 'primary me' : 'grey',
                        $vuetify.theme.dark ? 'darken-2' : 'lighten-2'
                    ]"
                >
                    {{ msg.text }}
                </v-col>
            </v-row>
        </v-container>

        <v-footer
            class="mb-14"
            fixed
        >
            <v-row no-gutters>
                <v-col>
                    <div
                        class="d-flex flex-row align-center"
                    >
                        <v-text-field
                            v-model="draftMsg"
                            placeholder="Type Something"
                            @keypress.enter="send"
                        ></v-text-field>
                        <v-btn
                            icon
                            class="ml-4"
                            @click="send"
                        >
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: "_id",
    auth: false,
    data: () => ({
        draftMsg: '',
        user: {
            id: 1,
            name: "John Doe",
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        },
        chat: {
            id: 1,
            name: "Jane Doe",
            avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        },
        messages: [
            {
                id: 1,
                text: "Hello, how are you?",
                time: "12:00",
                isMine: false,
            },
            {
                id: 2,
                text: "I'm fine, thank you!",
                time: "12:01",
                isMine: true,
            },
            {
                id: 3,
                text: "Nice to hear that!",
                time: "12:02",
                isMine: false,
            },
            {
                id: 4,
                text: "How about you?",
                time: "12:03",
                isMine: true,
            },
            {
                id: 5,
                text: "I'm fine, thank you!",
                time: "12:04",
                isMine: false,
            },
        ],
    }),
    computed: {
        colourShade() {
        }
    },
    methods: {
        send() {
            this.messages.push({
                id: this.messages[this.messages.length -1].id +1,
                text: this.draftMsg,
                time: "12:00",
                isMine: true
            })
            this.draftMsg = ''
        }
    }
}
</script>

<style scoped lang="sass">
.chat-header
    position: sticky
    top: 0

.message
    border-radius: .5rem .5rem .5rem .2rem
    padding: .4rem .5rem .2rem

    &.me
        border-radius: .5rem .5rem .2rem
</style>
