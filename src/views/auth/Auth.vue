<template>
  <v-card color="basil">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab :href="`#Signin`"> Sign In </v-tab>
      <v-tab :href="`#Signup`"> Sign Up </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="`Signin`">
        <v-alert
          dense
          outlined
          type="error"
          v-if="messages"
          style="margin: 2px"
        >
          {{ messages }}
        </v-alert>
        <form @submit.prevent="signin">
          <v-card flat>
            <v-card-text>
              <v-text-field
                label="Phone number or email address"
                v-model="email"
                autocomplete="on"
                :rules="[() => !!email || 'This field is required']"
                required
              ></v-text-field>

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

              <template>
                <div>
                  <router-link
                    :to="{ name: 'Forgotpassword' }"
                    style="text-decoration: none"
                  >
                    Forgot your password?
                  </router-link>
                </div>
              </template>
            </v-card-text>

            <v-card-actions>
              <v-btn type="submit" block color="warning" dark> Sign In </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-tab-item>

      <v-tab-item :value="`Signup`">
        <v-alert
          dense
          outlined
          type="error"
          v-if="messages"
          style="margin: 2px"
        >
          {{ messages }}
        </v-alert>
        <form @submit.prevent="signup">
          <v-card flat>
            <v-card-text>
              <v-select
                :items="items"
                item-text="name"
                item-value="value"
                label="Account Type"
                v-model="user_permissions"
              ></v-select>

              <v-text-field
                label="Phone number or email address"
                v-model="email"
              ></v-text-field>

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
                label="Company name or User name"
                v-model="company_name"
              ></v-text-field>

              <v-select
                :items="company_types"
                item-text="name"
                item-value="value"
                label="Company Type"
                v-model="company_type"
              ></v-select>

              <v-text-field label="Address" v-model="address"></v-text-field>

              <v-text-field
                label="Contact Number"
                v-model="contact_number"
              ></v-text-field>

              <v-textarea
                name="input-7-1"
                label="Description"
                v-model="description"
              ></v-textarea>

              <v-checkbox>
                <template v-slot:label>
                  <div>
                    I agree that
                    <router-link :to="{ name: 'Terms' }">
                      Terms & Conditions
                    </router-link>
                  </div>
                </template>
              </v-checkbox>
            </v-card-text>

            <v-card-actions>
              <v-btn type="submit" block color="warning" dark> Sign Up </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { HTTP } from "@/use/http-common";
import axios from "axios";

export default {
  name: "Auth",

  data() {
    return {
      tab: null,
      items: [
        {
          name: "Agent",
          value: "agent",
        },
        {
          name: "Owner",
          value: "by_owner",
        },
      ],

      company_types: [
        {
          name: "အကျိုးဆောင် ကုမ္ပဏီ",
          value: "PropertyAgency",
        },
        {
          name: "ပိုင်ရှင်ကိုယ်တိုင်",
          value: "ByOwner",
        },

        {
          name: "အကျိုးဆောင်(တစ်ဦးတစ်ယောက်)",
          value: "IndividualAgent",
        },
        {
          name: "ဆောက်လုပ်ရေး ကုမ္ပဏီ",
          value: "ConstructionCompany",
        },
        {
          name: "အိမ်အလှဆင် ကုမ္ပဏီ",
          value: "RenovationCompany",
        },
        {
          name: "သယ်ယူပို့ဆောင်ရေး ကုမ္ပဏီ",
          value: "TransportationCompany",
        },
      ],

      show1: false,
      password: "Password",

      email: "",
      password: "",
      messages: "",

      company_name: "",
      address: "",
      contact_number: "",
      description: "",
      user_permissions: "",
      company_type: "",
    };
  },

  methods: {
    async signin() {
      HTTP.get(`auth/index?email=${this.email}&password=${this.password}`)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("tnwauth", this.email);
            this.$router.push({ name: "AgentDashboard" });

            var userData = response.data.data;
            localStorage.setItem("tnwuserstore", JSON.stringify(userData));

            window.location.reload();
          }
        })
        .catch((e) => {
          this.messages = "Email or Password is in incorrect";
        });
    },

    async signup() {
      HTTP.get(
        `auth/signup?email=${this.email}&password=${this.password}&company_name=${this.company_name}&address=${this.address}&contact_number=${this.contact_number}&description=${this.description}&user_permissions=${this.user_permissions}&company_type=${this.company_type}`
      )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("tnwauth", this.email);
            this.$router.push({ name: "AgentDashboard" });

            var userData = response.data.data;
            localStorage.setItem("tnwuserstore", JSON.stringify(userData));
            window.location.reload();
          }
        })
        .catch((e) => {
          if (e.response.status === 500) {
            this.messages =
              this.email + " မှာ Register လုပ်ထားပြီးသား ဖြစ်ပါသည်။";
          } else {
            this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          }
        });
    },
  },
};
</script>
<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: black !important;
}
</style>
