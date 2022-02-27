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
        <v-tab :href="`#edit`"> ကြော်ငြာပြင်ရန် </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :value="`edit`">
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

          <form @submit.prevent="update_property">
            <v-card flat>
              <v-card-text>
                <div>
                  <v-text-field
                    label="Title"
                    v-model="propertyDetail.title_mm"
                    autocomplete="on"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Title Eng (optional)"
                    v-model="propertyDetail.title_eng"
                    autocomplete="on"
                  ></v-text-field>

                  <v-select
                    :items="propertytype"
                    item-text="property_type_mm"
                    item-value="property_type_id"
                    label="Property Type"
                    v-model="propertyDetail.property_type_id"
                    required
                  ></v-select>

                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        type="number"
                        label="Price"
                        v-model="propertyDetail.price"
                        autocomplete="on"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="currency"
                        item-text="name"
                        item-value="value"
                        v-model="propertyDetail.price_type"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-select
                    :items="propertystatus"
                    item-text="title"
                    item-value="value"
                    label="Status / တိုက်ခန်း အခြေအနေ"
                    v-model="propertyDetail.property_status"
                    required
                  ></v-select>

                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        label="Area"
                        v-model="propertyDetail.area"
                        autocomplete="on"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="areatypes"
                        item-text="title"
                        item-value="value"
                        v-model="propertyDetail.area_type"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Room"
                    v-model="propertyDetail.rooms"
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Bathroom"
                    v-model="propertyDetail.bathroom"
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Bedroom"
                    v-model="propertyDetail.bead_room"
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Master Bedroom"
                    v-model="propertyDetail.masterbathroom"
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Living Room"
                    v-model="propertyDetail.living_room"
                  ></v-select>

                  <v-select
                    :items="floors"
                    item-text="title"
                    item-value="value"
                    label="အလွှာ"
                    v-model="propertyDetail.floor"
                  ></v-select>

                  <v-text-field
                    label="တည်ဆောက်သည့်နှစ် / တိုက်သက်တမ်း"
                    v-model="propertyDetail.year_built"
                    autocomplete="on"
                  ></v-text-field>

                  <v-select
                    :items="regions"
                    :item-text="'region_mm'"
                    :item-value="'region_id'"
                    v-model="propertyDetail.regions_id"
                    label="Region/State"
                    required
                  >
                  </v-select>

                  <v-select
                    :items="townships"
                    :item-text="'townships_mm'"
                    :item-value="'township_id'"
                    v-model="propertyDetail.township_id"
                    label="Township"
                    required
                  >
                  </v-select>

                  <v-text-field
                    label="Contact Number"
                    v-model="propertyDetail.contact_number"
                    autocomplete="on"
                    required
                  ></v-text-field>

                  <v-radio-group v-model="bankinstallment" row>
                    <span>ဘဏ်အရစ်ကျ &nbsp;&nbsp;</span>
                    <v-radio label="No" value="No"></v-radio>
                    <v-radio label="Yes" value="Yes"></v-radio>
                  </v-radio-group>

                  <v-textarea
                    name="input-7-1"
                    label="Description"
                    v-model="propertyDetail.description_mm"
                    required
                  ></v-textarea>

                  <v-textarea
                    name="input-7-1"
                    label="Description Eng"
                    v-model="propertyDetail.description_eng"
                  ></v-textarea>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn type="submit" block color="warning" dark>
                  ကြော်ငြာတင်မည်
                </v-btn>
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

export default {
  name: "Adedit",
  props: ["id"],
  data() {
    return {
      messages: "",
      success: "",
      tab: null,

      propertyDetail: {},

      types: [
        "ရောင်းရန်အိမ်ခြံမြေများ",
        "ငှားရန်အိမ်ခြံမြေများ",
        "အိမ်ခြံမြေသစ်များ",
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

      areatypes: [
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

      floors: [
        {
          title: "မြေညီ",
          value: "Ground Floor",
        },
        {
          title: "1 လွှာ",
          value: "1",
        },
        {
          title: "2 လွှာ",
          value: "2",
        },
        {
          title: "3 လွှာ",
          value: "3",
        },
        {
          title: "4 လွှာ",
          value: "4",
        },
        {
          title: "5 လွှာ",
          value: "5",
        },
        {
          title: "6 လွှာ",
          value: "6",
        },
        {
          title: "7 လွှာ",
          value: "7",
        },
        {
          title: "8 လွှာ",
          value: "8",
        },
        {
          title: "9 လွှာ",
          value: "9",
        },
        {
          title: "10 လွှာ",
          value: "10",
        },
        {
          title: "11 လွှာ",
          value: "11",
        },
        {
          title: "12 လွှာ",
          value: "12",
        },
        {
          title: "13 လွှာ",
          value: "13",
        },
        {
          title: "14 လွှာ",
          value: "14",
        },
        {
          title: "15 လွှာ",
          value: "15",
        },
        {
          title: "16 လွှာ",
          value: "16",
        },
        {
          title: "17 လွှာ",
          value: "17",
        },
        {
          title: "18 လွှာ",
          value: "18",
        },
        {
          title: "19 လွှာ",
          value: "19",
        },
        {
          title: "20 လွှာ",
          value: "20",
        },
        {
          title: "21 လွှာ",
          value: "21",
        },
        {
          title: "22 လွှာ",
          value: "22",
        },
        {
          title: "23 လွှာ",
          value: "23",
        },
        {
          title: "24 လွှာ",
          value: "24",
        },
        {
          title: "24 လွှာ",
          value: "24",
        },
        {
          title: "25 လွှာ",
          value: "25",
        },
        {
          title: "26 လွှာ",
          value: "26",
        },
        {
          title: "27 လွှာ",
          value: "27",
        },
        {
          title: "28 လွှာ",
          value: "28",
        },
        {
          title: "29 လွှာ",
          value: "29",
        },
        {
          title: "30 လွှာ",
          value: "30",
        },
      ],

      regions: [],
      townships: [],
      propertytype: [],

      title_mm: "",
      title_eng: "",
      property_type_id: "",
      price: "",
      price_type: "MMK(Lakhs)",
      property_status: "",
      area: "",
      area_type: "Sqft",
      room: "",
      bathroom: "",
      bedroom: "",
      livingroom: "",
      region_id: "",
      township_id: "",
      contact_number: "",
      description_mm: "",
      description_eng: "",
      floor: "",
      build_year: "",
      bankinstallment: "No",
    };
  },

  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
      if (direction) {
        if (direction === "Right") {
          this.$router.go(-1);
        }
      }
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

    async update_property() {
      if (this.propertyDetail.title_mm == "") {
        this.messages = "Title ထည့်ပါ";
      } else if (this.propertyDetail.property_type_id == "") {
        this.messages = "Property Type ကို ရွေးပါ";
      } else if (this.propertyDetail.regions_id == "") {
        this.messages = "တိုင်းဒေသကြီးကို ရွေးပါ";
      } else if (this.propertyDetail.township_id == "") {
        this.messages = "မြို့နယ်ကို ရွေးပါ";
      } else {
        HTTP.get(
          `property/updated?title_mm=${this.propertyDetail.title_mm}&title_eng=${this.propertyDetail.title_eng}&property_type_id=${this.propertyDetail.property_type_id}&price=${this.propertyDetail.price}&price_type=${this.propertyDetail.price_type}&property_status=${this.propertyDetail.property_status}&area=${this.propertyDetail.area}&area_type=${this.propertyDetail.area_type}&room=${this.propertyDetail.rooms}&bathroom=${this.propertyDetail.bathroom}&bedroom=${this.propertyDetail.bead_room}&masterbathroom=${this.propertyDetail.masterbathroom}&livingroom=${this.propertyDetail.living_room}&region_id=${this.propertyDetail.regions_id}&township_id=${this.propertyDetail.township_id}&contact_number=${this.propertyDetail.contact_number}&description_mm=${this.propertyDetail.description_mm}&description_eng=${this.propertyDetail.description_eng}&floor=${this.propertyDetail.floor}&build_year=${this.propertyDetail.year_built}&bankinstallment=${this.propertyDetail.bankinstallment}&sale_id=${this.$route.params.id}`
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "Update လုပ်ဆောင်ပြီးပါပြီ";
            }
          })
          .catch((e) => {
            this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          });
      }
    },
  },

  created() {
    HTTP.get(`property/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
        this.tatnaywon = response.data.tatnaywon;
        console.log(response.data.data);
      })
      .catch((e) => {});
  },

  mounted() {
    this.fetch_regions();
    this.fetch_township();
    this.property_type();
  },
};
</script>
