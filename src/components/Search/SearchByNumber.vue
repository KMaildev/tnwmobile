<template>
  <div>
    <v-alert
      dense
      outlined
      type="error"
      v-if="errorAlert"
      style="margin: 1px; font-size: 12px"
    >
      {{ errorAlert }}
    </v-alert>
    <br />
    <v-form @submit.prevent="FindByAdNumber">
      <v-container>
        <v-row>
          <v-text-field
            v-model="ad_number"
            @click:append-outer="FindByAdNumber"
            clearable
            label="S-000472"
            type="text"
            @click:clear="clearMessage"
            solo
          ></v-text-field>

          <v-btn type="submit" block color="warning" dark>
            {{ setLanguage == true ? "Search" : "ရှာဖွေပါ" }}
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SearchByNumber",
  data() {
    return {
      setLanguage: false,
      errorAlert: "",
      ad_number: "",
    };
  },

  methods: {
    clearMessage() {
      this.ad_number = "";
    },

    FindByAdNumber(e) {
      if (this.ad_number === "") {
        this.errorAlert = "ရှာဖွေလိုသော ကြော်ငြာနံပါတ်ထည့်သွင်းပါ";
      } else {
        this.dialog = false;
        this.$router.push({
          path: "/searchresult",
          query: {
            ad_number: this.ad_number,
            search_status: "numberSearch",
          },
        });
        window.location.reload();
      }
    },
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