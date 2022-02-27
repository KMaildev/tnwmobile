<template>
  <div>
    <v-card-title
      class="warr darken-2"
      style="line-height: 1rem; background-color: #e5e5e5"
    >
      <span class="black--text" style="font-size: 15px">
        အိမ်ရာချေးငွေ လျှောက်ထားရန်
      </span>
      <span class="black--text" style="font-size: 10px; padding-top: 4px">
        သင့်ကြိုက် နှစ်သက်ရာ ဘဏ်သို့ အိမ်ရာချေးငွေ လျှောက်ထားနိုင်ပါပြီ။
      </span>
    </v-card-title>
    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>

    <v-alert dense outlined type="error" v-if="messages" style="margin: 2px">
      {{ messages }}
    </v-alert>

    <form @submit.prevent="saveHomeLoanApplication">
      <v-card-text>
        <v-text-field
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          label="Your Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="[() => !!phone || 'This field is required']"
          label="Phone Number"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[() => !!email || 'This field is required']"
          label="Email Address"
          required
        ></v-text-field>

        <v-text-field
          v-model="date_of_birth"
          :rules="[() => !!date_of_birth || 'This field is required']"
          label="Date of Brith (DD-MM-YYYY)"
          required
        ></v-text-field>

        <v-text-field
          v-model="current_address"
          :rules="[() => !!current_address || 'This field is required']"
          label="Current Address"
          required
        ></v-text-field>

        <v-select
          :items="employment"
          item-text="name"
          item-value="value"
          v-model="employment_status"
          label="Employment Status"
          :rules="[() => !!employment_status || 'This field is required']"
          required
        ></v-select>

        <v-select
          :items="monthly_income"
          item-text="name"
          item-value="value"
          v-model="monthly_income_status"
          label="Choose monthly income"
          :rules="[() => !!monthly_income_status || 'This field is required']"
          required
        ></v-select>

        <v-select
          :items="application_type"
          item-text="name"
          item-value="value"
          v-model="homeloan_application_type"
          label="Application Type"
          :rules="[
            () => !!homeloan_application_type || 'This field is required',
          ]"
          required
        ></v-select>

        <v-select
          :items="banks"
          item-text="name"
          item-value="value"
          v-model="bank_type"
          label="Choose Your Bank"
          :rules="[() => !!bank_type || 'This field is required']"
          required
        ></v-select>

        <v-select
          :items="propertytype"
          item-text="property_type_mm"
          item-value="property_type_mm"
          label="Property Type"
          v-model="type_of_property_id"
        ></v-select>

        <v-select
          :items="regions"
          :item-text="'region_mm'"
          :item-value="'region_id'"
          v-model="region_id"
          label="Region/State"
          @change="onChangeRegion($event)"
        >
        </v-select>

        <v-select
          :items="townships"
          :item-text="'townships_mm'"
          :item-value="'township_id'"
          v-model="township_id"
          label="Township"
        >
        </v-select>

        <v-btn block color="warning" dark type="submit"> Apply Now </v-btn>
      </v-card-text>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "HomeLoan",

  data() {
    return {
      success: "",
      messages: "",

      employment: [
        {
          name: "Salaried",
          value: "Salaried",
        },
        {
          name: "Businesses Owner",
          value: "Businesses Owner",
        },
      ],

      monthly_income: [
        {
          name: "3 Lakhs",
          value: "3 Lakhs",
        },
        {
          name: "3-6 Lakhs",
          value: "3-6 Lakhs",
        },
        {
          name: "6-8 Lakhs",
          value: "6-8 Lakhs",
        },
        {
          name: "10-15 Lakhs",
          value: "10-15 Lakhs",
        },
        {
          name: "15-20 Lakhs",
          value: "15-20 Lakhs",
        },
        {
          name: "above 20 Lakhs",
          value: "above 20 Lakhs",
        },
      ],

      application_type: [
        {
          name: "Joint couple",
          value: "Joint couple",
        },
        {
          name: "Individual",
          value: "Individual",
        },
      ],

      banks: [
        {
          name: "KBZ Bank",
          value: "KBZ Bank",
        },
        {
          name: "AYA Bank",
          value: "AYA Bank",
        },
        {
          name: "YOMA Bank",
          value: "YOMA Bank",
        },
        {
          name: "CB Bank",
          value: "CB Bank",
        },
      ],

      propertytype: [],
      regions: [],
      townships: [],

      name: "",
      phone: "",
      email: "",
      date_of_birth: "",
      current_address: "",
      employment_status: "",
      monthly_income_status: "",
      homeloan_application_type: "",
      bank_type: "",
      type_of_property_id: "",
      region_id: "",
      township_id: "",
    };
  },

  methods: {
    async saveHomeLoanApplication() {
      HTTP.get(
        `homeloanapplication/index?name=${this.name}&phone=${this.phone}&email=${this.email}&date_of_birth=${this.date_of_birth}&current_address=${this.current_address}&employment_status=${this.employment_status}&monthly_income_status=${this.monthly_income_status}&homeloan_application_type=${this.homeloan_application_type}&bank_type=${this.bank_type}&type_of_property_id=${this.type_of_property_id}&region_id=${this.region_id}&township_id=${this.township_id}`
      )
        .then((response) => {
          if (response.status === 200) {
            this.success = "လုပ်ဆောင်ချက် အောင်မြင်ပါသည်။";
          }
        })
        .catch((e) => {
          this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
        });
    },

    async fetch() {
      HTTP.get(`city/index`)
        .then((response) => {
          this.regions.push(...response.data.data);
        })
        .catch((e) => {});
    },

    async property_type() {
      HTTP.get(`property_type/index`)
        .then((response) => {
          this.propertytype.push(...response.data.data);
        })
        .catch((e) => {});
    },

    async onChangeRegion(event) {
      this.townships = [];
      HTTP.get(`city/detail/${event}`)
        .then((response) => {
          this.townships.push(...response.data.data);
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch();
    this.property_type();
  },
};
</script>
