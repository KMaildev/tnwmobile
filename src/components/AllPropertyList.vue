<template>
  <div>
    <v-row style="background-color: white">
      <v-col cols="12" sm="12">
        <Loader v-show="isLoad" />
        <v-card
          v-show="!isLoad"
          class="mx-auto my-5"
          v-for="(property, index) in propertyies"
          :key="index"
        >
          <div>
            <div class="card">
              <div class="ovelay"></div>
              <header class="user">
                <!-- Agent Logo -->
                <img
                  v-if="property.user_info_id == 0"
                  :src="TatNayWonLogo"
                  alt="Logo"
                />

                <img
                  v-if="property.logo"
                  :src="IMAGE_URL + property.logo"
                  alt="Logo"
                />
                <!-- Agent Logo -->

                <div class="user-info">
                  <h2 class="user-info-name" style="color: black">
                    <span v-if="property.user_info_id == 0">
                      TatNayWonProperty.com
                    </span>
                    <router-link
                      style="text-decoration: none"
                      v-else
                      :to="{
                        name: 'agentDetail',
                        params: { id: property.user_id },
                      }"
                    >
                      {{ property.company_name }}
                    </router-link>
                  </h2>
                  <p class="user-info-time" style="color: black">
                    {{ property.post_upload_date }}
                  </p>
                </div>
                <v-spacer></v-spacer>
                <v-bottom-sheet inset>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="pink" v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-sheet height="auto">
                    <v-list class="transparent">
                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{
                            setLanguage == true ? "AD Number" : "ကြော်ငြာနံပါတ်"
                          }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.ad_number }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{ setLanguage == true ? "Price" : "စျေးနှုန်း" }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.price }}
                          {{
                            property.price_type == "MMK(Lakhs)"
                              ? "သိန်း(ကျပ်)"
                              : "USD"
                          }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{ setLanguage == true ? "Area" : "အကျယ်အဝန်း" }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.area }}
                          {{ property.area_type }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{ setLanguage == true ? "Type" : "အမျိုးအစား" }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.property_type_mm }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{
                            setLanguage == true ? "Region" : "တိုင်း၊ ပြည်နယ်"
                          }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.region_mm }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item style="min-height: 30px">
                        <v-list-item-title style="font-size: 13px">
                          {{ setLanguage == true ? "Township" : "မြို့နယ်" }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-right"
                          style="
                            font-size: 13px;
                            color: #0f4c8c;
                            font-weight: bold;
                          "
                        >
                          {{ property.townships_mm }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-btn
                          :to="{
                            name: 'propertyDetail',
                            params: { id: property.sale_id },
                          }"
                          small
                          color="warning"
                          block
                        >
                          <v-icon left small>mdi-eye</v-icon>
                          {{
                            setLanguage == true ? "Detail" : "အသေးစိတ်ကြည့်ရန်"
                          }}
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-bottom-sheet>
              </header>

              <router-link
                :to="{
                  name: 'propertyDetail',
                  params: { id: property.sale_id },
                }"
                style="font-size: 12px; color: #0060b6; text-decoration: none"
              >
                {{ property.title_mm }}
              </router-link>

              <v-img
                v-if="property.photo"
                :src="IMAGE_URL + property.photo"
                alt="TatNayWon"
                style="
                  width: 100%;
                  height: 160px;
                  object-fit: cover;
                  object-position: top;
                "
              >
                <span
                  v-if="property.top_featured === 'Yes'"
                  class="top-featured"
                >
                  အထူးကြော်ငြာ
                </span>
              </v-img>
            </div>

            <div class="text-center">
              <v-chip
                class="ma-1"
                x-small
                color="success"
                outlined
                text-color="black"
                style="font-size: 9px"
              >
                {{ property.rooms == "" ? "0" : property.rooms }}
                Room
              </v-chip>

              <v-chip
                class="ma-1"
                x-small
                color="primary"
                outlined
                text-color="black"
                style="font-size: 9px"
              >
                {{ property.bathroom == "" ? "0" : property.bathroom }}
                Bathrooms
              </v-chip>

              <v-chip
                class="ma-1"
                x-small
                color="secondary"
                outlined
                text-color="black"
                style="font-size: 9px"
              >
                {{ property.living_room == "" ? "0" : property.living_room }}
                Living
              </v-chip>

              <v-chip
                class="ma-1"
                x-small
                color="red"
                outlined
                text-color="black"
                style="font-size: 9px"
              >
                {{
                  property.masterbathroom == "" ? "0" : property.masterbathroom
                }}
                Master Bedroom
              </v-chip>
            </div>

            <div class="text-center">
              <v-chip
                class="ma-1"
                color="indigo darken-3"
                text-color="white"
                style="font-size: 9px"
                small
                v-if="property.propertie_type == 'by_owner_for_sale'"
              >
                <v-icon left small> mdi-account-check </v-icon>
                {{ setLanguage == true ? "By Owner" : "ပိုင်ရှင်ကိုယ်တိုင်" }}
              </v-chip>

              <v-chip
                class="ma-1"
                color="primary"
                text-color="white"
                style="font-size: 9px"
                small
                v-if="property.installment == 'Yes'"
              >
                <v-icon left small> mdi-bank-check </v-icon>
                {{ setLanguage == true ? "Bank Installment" : "ဘဏ်အရစ်ကျ" }}
              </v-chip>

              <v-chip
                class="ma-1"
                color="orange"
                text-color="white"
                style="font-size: 9px"
                small
              >
                {{ property.price }}
                {{
                  property.price_type == "MMK(Lakhs)" ? "သိန်း(ကျပ်)" : "USD"
                }}
              </v-chip>
              <v-divider class="mt-1 mx-4"></v-divider>
            </div>

            <v-row align="center" justify="space-around" class="my-1">
              <div class="text-center">
                <v-card-actions style="padding: 1px">
                  <v-spacer></v-spacer>

                  <v-dialog transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="callBtn"
                        v-bind="attrs"
                        v-on="on"
                        x-small
                        class="white--text"
                      >
                        <v-icon left small>mdi-phone</v-icon>
                        {{ setLanguage == true ? "Contact" : "ဆက်သွယ်ရန်" }}
                      </v-btn>
                    </template>

                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="warning" dark small>
                          <span style="font-size: 11px"
                            >ကြော်ငြာနံပါတ် {{ property.ad_number }} အတွက်
                            ဆက်သွယ်ရန် ဖုန်းနံပါတ်</span
                          >
                        </v-toolbar>
                        <v-card-text>
                          <div
                            class="pa-2"
                            v-if="property.contact_number != NULL"
                          >
                            <a
                              v-for="ph in property.contact_number.split(',')"
                              :href="`tel:${ph}`"
                              style="color: black; text-decoration: none"
                            >
                              {{ ph }} <br />
                            </a>
                          </div>

                          <div v-else>
                            <div class="pa-2" v-if="property.user_info_id == 0">
                              <a
                                v-for="ph in tatnaywon.phone.split(',')"
                                :href="`tel:${ph}`"
                                style="color: black; text-decoration: none"
                              >
                                {{ ph }} <br />
                              </a>
                            </div>
                            <div class="pa-2" v-else>
                              <a
                                v-for="ph in property.phone.split(',')"
                                :href="`tel:${ph}`"
                                style="color: black; text-decoration: none"
                              >
                                {{ ph }} <br />
                              </a>
                            </div>
                          </div>
                          <p
                            style="
                              padding: 5px;
                              background-color: #d9edf7;
                              color: #31708f;
                              font-size: 12px;
                            "
                          >
                            TatNayWonProperty.com တွင် တွေ့သောကြော်ငြာဟု
                            ပြောပါရန်
                          </p>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false"
                            >Close</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>

                  <v-col cols="auto">
                    <v-btn
                      color="shareBtn"
                      x-small
                      class="white--text"
                      @click="share(property.sale_id)"
                    >
                      <v-icon left small> mdi-share-variant </v-icon>
                      {{ setLanguage == true ? "Share" : "မျှဝေရန်" }}
                    </v-btn>
                  </v-col>

                  <v-btn
                    :to="{
                      name: 'propertyDetail',
                      params: { id: property.sale_id },
                    }"
                    color="detailBtn"
                    x-small
                    class="white--text"
                  >
                    <v-icon left small>mdi-eye</v-icon>
                    {{ setLanguage == true ? "Detail" : "ကြည့်ရန်" }}
                  </v-btn>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
            </v-row>
          </div>
        </v-card>
        <div
          v-if="propertyies.length"
          v-observe-visibility="handleScrollToButton"
        ></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import {
  IMAGE_URL,
  DefaultURL,
  TatNayWonLogo,
  APP_BASE_URL,
} from "@/use/image-url";
import Loader from "@/components/Loader";

export default {
  name: "TopFeatured",

  data() {
    return {
      setLanguage: false,
      propertyies: [],
      tatnaywon: {},
      page: 0,
      propertyPage: 0,
      IMAGE_URL: IMAGE_URL,
      TatNayWonLogo: TatNayWonLogo,
      DefaultURL: DefaultURL,
      isLoad: true,
      APP_BASE_URL: APP_BASE_URL,
    };
  },

  components: {
    Loader,
  },

  methods: {
    async property_fetch() {
      HTTP.get(`property/allproperty/${this.propertyPage}`)
        .then((response) => {
          this.propertyies.push(...response.data.data);
          this.tatnaywon = response.data.tatnaywon;
          this.isLoad = false;
        })
        .catch((e) => {
          this.isLoad = true;
        });
    },

    handleScrollToButton(isVisible) {
      if (!isVisible) {
        return;
      }
      this.propertyPage++;
      this.property_fetch();
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
  },

  mounted() {
    this.property_fetch();
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

<style scoped>
.card {
  width: 100%;
  border-radius: 3px;
  background: white;
  overflow: hidden;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
}
.card header.user {
  display: flex;
  gap: 12px;
}
.card header.user img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #edecea;
}
.card header .user-info-name {
  letter-spacing: 0.4px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}
.card header .user-info-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.588);
}

.box {
  border-radius: 0.3rem;
  height: 5rem;
  width: 5rem;
}
.shadow {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>