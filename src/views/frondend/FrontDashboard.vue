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
                name: 'PropertyGuide',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px"
                >{{
                  setLanguage == true ? "Property Guide" : "အိမ်ခြံမြေလမ်းညွှန်"
                }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'News',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-newspaper-variant-multiple</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "Latest News" : "နောက်ဆုံးရသတင်းများ"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Testimonials',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-account-heart</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "Testimonials" : "အကြံပြုသုံးသပ်ခြင်း"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'HomeLoan',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-analytics</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "Home Loan Application"
                  : "အိမ်ရာချေးငွေ လျှောက်ရန်"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Books',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-book-open-variant</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "Property Books" : "အိမ်ခြံမြေ စာအုပ်များ"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Terms',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-archive-check-outline</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "TERMS AND CONDITIONS"
                  : "စည်းကမ်းနှင့်သတ်မှတ်ချက်များ"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Notification',
                params: { id: 3 },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-bell-ring</v-icon>
              <v-card-text style="font-size: 12px">Notification</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Contact',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-card-account-mail</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "Contact Us" : "ဆက်သွယ်မေးမြန်းရန်"
              }}</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Suggestion',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-frequently-asked-questions</v-icon
              >
              <v-card-text style="font-size: 12px"
                >{{ setLanguage == true ? "Suggestion" : "အကြံဉာဏ်ပေးရန်" }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FrontDashboard",
  data() {
    return {
      setLanguage: false,
    };
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
