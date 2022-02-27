<template>
  <div>
    <v-card
      color="basil"
      v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right'),
        up: () => swipe('Up'),
        down: () => swipe('Down'),
      }"
    >
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab :href="`#Signup`"> Update My Profile </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
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

          <v-alert
            dense
            outlined
            type="success"
            v-if="success"
            style="margin: 2px"
          >
            {{ success }}
          </v-alert>

          <form @submit.prevent="updateAccount">
            <v-card flat>
              <v-card-text>
                <v-select
                  :items="items"
                  item-text="name"
                  item-value="value"
                  label="Account Type"
                  v-model="tnwuserdatastore.user_permissions"
                ></v-select>

                <v-text-field
                  label="Company name or User name"
                  v-model="tnwuserdatastore.company_name"
                ></v-text-field>

                <v-select
                  :items="company_types"
                  item-text="name"
                  item-value="value"
                  label="Company Type"
                  v-model="tnwuserdatastore.company_type"
                ></v-select>

                <v-text-field
                  label="Address"
                  v-model="tnwuserdatastore.address"
                ></v-text-field>

                <v-text-field
                  label="Contact Number"
                  v-model="tnwuserdatastore.phone"
                ></v-text-field>

                <v-textarea
                  name="input-7-1"
                  label="Description"
                  v-model="tnwuserdatastore.description"
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-btn type="submit" block color="warning" dark> Update </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import MainMenu from "../../layout/MainMenu.vue";

export default {
  name: "MyAccount",

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

      messages: "",
      company_name: "",
      address: "",
      contact_number: "",
      description: "",
      user_permissions: "",
      company_type: "",
      success: "",

      tnwuserdatastore: {},
    };
  },

  components: {
    MainMenu,
  },

  methods: {
    async updateAccount() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(
        `auth/updateaccount?&company_name=${this.tnwuserdatastore.company_name}&address=${this.tnwuserdatastore.address}&contact_number=${this.tnwuserdatastore.phone}&description=${this.tnwuserdatastore.description}&user_permissions=${this.tnwuserdatastore.user_permissions}&company_type=${this.tnwuserdatastore.company_type}&userId=${userId}`
      )
        .then((response) => {
          if (response.status === 200) {
            this.success = "Update လုပ်ဆောင်ပြီးပါပြီ";
            localStorage.setItem("tnwauth", response.data.data.email);

            var userData = response.data.data;
            localStorage.setItem("tnwuserstore", JSON.stringify(userData));
            this.$router.push({ name: "AgentDashboard" });
            window.location.reload();
          }
        })
        .catch((e) => {
          this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
        });
    },

    swipe(direction) {
      this.swipeDirection = direction;
      if (direction) {
        if (direction === "Right") {
          this.$router.go(-1);
        }
      }
    },
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
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
