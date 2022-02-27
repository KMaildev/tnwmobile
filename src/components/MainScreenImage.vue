<template>
  <div>
    <v-carousel
      cycle
      :interval="5000"
      :continuous="true"
      :show-arrows="false"
      height="auto"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(propertyPhoto, i) in propertyPhotos" :key="i">
        <v-row class="fill-height" align="center" justify="center">
          <img
            :src="DefaultURL + propertyPhoto"
            alt="Property Image"
            style="
              width: 100%;
              height: auto;
              object-fit: cover;
              object-position: top;
              background-color: black;
            "
          />
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { DefaultURL } from "@/use/image-url";
export default {
  name: "MainScreenImage",

  data() {
    return {
      DefaultURL: DefaultURL,
      propertyPhotos: [
        "mobileslide1.png",
        "mobileslide2.png",
        "mobileslide3.png",
      ],
    };
  },
};
</script>