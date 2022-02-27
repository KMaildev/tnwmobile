<template>
  <div>
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto my-2"
      max-width="auto"
      v-show="!isLoad"
      v-for="(notification, index) in notifications"
      :key="index"
    >
      <v-card-text>
        <div>{{ notification.title }}</div>
        <p>{{ notification.upload_date }}</p>
        <v-divider></v-divider>
        <div class="text--primary">
          {{ notification.description }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";

export default {
  name: "Notification",
  data() {
    return {
      tab: null,
      isLoad: true,
      notifications: [],
    };
  },

  methods: {
    async fetch_notification() {
      HTTP.get(`notification/index`)
        .then((response) => {
          this.notifications.push(...response.data.data);
          this.isLoad = false;
          console.log(response.data.data);
        })
        .catch((e) => {
          this.isLoad = true;
        });
    },
  },

  mounted() {
    this.fetch_notification();
  },

  components: {
    Loader,
  },
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>