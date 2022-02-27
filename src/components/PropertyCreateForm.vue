<template>
  <div>
    <v-text-field
      label="Title"
      v-model="title_mm"
      autocomplete="on"
    ></v-text-field>

    <v-text-field
      label="Title Eng (optional)"
      v-model="title_eng"
      autocomplete="on"
    ></v-text-field>

    <v-select
      :items="propertytype"
      item-text="property_type_mm"
      item-value="property_type_id"
      label="Account Type"
      v-model="property_type_id"
    ></v-select>

    <v-row>
      <v-col cols="6" sm="6">
        <v-text-field
          label="Price"
          v-model="price"
          autocomplete="on"
        ></v-text-field>
      </v-col>

      <v-col cols="6" sm="6">
        <v-select
          :items="currency"
          item-text="name"
          item-value="value"
          label="Currency"
          v-model="price_type"
        ></v-select>
      </v-col>
    </v-row>

    <v-select
      :items="propertystatus"
      item-text="title"
      item-value="value"
      label="Status / တိုက်ခန်း အခြေအနေ"
      v-model="property_status"
    ></v-select>

    <v-row>
      <v-col cols="6" sm="6">
        <v-text-field
          label="Area"
          v-model="area"
          autocomplete="on"
        ></v-text-field>
      </v-col>

      <v-col cols="6" sm="6">
        <v-select
          :items="area_type"
          item-text="title"
          item-value="value"
          v-model="area_type"
        ></v-select>
      </v-col>
    </v-row>

    <v-select
      :items="rooms"
      item-text="title"
      item-value="value"
      label="Room"
      v-model="room"
    ></v-select>

    <v-select
      :items="rooms"
      item-text="title"
      item-value="value"
      label="Bathroom"
      v-model="bathroom"
    ></v-select>

    <v-select
      :items="rooms"
      item-text="title"
      item-value="value"
      label="Bedroom"
      v-model="bedroom"
    ></v-select>

    <v-select
      :items="rooms"
      item-text="title"
      item-value="value"
      label="Living Room"
      v-model="livingroom"
    ></v-select>

    <v-select
      :items="regions"
      :item-text="'region_mm'"
      :item-value="'region_id'"
      v-model="region_id"
      label="Region/State"
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

    <v-text-field
      label="Contact Number"
      v-model="contact_number"
      autocomplete="on"
    ></v-text-field>

    <v-textarea
      name="input-7-1"
      label="Description"
      v-model="description_mm"
    ></v-textarea>

    <v-textarea
      name="input-7-1"
      label="Description Eng"
      v-model="description_eng"
    ></v-textarea>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "PropertyCreateForm",
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      types: [
        "ရောင်းရန်အိမ်ခြံမြေများ",
        "ငှားရန်အိမ်ခြံမြေများ",
        "အိမ်ခြံမြေသစ်များ",
      ],

      bankinstallment: ["No", "Yes"],

      pricefrom: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "1000",
        "1500",
        "2000",
        "2500",
        "3000",
        "3500",
        "4000",
        "4500",
        "5000",
        "6000",
        "7000",
        "8000",
        "9000",
      ],

      priceto: [
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "1000",
        "1500",
        "2000",
        "2500",
        "3000",
        "3500",
        "4000",
        "4500",
        "5000",
        "6000",
        "7000",
        "8000",
        "9000",
      ],

      currency: [
        {
          name: "MMK(Lakhs)",
          value: "MMK(Lakhs)",
        },
        {
          name: "USD",
          value: "USD",
        },
      ],

      propertystatus: [
        {
          title: "အလုံးစုံ ပြင်ဆင်ပြီး",
          value: "Fully Furnished",
        },
        {
          title: "မပြင်ဆင်ရသေး",
          value: "မပြင်ဆင်ရသေး",
        },
        {
          title: "တစ်စိတ်တစ်ပိုင်း ပြင်ဆင်ပြီး",
          value: "တစ်စိတ်တစ်ပိုင်း ပြင်ဆင်ပြီး",
        },
        {
          title: "ခန်းမ",
          value: "Hall",
        },
      ],

      area_type: [
        {
          title: "Sqft",
          value: "Sqft",
        },
        {
          title: "Acre",
          value: "Acre",
        },
      ],

      rooms: [
        {
          title: "မပါ",
          value: "0",
        },
        {
          title: "1 Room",
          value: "1",
        },
        {
          title: "2 Room",
          value: "2",
        },
        {
          title: "3 Room",
          value: "3",
        },
        {
          title: "4 Room",
          value: "4",
        },
        {
          title: "5 Room",
          value: "5",
        },
        {
          title: "6 Room",
          value: "6",
        },
        {
          title: "7 Room",
          value: "7",
        },
        {
          title: "8 Room",
          value: "8",
        },
        {
          title: "9 Room",
          value: "9",
        },
        {
          title: "10 Room",
          value: "10",
        },
      ],

      regions: [],
      townships: [],
      propertytype: [],
    };
  },

  methods: {
    async fetch_regions() {
      HTTP.get(`city/index`)
        .then((response) => {
          this.regions.push(...response.data.data);
        })
        .catch((e) => {});
    },

    async fetch_township() {
      HTTP.get(`city/townships`)
        .then((response) => {
          this.townships.push(...response.data.data);
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
  },

  mounted() {
    this.fetch_regions();
    this.fetch_township();
    this.property_type();
  },
};
</script>