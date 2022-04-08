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
              လစဉ်အထူးကြော်ငြာပြုလုပ်နိုင်သည့် အရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ no_of_featuredpost }}
            </td>
          </tr>

          <tr>
            <td style="font-size: 12px">အထူးကြော်ငြာ ပြုလုပ်ပြီးသောအရေအတွက်</td>
            <td style="font-size: 12px">{{ total_featured_ad }}</td>
          </tr>

          <tr>
            <td style="font-size: 12px">
              အထူးကြော်ငြာ ပြုလုပ်ရန် ကျန်ရှိသောအရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ (PostTotal = +(no_of_featuredpost - total_featured_ad)) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="no_of_featuredpost == 0">
      <PackageNoOrder />
    </div>

    <div v-else-if="PostTotal == 0">
      <FeaturedAdAlert />
    </div>

    <div v-else>
      <v-alert color="warning">
        <div class="" style="color: white; font-weight: bold; font-size: 20px">
          ဤအိမ်ခြံမြေအား အထူးကြော်ငြာပြုလုပ်မည်
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

      <v-btn
        block
        color="warning"
        @click="FeaturedPropertyNow($route.params.id)"
      >
        အထူးကြော်ငြာပြုလုပ်မည်
      </v-btn>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import PackageNoOrder from "@/components/PackageNoOrder";
import FeaturedAdAlert from "@/components/FeaturedAdAlert";

import { IMAGE_URL, APP_BASE_URL } from "@/use/image-url";

export default {
  name: "FeaturedProperty",

  components: {
    Loader,
    PackageNoOrder,
    FeaturedAdAlert,
  },

  data() {
    return {
      isLoad: true,
      tnwuserdatastore: {},
      no_of_featuredpost: 0,
      success: "",
      error: "",

      propertyDetail: {},
      propertyPhotos: [],
      tatnaywon: {},
      IMAGE_URL: IMAGE_URL,
      APP_BASE_URL: APP_BASE_URL,

      total_featured_ad: 0,
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
      HTTP.get(`package/featuredpost/${userId}`)
        .then((response) => {
          this.no_of_featuredpost = response.data.featuredpost;
        })
        .catch((e) => {
          this.no_of_featuredpost = 0;
        });
    },

    async total_featured_ad_counter() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`featured/index/${userId}`)
        .then((response) => {
          this.total_featured_ad = response.data.data;
        })
        .catch((e) => {
          this.total_featured_ad = 0;
        });
    },

    FeaturedPropertyNow: function (id) {
      HTTP.get(`property/featuredproperty/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "အထူးကြော်ငြာပြုလုပ် ပြီးပါပြီ";
            this.error = "";
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
    this.total_featured_ad_counter();
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