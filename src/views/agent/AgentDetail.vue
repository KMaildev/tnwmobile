<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <Loader v-show="isLoad" />
    <v-card v-show="!isLoad" class="mx-auto" max-width="auto">
      <center>
        <img
          v-if="agentDetail.logo"
          :src="IMAGE_URL + agentDetail.logo"
          alt="Logo"
          height="120px"
          style="border: 1px solid gray; margin: 12px"
        />
      </center>

      <v-card-subtitle
        style="
          background-color: #f7f9fc;
          color: #f09033;
          text-align: center;
          font-weight: bold;
          font-size: 15px;
        "
      >
        {{
          agentDetail.company_name == ""
            ? agentDetail.name
            : agentDetail.company_name
        }}

        <v-icon class="material-icons" style="color: #f09033">
          check_circle
        </v-icon>
      </v-card-subtitle>

      <div
        style="padding: 5px; background-color: #af742e; text-align: center"
        class="card-panel"
      >
        <span style="color: white; font-size: 12px">
          Joined on
          {{ agentDetail.carete_date }}
        </span>
      </div>

      <v-alert text color="white">
        <p style="color: #f0963e">ကုမ္ပဏီအကြောင်း</p>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow">
            <p
              style="font-size: 12px; color: black"
              v-html="agentDetail.description"
            ></p>
            <div></div>
          </v-col>
        </v-row>
      </v-alert>

      <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>

      <v-list-item style="min-height: 30px">
        <v-icon left class="material-icons" style="color: black">
          phonelink_ring
        </v-icon>
        <v-list-item-title style="font-size: 13px">
          <a
            v-for="ph in agentDetail.phone.split(',')"
            :href="`tel:${ph}`"
            style="color: black; text-decoration: none"
          >
            {{ ph }},
          </a>
        </v-list-item-title>
      </v-list-item>

      <v-list-item style="min-height: 30px">
        <v-icon left class="material-icons" style="color: black"> home </v-icon>
        <v-list-item-title style="font-size: 13px">
          {{ agentDetail.address }}
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
      <v-simple-table class="mb-1">
        <template>
          <tbody style="background-color: #fafafa">
            <tr>
              <td style="font-size: 12px">
                တင်ထားပြီးသော အရောင်းကြော်ငြာ အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ total_sale }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                တင်ထားပြီးသော အငှါးကြော်ငြာ အရေအတွက်
              </td>
              <td style="font-size: 12px">{{ total_rent }}</td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                တင်ထားပြီးသော ကြိုပွိုင့်ကြော်ငြာ အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ total_new_properties }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                တင်ထားပြီးသော စုစုပေါင်းကြော်ငြာ အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ total_sale + total_rent + total_new_properties }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                ရောင်းထွက်(sold out)ပြီးသော ကြော်ငြာအရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ count_total_soldout }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-btn
        color="#af742e"
        block
        style="margin: 2px"
        :to="{
          name: 'PropertyByCompany',
          params: { propertyType: 'all', userId: agentDetail.user_id },
        }"
      >
        <v-icon left style="color: white"> mdi-home-search </v-icon>
        <span style="color: white">ဤကုမ္ပဏီ၏ ကြော်ငြာများကို ရှာဖွေရန်</span>
      </v-btn>

      <v-btn
        color="#af742e"
        block
        style="margin: 2px"
        :to="{
          name: 'PropertyByCompany',
          params: { propertyType: 'for_sale', userId: agentDetail.user_id },
        }"
      >
        <v-icon left style="color: white"> mdi-home-flood </v-icon>
        <span style="color: white">ဤကုမ္ပဏီ၏ ရောင်းရန်ကြော်ငြာများ</span>
      </v-btn>

      <v-btn
        color="#af742e"
        block
        style="margin: 2px"
        :to="{
          name: 'PropertyByCompany',
          params: { propertyType: 'for_rent', userId: agentDetail.user_id },
        }"
      >
        <v-icon left style="color: white"> mdi-home-city </v-icon>
        <span style="color: white">ဤကုမ္ပဏီ၏ ငှါးရန်ကြော်ငြာများ</span>
      </v-btn>

      <br />
      <v-card-title
        class="warr darken-2"
        style="line-height: 1rem; background-color: #af742e"
      >
        <span class="white--text" style="font-size: 11px">
          သင်သိလိုသော အကြောင်းအရာများအတွက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်
        </span>
      </v-card-title>

      <AgentRequestInquiry :userId="agentDetail.user_id" />
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL, LogoNotFound } from "@/use/image-url";
import AgentRequestInquiry from "@/components/AgentRequestInquiry";

export default {
  name: "AgentDetail",

  components: {
    Loader,
    AgentRequestInquiry,
  },

  data() {
    return {
      isLoad: true,
      IMAGE_URL: IMAGE_URL,
      LogoNotFound: LogoNotFound,
      agentDetail: {},

      total_sale: {},
      total_rent: {},
      total_new_properties: {},
      count_total_soldout: {},
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

    EditProperty: function (id) {
      alert("Coming Soon");
    },
  },

  created() {
    HTTP.get(`agent/detail/${this.$route.params.id}`)
      .then((response) => {
        this.agentDetail = response.data.data;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });

    HTTP.get(`propertycounter/index/${this.$route.params.id}`)
      .then((response) => {
        this.total_sale = response.data.total_sale;
        this.total_rent = response.data.total_rent;
        this.total_new_properties = response.data.total_new_properties;
        this.count_total_soldout = response.data.count_total_soldout;
      })
      .catch((e) => {
        this.total_sale = 0;
        this.total_rent = 0;
        this.total_new_properties = 0;
        this.count_total_soldout = 0;
      });
  },
};
</script>