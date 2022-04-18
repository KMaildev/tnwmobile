<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <v-alert text color="white">
            <span style="font-size: 12px; color: black">
              {{ notification.title }}
              <br />
              {{ notification.upload_date }}
            </span>
            <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
            <v-row
              align="center"
              no-gutters
              style="font-size: 12px; color: black"
            >
              <v-col class="grow">
                {{ notification.description }}
              </v-col>
            </v-row>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "NotiDetail",

  data() {
    return {
      notification: {},
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
    HTTP.get(`notification/detail/${this.$route.params.id}`)
      .then((response) => {
        this.notification = response.data.data;
      })
      .catch((e) => {});
  },
};
</script>