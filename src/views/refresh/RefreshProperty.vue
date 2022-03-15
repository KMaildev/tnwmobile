<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>

    <v-alert dense outlined type="danger" v-if="error" style="margin: 2px">
      {{ error }}
    </v-alert>

    <v-simple-table class="mb-2">
      <template>
        <tbody style="background-color: #fafafa">
          <tr>
            <td style="font-size: 12px">
              နေ့စဉ် Refresh ပြုလုပ်နိုင်သည့်အရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ no_of_refresh_ad }}
            </td>
          </tr>

          <tr>
            <td style="font-size: 12px">ယနေ့ Refresh ပြုလုပ်ပြီးသောအရေအတွက်</td>
            <td style="font-size: 12px">{{ today_no_of_refresh }}</td>
          </tr>

          <tr>
            <td style="font-size: 12px">
              Refresh ပြုလုပ်ရန်ကျန်ရှိသောအရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ (PostTotal = +(no_of_refresh_ad - today_no_of_refresh)) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="no_of_refresh_ad == 0">
      <PackageNoOrderFefresh />
    </div>

    <div v-else-if="PostTotal == 0">
      <DailyRefreshAlert />
    </div>

    <div v-else>
      <v-alert color="warning">
        <div class="" style="color: white; font-weight: bold; font-size: 20px">
          ဤအိမ်ခြံမြေအား Refresh AD ပြုလုပ်မည်
        </div>
        <br />
        <p style="color: white; font-weight: bold">
          {{ propertyDetail.title_mm }}
          <br />
          ကြော်ငြာနံပါတ် - {{ propertyDetail.ad_number }}
          <br />
          စျေးနှုန်း -
          {{ propertyDetail.price }}
          {{
            propertyDetail.price_type == "MMK(Lakhs)" ? "သိန်း(ကျပ်)" : "USD"
          }}
        </p>
      </v-alert>

      <v-btn block color="warning" @click="RefreshAdNow($route.params.id)">
        Refresh AD
      </v-btn>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import PackageNoOrderFefresh from "@/components/PackageNoOrderFefresh";
import DailyRefreshAlert from "@/components/DailyRefreshAlert";

export default {
  name: "RefreshProperty",

  components: {
    Loader,
    PackageNoOrderFefresh,
    DailyRefreshAlert,
  },

  data() {
    return {
      isLoad: true,
      tnwuserdatastore: {},
      no_of_refresh_ad: 0,
      today_no_of_refresh: 0,
      success: "",
      error: "",

      propertyDetail: {},
      propertyPhotos: [],
      tatnaywon: {},
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

    async fetch_package() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/number_of_refresh_daily/${userId}`)
        .then((response) => {
          this.no_of_refresh_ad = response.data.number_of_refresh_daily;
        })
        .catch((e) => {
          this.no_of_refresh_ad = 0;
        });
    },

    async today_refresh_ad_counter() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`refres_ad/index/${userId}`)
        .then((response) => {
          this.today_no_of_refresh = response.data.today_refresh_ad_counter;
        })
        .catch((e) => {
          this.today_no_of_refresh = 0;
        });
    },

    RefreshAdNow: function (id) {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`property/refreshad/${id}/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "Refresh AD ပြီးပါပြီ";
            this.error = "";

            this.fetch_package();
            this.today_refresh_ad_counter();
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
          this.success = "";
        });
    },
  },

  mounted() {
    this.fetch_package();
    this.today_refresh_ad_counter();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);

    HTTP.get(`property/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
        this.propertyPhotos.push(...response.data.photo);
        this.tatnaywon = response.data.tatnaywon;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });
  },
};
</script>