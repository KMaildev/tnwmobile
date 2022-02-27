<template>
  <div>
    <v-card flat>
      <v-container fluid>
        <v-row class="child-flex">
          <div>
            <v-toolbar>
              <v-btn icon :to="{ name: 'FrontDashboard' }">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-toolbar-title id='barTitle' style="font-size: 15px;">{{ barTitle }}</v-toolbar-title>
            </v-toolbar>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BackTitle",
  props: ['barTitle'],
};
</script>