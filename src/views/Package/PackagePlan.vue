<template>
  <div>
    <v-list
      class="transparent"
      v-for="(packageplan, index) in packageplans"
      :key="index"
    >
      <div style="padding: 5px; background-color: #af742e" class="card-panel">
        <center style="color: white">
          {{ packageplan.package_name }}
        </center>
      </div>
      <v-simple-table style="background-color: #f2efef">
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="font-size: 12px">
                အများဆုံးတင်နိုင်မည့်ကြော်ငြာအရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ packageplan.no_of_posts }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                လစဉ်အထူးကြော်ငြာပြုလုပ်နိုင်သည့် အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ packageplan.post_per_month }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                လစဉ် Refresh ပြုလုပ်နိုင်သည့် အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ packageplan.refresh_per_month }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                နေ့စဉ် Refresh ပြုလုပ်နိုင်သည့်အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ packageplan.refresh_daily }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                Website မှာ ကြော်ငြာများကို ကူညီတင်ပေးခြင်း
              </td>
              <td style="font-size: 12px">
                {{ packageplan.website_helpful_ad }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                Website ပင်မစာမျက်နှာတွင် အထူးကြော်ငြာအဖြစ် ထားပေးခြင်း
              </td>
              <td style="font-size: 12px">
                {{ packageplan.website_special_ad }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">One Month</td>
              <td style="font-size: 12px">
                {{ packageplan.price }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                5% Discount For 3 Months Contract
                <span style="font-size: 12px"> (Monthly Payment)</span>
              </td>
              <td style="font-size: 12px">
                {{ discountedPrice(packageplan) }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">Additional (Full Payment)</td>
              <td style="font-size: 12px">
                {{ DoubleDiscountedPrice(packageplan) }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                10% Discount For 6 Months Contract
                <span style="font-size: 12px"> (Monthly Payment)</span>
              </td>
              <td style="font-size: 12px">
                {{ sixMonthDis(packageplan) }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">Additional (Full Payment)</td>
              <td style="font-size: 12px">
                {{ sixMonthDisFull(packageplan) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-btn
        block
        small
        style="padding: 3px; background-color: #53110c; color: white"
        :to="{
          name: 'OrderNow',
          params: { id: packageplan.package_id },
        }"
      >
        Order Now
      </v-btn>
    </v-list>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "PackagePlan",
  data() {
    return {
      packageplans: [],
    };
  },

  methods: {
    async fetch_packageplan() {
      HTTP.get(`package/allpackages`)
        .then((response) => {
          this.packageplans = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    discountedPrice(product) {
      return product.price - (product.price * product.discount) / 100;
    },

    DoubleDiscountedPrice(product) {
      var threeMonthValue =
        +product.price - (product.price * product.discount) / 100;
      var threeMonthFull =
        +threeMonthValue - (threeMonthValue * product.discount) / 100;
      return threeMonthFull;
    },

    sixMonthDis(product) {
      return product.price - (product.price * product.six_month_discount) / 100;
    },

    sixMonthDisFull(product) {
      var sixMonthValue =
        +product.price - (product.price * product.six_month_discount) / 100;
      var threeMonthFull =
        +sixMonthValue - (sixMonthValue * product.six_month_discount) / 100;
      return threeMonthFull;
    },

    EditProperty: function (id) {
      alert("Coming Soon");
    },
  },

  mounted() {
    this.fetch_packageplan();
  },
};
</script>
