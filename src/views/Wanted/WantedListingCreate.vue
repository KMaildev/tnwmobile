<template>
  <div>
    <v-container text-center>
      <v-row justify="space-around">
        <v-layout wrap>
          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'WantedCreate',
                params: { propertyType: 'want_to_buy' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-plus</v-icon>
              <v-card-text style="font-size: 12px">ဝယ်ချင်ပါသည်</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'WantedCreate',
                params: { propertyType: 'want_to_rent' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-office-building-outline</v-icon
              >
              <v-card-text style="font-size: 12px">ငှါးချင်ပါသည်</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="space-around" class="py-2">
        <v-layout wrap>
          <v-alert text color="warning">
            <p style="text-align right; font-size: 13px; color: black">
              လူကြီးမင်းတို့အနေဖြင့် အိမ်ခြံမြေနှင့် ဆိုင်ခန်းများ ဝယ်ရန်ငှါးရန်
              ရှာဖွေတဲ့အခါ မိမိလိုချင်တဲ့ အချက်အလက်များကို အမျိုးအစား <br />
              စျေးနှုန်း <br />
              အကျယ်အဝန်း <br />
              မြိုနယ် <br />
              ပြင်ဆင်ထားမှု <br />
              အခန်းဖွဲ့ပုံ <br />
              စသည် အသေးစိတ်အချက်အလတ်များကို ထည့်ပြီး ရှာဖွေနိုင်မှာ ဖြစ်ပါတယ်။
            </p>
          </v-alert>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "WantedListingCreate",
  data() {
    return {};
  },
};
</script>
