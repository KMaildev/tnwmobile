<template>
  <div>
    <v-alert text color="red" type="error">
      <div style="font-size: 15px">
        Wanted Listing ကြည့်ရှူ့ရန် သင့်အကောင့်ထဲသို့ Login လုပ်ရန်လိုအပ်သည်။
      </div>
      <v-divider class="my-4 black" style="opacity: 0.22"></v-divider>
      <v-row align="center" no-gutters>
        <v-col class="shrink">
          <v-btn color="red" outlined :to="{ name: 'Auth' }"> Login </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "WantedAlert",
};
</script>

<style scoped>
.v-progress-circular {
  margin: 2rem;
}
</style>