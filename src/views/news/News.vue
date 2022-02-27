<template>
  <div>
    <BackTitle :barTitle="barTitle.BarName" />
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto my-2"
      max-width="auto"
      outlined
      v-show="!isLoad"
      v-for="(news, index) in latestNews"
      :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title> TatNayWonProperty.com </v-list-item-title>
          <v-list-item-subtitle>
            {{ news.title }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img
            v-if="news.photo"
            :src="IMAGE_URL + news.photo"
            alt="Logo"
            style="object-fit: cover; object-position: center"
          />
        </v-list-item-avatar>
      </v-list-item>

      <v-expand-transition>
        <div class="mb-6">
          <v-card-text class="pt-0 pb-4">
            {{ news.upload_date }}
          </v-card-text>
        </div>
      </v-expand-transition>

      <v-footer absolute class="pa-1" color="transparent">
        <v-btn text :to="{ name: 'NewsDetail', params: { id: news.news_id } }">
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
    <div
      v-if="latestNews.length"
      v-observe-visibility="handleScrollToButton"
    ></div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL } from "@/use/image-url";
import BackTitle from "@/components/BackTitle";

export default {
  name: "News",
  data() {
    return {
      isLoad: true,
      latestNews: [],
      page: 0,
      IMAGE_URL: IMAGE_URL,

      barTitle: {
        BarName: "နောက်ဆုံးရသတင်းများ",
      },
    };
  },

  components: {
    Loader,
    BackTitle,
  },

  methods: {
    async fetch() {
      HTTP.get(`news/index/${this.page}`)
        .then((response) => {
          this.latestNews.push(...response.data.data);
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
