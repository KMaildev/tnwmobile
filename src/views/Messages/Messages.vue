<template>
  <div>
    <v-card class="mx-auto" max-width="auto">
      <v-alert
        border="top"
        color="red lighten-2"
        dark
        v-if="messages.length == 0"
      >
        သင်ထံဆက်သွယ်မေးမြန်းထားမှု မရှိသေးပါ
      </v-alert>
      <v-list two-line v-else>
        <v-list-item-group
          active-class="pink--text"
          multiple
        >
          <template v-for="(message, index) in messages">
            <v-list-item
              :key="index"
              :to="{
                name: 'MessageDetail',
                params: { id: message.mm_id },
              }"
            >
              <template>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="message.subject"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="message.email"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="message.message"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="message.other_date"
                  ></v-list-item-action-text>
                  <v-icon color="grey lighten-1"> mdi-star-outline </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index < messages.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>


<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "Messages",
  data() {
    return {
      tnwuserdatastore: {},
      messages: [],
    };
  },

  methods: {
    async fetch_message() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`message/index/${userId}`)
        .then((response) => {
          this.messages.push(...response.data.data);
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch_message();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>