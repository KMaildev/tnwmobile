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
          <v-alert text color="warning">
            <span style="font-size: 12px; color: black">
              {{ message.subject }}
            </span>
            <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
            <v-row
              align="center"
              no-gutters
              style="font-size: 12px; color: black"
            >
              <v-col class="grow">
                {{ message.message }}
              </v-col>
            </v-row>
          </v-alert>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-account-check</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ message.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <a
                    :href="`tel:${message.phone}`"
                    style="color: black; text-decoration: none"
                  >
                    {{ message.phone }}
                  </a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <a
                    :href="`mailto:${message.email}`"
                    style="color: black; text-decoration: none"
                  >
                    {{ message.email }}
                  </a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-clipboard-text-clock</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ message.other_date }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";

export default {
  name: "MessageDetail",

  data() {
    return {
      message: {},
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
    HTTP.get(`message/messageDetail/${this.$route.params.id}`)
      .then((response) => {
        this.message = response.data.data;
      })
      .catch((e) => {});
  },
};
</script>