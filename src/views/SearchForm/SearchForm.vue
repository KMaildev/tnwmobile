<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" centered>
      <v-tab>
        {{ setLanguage == true ? "Search Properties" : "အိမ်ခြံမြေရှာဖွေရန်" }}
      </v-tab>
      <v-tab>
        {{
          setLanguage == true
            ? "Search By ADS Number"
            : "ကြော်ငြာနံပါတ်ဖြင့် ရှာဖွေရန်"
        }}
      </v-tab>

      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="12">
              <v-radio-group row v-model="types">
                <v-radio
                  v-if="setLanguage == true"
                  label="For Sale"
                  value="for_sale"
                  name="category_id"
                ></v-radio>
                <v-radio
                  v-if="setLanguage == false"
                  label="ရောင်းရန်"
                  value="for_sale"
                  name="category_id"
                ></v-radio>

                <v-radio
                  v-if="setLanguage == true"
                  label="For Rent"
                  value="for_rent"
                  name="category_id"
                ></v-radio>
                <v-radio
                  v-if="setLanguage == false"
                  label="ငှားရန်"
                  value="for_rent"
                  name="category_id"
                ></v-radio>

                <v-radio
                  v-if="setLanguage == true"
                  label="New Property"
                  value="new_property"
                  name="category_id"
                ></v-radio>
                <v-radio
                  v-if="setLanguage == false"
                  label="ကြိုပွိုင့်"
                  value="new_property"
                  name="category_id"
                ></v-radio>
              </v-radio-group>
              <ForSaleSearch v-if="types == 'for_sale'" />
              <ForRentSearch v-if="types == 'for_rent'" />
              <NewPropertySearch v-if="types == 'new_property'" />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="12">
              <SearchByNumber />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import SearchByNumber from "@/components/Search/SearchByNumber";
import ForSaleSearch from "@/components/Search/ForSaleSearch";
import ForRentSearch from "@/components/Search/ForRentSearch";
import NewPropertySearch from "@/components/Search/NewPropertySearch";

export default {
  name: "SearchForm",
  data() {
    return {
      types: "for_sale",
      setLanguage: false,
    };
  },

  components: {
    SearchByNumber,
    ForSaleSearch,
    ForRentSearch,
    NewPropertySearch,
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