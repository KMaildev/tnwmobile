<template>
  <div>
    <v-simple-table class="mb-2">
      <template>
        <tbody style="background-color: #fafafa">
          <tr>
            <td style="font-size: 12px">
              ကြော်ငြာတင်နိုင်သော စုစုပေါင်း အရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ free_and_paid }}
            </td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ပြီးသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">{{ already_posts }}</td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ရန်ကျန်ရှိသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">
              {{ (PostTotal = +(free_and_paid - already_posts)) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="PostTotal == 0">
      <v-alert text color="warning">
        <span style="font-size: 14px; color: black">TatNayWonProperty.com</span>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow" style="font-size: 13px; color: black">
            သင်တင်နိုင်သော ကြောငြာအရေအတွက် ပြည့်သွားပါပြီ။ <br />
            ထပ်မံတင်လိုပါက TatNayWonProperty.com သို့ဆက်သွယ်ပါ။ <br /><br />
            <a href="tel: 09 42000 7322" style="font-size: 15px; color: black">
              09 42000 7322,
            </a>
            <a href="tel: 09 42000 5622" style="font-size: 15px; color: black">
              09 42000 5622
            </a>
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <v-card color="basil" v-else>
      <v-tabs color="deep-purple accent-4" centered>
        <v-tab>
          {{ setLanguage == true ? "For Sale" : "ရောင်းရန်" }}
        </v-tab>

        <v-tab>
          {{ setLanguage == true ? "For Rent" : "ငှားရန်" }}
        </v-tab>

        <v-tab>
          {{
            setLanguage == true
              ? "By Owner For Sale"
              : "ပိုင်ရှင်ကိုယ်တိုင်ရောင်းရန်"
          }}
        </v-tab>

        <v-tab>
          {{
            setLanguage == true
              ? "By Owner For Rent"
              : "ပိုင်ရှင်ကိုယ်တိုင်ငှားရန်"
          }}
        </v-tab>

        <v-tab>
          {{ setLanguage == true ? "New Property" : "ကြိုပွိုင့်" }}
        </v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                {{
                  setLanguage == true
                    ? "For Sale AD"
                    : "ရောင်းရန် ကြော်ငြာတင်မည်"
                }}
                <ForSale />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                {{
                  setLanguage == true ? "For Rent AD" : "ငှားရန် ကြော်ငြာတင်မည်"
                }}
                <ForRent />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                {{
                  setLanguage == true
                    ? "By Owner For Sale AD"
                    : "ပိုင်ရှင်ကိုယ်တိုင်ရောင်းရန် ကြော်ငြာတင်မည်"
                }}
                <ByOwnerForSale />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                {{
                  setLanguage == true
                    ? "By Owner For Rent AD"
                    : "ပိုင်ရှင်ကိုယ်တိုင်ငှားရန် ကြော်ငြာတင်မည်"
                }}
                <ByOwnerForRent />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                {{
                  setLanguage == true
                    ? "New Property AD"
                    : "ကြိုပွိုင့် ကြော်ငြာတင်မည်"
                }}
                <NewProperties />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
import PropertyCount from "@/components/PropertyCount";
import ForSale from "@/components/propertyform/ForSale";
import ForRent from "@/components/propertyform/ForRent";
import NewProperties from "@/components/propertyform/NewProperties";
import ByOwnerForSale from "@/components/propertyform/ByOwnerForSale";
import ByOwnerForRent from "@/components/propertyform/ByOwnerForRent";

export default {
  name: "Adcreate",
  data() {
    return {
      setLanguage: false,
      free_and_paid: 0,
      already_posts: 0,
      tnwuserdatastore: {},

      tnwuserdatastore: {},
      messages: "",
      success: "",
    };
  },

  methods: {
    async fetch_package() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/index/${userId}`)
        .then((response) => {
          this.free_and_paid = response.data.free_and_paid;
        })
        .catch((e) => {});
    },

    async fetch_alreadyposts() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/alreadyposts/${userId}`)
        .then((response) => {
          this.already_posts = response.data.already_posts;
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch_package();
    this.fetch_alreadyposts();
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

  components: {
    PropertyCount,
    ForSale,
    ForRent,
    NewProperties,
    ByOwnerForSale,
    ByOwnerForRent,
  },
};
</script>
