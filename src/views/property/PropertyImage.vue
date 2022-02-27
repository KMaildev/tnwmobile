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
    <v-card v-show="!isLoad" elevation="24" max-width="auto" class="mx-auto">
      <v-list one-line>
        <v-list-item>
          <v-list-item-content>
            <router-link
              style="text-decoration: none"
              :to="{
                name: 'propertyDetail',
                params: { id: propertyDetail.sale_id },
              }"
            >
              <span style="line-height: 1.6; color: black">
                {{ propertyDetail.title_mm }}
              </span>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-carousel
        :continuous="true"
        :show-arrows="true"
        hide-delimiters
        height="auto"
      >
        <v-carousel-item
          v-for="(propertyPhoto, index) in propertyPhotos"
          :key="index"
        >
          <img
            :src="propertyPhoto.image_url + propertyPhoto.photo"
            alt="Property Image"
            width="100%"
          />
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { APP_BASE_URL } from "@/use/image-url";

export default {
  name: "PropertyImage",

  components: {
    Loader,
  },

  data() {
    return {
      isLoad: true,
      propertyPhotos: [],
      propertyDetail: {},
      APP_BASE_URL: APP_BASE_URL,
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
    HTTP.get(`property/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyPhotos.push(...response.data.photo);
        this.propertyDetail = response.data.data;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });
  },
};
</script>