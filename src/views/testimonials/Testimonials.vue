<template>
  <div>
    <BackTitle :barTitle="barTitle.BarName" />
    <hr>
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto mb-3"
      color="#f9f9f9"
      dark
      max-width="400"
      v-show="!isLoad"
      v-for="(testimonial, index) in testimonials"
      :key="index"
    >
      <v-card-title>
        <v-avatar>
          <img
            :src="DefaultURL + `logo.jpg`"
            alt="Logo"
            style="object-fit: cover; object-position: center; padding: 2px;"
          />
        </v-avatar>
        <span class="text-h6 font-weight-bold" style="color: #af742e"
          >Tat Nay Won Property</span
        >
      </v-card-title>

      <v-card-text class="black--text" v-html="testimonial.testimonial">
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              v-if="testimonial.profile_photo"
              class="elevation-6"
              alt=""
              :src="IMAGE_URL + testimonial.profile_photo"
            ></v-img>

            <v-img
              v-else
              class="elevation-6"
              alt=""
              :src="DefaultURL + `profile.png`"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ testimonial.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="black--text" style="font-size: 10px">
              {{ testimonial.region_mm }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL, DefaultURL } from "@/use/image-url";
import BackTitle from "@/components/BackTitle";

export default {
  name: "Testimonials",
  data() {
    return {
      isLoad: true,
      testimonials: [],
      IMAGE_URL: IMAGE_URL,
      DefaultURL: DefaultURL,
      barTitle: {
        BarName: "အကြံပြုသုံးသပ်ခြင်း",
      },
    };
  },

  components: {
    Loader,
    BackTitle,
  },

  methods: {
    async fetch() {
      HTTP.get(`testimonials/index`)
        .then((response) => {
          this.testimonials.push(...response.data.data);
          this.isLoad = false;
        })
        .catch((e) => {
          this.isLoad = true;
        });
    },
  },

  mounted() {
    this.fetch();
  },
};
</script>
