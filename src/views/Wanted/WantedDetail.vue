<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <WantedAlert v-show="loggedIn === false" />
    <v-card
      v-show="loggedIn === true"
      elevation="24"
      max-width="444"
      class="mx-auto"
    >
      <v-alert outlined color="warning">
        <div>
          <p
            style="font-size: 12px; color: black"
            v-html="propertyDetail.title"
          ></p>

          <p
            style="font-size: 12px; color: black"
            v-html="propertyDetail.description_mm"
          ></p>
        </div>
      </v-alert>

      <div
        style="padding: 5px; background-color: #af742e; text-align: center"
        class="card-panel"
      >
        <span style="color: white; font-size: 12px">
          {{ propertyDetail.other_date }}
          တွင်တင်ခဲ့သည်
        </span>
        <hr />
        <span style="color: white; font-size: 12px">
          {{ propertyDetail.viewer_count }}
          ကြိမ် ကြည့်ရှု့ပြီ
        </span>
      </div>

      <v-list class="transparent">
        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            ကြော်ငြာနံပါတ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.ad_number }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px"> ဒေသ </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.region_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            မြို့နယ်
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.townships_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            အမျိုးအစား
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_type_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            သုံးစွဲမည့်ငွေကြေး
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            <span v-if="propertyDetail.currency == 'MMK(Lakhs)'"> သိန်း </span>
            <span v-else> USD </span>
            {{ propertyDetail.budget_from }}
            မှ

            <span v-if="propertyDetail.currency == 'MMK(Lakhs)'"> သိန်း </span>
            <span v-else> USD </span>
            {{ propertyDetail.budget_to }}
            အတွင်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            အကျယ်အဝန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.area }}
            {{ propertyDetail.area_type }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            အိပ်ခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.bedroom }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            ရေချိုးခန်း
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.bathroom }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 12px">
            တိုက်ခန်းအခြေအနေ
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 12px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_status }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-alert color="warning">
        <span style="font-size: 11px; color: white">
          TatNayWonProperty.com တွင် တွေ့သောကြော်ငြာဟု ပြောပါရန်
        </span>
      </v-alert>

      <v-alert border="right" color="blue-grey" dark>
        <center>
          {{ propertyDetail.agent_allow_status }}
        </center>
      </v-alert>

      <v-alert text color="warning">
        <span style="font-size: 14px; color: black">ဖုန်းနံပါတ်ကြည့်ရန်</span>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow"> ***** </v-col>
          <v-spacer></v-spacer>
          <v-col class="shrink">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" color="black">mdi-eye</v-icon>
              </template>

              <v-card>
                <v-card-title
                  class="lighten-2"
                  style="
                    font-size: 15px;
                    color: white;
                    background-color: #af742e;
                  "
                >
                  ဖုန်းနံပါတ်ကြည့်ရန်
                </v-card-title>
                <v-card-text v-if="package == true">
                  <a
                    v-for="ph in propertyDetail.phone.split(',')"
                    :href="`tel:${ph}`"
                    style="color: black; text-decoration: none"
                  >
                    {{ ph }} <br />
                  </a>
                </v-card-text>

                <v-card-text v-else-if="package == false">
                  TatNayWonProperty.com မှ Package Plan ဝယ်ယူထားသည့် အကျိုးဆောင်
                  များသာလျှင် ဖုန်းနံပါတ်ကို ကြည့်ရှုနိုင်ပါသည်။ Package
                  ဝယ်ယူရန်
                  <a :href="`tel:09 42000 7322`">09 42000 7322,</a>
                  <a :href="`tel:09 42000 5622`">09 42000 5622</a> များသို့
                  ဆက်သွယ်မေးမြန် ဝယ်ယူနိုင်ပါသည်။
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import WantedAlert from "@/components/WantedAlert";

export default {
  name: "WantedDetail",

  components: {
    Loader,
    WantedAlert,
  },

  data() {
    return {
      isLoad: true,
      propertyDetail: {},
      loggedIn: null,
      dialog: false,
      package: false,
      tnwuserdatastore: {},
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

    async fetch_package() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/paidpackage/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            this.package = true;
          }
        })
        .catch((e) => {
          this.package = false;
        });
    },
  },

  created() {
    HTTP.get(`wanted_listing/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });

    let auth = localStorage.getItem("tnwauth");
    if (auth) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },

  mounted() {
    this.fetch_package();
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
