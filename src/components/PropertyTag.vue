<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12" sm="12" md="12">
        <span style="font-size: 12px"> Myanmar's Smarter Property Search </span>
        <v-sheet>
          <v-chip-group mandatory active-class="primary--text">
            <v-chip
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"
              link
            >
              {{ setLanguage == true ? item.eng : item.title }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PropertyTag",

  data() {
    return {
      setLanguage: false,
      items: [
        {
          title: "ပိုင်ရှင်ကိုယ်တိုင် ရောင်းမည်",
          eng: "By Owner For Sale",
          to: {
            name: "property",
            params: { propertyType: "by_owner_for_sale" },
          },
        },

        {
          title: "ရောင်းရန်",
          eng: "For Sale",
          to: {
            name: "property",
            params: { propertyType: "for_sale" },
          },
        },

        {
          title: "ငှားရန်",
          eng: "For Rent",
          to: {
            name: "property",
            params: { propertyType: "for_rent" },
          },
        },

        {
          title: "ပိုင်ရှင်ကိုယ်တိုင် ငှားမည်",
          eng: "By Owner For Rent",
          to: {
            name: "property",
            params: { propertyType: "by_owner_for_rent" },
          },
        },

        {
          title: "အိမ်ခြံမြေသစ်များ",
          eng: "New Property",
          to: {
            name: "property",
            params: { propertyType: "new_property" },
          },
        },

        {
          title: "အိမ်ရာချေးငွေ လျှောက်ထားရန်",
          eng: "Home Loan Application",
          to: {
            name: "HomeLoan",
          },
        },

        {
          title: "သိကောင်းစရာများ",
          eng: "Related Property",
          to: {
            name: "FrontDashboard",
          },
        },

        {
          title: "ဆက်သွယ်မေးမြန်းရန်",
          eng: "Contact Us",
          to: {
            name: "Contact",
          },
        },

        {
          title: "အကြံဉာဏ်ပေးရန်",
          eng: "Suggestion",
          to: {
            name: "Suggestion",
          },
        },
      ],
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