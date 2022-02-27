<template>
  <div>
    <template>
      <v-container>
        <v-row justify="space-around">
          <v-alert
            border="top"
            color="red lighten-2"
            dark
            v-if="messages.length == 0"
          >
            ယနေ့ ချိန်းဆိုမှု (Appointment) မရှိပါ
          </v-alert>
          <v-card width="auto" v-else>
            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">
                ချိန်းဆိုမှု ဇယား (Appointment)
              </div>
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="(message, index) in messages"
                  :key="index"
                  :color="green"
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>
                        {{ message.appointment_date }}
                      </strong>
                      {{ message.appointment_time }}
                    </div>
                    <div>{{ message.phone_number }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </div>
</template>


<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "Appointment",
  data() {
    return {
      tnwuserdatastore: {},
      messages: [],
    };
  },

  methods: {
    async fetch_appointment() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`appointment/index/${userId}`)
        .then((response) => {
          this.messages.push(...response.data.data);
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch_appointment();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>