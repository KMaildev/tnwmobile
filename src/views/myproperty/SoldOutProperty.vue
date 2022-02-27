<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <PropertyCount />
    <div>
      <span style="font-size: 12px">Sold Out ကြော်ငြာများ</span>
    </div>
    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>
    <div v-if="propertyies.length == 0" class="text-center">
      You've no posts.
    </div>
    <Loader v-show="isLoad" />
    <v-card
      v-show="!isLoad"
      class="mx-auto my-5"
      v-for="(property, index) in propertyies"
      :key="index"
    >
      <div v-if="property.propertie_type === $route.params.propertyType">
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
                      ကြော်ငြာနံပါတ်
                    </v-list-item-title>
                    <v-list-item-subtitle
                      class="text-right"
                      style="font-size: 13px; color: #0f4c8c; font-weight: bold"
                    >
                      {{ property.ad_number }}
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
                      အကျယ်အဝန်း
                    </v-list-item-title>
                    <v-list-item-subtitle
                      class="text-right"
                      style="font-size: 13px; color: #0f4c8c; font-weight: bold"
                    >
                      {{ property.area }}
                      {{ property.area_type }}
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
                      {{ property.property_type_mm }}
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
                      {{ property.region_mm }}
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
                      {{ property.townships_mm }}
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-btn
                      :to="{
                        name: 'MyPropertyDetail',
                        params: { id: property.sale_id },
                      }"
                      small
                      color="warning"
                      block
                    >
                      <v-icon left small>mdi-eye</v-icon>
                      အသေးစိတ်ကြည့်ရန်
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-bottom-sheet>
          </header>

          <router-link
            :to="{
              name: 'MyPropertyDetail',
              params: { id: property.sale_id },
            }"
            style="font-size: 12px; color: #0060b6; text-decoration: none"
          >
            {{ property.title_mm }}
          </router-link>

          <img
            v-if="property.photo"
            :src="IMAGE_URL + property.photo"
            alt="Property"
            style="
              width: 100%;
              height: 160px;
              object-fit: cover;
              object-position: top;
            "
          />
        </div>

        <v-row align="center" justify="space-around" class="my-1">
          <div class="text-center" style="background-color: #fcf9f9">
            <v-chip style="margin: 2px" color="primary" label small>
              <v-icon small left class="material-icons">
                bedroom_parent
              </v-icon>
              {{ property.rooms == "" ? "0" : property.rooms }}
            </v-chip>

            <v-chip style="margin: 2px" color="success" label small>
              <v-icon small left class="material-icons"> bathtub </v-icon>
              {{ property.bathroom == "" ? "0" : property.bathroom }}
            </v-chip>

            <v-chip style="margin: 2px" color="error" label small>
              <v-icon small left class="material-icons"> chair </v-icon>
              {{ property.living_room == "" ? "0" : property.living_room }}
            </v-chip>

            <v-chip style="margin: 2px" color="warning" label small>
              <v-icon small left class="material-icons">attach_money</v-icon>
              {{ property.price }} {{ property.price_type }}
            </v-chip>
          </div>

          <div class="text-center">
            <v-card-actions style="padding: 1px">
              <v-spacer></v-spacer>

              <v-btn
                color="detailBtn"
                x-small
                class="white--text"
                @click="UndoSoldOut(property.sale_id)"
              >
                Undo
              </v-btn>

              <v-col cols="auto">
                <v-btn
                  color="shareBtn"
                  x-small
                  class="white--text"
                  @click="share(property.sale_id)"
                >
                  <v-icon left small> mdi-share-variant </v-icon>
                  မျှဝေရန်
                </v-btn>
              </v-col>

              <v-btn
                :to="{
                  name: 'MyPropertyDetail',
                  params: { id: property.sale_id },
                }"
                color="detailBtn"
                x-small
                class="white--text"
              >
                <v-icon left small>mdi-eye</v-icon>
                ကြည့်ရန်
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
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import PropertyCount from "@/components/PropertyCount";
import {
  IMAGE_URL,
  LogoNotFound,
  TatNayWonLogo,
  APP_BASE_URL,
} from "@/use/image-url";

export default {
  name: "SoldOutProperty",

  components: {
    Loader,
    PropertyCount,
  },

  data() {
    return {
      isLoad: false,
      propertyies: [],
      tatnaywon: {},
      tnwuserdatastore: {},
      page: 0,
      IMAGE_URL: IMAGE_URL,
      TatNayWonLogo: TatNayWonLogo,
      LogoNotFound: LogoNotFound,
      APP_BASE_URL: APP_BASE_URL,
      success: "",
    };
  },

  methods: {
    async fetch() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(
        `property/fetchsoleout/${this.$route.params.propertyType}/${userId}/${this.page}`
      )
        .then((response) => {
          this.propertyies.push(...response.data.data);
          this.tatnaywon = response.data.tatnaywon;
          this.isLoad = false;
        })
        .catch((e) => {
          this.isLoad = false;
        });
    },

    UndoSoldOut: function (id) {
      HTTP.get(`property/undosoldoutproperty/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "Undo လုပ်ပြီးပါပြီ";
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

    handleScrollToButton(isVisible) {
      if (!isVisible) {
        return;
      }
      this.page++;
      this.fetch();
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

  watch: {
    $route(to, from) {
      const fromParam = from.params.propertyType;
      const currentParam = this.$route.params.propertyType;
      if (fromParam != currentParam) {
        this.page = 0;
        this.fetch();
      }
    },
  },

  mounted() {
    this.page = 0;
    this.fetch();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
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
</style>
