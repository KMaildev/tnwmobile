<template>
  <div>
    <v-alert color="warning">
      <div style="color: white; font-weight: bold">
        အထူးကြော်ငြာပြုလုပ်ရန်အတွက် သင့်တွင် ဝယ်ယူထားသော Package မရှိသေးပါ။
        ပထမဦးစွာ Package ဝယ်ယူရန်လိုအပ်သည်။ Package ဝယ်ယူခြင်းဖြင့် . . .
        <br /><br />
        - လစဉ်အထူးကြော်ငြာပြုလုပ်နိုင်ခြင်း <br />
        - လစဉ် Refresh ပြုလုပ်နိုင်ခြင်း <br />
        - နေ့စဉ် Refresh ပြုလုပ်နိုင်ခြင်း <br />
        - Website မှာ ကြော်ငြာများကို ကူညီတင်ပေးခြင်း <br />
        - Website ပင်မစာမျက်နှာတွင် အထူးကြော်ငြာအဖြစ် ထားပေးခြင်း <br />
      </div>
    </v-alert>

    <v-btn
      block
      color="warning"
      :to="{
        name: 'PackagePlan',
      }"
    >
      Package Plan များ ကြည့်ရန်
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "PackageNoOrder",
  data() {
    return {};
  },
};
</script>