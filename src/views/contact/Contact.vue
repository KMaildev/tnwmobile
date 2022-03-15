<template>
  <div>
    <v-card-title
      class="warr darken-2"
      style="line-height: 1rem; background-color: #e5e5e5"
    >
      <span class="black--text" style="font-size: 13px">
        TatNayWonProperty.com
      </span>
      <span class="black--text" style="font-size: 10px">
        သင်သိလိုသော အကြောင်းအရာများအတွက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်
      </span>
    </v-card-title>

    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span style="font-size: 12px">
              No.196 ,Pinlon Road, 35 ward , North Dagon, Yangon, Myanmar
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span style="font-size: 12px">
              <a
                :href="`tel:09 42000 7322`"
                style="text-decoration: none; color: black"
              >
                09 42000 7322
              </a>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span style="font-size: 12px">
              <a
                :href="`tel:09 42000 5622`"
                style="text-decoration: none; color: black"
              >
                09 42000 5622
              </a>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span style="font-size: 12px">
              <a
                :href="`tel:09740917954`"
                style="text-decoration: none; color: black"
              >
                09 740 917 954
              </a>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-email-edit</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span style="font-size: 12px">
              <a
                :href="`mailto:info@tatnaywonproperty.com`"
                style="text-decoration: none; color: black"
              >
                info@tatnaywonproperty.com
              </a>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
    </v-list>

    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>

    <v-alert dense outlined type="error" v-if="messages" style="margin: 2px">
      {{ messages }}
    </v-alert>

    <form @submit.prevent="ContactUs" id="formbottom">
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

        <v-text-field
          ref="email"
          v-model="email"
          label="အီးမေးလ်း (Email / Gmail)"
        ></v-text-field>

        <v-text-field
          ref="subjects"
          v-model="subjects"
          label="အကြောင်းအရာ"
        ></v-text-field>

        <v-textarea
          v-model="description"
          label="သင်မေးလိုသော အကြောင်းအရာအသေးစိတ်"
          :rules="[() => !!description || 'This field is required']"
          required
          rows="3"
        ></v-textarea>

        <v-btn class="ma-1" color="warning" dark type="submit" block>
          ဆက်သွယ်ပါ
        </v-btn>
      </v-card-text>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "Contact",

  data() {
    return {
      messages: "",
      success: "",
      name: "",
      phone: "",
      email: "",
      subjects: "",
      description: "",
    };
  },

  methods: {
    async ContactUs() {
      HTTP.get(
        `request_inquiry/contactus?name=${this.name}&phone=${this.phone}&email=${this.email}&description=${this.description}&subjects=${this.subjects}`
      )
        .then((response) => {
          if (response.status === 200) {
            this.success = "လုပ်ဆောင်ချက် အောင်မြင်ပါသည်။";
            this.messages = "";
          }
        })
        .catch((e) => {
          this.messages = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          this.success = "";
        });
    },
  },
};
</script>
