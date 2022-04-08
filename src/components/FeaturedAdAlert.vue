<template>
  <div>
    <v-alert color="warning">
      <div style="color: white; font-weight: bold">
        လစဉ်အထူးကြော်ငြာပြုလုပ်နိုင်သည့် အရေအတွက် ကုန်သွားပါပြီ
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
  name: "FeaturedAdAlert",
  data() {
    return {};
  },
};
</script>