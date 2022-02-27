<template>
  <div>
    <BackTitle :barTitle="barTitle.BarName" />
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto my-2"
      max-width="auto"
      outlined
      v-show="!isLoad"
      v-for="(guide, index) in guides"
      :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title> TatNayWonProperty.com </v-list-item-title>
          <v-list-item-subtitle>
            {{ guide.title }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img v-if="guide.photo" :src="IMAGE_URL + guide.photo" alt="Logo" />
        </v-list-item-avatar>
      </v-list-item>

      <v-expand-transition>
        <div class="mb-6">
          <v-card-text class="pt-0 pb-4">
            {{ guide.upload_date }}
          </v-card-text>
        </div>
      </v-expand-transition>

      <v-footer absolute class="pa-1" color="transparent">
        <v-btn text :to="{ name: 'GuideDetail', params: { id: guide.pg_id } }">
          <v-icon left>pageview</v-icon>
          <span
            class="
              text-capitalize
              body-2
              blue--text
              text-lighten-1
              font-weight-medium
            "
            >View full coverage</span
          >
        </v-btn>
      </v-footer>
    </v-card>
    <div v-if="guides.length" v-observe-visibility="handleScrollToButton"></div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL } from "@/use/image-url";
import BackTitle from "@/components/BackTitle";

export default {
  name: "PropertyGuide",
  data() {
    return {
      isLoad: true,
      guides: [],
      page: 0,
      IMAGE_URL: IMAGE_URL,

      barTitle: {
        BarName: "အိမ်ခြံမြေလမ်းညွှန်",
      },
    };
  },

  components: {
    Loader,
    BackTitle,
  },

  methods: {
    async fetch() {
      HTTP.get(`property_guide/index/${this.page}`)
        .then((response) => {
          this.guides.push(...response.data.data);
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
      this.page++;
      this.fetch();
    },
  },

  mounted() {
    this.page = 0;
    this.fetch();
  },
};
</script>
