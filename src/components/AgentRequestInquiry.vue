<template>
  <div>
    <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
      {{ success }}
    </v-alert>

    <v-alert dense outlined type="error" v-if="messages" style="margin: 2px">
      {{ messages }}
    </v-alert>

    <form @submit.prevent="RequestInquiry">
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

    <form @submit.prevent="TakeAppointments" id="formbottom">
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Appointment Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-dialog
              ref="dialogtime"
              v-model="modal2"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Appointment Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modal2" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialogtime.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-text-field
          label="ဆက်သွယ်ရန်ဖုန်း (Phone)"
          ref="phone"
          v-model="phone_number"
          :rules="[() => !!phone_number || 'This field is required']"
          prepend-icon="mdi-file-phone"
        ></v-text-field>

        <v-btn class="ma-1" color="warning" dark type="submit" block>
          ရက်ချိန်းရယူပါ။
        </v-btn>
      </v-card-text>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "AgentRequestInquiry",
  props: ["userId"],

  data() {
    return {
      messages: "",
      success: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,

      time: null,
      modal2: false,

      name: "",
      phone: "",
      email: "",
      subjects: "ကြော်ငြာနံပါတ် S-000153 အကြောင်းကို ပိုမိုသိလိုသည်။",
      description: "",
      phone_number: "",
    };
  },

  methods: {
    async RequestInquiry() {
      HTTP.get(
        `request_inquiry/index?name=${this.name}&phone=${this.phone}&email=${this.email}&description=${this.description}&subjects=${this.subjects}&userId=${this.userId}`
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

    async TakeAppointments() {
      HTTP.get(
        `request_inquiry/takeappointments?date=${this.date}&time=${this.time}&phone=${this.phone_number}&userId=${this.userId}`
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