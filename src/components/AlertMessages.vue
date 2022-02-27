<template>
  <div>
    <v-alert dense outlined type="error" id="AlertMessage">
      {{ AlertMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertMessages",
  props: ["AlertMessage"],
};
</script>