<template>
  <div>
    <v-list color="#fcfcfc" v-if="loggedIn">
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            v-if="tnwuserdatastore.logo"
            :src="IMAGE_URL + tnwuserdatastore.logo"
            alt="TatNayWon"
            style="border: 1px solid gray;"
          >
          </v-img>
          <v-row justify="space-around" v-else>
            <v-avatar color="orange" size="50">
              <span class="white--text text-h5">
                {{ tnwuserdatastore.company_name.substring(0, 1) }}
              </span>
            </v-avatar>
          </v-row>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6 black--text">
            {{ tnwuserdatastore.company_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="black--text">
            {{ tnwuserdatastore.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list color="#fcfcfc" v-else>
      <v-list-item class="px-2">
        <v-img
          src="http://www.tatnaywonproperty.com/data/logo/logo1.png"
          contain
          width="100"
          height="auto"
        ></v-img>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6 black--text">
            Welcome
          </v-list-item-title>
          <v-list-item-subtitle class="black--text">
            tatnaywonproperty.com
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { IMAGE_URL } from "@/use/image-url";
export default {
  name: "AccountHeader",
  data: () => ({
    loggedIn: false,
    tnwuserdatastore: {},
    IMAGE_URL: IMAGE_URL,
  }),

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);

    let auth = localStorage.getItem("tnwauth");
    if (auth) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
};
</script>