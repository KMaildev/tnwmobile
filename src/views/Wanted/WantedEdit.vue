<template>
  <div>
    <form @submit.prevent="update_wanted">
      <v-card flat>
        <v-card-text style="background-color: #af742e">
          <span style="color: white"> ကြော်ငြာပြင်ရန် </span>
        </v-card-text>

        <v-alert
          dense
          outlined
          type="error"
          v-if="alertMessage"
          style="margin: 2px"
        >
          {{ alertMessage }}
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
        <v-card-text>
          <div>
            <v-text-field
              label="Title"
              v-model="propertyDetail.title"
              autocomplete="on"
            ></v-text-field>

            <v-select
              :items="regions"
              :item-text="'region_mm'"
              :item-value="'region_id'"
              v-model="propertyDetail.region_id"
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

            <v-select
              :items="propertytype"
              item-text="property_type_mm"
              item-value="property_type_id"
              label="Property Type"
              v-model="propertyDetail.property_type_id"
              required
            ></v-select>

            <v-select
              :items="floors"
              item-text="title"
              item-value="value"
              label="အလွှာ"
              v-model="propertyDetail.floor"
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
              :items="propertystatus"
              item-text="title"
              item-value="value"
              label="Status / တိုက်ခန်း အခြေအနေ"
              v-model="propertyDetail.property_status"
              required
            ></v-select>

            <v-row>
              <v-col cols="4" sm="4">
                <v-text-field
                  type="number"
                  label="Budget from"
                  v-model="propertyDetail.budget_from"
                  autocomplete="on"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" sm="4">
                <v-text-field
                  type="number"
                  label="Budget To"
                  v-model="propertyDetail.budget_to"
                  autocomplete="on"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" sm="4">
                <v-select
                  :items="currency"
                  item-text="name"
                  item-value="value"
                  v-model="propertyDetail.currency"
                ></v-select>
              </v-col>
            </v-row>

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
              v-model="propertyDetail.bedroom"
            ></v-select>

            <v-text-field
              label="Contact Number"
              v-model="propertyDetail.phone"
              autocomplete="on"
              required
            ></v-text-field>

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

          <v-row>
            <v-switch v-model="showMessages" label=""></v-switch>
            <v-input hint="သဘောမတူပါ" persistent-hint :messages="messages">
              သင်၏ဖုန်းနံပါတ်ကို TatNayWonProperty.com နှင့် ချိတ်ဆက်ထားသော
              အကျိုးဆောင်များက ဆက်သွယ်လာမည်ကို သဘောတူပါသည်။ (သဘောတူ သိရှိကြောင်း
              အမှန်ခြစ်ပေးပါ)
            </v-input>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" block color="warning" dark>
            ကြော်ငြာတင်မည်
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
import PropertyCount from "@/components/PropertyCount";

export default {
  name: "WantedEdit",
  props: ["id"],
  data() {
    return {
      tnwuserdatastore: {},
      alertMessage: "",
      success: "",

      propertyDetail: {},

      showMessages: false,
      agent_allow_status: false,

      types: [
        "ရောင်းရန်အိမ်ခြံမြေများ",
        "ငှားရန်အိမ်ခြံမြေများ",
        "အိမ်ခြံမြေသစ်များ",
      ],

      currency: [
        {
          name: "MMK",
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

      title: "",
      property_type_id: "",
      price_from: "",
      price_to: "",
      price_type: "MMK(Lakhs)",
      property_status: "",
      area: "",
      area_type: "Sqft",
      bathroom: "",
      bedroom: "",
      region_id: "",
      township_id: "",
      contact_number: "",
      description_mm: "",
      description_eng: "",
      floor: "",
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

    async update_wanted() {
      if (this.showMessages === true) {
        this.agent_allow_status = "Allow agent";
      } else {
        this.agent_allow_status = "Not allow agent";
      }
      if (this.propertyDetail.title == "") {
        this.alertMessage = "Title ထည့်ပါ";
      } else if (this.propertyDetail.property_type_id == "") {
        this.alertMessage = "Property Type ကို ရွေးပါ";
      } else if (this.propertyDetail.region_id == "") {
        this.alertMessage = "တိုင်းဒေသကြီးကို ရွေးပါ";
      } else if (this.propertyDetail.township_id == "") {
        this.alertMessage = "မြို့နယ်ကို ရွေးပါ";
      } else {
        HTTP.get(
          `wanted_listing/updated?title=${this.propertyDetail.title}&property_type_id=${this.propertyDetail.property_type_id}&price_from=${this.propertyDetail.budget_from}&price_to=${this.propertyDetail.budget_to}&price_type=${this.propertyDetail.currency}&property_status=${this.propertyDetail.property_status}&area=${this.propertyDetail.area}&area_type=${this.propertyDetail.area_type}&bathroom=${this.propertyDetail.bathroom}&bedroom=${this.propertyDetail.bedroom}&region_id=${this.propertyDetail.region_id}&township_id=${this.propertyDetail.township_id}&contact_number=${this.propertyDetail.phone}&description_mm=${this.propertyDetail.description_mm}&description_eng=${this.propertyDetail.description_eng}&floor=${this.propertyDetail.floor}&agent_allow_status=${this.propertyDetail.agent_allow_status}&w_id=${this.$route.params.id}`
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "Update လုပ်ဆောင်ပြီးပါပြီ";
            }
          })
          .catch((e) => {
            this.alertMessage = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          });
      }
    },
  },

  mounted() {
    this.fetch_regions();
    this.fetch_township();
    this.property_type();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },

  created() {
    HTTP.get(`wanted_listing/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
      })
      .catch((e) => {});
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },

  components: {
    PropertyCount,
  },

  computed: {
    messages() {
      return this.showMessages ? ["သဘောတူပါသည်"] : undefined;
    },
  },
};
</script>
