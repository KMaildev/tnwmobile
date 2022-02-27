<template>
  <div class="text-center">
    <v-progress-circular indeterminate color="amber"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.v-progress-circular {
  margin: 2rem;
}
</style>