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
                name: 'Adcreate',
                params: { propertyType: 'for_sale' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px"
                >{{
                  setLanguage == true
                    ? " Post New Advertisement "
                    : "ကြော်ငြာတင်ရန်"
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
                name: 'MyProperty',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-city</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "My Advertisement "
                  : "တင်ထားပြီးသော ကြော်ငြာများ"
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
                name: 'WantedListing',
                params: { wanted_type: 'want_to_buy' },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-home-edit</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true
                  ? "Wanted Listing"
                  : "အိမ်ရှာဖွေသူများ(Wanted Listing)"
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
                name: 'Favorites',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-hand-heart</v-icon>
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "My Favorites" : "အနှစ်သက်ဆုံးစားရင်း"
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
                name: 'PackagePlan',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-gift-open-outline</v-icon
              >
              <v-card-text style="font-size: 12px">Package Plan</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'History',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-clipboard-text-clock-outline</v-icon
              >
              <v-card-text style="font-size: 12px">Order History</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Messages',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-message-bulleted</v-icon
              >
              <v-card-text style="font-size: 12px">Messages</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'Appointment',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-message-text-clock</v-icon
              >
              <v-card-text style="font-size: 12px">{{
                setLanguage == true ? "Appointment" : "ချိန်းဆိုမှု ဇယား"
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
                name: 'MyProfile',
                params: { id: tnwuserdatastore.user_id },
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-account-star-outline</v-icon
              >
              <v-card-text style="font-size: 12px">My Account</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'ChangePassword',
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-lock-check</v-icon>
              <v-card-text style="font-size: 12px"
                >{{
                  setLanguage == true
                    ? "Change Password"
                    : "လျို့ဝှက်နံပါတ်ပြောင်းရန်"
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
                name: 'Notification',
                params: { id: 3 },
              }"
            >
              <v-icon large style="padding-top: 6px">mdi-bell-ring</v-icon>
              <v-card-text style="font-size: 12px">Notifications</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs6 sm4 order-md2 order-sm1 pa-1>
            <v-card
              dark
              color="#f09a42"
              class="pa-md-4"
              style="height: 110px"
              :to="{
                name: 'AppVersion',
              }"
            >
              <v-icon large style="padding-top: 6px"
                >mdi-cellphone-arrow-down</v-icon
              >
              <v-card-text style="font-size: 12px">App Version</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AgentDashboard",
  data() {
    return {
      tnwuserdatastore: {},
      setLanguage: false,
    };
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);

    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },
};
</script>
