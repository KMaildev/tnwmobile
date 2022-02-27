<template>
  <div>
    <v-simple-table class="mb-2">
      <template>
        <tbody style="background-color: #fafafa">
          <tr>
            <td style="font-size: 12px">
              ကြော်ငြာတင်နိုင်သော စုစုပေါင်း အရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ free_and_paid }}
            </td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ပြီးသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">{{ already_posts }}</td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ရန်ကျန်ရှိသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">
              {{ (PostTotal = +(free_and_paid - already_posts)) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="PostTotal == 0">
      <v-alert text color="warning">
        <span style="font-size: 14px; color: black">TatNayWonProperty.com</span>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow" style="font-size: 13px; color: black">
            သင်တင်နိုင်သော ကြောငြာအရေအတွက် ပြည့်သွားပါပြီ။ <br />
            ထပ်မံတင်လိုပါက TatNayWonProperty.com သို့ဆက်သွယ်ပါ။ <br /><br />
            <a href="tel: 09 42000 7322" style="font-size: 15px; color: black">
              09 42000 7322,
            </a>
            <a href="tel: 09 42000 5622" style="font-size: 15px; color: black">
              09 42000 5622
            </a>
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <v-card color="basil" v-else>
      <v-tabs
        background-color="transparent"
        color="basil"
        v-model="TypeOfProperty"
        grow
      >
        <v-tab
          v-for="tab of tabs"
          :key="tab.id"
          :to="tab.route"
          exact
          style="color: black"
        >
          {{ setLanguage == true ? tab.eng : tab.name }}
        </v-tab>

        <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
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

          <form @submit.prevent="create_property">
            <v-card flat>
              <v-card-text v-if="setLanguage == true">
                {{ tab.eng }} Ad
              </v-card-text>
              <v-card-text v-if="setLanguage == false">
                {{ tab.name }} ကြော်ငြာတင်မည်
              </v-card-text>
              <v-card-text>
                <div>
                  <v-text-field
                    label="Title"
                    v-model="title_mm"
                    autocomplete="on"
                    :rules="[() => !!title_mm || 'This field is required']"
                    required
                    filled
                  ></v-text-field>

                  <v-text-field
                    label="Title Eng (optional)"
                    v-model="title_eng"
                    autocomplete="on"
                    filled
                  ></v-text-field>

                  <v-select
                    :items="propertytype"
                    item-text="property_type_mm"
                    item-value="property_type_id"
                    label="Property Type"
                    v-model="property_type_id"
                    :rules="[
                      (property_type_id) =>
                        !!property_type_id || 'This field is required',
                    ]"
                    required
                    filled
                  ></v-select>

                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        type="number"
                        label="Price"
                        v-model="price"
                        autocomplete="on"
                        :rules="[() => !!price || 'This field is required']"
                        required
                        filled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="currency"
                        item-text="name"
                        item-value="value"
                        v-model="price_type"
                        filled
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-select
                    :items="propertystatus"
                    item-text="title"
                    item-value="value"
                    label="Status / တိုက်ခန်း အခြေအနေ"
                    v-model="property_status"
                    :rules="[
                      () => !!property_status || 'This field is required',
                    ]"
                    required
                    filled
                  ></v-select>

                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        label="Area"
                        v-model="area"
                        autocomplete="on"
                        filled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="areatypes"
                        item-text="title"
                        item-value="value"
                        v-model="area_type"
                        :rules="[() => !!area_type || 'This field is required']"
                        required
                        filled
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Room"
                    v-model="room"
                    filled
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Bathroom"
                    v-model="bathroom"
                    filled
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Bedroom"
                    v-model="bedroom"
                    filled
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Master Bedroom"
                    v-model="masterbathroom"
                    filled
                  ></v-select>

                  <v-select
                    :items="rooms"
                    item-text="title"
                    item-value="value"
                    label="Living Room"
                    v-model="livingroom"
                    filled
                  ></v-select>

                  <v-select
                    :items="floors"
                    item-text="title"
                    item-value="value"
                    label="အလွှာ"
                    v-model="floor"
                    filled
                  ></v-select>

                  <v-text-field
                    label="တည်ဆောက်သည့်နှစ် / တိုက်သက်တမ်း"
                    v-model="build_year"
                    autocomplete="on"
                    filled
                  ></v-text-field>

                  <v-select
                    :items="regions"
                    :item-text="'region_mm'"
                    :item-value="'region_id'"
                    v-model="region_id"
                    label="Region/State"
                    :rules="[() => !!region_id || 'This field is required']"
                    required
                    filled
                    @change="onChangeRegion($event)"
                  >
                  </v-select>

                  <v-select
                    :items="townships"
                    :item-text="'townships_mm'"
                    :item-value="'township_id'"
                    v-model="township_id"
                    label="Township"
                    :rules="[() => !!township_id || 'This field is required']"
                    required
                    filled
                  >
                  </v-select>

                  <v-text-field
                    label="Contact Number"
                    v-model="contact_number"
                    autocomplete="on"
                    :rules="[
                      () => !!contact_number || 'This field is required',
                    ]"
                    required
                    filled
                  ></v-text-field>

                  <v-radio-group v-model="bankinstallment" row>
                    <span>ဘဏ်အရစ်ကျ &nbsp;&nbsp;</span>
                    <v-radio label="No" value="No"></v-radio>
                    <v-radio label="Yes" value="Yes"></v-radio>
                  </v-radio-group>

                  <v-textarea
                    name="input-7-1"
                    label="Description"
                    v-model="description_mm"
                    :rules="[
                      () => !!description_mm || 'This field is required',
                    ]"
                    required
                    filled
                  ></v-textarea>

                  <v-textarea
                    name="input-7-1"
                    label="Description Eng"
                    v-model="description_eng"
                    filled
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
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
import PropertyCount from "@/components/PropertyCount";

export default {
  name: "Adcreate",
  props: ["id"],
  data() {
    return {
      setLanguage: false,
      free_and_paid: 0,
      already_posts: 0,
      tnwuserdatastore: {},

      TypeOfProperty: `${this.id}`,
      tnwuserdatastore: {},
      messages: "",
      success: "",

      tabs: [
        { id: 1, name: "ရောင်းရန်", eng: "For Sale", route: `for_sale` },
        {
          id: 4,
          name: "ပိုင်ရှင်ကိုယ်တိုင်ရောင်းရန်",
          eng: "By Owner For Sale",
          route: `by_owner_for_sale`,
        },
        { id: 2, name: "ငှားရန်", eng: "For Rent", route: `for_rent` },
        {
          id: 5,
          name: "ပိုင်ရှင်ကိုယ်တိုင်ငှားရန်",
          eng: "By Owner For Rent",
          route: `by_owner_for_rent`,
        },
        // { id: 6, name: "အဆောင်ငှါးရန်", route: `hostel` },
        {
          id: 3,
          name: "ကြိုပွိုင့်",
          eng: "New Property",
          route: `new_property`,
        },
      ],

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
      masterbathroom: "",
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
    async fetch_regions() {
      HTTP.get(`city/index`)
        .then((response) => {
          this.regions.push(...response.data.data);
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

    async property_type() {
      HTTP.get(`property_type/index`)
        .then((response) => {
          this.propertytype.push(...response.data.data);
        })
        .catch((e) => {});
    },

    async create_property() {
      let userId = this.tnwuserdatastore.user_id;
      if (this.title_mm == "") {
        this.messages = "Title ထည့်ပါ";
      } else if (this.property_type_id == "") {
        this.messages = "Property Type ကို ရွေးပါ";
      } else if (this.region_id == "") {
        this.messages = "တိုင်းဒေသကြီးကို ရွေးပါ";
      } else if (this.township_id == "") {
        this.messages = "မြို့နယ်ကို ရွေးပါ";
      } else {
        HTTP.get(
          `property/created?title_mm=${this.title_mm}&title_eng=${this.title_eng}&property_type_id=${this.property_type_id}&price=${this.price}&price_type=${this.price_type}&property_status=${this.property_status}&area=${this.area}&area_type=${this.area_type}&room=${this.room}&bathroom=${this.bathroom}&bedroom=${this.bedroom}&masterbathroom=${this.masterbathroom}&livingroom=${this.livingroom}&region_id=${this.region_id}&township_id=${this.township_id}&contact_number=${this.contact_number}&description_mm=${this.description_mm}&description_eng=${this.description_eng}&floor=${this.floor}&build_year=${this.build_year}&bankinstallment=${this.bankinstallment}&floor=${this.floor}&TypeOfProperty=${this.TypeOfProperty}&userId=${userId}`
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "ကြော်ငြာတင်ပြီးပါပြီ";
              var propertyUploadId = response.data.data.sale_id;
              this.$router.push({
                name: "Uploadphoto",
                params: { propertyId: propertyUploadId },
              });
            }
          })
          .catch((e) => {
            this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          });
      }
    },

    async fetch_package() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/index/${userId}`)
        .then((response) => {
          this.free_and_paid = response.data.free_and_paid;
        })
        .catch((e) => {});
    },

    async fetch_alreadyposts() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/alreadyposts/${userId}`)
        .then((response) => {
          this.already_posts = response.data.already_posts;
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch_regions();
    this.property_type();

    this.fetch_package();
    this.fetch_alreadyposts();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);

    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },

  components: {
    PropertyCount,
  },
};
</script>
