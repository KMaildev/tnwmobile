<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <v-card elevation="24" max-width="444" class="mx-auto">
      <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
        {{ success }}
      </v-alert>
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

      <v-alert border="right" color="blue-grey" dark>
        <center>
          {{ propertyDetail.agent_allow_status }}
        </center>
      </v-alert>
    </v-card>

    <div class="text-center">
      <v-btn color="warning" dark @click="sheet = !sheet" block>
        လုပ်ဆောင်ချက်မျာ
      </v-btn>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="auto">
          <br />
          <div class="py-1">
            <v-btn
              color="secondary"
              small
              dark
              block
              :to="{
                name: 'WantedEdit',
                params: { id: propertyDetail.w_id },
              }"
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
              @click="DeleteProperty(propertyDetail.w_id)"
            >
              <v-icon left> mdi-delete-off-outline </v-icon>
              ကြော်ငြာဖျက်ရန်
            </v-btn>
          </div>
          <br />
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import WantedAlert from "@/components/WantedAlert";

export default {
  name: "MyWantedListDetail",

  components: {
    Loader,
    WantedAlert,
  },

  data() {
    return {
      isLoad: true,
      propertyDetail: {},
      dialog: false,
      tnwuserdatastore: {},
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
    DeleteProperty: function (id) {
      HTTP.get(`wanted_listing/DeleteWanted/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "ဖျက်ပြီးပါပြီ";
            this.$router.push({ name: "MyWantedList" });
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
        });
    },

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
    HTTP.get(`wanted_listing/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
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
