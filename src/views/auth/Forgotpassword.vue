<template>
  <v-card color="basil">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab :href="`#Signin`"> Reset Password </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="`Signin`">
        <form @submit.prevent="ResetPassword">
          <v-alert
            dense
            outlined
            type="error"
            v-if="messages"
            style="margin: 2px"
          >
            {{ messages }}
          </v-alert>

          <v-alert
            dense
            outlined
            type="success"
            v-if="success"
            style="margin: 2px"
          >
            {{ success }}
          </v-alert>

          <v-card flat>
            <v-card-text>
              <v-text-field
                label="Enter your Email Address"
                v-model="email"
                autocomplete="on"
                :rules="[() => !!email || 'This field is required']"
                required
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn type="submit" block color="warning" dark>
                Reset Password
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "Forgotpassword",

  data() {
    return {
      success: "",
      messages: "",
      tab: null,
      email: "",
    };
  },

  methods: {
    async ResetPassword() {
      if (this.email) {
        HTTP.get(`forgotpassword/resetpassword?email=${this.email}`)
          .then((response) => {
            if (response.status === 200) {
              this.success = "Password sent to your email!";
            }
          })
          .catch((e) => {
            this.messages = "Email not found!";
          });
      } else {
        this.messages = "Email not found!";
      }
    },
  },
};
</script>
