<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <Loader v-show="isLoad" />
    <v-card v-show="!isLoad" class="mx-auto" max-width="344">
      <v-img
        v-if="guideDetail.photo"
        :src="IMAGE_URL + guideDetail.photo"
        style="
          width: 100%;
          height: 300px;
          object-fit: cover;
          object-position: center;
        "
      ></v-img>

      <v-alert text color="white">
        <p style="color: #f0963e">
          {{ guideDetail.title }}
        </p>
        <span style="color: black; font-size: 11px;">
            {{ guideDetail.upload_date }}
        </span>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow">
            <p
              style="font-size: 12px; color: black"
              v-html="guideDetail.description"
            ></p>
            <div></div>
          </v-col>
        </v-row>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL, LogoNotFound } from "@/use/image-url";

export default {
  name: "GuideDetail",

  components: {
    Loader,
  },

  data() {
    return {
      isLoad: true,
      IMAGE_URL: IMAGE_URL,
      LogoNotFound: LogoNotFound,
      guideDetail: {},
    };
  },

  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
      if (direction) {
        if (direction === "Right") {
          this.$router.go(-1);
        }
      }
    },
  },

  created() {
    HTTP.get(`property_guide/detail/${this.$route.params.id}`)
      .then((response) => {
        this.guideDetail = response.data.data;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });
  },
};
</script>