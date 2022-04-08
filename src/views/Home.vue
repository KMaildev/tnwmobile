<template>
  <div>
    <MainScreenImage></MainScreenImage>
    <v-row style="background-color: white">
      <v-col cols="12" sm="12">
        <span style="font-size: 12px">{{
          setLanguage == true ? "Agents" : "အကျိုးဆောင်များ"
        }}</span>

        <SmallLoader v-show="isSmallLoad" />

        <v-slide-group>
          <div
            v-show="!isSmallLoad"
            style="margin: 3px"
            align="center"
            v-for="(agent, index) in agents"
            :key="index"
          >
            <div>
              <router-link
                :to="{
                  name: 'agentDetail',
                  params: { id: agent.user_id },
                }"
              >
                <v-img
                  v-if="agent.logo"
                  :src="IMAGE_URL + agent.logo"
                  height="70"
                  width="70"
                  style="
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                    margin: 10px;
                  "
                >
                </v-img>

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
              </router-link>
            </div>
            <span style="font-size: 12px">
              {{
                agent.company_name == ""
                  ? agent.name.substring(0, 10)
                  : agent.company_name.substring(0, 10)
              }}
            </span>
          </div>
        </v-slide-group>
      </v-col>
    </v-row>

    <PropertyTag></PropertyTag>
    <TopFeatured></TopFeatured>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import {
  IMAGE_URL,
  DefaultURL,
  TatNayWonLogo,
  APP_BASE_URL,
} from "@/use/image-url";
import Loader from "@/components/Loader";
import SmallLoader from "@/components/SmallLoader";
import PropertyTag from "@/components/PropertyTag";
import MainScreenImage from "@/components/MainScreenImage";
import TopFeatured from "@/components/TopFeatured";

export default {
  name: "Home",

  data() {
    return {
      setLanguage: false,
      agents: [],
      propertyies: [],
      tatnaywon: {},
      page: 0,
      propertyPage: 0,
      IMAGE_URL: IMAGE_URL,
      TatNayWonLogo: TatNayWonLogo,
      DefaultURL: DefaultURL,
      isLoad: true,
      isSmallLoad: true,
      APP_BASE_URL: APP_BASE_URL,
    };
  },

  components: {
    Loader,
    SmallLoader,
    PropertyTag,
    MainScreenImage,
    TopFeatured,
  },

  methods: {
    async fetch() {
      HTTP.get(`agent/index/PropertyAgency/${this.page}`)
        .then((response) => {
          this.agents.push(...response.data.data);
          this.isSmallLoad = false;
        })
        .catch((e) => {
          this.isSmallLoad = true;
        });
    },

    async property_fetch() {
      HTTP.get(`property/homepage/${this.propertyPage}`)
        .then((response) => {
          this.propertyies.push(...response.data.data);
          this.tatnaywon = response.data.tatnaywon;
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
      this.propertyPage++;
      this.property_fetch();
    },

    share(id) {
      navigator
        .share({
          title: "tatnaywonproperty.com",
          url: APP_BASE_URL + "propertydetail/index/" + id,
        })
        .then((_) => console.log("Yay, you shared it :)"))
        .catch((error) =>
          console.log("Oh noh! You couldn't share it! :'(\n", error)
        );
    },
  },

  mounted() {
    this.fetch();
    this.property_fetch();
  },

  created() {
    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },
};
</script>
