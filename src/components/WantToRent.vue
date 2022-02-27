<template>
  <div>
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto my-2"
      max-width="344"
      outlined
      v-show="!isLoad"
      v-for="(property, index) in propertyies"
      :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title style="font-size: 15px">
            {{ property.title }}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 13px; color: #af742e">
            <v-icon style="font-size: 17px">mdi-map-marker</v-icon>
            {{ property.region_mm }} | {{ property.townships_mm }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-expand-transition>
        <div class="mb-6">
          <v-card-text class="pt-0 pb-4">
            <v-icon style="font-size: 17px">mdi-office-building-outline</v-icon>
            {{ property.property_type_mm }}
          </v-card-text>

          <v-card-text
            class="pt-0 pb-3"
            style="font-size: 15px; font-weight: bold; color: blue"
          >
            <span v-if="property.currency == 'MMK(Lakhs)'"> သိန်း </span>
            <span v-else> USD </span>
            {{ property.budget_from }}
            မှ

            <span v-if="property.currency == 'MMK(Lakhs)'"> သိန်း </span>
            <span v-else> USD </span>
            {{ property.budget_to }}
            အတွင်း
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-footer absolute class="pa-1" color="transparent">
        <v-btn
          block
          small
          color="warning"
          :to="{
            name: 'WantedDetail',
            params: { id: property.w_id },
          }"
        >
          {{ setLanguage == true ? "Detail" : "အသေးစိတ်ကြည့်ရန်" }}
        </v-btn>
      </v-footer>
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
import { IMAGE_URL, LogoNotFound, APP_BASE_URL } from "@/use/image-url";

export default {
  name: "WantToRent",
  components: {
    Loader,
  },

  data() {
    return {
      tab: null,
      setLanguage: false,
      isLoad: false,
      propertyies: [],
      tatnaywon: {},
      page: 0,
      IMAGE_URL: IMAGE_URL,
      LogoNotFound: LogoNotFound,
      APP_BASE_URL: APP_BASE_URL,
    };
  },

  methods: {
    async fetch() {
      HTTP.get(`wanted_listing/index/want_to_rent/${this.page}`)
        .then((response) => {
          this.propertyies.push(...response.data.data);
          this.tatnaywon = response.data.tatnaywon;
          this.isLoad = false;
        })
        .catch((e) => {
          this.isLoad = false;
        });
    },

    handleScrollToButton(isVisible) {
      if (!isVisible) {
        return;
      }
      this.page++;
      this.fetch();
    },
  },

  mounted() {
    this.page = 0;
    this.fetch();
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
