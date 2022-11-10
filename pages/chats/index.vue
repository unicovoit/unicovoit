<template>
    <div>
        <i18n
            path="chat.recentChats"
            tag="h4"
            class="text-h4 mt-2"
        ></i18n>

        <v-container>
            <v-row
                v-for="chat in conversations"
                :key="chat.id"
                class="chat-row d-flex align-center justify-space-evenly"
                @click="openChat(chat)"
                v-ripple
            >
                <v-col
                    cols="2"
                >
                    <v-avatar
                        size="50"
                        class="mr-2"
                    >
                        <img
                            :src="chat.avatar"
                            alt="avatar"
                        >
                    </v-avatar>
                </v-col>
                <v-col
                    cols="10"
                >
                    <v-row>
                        <v-col
                            cols="10"
                        >
                            <h6
                                class="text-h6"
                                :class="{'font-weight-bold': chat.unreadMessages > 0}"
                            >
                                {{ chat.name }}
                            </h6>
                            <p
                                class="text-body-2"
                                :class="{'font-weight-bold': chat.unreadMessages > 0}"
                            >
                                {{ chat.lastMessage }}
                            </p>
                        </v-col>
                        <v-col
                            cols="2"
                            class="align-self-center"
                        >
                            <v-icon
                                v-if="chat.unreadMessages > 0"
                                size="10"
                            >
                                mdi-moon-full
                            </v-icon>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "chat",
    auth: false,
    data() {
        return {
            conversations: [
                {
                    id: 1,
                    name: "John Doe",
                    lastMessage: "Hello, how are you?",
                    lastMessageTime: "12:00",
                    unreadMessages: 0,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
                },
                {
                    id: 2,
                    name: "Jane Doe",
                    lastMessage: "Hello, how are you?",
                    lastMessageTime: "12:00",
                    unreadMessages: 2,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
                },
                {
                    id: 3,
                    name: "John Doe",
                    lastMessage: "Hello, how are you?",
                    lastMessageTime: "12:00",
                    unreadMessages: 0,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
                },
                {
                    id: 4,
                    name: "Jane Doe",
                    lastMessage: "Hello, how are you?",
                    lastMessageTime: "12:00",
                    unreadMessages: 0,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
                },
                {
                    id: 5,
                    name: "John Doe",
                    lastMessage: "Hello, how are you?",
                    lastMessageTime: "12:00",
                    unreadMessages: 0,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
                },
            ],
            user: {
                name: "John Doe",
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
            }
        };
    },
    methods: {
        openChat(chat) {
            this.$router.push(this.localePath(`/chats/${chat.id}`));
        }
    },
}
</script>

<style scoped lang="sass">
.chat-row:not(:last-child)
    cursor: pointer
    border-bottom: 1px solid #e0e0e0
</style>
