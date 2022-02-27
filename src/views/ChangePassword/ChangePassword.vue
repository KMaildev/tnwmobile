<template>
  <v-card color="basil">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab :href="`#Signin`"> Change Password </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="`Signin`">
        <form @submit.prevent="ChangePassword">
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
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                counter
                @click:append="show1 = !show1"
                autocomplete="on"
                :rules="[() => !!password || 'This field is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :type="show1 ? 'text' : 'password'"
                label="Confirm"
                autocomplete="on"
                :rules="[() => !!confirmPassword || 'This field is required']"
                required
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn type="submit" block color="warning" dark> Change </v-btn>
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
  name: "ChangePassword",

  data() {
    return {
      success: "",
      messages: "",
      tab: null,
      show1: false,
      tnwuserdatastore: {},
      password: "",
      confirmPassword: "",
    };
  },

  methods: {
    async ChangePassword() {
      var userId = this.tnwuserdatastore.user_id;
      if (this.password === this.confirmPassword) {
        HTTP.get(
          `auth/changepassword?password=${this.password}&userId=${userId}`
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "လျို့ဝှက်နံပါတ် ချိန်းပြီးပါပြီ";
              this.password = "";
              this.confirmPassword = "";
            }
          })
          .catch((e) => {
            this.messages = "Something went wrong";
          });
      } else {
        this.messages = "Password do not match";
      }
    },
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>
