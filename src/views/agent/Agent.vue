<template>
  <div>
    <Loader v-show="isLoad" />
    <v-card
      v-show="!isLoad"
      style="background-color: white; margin: 3px"
      class="mx-auto"
      max-width="auto"
      outlined
      v-for="(agent, index) in agents"
      :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title
            class="mb-1"
            v-html="agent.company_name == '' ? agent.name : agent.company_name"
          >
          </v-list-item-title>
          <v-list-item-subtitle v-html="agent.address"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="#f9f7f7">
          <img v-if="agent.logo" :src="IMAGE_URL + agent.logo" alt="Logo" />
          <v-avatar
            v-else
            color="grey lighten-1"
            size="70"
            tile
            style="padding: 5px; margin: 10px"
          >
            <span class="white--text text-h5">
              {{
                agent.company_name == ""
                  ? agent.name.substring(0, 1)
                  : agent.company_name.substring(0, 1)
              }}
            </span>
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions style="background-color: #f7f7f7; padding: 1px">
        <v-spacer></v-spacer>
        <v-dialog transition="dialog-bottom-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="callBtn"
              v-bind="attrs"
              v-on="on"
              x-small
              class="white--text"
            >
              <v-icon left small>mdi-phone</v-icon>
              ဆက်သွယ်ရန်
            </v-btn>
          </template>

          <template>
            <v-card>
              <v-toolbar color="warning" dark small>
                <span style="font-size: 11px">
                  {{
                    agent.company_name == "" ? agent.name : agent.company_name
                  }}
                  အတွက် ဆက်သွယ်ရန် ဖုန်းနံပါတ်</span
                >
              </v-toolbar>
              <v-card-text>
                <div class="pa-1">
                  <a
                    v-for="ph in agent.phone.split(',')"
                    :href="`tel:${ph}`"
                    style="color: black; text-decoration: none"
                  >
                    {{ ph }} <br />
                  </a>
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>

        <v-col cols="auto">
          <v-btn
            color="shareBtn"
            x-small
            class="white--text"
            @click="share(agent.user_id)"
          >
            <v-icon left small> mdi-share-variant </v-icon>
            မျှဝေရန်
          </v-btn>
        </v-col>

        <v-btn
          :to="{ name: 'agentDetail', params: { id: agent.user_id } }"
          color="detailBtn"
          x-small
          class="white--text"
        >
          <v-icon left small>mdi-eye</v-icon>
          ကြည့်ရန်
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <div v-if="agents.length" v-observe-visibility="handleScrollToButton"></div>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import { IMAGE_URL, LogoNotFound, APP_BASE_URL } from "@/use/image-url";
import Loader from "@/components/Loader";

export default {
  name: "Agent",

  components: {
    Loader,
  },

  data() {
    return {
      isLoad: true,
      agents: [],
      page: 0,
      IMAGE_URL: IMAGE_URL,
      LogoNotFound: LogoNotFound,
      APP_BASE_URL: APP_BASE_URL,
    };
  },

  methods: {
    async fetch() {
      HTTP.get(`agent/index/${this.$route.params.companytype}/${this.page}`)
        .then((response) => {
          this.agents.push(...response.data.data);
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

    share(id) {
      navigator
        .share({
          title: "tatnaywonproperty.com",
          url: APP_BASE_URL + "agents/detail/" + id,
        })
        .then((_) => console.log("Yay, you shared it :)"))
        .catch((error) =>
          console.log("Oh noh! You couldn't share it! :'(\n", error)
        );
    },
  },

  watch: {
    $route(to, from) {
      const fromParam = from.params.companytype;
      const currentParam = this.$route.params.companytype;
      if (fromParam != currentParam) {
        this.page = 0;
        this.fetch();
      }
    },
  },

  mounted() {
    this.page = 0;
    this.fetch();
  },
};
</script>
