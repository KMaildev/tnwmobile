<template>
  <div>
    <div style="line-height: 1rem; background-color: #e5e5e5; padding: 12px">
      <span class="black--text" style="font-size: 13px">
        TatNayWonProperty.com
      </span>
      <p style="font-size: 11px">
        ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏ ဝဘ်ဆိုဒ်၊ မိုဘိုင်းအက်ပ်နှင့် အရာများကို
        လုပ်ဆောင်ပုံတို့ကို အဆက်မပြတ် မြှင့်တင်နေပါသည်။
        ကျွန်ုပ်တို့၏ဝန်ဆောင်မှုများကို ပိုမိုတိုးတက်ကောင်းမွန်လာစေရန်
        သင်၏အကြံပြုချက်များကို နွေးထွေးစွာကြိုဆိုပါသည်။ သင့်အကြံပြုချက်ကို
        အောက်တွင်တင်ပြနိုင်ပါသည်။
      </p>
    </div>

    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>

    <v-alert dense outlined type="error" v-if="messages" style="margin: 2px">
      {{ messages }}
    </v-alert>

    <form @submit.prevent="suggestionnow" id="formbottom">
      <v-card-text>
        <v-text-field
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          label="သင်၏အမည် (Name)"
          required
        ></v-text-field>

        <v-text-field
          ref="phone"
          v-model="phone"
          :rules="[() => !!phone || 'This field is required']"
          label="ဆက်သွယ်ရန်ဖုန်း (Phone)"
          required
        ></v-text-field>

        <v-textarea
          v-model="description"
          label="သင်အကြံပေးလိုသော အကြောင်းအရာ"
          :rules="[() => !!description || 'This field is required']"
          required
          rows="3"
        ></v-textarea>

        <v-btn class="ma-1" color="warning" dark type="submit" block>
          အကြံဉာဏ်ပေးရန်
        </v-btn>
      </v-card-text>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "Suggestion",

  data() {
    return {
      messages: "",
      success: "",
      name: "",
      phone: "",
      description: "",
    };
  },

  methods: {
    async suggestionnow() {
      HTTP.get(
        `request_inquiry/savesuggestion?name=${this.name}&phone=${this.phone}&description=${this.description}`
      )
        .then((response) => {
          if (response.status === 200) {
            this.success = "လုပ်ဆောင်ချက် အောင်မြင်ပါသည်။";
          }
        })
        .catch((e) => {
          this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
        });
    },
  },
};
</script>
