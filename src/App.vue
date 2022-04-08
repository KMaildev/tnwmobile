<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <!-- Nav Menu -->
        <v-navigation-drawer v-model="drawer" app>
          <AccountHeader></AccountHeader>

          <v-divider></v-divider>
          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              link
            >
              <v-list-item-icon>
                <v-icon size="20" style="line-height: 1.6">
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title size="20" style="line-height: 1.6">
                  {{ setLanguage == true ? item.eng : item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- login menu -->
          <v-list dense>
            <v-subheader
              style="
                background-color: #af742e;
                font-size: 13px;
                color: white;
                justify-content: center;
                display: flex;
                font-weight: bold;
              "
            >
              Dashboard
            </v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="managemenu in managemenus"
                :key="managemenu.title"
                :to="managemenu.to"
                link
              >
                <v-list-item-icon>
                  <v-icon size="20">{{ managemenu.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title size="20">
                    {{
                      setLanguage == true ? managemenu.eng : managemenu.title
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <!-- login menu -->

          <template v-slot:append>
            <div class="pa-1">
              <v-btn
                color="warning"
                dark
                block
                :to="{ name: 'Auth' }"
                v-if="loggedIn == false"
              >
                <v-icon left> mdi-login-variant </v-icon>
                Sign In
              </v-btn>

              <v-btn
                color="warning"
                dark
                block
                @click="logout"
                v-else-if="loggedIn == true"
              >
                <v-icon left> mdi-login-variant </v-icon>
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <!-- Nav Menu -->

        <!-- Top Bar -->
        <v-app-bar color="menuBar" dark app>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title class="flex" style="font-size: 14px"
            >TatNayWonProperty.com</v-toolbar-title
          >
          <v-spacer></v-spacer>

          <v-btn
            icon
            size="20"
            :to="{
              name: 'SearchForm',
            }"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn
            icon
            :to="{
              name: 'Notification',
              params: { id: 3 },
            }"
          >
            <v-icon size="20">mdi-bell-ring</v-icon>
          </v-btn>

          <!-- swithc language -->
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="set_language('Myanmar')">
                <v-list-item-title>Language: Myanmar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="set_language('English')">
                <v-list-item-title>Language: English</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- swithc language -->
        </v-app-bar>
        <!-- Top Bar -->

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountHeader from "@/components/AccountHeader";
export default {
  name: "App",

  data: () => ({
    drawer: null,
    loggedIn: false,
    setLanguage: false,

    items: [
      {
        title: "ပင်မစာမျက်နှာ",
        eng: "Home",
        icon: "mdi-home-heart",
        to: "/",
      },

      {
        title: "ရောင်းရန်",
        eng: "For Sale",
        icon: "mdi-office-building-marker-outline",
        to: {
          name: "property",
          params: { propertyType: "for_sale" },
        },
      },

      {
        title: "ငှားရန်",
        eng: "For Rent",
        icon: "mdi-home-group",
        to: {
          name: "property",
          params: { propertyType: "for_rent" },
        },
      },

      {
        title: "ပိုင်ရှင်ကိုယ်တိုင် ရောင်းမည်",
        eng: "By Owner For Sale",
        icon: "mdi-domain",
        to: {
          name: "property",
          params: { propertyType: "by_owner_for_sale" },
        },
      },

      {
        title: "ပိုင်ရှင်ကိုယ်တိုင် ငှားမည်",
        eng: "By Owner For Rent",
        icon: "mdi-home-city",
        to: {
          name: "property",
          params: { propertyType: "by_owner_for_rent" },
        },
      },

      {
        title: "အိမ်ခြံမြေသစ်များ",
        eng: "New Property",
        icon: "mdi-office-building",
        to: {
          name: "property",
          params: { propertyType: "new_property" },
        },
      },

      {
        title: "အဆောင်ငှါးရန်",
        eng: "Hostel",
        icon: "mdi-home-lightbulb",
        to: {
          name: "property",
          params: { propertyType: "hostel" },
        },
      },

      {
        title: "အိမ်ရှာဖွေသူများ",
        eng: "Wanted Listing",
        icon: "mdi-home-search",
        to: {
          name: "WantedListing",
          params: { wanted_type: "want_to_buy" },
        },
      },

      {
        title: "Wanted Listing တင်ရန်",
        eng: "To Post Wanted Listing",
        icon: "mdi-home-plus",
        to: {
          name: "WantedListingCreate",
        },
      },

      {
        title: "အကျိုးဆောင်များ",
        eng: "Agents",
        icon: "mdi-account-heart",
        to: {
          name: "agent",
          params: { companytype: "PropertyAgency" },
        },
      },

      {
        title: "ဆောက်လုပ်ရေး ကုမ္ပဏီများ",
        eng: "Construction Company",
        icon: "mdi-home-group-plus",
        to: {
          name: "agent",
          params: { companytype: "ConstructionCompany" },
        },
      },

      {
        title: "အိမ်အလှဆင် ကုမ္ပဏီများ",
        eng: "Renovation Company",
        icon: "mdi-home-analytics",
        to: {
          name: "agent",
          params: { companytype: "RenovationCompany" },
        },
      },

      {
        title: "သယ်ယူပို့ဆောင်ရေး ကုမ္ပဏီများ",
        eng: "Transportation Company",
        icon: "mdi-train-car",
        to: {
          name: "agent",
          params: { companytype: "TransportationCompany" },
        },
      },

      {
        title: "အိမ်ရာချေးငွေ လျှောက်ထားရန်",
        eng: "Home Loan Application",
        icon: "mdi-home-analytics",
        to: {
          name: "HomeLoan",
        },
      },

      {
        title: "ဆက်သွယ်မေးမြန်းရန်",
        eng: "Contact Us",
        icon: "mdi-card-account-mail",
        to: {
          name: "Contact",
        },
      },

      {
        title: "သိကောင်းစရာများ",
        eng: "Related Property",
        icon: "mdi-frequently-asked-questions",
        to: {
          name: "FrontDashboard",
        },
      },
    ],

    selectedItem: 1,

    managemenus: [
      {
        title: "Dashboard",
        eng: "Dashboard",
        icon: "mdi-apps",
        to: {
          name: "AgentDashboard",
        },
      },

      {
        title: "ကြော်ငြာတင်ရန်",
        eng: "Post New Advertisement",
        icon: "mdi-home-plus",
        to: {
          name: "Adcreate",
          params: { propertyType: "for_sale" },
        },
      },

      {
        title: "တင်ထားပြီးသော ကြော်ငြာများ",
        eng: "My Advertisement",
        icon: "mdi-format-list-checks",
        to: {
          name: "MyProperty",
        },
      },

      {
        title: "Messages",
        eng: "Messages",
        icon: "mdi-message-bulleted",
        to: {
          name: "Messages",
        },
      },

      {
        title: "ချိန်းဆိုမှု ဇယား",
        eng: "Appointment",
        icon: "mdi-message-text-clock",
        to: {
          name: "Appointment",
        },
      },

      {
        title: "Notifications",
        eng: "Notifications",
        icon: "mdi-bell-ring",
        to: {
          name: "Notification",
          params: { id: 3 },
        },
      },

      {
        title: "App Version",
        eng: "App Version",
        icon: "mdi-cellphone-arrow-down",
        to: {
          name: "AppVersion",
        },
      },
    ],
  }),

  created() {
    let auth = localStorage.getItem("tnwauth");
    if (auth) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/auth");
      this.loggedIn = false;
      window.location.reload();
    },

    set_language(lang) {
      if (lang === "Myanmar") {
        localStorage.removeItem("language");
        this.$router.push("/");
        window.location.reload();
      } else {
        localStorage.setItem("language", lang);
        this.$router.push("/");
        window.location.reload();
      }
    },
  },

  components: {
    AccountHeader,
  },
};
</script>
