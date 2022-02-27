<template>
  <div>
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab :href="`#want_to_buy`">
          {{
            setLanguage == true
              ? "People Who Want To Buy"
              : "အိမ်ဝယ်ရန်ရှာဖွေနေသူများ"
          }}
        </v-tab>
        <v-tab :href="`#WantToRent`">
          {{
            setLanguage == true
              ? "People Who Want To Rent"
              : "အိမ်ငှါးရန်ရှာဖွေနေသူများ"
          }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :value="`want_to_buy`">
          <WantToBuy />
        </v-tab-item>
        <v-tab-item :value="`WantToRent`">
          <WantToRent />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import WantToBuy from "@/components/WantToBuy";
import WantToRent from "@/components/WantToRent";

export default {
  name: "WantedListing",
  components: {
    WantToBuy,
    WantToRent,
  },

  data() {
    return {
      tab: null,
      setLanguage: false,
    };
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
