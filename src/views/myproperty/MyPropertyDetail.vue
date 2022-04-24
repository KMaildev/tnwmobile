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

    <v-card elevation="24" max-width="444" class="mx-auto">
      <v-system-bar lights-out></v-system-bar>
      <Loader v-show="isLoad" />
      <v-carousel
        v-show="!isLoad"
        :continuous="false"
        :show-arrows="true"
        hide-delimiters
        height="200"
      >
        <v-carousel-item
          v-for="(propertyPhoto, index) in propertyPhotos"
          :key="index"
        >
          <img
            :src="IMAGE_URL + propertyPhoto.photo"
            alt="Property Image"
            style="
              width: 100%;
              height: auto;
              object-fit: cover;
              object-position: top;
            "
          />
        </v-carousel-item>
      </v-carousel>

      <v-alert outlined color="warning" style="margin: 2px">
        <div>
          <span style="font-size: 12px">
            {{ propertyDetail.title_mm }}
          </span>
        </div>
      </v-alert>

      <div
        style="padding: 5px; background-color: #f0963e"
        class="card-panel"
        v-if="propertyDetail.installment === 'Yes'"
      >
        <span style="color: white">
          <v-icon left class="material-icons" style="color: white">
            attach_money
          </v-icon>
          ဘဏ်အရစ်ကျဖြင့် ရနိုင်ပါသည်
        </span>
      </div>

      <v-list class="transparent">
        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            ကြော်ငြာနံပါတ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.ad_number }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            စျေးနှုန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.price }}
            {{
              propertyDetail.price_type == "MMK(Lakhs)" ? "သိန်း(ကျပ်)" : "USD"
            }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            အကျယ်အဝန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.area }}
            {{ propertyDetail.area_type }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            အမျိုးအစား
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_type_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            တိုင်း၊ ပြည်နယ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.region_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            မြို့နယ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.townships_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            ပြင်ဆင်ပြီးမပြီ
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_status }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.shrine_room">
          <v-list-item-title style="font-size: 13px">
            ဘုရားခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.shrine_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            အိပ်ခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.rooms == "" ? "0" : propertyDetail.rooms }}
            ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.dining_room">
          <v-list-item-title style="font-size: 13px">
            ထမင်းစားခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.dining_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            ဧည့်ခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.living_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            ရေချိုးခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.bathroom == "" ? "0" : propertyDetail.bathroom }}
            ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.other_room">
          <v-list-item-title style="font-size: 13px">
            အခြားအခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.other_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.floor">
          <v-list-item-title style="font-size: 13px"> အလွှာ </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.floor }} လွှာ
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.year_built">
          <v-list-item-title style="font-size: 13px">
            တည်ဆောက်သည့်ခုနှစ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.year_built }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.swimming_pool"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ရေကူးကန်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.securit">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ၂၄ နာရီလုံခြုံရေး
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.air_conditioning"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            လေအေးပေးစနစ်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.wifi">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px"> Wifi </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.balcony">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            လသာဆောင်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.dishwasher">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ပန်းကန်ဆေးစက်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.generator">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            မီးစက်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.near_church">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ဘုရားကျောင်းအနီး
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.garden">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ဥယျာဉ်တော်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.gym">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            အားကစားရုံ
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.lift">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ဓါတ်လှေခါး
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.play_ground">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ကစားကွင်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.cctv">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px"> CCTV </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.car_parking">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            Car Parking
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.mountain_view"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            တောင်တန်းရှုခင်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.pagoda_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ဘုရားစေတီများ
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.sea_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ပင်လယ်မြင်ကွင်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.lake_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            အိုင်မြင်ကွင်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.city_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            မြို့မြင်ကွင်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.showroom">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            အရောင်းပြခန်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.restaurant">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            စားသောက်ဆိုင်
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.office">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ရုံးခန်း
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.warehouse">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            ဂိုဒေါင်
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <div
        style="padding: 5px; background-color: #af742e; text-align: center"
        class="card-panel"
      >
        <span style="color: white; font-size: 12px">
          {{ propertyDetail.post_upload_date }}
          တွင်ကြော်ငြာတင်ခဲ့သည်
        </span>
        <hr />
        <span style="color: white; font-size: 12px">
          ဤအိမ်ခြံမြေကို
          {{ propertyDetail.viewer_count }}
          ကြိမ် ကြည့်ရှု့ပြီ
        </span>
      </div>

      <v-alert text color="white">
        <p style="color: #f0963e">အကြောင်းအရာ</p>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow">
            <p
              style="font-size: 12px; color: black"
              v-html="propertyDetail.description_mm"
            ></p>
            <div></div>
          </v-col>
        </v-row>
      </v-alert>

      <div id="create">
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-square-edit-outline </v-icon>
            </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="gray"
            @click="share(propertyDetail.sale_id)"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>

          <v-btn fab dark small color="red" @click="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
    </v-card>

    <div class="text-center">
      <v-btn color="warning" dark @click="sheet = !sheet" block>
        လုပ်ဆောင်ချက်များ
      </v-btn>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="200px">
          <br />

          <div class="py-1">
            <v-btn
              :to="{
                name: 'FeaturedProperty',
                params: { id: propertyDetail.sale_id },
              }"
              color="warning"
              small
              dark
              block
            >
              <v-icon left> mdi-home-edit-outline </v-icon>
              အထူးကြော်ငြာ ပြုလုပ်ရန်
            </v-btn>
          </div>

          <div class="py-1">
            <v-btn
              :to="{
                name: 'RefreshProperty',
                params: { id: propertyDetail.sale_id },
              }"
              color="indigo"
              small
              dark
              block
            >
              <v-icon left> mdi-home-edit-outline </v-icon>
              Refresh Ad
            </v-btn>
          </div>

          <div class="py-1">
            <v-btn
              :to="{
                name: 'Adedit',
                params: { id: propertyDetail.sale_id },
              }"
              color="secondary"
              small
              dark
              block
            >
              <v-icon left> mdi-home-edit-outline </v-icon>
              ကြော်ငြာပြင်ရန်
            </v-btn>
          </div>
          <div class="py-1">
            <v-btn
              color="error"
              small
              dark
              block
              @click="DeleteProperty(propertyDetail.sale_id)"
            >
              <v-icon left> mdi-delete-off-outline </v-icon>
              ကြော်ငြာဖျက်ရန်
            </v-btn>
          </div>

          <div class="py-1">
            <v-btn
              color="success"
              small
              dark
              :to="{
                name: 'Uploadphoto',
                params: { propertyId: propertyDetail.sale_id },
              }"
              block
            >
              <v-icon left> mdi-image-multiple </v-icon>
              ဓာတ်ပုံထပ်ထည့်ရန်နှင့် ဖျက်ရန်
            </v-btn>
          </div>

          <div class="py-1">
            <v-btn
              v-if="propertyDetail.soldout_status == 0"
              color="primary"
              small
              dark
              block
              @click="SoldOutProperty(propertyDetail.sale_id)"
            >
              <v-icon left> mdi-swap-horizontal </v-icon>
              ရောင်းပြီးပြုလုပ်ရန် (Sold Out)
            </v-btn>

            <v-btn
              v-if="propertyDetail.soldout_status == 1"
              color="primary"
              small
              dark
              block
              @click="UndoSoldOutProperty(propertyDetail.sale_id)"
            >
              <v-icon left> mdi-swap-horizontal </v-icon>
              Undo (Sold Out)
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
import {
  IMAGE_URL,
  LogoNotFound,
  TatNayWonLogo,
  APP_BASE_URL,
} from "@/use/image-url";

export default {
  name: "MyPropertyDetail",

  components: {
    Loader,
  },

  data() {
    return {
      isLoad: true,
      propertyDetail: {},
      propertyPhotos: [],
      tatnaywon: {},
      IMAGE_URL: IMAGE_URL,
      APP_BASE_URL: APP_BASE_URL,

      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
      sheet: false,

      success: "",
    };
  },

  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
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

    share(id) {
      navigator
        .share({
          title: "tatnaywonproperty.com",
          url: APP_BASE_URL + "propertydetail/index/" + id,
        })
        .then((_) => console.log("Yay, you shared it :)"))
        .catch((error) =>
          console.log("Oh noh! You couldn't share it! :'(\n", error)
        );
    },

    DeleteProperty: function (id) {
      HTTP.get(`property/DeleteProperty/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "ဖျက်ပြီးပါပြီ";
            this.$router.push({ name: "AgentDashboard" });
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
        });
    },

    SoldOutProperty: function (id) {
      HTTP.get(`property/SoldOutProperty/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "ရောင်းပြီး(Sold Out) လုပ်ပြီးပါပြီ";
            this.error = "";
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
          this.success = "";
        });
    },

    UndoSoldOutProperty: function (id) {
      HTTP.get(`property/undosoldoutproperty/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "Undo လုပ်ပြီးပါပြီ";
            this.error = "";
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
          this.success = "";
        });
    },
  },

  created() {
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

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
