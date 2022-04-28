<template>
  <div>
    <br />
    <v-alert border="left" color="orange" type="success">
      Application is up to date.
    </v-alert>

    <div class="text-center">
      <v-btn
        :disabled="dialog"
        :loading="dialog"
        class="white--text"
        color="purple darken-2"
        @click="dialog = true"
        block
      >
        Checking For Updates...
      </v-btn>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Checking...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <div class="flex social-btns">
      <a
        class="app-btn blu flex vert"
        href="https://apps.apple.com/mm/app/tat-nay-won/id1612967907"
        target="_blank"
      >
        <v-icon style="color: white"> mdi-google-play </v-icon>
        <p style="margin-top: 5px">
          Available on the <br />
          <span class="big-txt">App Store</span>
        </p>
      </a>

      <a
        class="app-btn blu flex vert"
        href="https://play.google.com/store/apps/details?id=com.tatnaywonrealestatecompany.tatnaywonproperty"
        target="_blank"
      >
        <v-icon style="color: white"> mdi-apple </v-icon>
        <p style="margin-top: 5px">
          Get it on <br />
          <span class="big-txt">Google Play</span>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppVersion",

  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    dialog(val) {
      if (!val) return;
      localStorage.clear();
      setTimeout(() => (this.dialog = false), 4000);
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-btn {
  width: 100%;
  max-width: 100%;
  color: #fff;
  margin: 20px 10px;
  text-align: left;
  border-radius: 5px;
  text-decoration: none;
  font-family: "Lucida Grande", sans-serif;
  font-size: 10px;
  text-transform: uppercase;
}
.app-btn.blu {
  background-color: #101010;
  transition: background-color 0.25s linear;
}
.app-btn.blu:hover {
  background-color: #454545;
}
.app-btn i {
  width: 20%;
  text-align: center;
  font-size: 28px;
  margin-right: 7px;
}
.app-btn .big-txt {
  font-size: 17px;
  text-transform: capitalize;
}
</style>
