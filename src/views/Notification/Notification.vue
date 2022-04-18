<template>
  <div>
    <Loader v-show="isLoad" />
    <v-card max-width="auto" class="mx-auto" v-show="!isLoad">
      <v-list three-line>
        <v-subheader>Notification</v-subheader>
        <template v-for="(notification, index) in notifications">
          <v-divider :key="index"></v-divider>
          <v-list-item
            :key="index"
            :to="{
              name: 'NotiDetail',
              params: { id: notification.id },
            }"
          >
            <v-list-item-avatar>
              <v-img
                class="img"
                src="https://tatnaywonproperty.com/uploads/mobile_app/logo.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="notification.upload_date"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="notification.title"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
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
.img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #edecea;
}
</style>