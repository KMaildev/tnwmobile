<template>
  <div>
    <v-alert
      border="top"
      color="red lighten-2"
      dark
      v-if="orderhistoryies.length == 0"
    >
      သင်ဝယ်ယူထားသော Package မရှိသေးပါ
    </v-alert>
    <v-list
      class="transparent"
      v-for="(orderhistory, index) in orderhistoryies"
      :key="index"
    >
      <div style="padding: 5px; background-color: #af742e" class="card-panel">
        <center style="color: white">
          Expire Date: {{ orderhistory.end_date }}
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
                {{ orderhistory.no_of_posts }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                လစဉ်အထူးကြော်ငြာပြုလုပ်နိုင်သည့် အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ orderhistory.post_per_month }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                လစဉ် Refresh ပြုလုပ်နိုင်သည့် အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ orderhistory.refresh_per_month }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                နေ့စဉ် Refresh ပြုလုပ်နိုင်သည့်အရေအတွက်
              </td>
              <td style="font-size: 12px">
                {{ orderhistory.refresh_daily }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">
                Website မှာ ကြော်ငြာများကို ကူညီတင်ပေးခြင်း
              </td>
              <td style="font-size: 12px">
                {{ orderhistory.website_helpful_ad }}
              </td>
            </tr>
            <tr>
              <td style="font-size: 12px">
                Website ပင်မစာမျက်နှာတွင် အထူးကြော်ငြာအဖြစ် ထားပေးခြင်း
              </td>
              <td style="font-size: 12px">
                {{ orderhistory.website_special_ad }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">Order Date</td>
              <td style="font-size: 12px">
                {{ orderhistory.other_date }}
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px">Status</td>
              <td style="font-size: 12px">
                <span v-if="orderhistory.approval_status == 0"> Pending </span>
                <span v-if="orderhistory.approval_status == 1"> Active </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-list>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "History",
  data() {
    return {
      orderhistoryies: [],
      tnwuserdatastore: {},
    };
  },

  methods: {
    async fetch_orderhistory() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/orderhistory/${userId}`)
        .then((response) => {
          this.orderhistoryies = response.data.orderhistory;
        })
        .catch((e) => {});
    },
  },

  mounted() {
    this.fetch_orderhistory();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>
