<template>
  <div>
    <BackTitle :barTitle="barTitle.BarName" />
    <Loader v-show="isLoad" />
    <v-card
      class="mx-auto my-2"
      max-width="344"
      outlined
      v-show="!isLoad"
      v-for="(book, index) in books"
      :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title> TatNayWonProperty.com </v-list-item-title>
          <v-list-item-subtitle>
            {{ book.title }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img
            v-if="book.photo"
            :src="IMAGE_URL + book.photo"
            alt="Logo"
            style="
              object-fit: cover;
              object-position: center;
            "
          />
        </v-list-item-avatar>
      </v-list-item>

      <v-expand-transition>
        <div class="mb-6">
          <v-card-text class="pt-0 pb-4">
            {{ book.upload_date }}
          </v-card-text>
        </div>
      </v-expand-transition>

      <v-footer absolute class="pa-1" color="transparent">
        <v-btn text :to="{ name: 'BookDetail', params: { id: book.pb_id } }">
          <v-icon left>pageview</v-icon>
          <span
            class="
              text-capitalize
              body-2
              blue--text
              text-lighten-1
              font-weight-medium
            "
            >View Book Detail</span
          >
        </v-btn>
      </v-footer>
    </v-card>
    <!-- <div
      v-if="books.length"
      v-observe-visibility="handleScrollToButton"
    ></div> -->
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { IMAGE_URL } from "@/use/image-url";
import BackTitle from "@/components/BackTitle";

export default {
  name: "Books",
  data() {
    return {
      isLoad: true,
      books: [],
      page: 0,
      IMAGE_URL: IMAGE_URL,

      barTitle: {
        BarName: "အိမ်ခြံမြေ စာအုပ်များ",
      },
    };
  },

  components: {
    Loader,
    BackTitle,
  },

  methods: {
    async fetch() {
      HTTP.get(`books/index/${this.page}`)
        .then((response) => {
          this.books.push(...response.data.data);
          this.isLoad = false;
        })
        .catch((e) => {
          this.isLoad = true;
        });
    },

    handleScrollToButton(isVisible) {
      if (!isVisible) {
        return;
      }
      this.page++;
      this.fetch();
    },
  },

  mounted() {
    this.page = 0;
    this.fetch();
  },
};
</script>
