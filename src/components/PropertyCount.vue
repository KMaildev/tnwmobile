<template>
  <div>
    <v-simple-table class="mb-2">
      <template>
        <tbody style="background-color: #fafafa">
          <tr>
            <td style="font-size: 12px">
              ကြော်ငြာတင်နိုင်သော စုစုပေါင်း အရေအတွက်
            </td>
            <td style="font-size: 12px">
              {{ free_and_paid }}
            </td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ပြီးသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">{{ already_posts }}</td>
          </tr>

          <tr>
            <td style="font-size: 12px">တင်ရန်ကျန်ရှိသော ကြော်ငြာအရေအတွက်</td>
            <td style="font-size: 12px">{{ free_and_paid - already_posts }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { HTTP } from "@/use/http-common";
export default {
  name: "PropertyCount",
  data() {
    return {
      free_and_paid: 0,
      already_posts: 0,
      tnwuserdatastore: {},
    };
  },

  methods: {
    async fetch_package() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/index/${userId}`)
        .then((response) => {
          this.free_and_paid = response.data.free_and_paid;
        })
        .catch((e) => {
          this.free_and_paid = 0;
        });
    },

    async fetch_alreadyposts() {
      var userId = this.tnwuserdatastore.user_id;
      HTTP.get(`package/alreadyposts/${userId}`)
        .then((response) => {
          this.already_posts = response.data.already_posts;
        })
        .catch((e) => {
          this.already_posts = 0;
        });
    },
  },

  mounted() {
    this.fetch_package();
    this.fetch_alreadyposts();
  },

  created() {
    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);
  },
};
</script>
