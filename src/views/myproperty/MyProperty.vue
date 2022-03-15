<template>
  <div>
    <PropertyCount />

    <v-container text-center>
      <v-row justify="space-around">
        <v-layout wrap>
          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'for_sale' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-office-building-marker-outline</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "For Sale Property"
                  : "ရောင်းရန်ကြော်ငြာများ"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'by_owner_for_sale' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-group</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "By Owner For Sale Property"
                    : "ပိုင်ရှင်ကိုယ်တိုင် ရောင်းရန်ကြော်ငြာများ"
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'FuaturedMyPropertyList',
                params: { propertyType: 'for_sale' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-office-building-marker-outline</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "For Sale Property"
                  : "အထူးကြော်ငြာ(ရောင်းရန်)"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'FuaturedMyPropertyList',
                params: { propertyType: 'for_rent' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-office-building-marker-outline</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "For Sale Property"
                  : "အထူးကြော်ငြာ(ငှားရန်)"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'for_rent' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-domain</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "For Rent Property"
                  : "ငှားရန်ကြော်ငြာများ"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'by_owner_for_rent' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "By Owner For Rent Property"
                    : "ပိုင်ရှင်ကိုယ်တိုင် ငှားရန်ကြော်ငြာများ"
                }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'new_property' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-office-building</v-icon
              >
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "New Property"
                    : "ကြိုပွိုင့်ကြော်ငြာများ"
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyPropertyList',
                params: { propertyType: 'hostel' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-lightbulb</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true ? "Hostel" : "အဆောင်ငှါးရန်ကြော်ငြာများ"
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'WantedListingCreate',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-plus</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "To Post Wanted Listing"
                    : "Wanted Listing တင်ရန်"
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'MyWantedList',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-search</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "Wanted Listing"
                    : "ကျွန်ုပ်၏ Wanted Lists "
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'for_sale' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-home-group-minus</v-icon
              >
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "Sold Out Property"
                    : "ရောင်းထွက်သွားသော ကြော်ငြာများ"
                }}</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'for_rent' },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-home-export-outline</v-icon
              >
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "Sold Out (Rent)"
                    : "ငှါးထွက်သွားသော ကြော်ငြာများ"
                }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'hostel' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-minus</v-icon>
              <v-card-text style="font-size: 12px">
                {{
                  setLanguage == true
                    ? "Sold Out (Hostel)"
                    : "ငှါးထွက်သွားသောအဆောင်များ"
                }}
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'expireProperty' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px">
                သက်တန်းကုန်ဆုံသွားသော ကြော်ငြာများ (ရောင်းရန်)</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'expireProperty' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px">
                သက်တန်းကုန်ဆုံသွားသော ကြော်ငြာများ (ငှားရန်)</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 130px"
              :to="{
                name: 'SoldOutProperty',
                params: { propertyType: 'expireProperty' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px">
                သက်တန်းကုန်ဆုံသွားသော အဆောင်ကြော်ငြာများ</v-card-text
              >
            </v-card>
          </v-flex> -->
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import PropertyCount from "@/components/PropertyCount";

export default {
  name: "MyProperty",
  data() {
    return {
      setLanguage: false,
    };
  },

  components: {
    PropertyCount,
  },

  created() {
    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },
};
</script>
