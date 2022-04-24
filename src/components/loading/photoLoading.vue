<template>
  <div>
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="text-subtitle-1 text-center" cols="12">
        Getting your photo
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "photoLoading",
};
</script>

<style scoped>
.v-progress-circular {
  margin: 2rem;
}
</style>