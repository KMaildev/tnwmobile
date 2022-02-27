<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" size="20">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      
      <v-card>
        <v-toolbar dark color="warning">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="font-size: 15px" class="text-center flex">
            Myanmar's Smarter Property Search
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-alert
            dense
            outlined
            type="error"
            v-if="errorAlert"
            style="margin: 2px"
          >
            {{ errorAlert }}
          </v-alert>

          <v-form @submit.prevent="FindByAdNumber">
            <v-container style="background-color: #f19b43">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="ad_number"
                    :append-outer-icon="
                      ad_number ? 'mdi-magnify' : 'mdi-magnify'
                    "
                    @click:append-outer="FindByAdNumber"
                    clearable
                    label="ကြော်ငြာနံပါတ်ရိုက်ထည့်ပါ"
                    type="text"
                    @click:clear="clearMessage"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-form @submit.prevent="FindProperty">
            <v-card-text style="background-color: #f6f6f6">
              <v-row>
                <v-col cols="12">
                  <span style="color: black"
                    >အိမ်ခြံမြေများကို စိတ်တိုင်းကျ ရှာဖွေရန်</span
                  >
                </v-col>
              </v-row>
              <br />
              <v-select
                :items="types"
                item-text="name"
                item-value="value"
                v-model="type_of_property"
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

              <v-select
                :items="propertytype"
                item-text="property_type_mm"
                item-value="property_type_id"
                label="Property Type"
                v-model="TypeId"
              ></v-select>

              <v-row>
                <v-col cols="6" sm="6">
                  <v-select
                    :items="priceFrom"
                    item-text="title"
                    item-value="value"
                    label="Price(From)"
                    v-model="from_price"
                  ></v-select>
                </v-col>

                <v-col cols="6" sm="6">
                  <v-select
                    :items="priceTo"
                    item-text="title"
                    item-value="value"
                    label="Price(From)"
                    v-model="to_price"
                  ></v-select>
                </v-col>
              </v-row>

              <v-radio-group v-model="bankinstallment" row>
                <v-radio label="အားလုံး" value="All"></v-radio>
                <v-radio label="ဘဏ်အရစ်ကျ" value="Yes"></v-radio>
              </v-radio-group>
            </v-card-text>

            <v-card-actions style="background-color: #f6f6f6">
              <v-btn type="submit" block color="warning" dark> ရှာဖွေပါ </v-btn>
            </v-card-actions>
          </v-form>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "Search",
  data() {
    return {
      ad_number: "",

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      errorAlert: "",

      types: [
        {
          name: "ရောင်းရန်အိမ်ခြံမြေများ",
          value: "for_sale",
        },
        {
          name: "ငှားရန်အိမ်ခြံမြေများ",
          value: "for_rent",
        },
        {
          name: "အိမ်ခြံမြေသစ်များ",
          value: "new_property",
        },
      ],
      regions: [],
      townships: [],
      propertytype: [],
      priceFrom: [
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
          title: "1000 သိန်း",
          value: "1000",
        },
      ],
      priceTo: [
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
          title: "1000 သိန်းနှင့်အထက်",
          value: "1000",
        },
      ],

      type_of_property: "for_sale",
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

    FindByAdNumber(e) {
      if (this.ad_number === "") {
        this.errorAlert = "ရှာဖွေလိုသော ကြော်ငြာနံပါတ်ထည့်သွင်းပါ";
      } else {
        this.dialog = false;
        this.$router.push({
          path: "/searchresult",
          query: {
            ad_number: this.ad_number,
            search_status: "numberSearch",
          },
        });
        window.location.reload();
      }
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