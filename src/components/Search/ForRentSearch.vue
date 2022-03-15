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
  name: "ForRentSearch",
  data() {
    return {
      setLanguage: false,

      errorAlert: "",
      regions: [],
      townships: [],
      propertytype: [],

      priceFroms: [
        {
          title: "50000 ကျပ်",
          value: "50000",
        },
        {
          title: "1 သိန်း",
          value: "1",
        },
        {
          title: "2 သိန်း",
          value: "2",
        },
        {
          title: "3 သိန်း",
          value: "3",
        },
        {
          title: "4 သိန်း",
          value: "4",
        },
        {
          title: "5 သိန်း",
          value: "5",
        },
        {
          title: "6 သိန်း",
          value: "6",
        },
        {
          title: "7 သိန်း",
          value: "7",
        },
        {
          title: "8 သိန်း",
          value: "8",
        },
        {
          title: "9 သိန်း",
          value: "9",
        },
        {
          title: "10 သိန်း",
          value: "10",
        },
        {
          title: "15 သိန်း",
          value: "15",
        },
        {
          title: "20 သိန်း",
          value: "20",
        },
        {
          title: "25 သိန်း",
          value: "25",
        },
        {
          title: "30 သိန်း",
          value: "30",
        },
      ],

      to: [
        {
          title: "50000 ကျပ်",
          value: "50000",
        },
        {
          title: "1 သိန်း",
          value: "1",
        },
        {
          title: "2 သိန်း",
          value: "2",
        },
        {
          title: "3 သိန်း",
          value: "3",
        },
        {
          title: "4 သိန်း",
          value: "4",
        },
        {
          title: "5 သိန်း",
          value: "5",
        },
        {
          title: "6 သိန်း",
          value: "6",
        },
        {
          title: "7 သိန်း",
          value: "7",
        },
        {
          title: "8 သိန်း",
          value: "8",
        },
        {
          title: "9 သိန်း",
          value: "9",
        },
        {
          title: "10 သိန်း",
          value: "10",
        },
        {
          title: "15 သိန်း",
          value: "15",
        },
        {
          title: "20 သိန်း",
          value: "20",
        },
        {
          title: "25 သိန်း",
          value: "25",
        },
        {
          title: "30 သိန်းနှင့်အထက်",
          value: "30",
        },
      ],

      type_of_property: "for_rent",
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