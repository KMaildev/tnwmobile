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
            :href="`tel:${agentDetail.phone}`"
            style="color: black; text-decoration: none"
          >
            {{ agentDetail.phone }}
          </a>
        </v-list-item-title>
      </v-list-item>

      <v-list-item style="min-height: 30px">
        <v-icon left class="material-icons" style="color: black"> home </v-icon>
        <v-list-item-title style="font-size: 13px">
          {{ agentDetail.address }}
        </v-list-item-title>
      </v-list-item>

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
    </v-card>

    <div class="text-center">
      <v-btn color="warning" dark @click="sheet = !sheet" block>
        လုပ်ဆောင်ချက်မျာ
      </v-btn>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="150px">
          <br />
          <div class="py-1">
            <v-btn
              color="secondary"
              small
              dark
              block
              :to="{ name: 'MyAccount' }"
            >
              <v-icon left> mdi-home-edit-outline </v-icon>
              ကုမ္ပဏီPageအားအဆင့်မြှင်တင်ရန်
            </v-btn>
          </div>
          <div class="py-1">
            <v-btn color="success" small dark :to="{ name: 'MyLogo' }" block>
              <v-icon left> mdi-image-multiple </v-icon>
              Logo ထည့်ရန်နှင့် အသစ်ချိန်းရန်
            </v-btn>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL, LogoNotFound } from "@/use/image-url";
import PropertyCount from "@/components/PropertyCount";

export default {
  name: "MyProfile",

  components: {
    Loader,
    PropertyCount,
  },

  data() {
    return {
      isLoad: true,
      IMAGE_URL: IMAGE_URL,
      LogoNotFound: LogoNotFound,
      agentDetail: {},
      sheet: false,

      total_sale: 0,
      total_rent: 0,
      total_new_properties: 0,
      count_total_soldout: 0,
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