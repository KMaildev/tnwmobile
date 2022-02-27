<template>
  <div>
    <v-list class="transparent">
      <div style="padding: 5px; background-color: #af742e" class="card-panel">
        <center style="color: white">
          {{ packageplan.package_name }}
        </center>
      </div>
      <v-simple-table style="background-color: #f2efef">
        <template v-slot:default>
          <tbody>
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

      <v-alert
        dense
        outlined
        type="error"
        v-if="alertMessage"
        style="margin: 2px"
      >
        {{ alertMessage }}
      </v-alert>

      <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
        {{ success }}
      </v-alert>

      <form @submit.prevent="OrderNow">
        <v-card flat>
          <v-card-text>
            <v-text-field
              label="Phone number or email address"
              v-model="contact"
            ></v-text-field>

            <v-select
              :items="choosepayments"
              item-text="title"
              item-value="value"
              label="Choose Payment"
              v-model="choose_payment_status"
            ></v-select>

            <v-radio-group
              v-model="bank_id"
              v-if="choose_payment_status === 'bank_transfer'"
            >
              <v-radio
                v-for="(bank_account, index) in bank_accounts"
                :key="index"
                :label="`${bank_account.bank_name}@${bank_account.account_number}`"
                :value="`${bank_account.bank_id}`"
              ></v-radio>
            </v-radio-group>

            <v-radio-group v-model="radios">
              <template v-slot:label>
                <div><strong>Billing Cycle</strong></div>
              </template>
              <v-radio value="1">
                <template v-slot:label>
                  <div>
                    1 Month @
                    <strong class="primary--text">
                      {{ packageplan.price }}
                    </strong>
                  </div>
                </template>
              </v-radio>
              <v-radio value="3MonthsContractMonthlyPayment">
                <template v-slot:label>
                  <div>
                    5% Discount For 3 Months Contract (Monthly Payment) @
                    <strong class="primary--text">
                      {{ discountedPrice(packageplan) }}
                    </strong>
                  </div>
                </template>
              </v-radio>

              <v-radio value="3MonthsFullPayment">
                <template v-slot:label>
                  <div>
                    3 Months Additional (Full Payment)
                    <strong class="primary--text">
                      {{ DoubleDiscountedPrice(packageplan) }}
                    </strong>
                  </div>
                </template>
              </v-radio>

              <v-radio value="6MonthsContractMonthlyPayment">
                <template v-slot:label>
                  <div>
                    10% Discount For 6 Months Contract (Monthly Payment) @
                    <strong class="primary--text">
                      {{ sixMonthDis(packageplan) }}
                    </strong>
                  </div>
                </template>
              </v-radio>

              <v-radio value="6MonthsFullPayment">
                <template v-slot:label>
                  <div>
                    6 Months Additional (Full Payment)
                    <strong class="primary--text">
                      {{ sixMonthDisFull(packageplan) }}
                    </strong>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>

            <v-btn type="submit" block color="warning" dark> Order Now </v-btn>
          </v-card-text>
        </v-card>
      </form>
    </v-list>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "OrderNow",
  data() {
    return {
      packageplan: {},
      bank_accounts: [],
      tnwuserdatastore: {},
      success: "",
      alertMessage: "",

      choosepayments: [
        {
          title: "Contact me",
          value: "contact_me",
        },

        {
          title: "Bank Transfer",
          value: "bank_transfer",
        },
      ],

      radios: "1",
      contact: "",
      choose_payment_status: "",
      bank_id: "",
    };
  },

  methods: {
    async OrderNow() {
      let userId = this.tnwuserdatastore.user_id;

      let OneMonthlyPrice = this.packageplan.price;

      let ThreeMonthlyPrice = this.discountedPrice(this.packageplan);
      let ThreeFullPrice = this.DoubleDiscountedPrice(this.packageplan);

      let SixMonthlyPrice = this.sixMonthDis(this.packageplan);
      let SixFullPrice = this.sixMonthDisFull(this.packageplan);

      HTTP.get(
        `package/ordernow?contactstatus=${this.contact}&choose_payment_status=${this.choose_payment_status}&BillingCycle=${this.radios}&OneMonthlyPrice=${OneMonthlyPrice}&ThreeMonthlyPrice=${ThreeMonthlyPrice}&ThreeFullPrice=${ThreeFullPrice}&SixMonthlyPrice=${SixMonthlyPrice}&SixFullPrice=${SixFullPrice}&user_id=${userId}&bank_id=${this.bank_id}&package_id=${this.$route.params.id}`
      )
        .then((response) => {
          if (response.status === 200) {
            this.success = "လုပ်ဆောင်ချက် အောင်မြင်ပါသည်";
          }
        })
        .catch((e) => {
          this.alertMessage = "အချက်အလက်များကို ထည့်သွင်းပါ။";
        });
    },

    async fetch_packageplan() {
      HTTP.get(`package/packagedetail/${this.$route.params.id}`)
        .then((response) => {
          this.packageplan = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async fetch_bankaccount() {
      HTTP.get(`bank/index`)
        .then((response) => {
          this.bank_accounts = response.data.data;
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
  },

  mounted() {
    this.fetch_packageplan();
    this.fetch_bankaccount();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>
