<template>
  <div>
    <v-form @submit.prevent="FindProperty">
      <v-select
        v-if="setLanguage == true"
        :items="regions"
        :item-text="'region_mm'"
        :item-value="'region_id'"
        v-model="region_id"
        label="Regions"
        filled
        @change="onChangeRegion($event)"
      >
      </v-select>

      <v-select
        v-if="setLanguage == false"
        :items="regions"
        :item-text="'region_mm'"
        :item-value="'region_id'"
        v-model="region_id"
        label="တိုင်း ၊ ပြည်နယ်"
        filled
        @change="onChangeRegion($event)"
      >
      </v-select>

      <v-select
        v-if="setLanguage == true"
        :items="townships"
        :item-text="'townships_mm'"
        :item-value="'township_id'"
        v-model="township_id"
        label="Townships"
        filled
      >
      </v-select>
      <v-select
        v-if="setLanguage == false"
        :items="townships"
        :item-text="'townships_mm'"
        :item-value="'township_id'"
        v-model="township_id"
        label="မြို့နယ်"
        filled
      >
      </v-select>

      <v-select
        :items="propertytype"
        item-text="property_type_mm"
        item-value="property_type_id"
        label="Type"
        v-model="TypeId"
        filled
      ></v-select>

      <v-row>
        <v-col cols="6" sm="6">
          <v-select
            v-if="setLanguage == true"
            :items="priceFroms"
            item-text="title"
            item-value="value"
            label="Price (From)"
            v-model="from_price"
            filled
          ></v-select>

          <v-select
            v-if="setLanguage == false"
            :items="priceFroms"
            item-text="title"
            item-value="value"
            label="မှ"
            v-model="from_price"
            filled
          ></v-select>
        </v-col>

        <v-col cols="6" sm="6">
          <v-select
            v-if="setLanguage == true"
            :items="to"
            item-text="title"
            item-value="value"
            label="Price (To)"
            v-model="to_price"
            filled
          ></v-select>

          <v-select
            v-if="setLanguage == false"
            :items="to"
            item-text="title"
            item-value="value"
            label="အတွင်း"
            v-model="to_price"
            filled
          ></v-select>
        </v-col>
      </v-row>

      <v-radio-group v-model="bankinstallment" row>
        <v-radio label="အားလုံး" value="All"></v-radio>
        <v-radio label="ဘဏ်အရစ်ကျ" value="Yes"></v-radio>
      </v-radio-group>

      <v-card-actions style="background-color: #f6f6f6">
        <v-btn type="submit" block color="warning" dark>
          {{ setLanguage == true ? "Search" : "ရှာဖွေပါ" }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "NewPropertySearch",
  data() {
    return {
      setLanguage: false,
      errorAlert: "",
      regions: [],
      townships: [],
      propertytype: [],

      priceFroms: [
        {
          title: "100 သိန်း",
          value: "100",
        },
        {
          title: "200 သိန်း",
          value: "200",
        },
        {
          title: "300 သိန်း",
          value: "300",
        },
        {
          title: "400 သိန်း",
          value: "400",
        },
        {
          title: "500 သိန်း",
          value: "500",
        },
        {
          title: "600 သိန်း",
          value: "600",
        },
        {
          title: "700 သိန်း",
          value: "700",
        },
        {
          title: "800 သိန်း",
          value: "800",
        },
        {
          title: "900 သိန်း",
          value: "900",
        },
        {
          title: "1000 သိန်း",
          value: "1000",
        },
        {
          title: "1500 သိန်း",
          value: "1500",
        },
        {
          title: "2000 သိန်း",
          value: "2000",
        },
        {
          title: "2500 သိန်း",
          value: "2500",
        },
        {
          title: "3000 သိန်း",
          value: "3000",
        },
        {
          title: "3500 သိန်း",
          value: "3500",
        },
        {
          title: "4000 သိန်း",
          value: "4000",
        },
        {
          title: "4500 သိန်း",
          value: "4500",
        },
        {
          title: "5000 သိန်း",
          value: "5000",
        },
        {
          title: "6000 သိန်း",
          value: "6000",
        },
        {
          title: "7000 သိန်း",
          value: "7000",
        },
        {
          title: "8000 သိန်း",
          value: "8000",
        },
        {
          title: "9000 သိန်း",
          value: "9000",
        },
        {
          title: "10000 သိန်း",
          value: "10000",
        },
        {
          title: "15000 သိန်း",
          value: "15000",
        },
        {
          title: "30000 သိန်း",
          value: "30000",
        },
      ],

      to: [
        {
          title: "100 သိန်း",
          value: "100",
        },
        {
          title: "200 သိန်း",
          value: "200",
        },
        {
          title: "300 သိန်း",
          value: "300",
        },
        {
          title: "400 သိန်း",
          value: "400",
        },
        {
          title: "500 သိန်း",
          value: "500",
        },
        {
          title: "600 သိန်း",
          value: "600",
        },
        {
          title: "700 သိန်း",
          value: "700",
        },
        {
          title: "800 သိန်း",
          value: "800",
        },
        {
          title: "900 သိန်း",
          value: "900",
        },
        {
          title: "1000 သိန်း",
          value: "1000",
        },
        {
          title: "1500 သိန်း",
          value: "1500",
        },
        {
          title: "2000 သိန်း",
          value: "2000",
        },
        {
          title: "2500 သိန်း",
          value: "2500",
        },
        {
          title: "3000 သိန်း",
          value: "3000",
        },
        {
          title: "3500 သိန်း",
          value: "3500",
        },
        {
          title: "4000 သိန်း",
          value: "4000",
        },
        {
          title: "4500 သိန်း",
          value: "4500",
        },
        {
          title: "5000 သိန်း",
          value: "5000",
        },
        {
          title: "6000 သိန်း",
          value: "6000",
        },
        {
          title: "7000 သိန်း",
          value: "7000",
        },
        {
          title: "8000 သိန်း",
          value: "8000",
        },
        {
          title: "9000 သိန်း",
          value: "9000",
        },
        {
          title: "10000 သိန်း",
          value: "10000",
        },
        {
          title: "15000 သိန်း",
          value: "15000",
        },
        {
          title: "30000 သိန်းနှင့်အထက်",
          value: "30000",
        },
      ],

      type_of_property: "new_property",
      region_id: "",
      township_id: "",
      TypeId: "",
      from_price: "",
      to_price: "",
      bankinstallment: "All",
    };
  },

  methods: {
    clearMessage() {
      this.ad_number = "";
    },

    FindProperty(e) {
      this.dialog = false;
      this.$router.push({
        path: "/searchresult",
        query: {
          type_of_property: this.type_of_property,
          region_id: this.region_id,
          township_id: this.township_id,
          TypeId: this.TypeId,
          from_price: this.from_price,
          to_price: this.to_price,
          bankinstallment: this.bankinstallment,
          search_status: "propertySearch",
        },
      });
      window.location.reload();
    },

    async fetch_regions() {
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
    this.fetch_regions();
    this.property_type();
  },

  created() {
    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },
};
</script>