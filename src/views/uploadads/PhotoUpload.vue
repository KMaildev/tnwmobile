<template>
  <div>
    <v-container>
      <v-card style="padding: 12px">
        <h4 class="font-weight-light black--text mb-2">
          ကြော်ငြာအတွက် ဓာတ်ပုံတင်ရန်
        </h4>
        <p style="font-size: 12px">
          ဓာတ်ပုံများဖြင့် ကြော်ငြာပါက သင့်ကြော်ငြာအား လူအများစိတ်ဝင်စားပြီး
          ပိုမိုကြည့်ကြပါသည်။
        </p>
      </v-card>
      <br />

      <v-row align="center" justify="space-around">
        <div class="col-md-12">
          <!-- <input type="file" ref="file" multiple /> -->
          <v-alert
            dense
            outlined
            type="success"
            v-if="success"
            style="margin: 2px"
          >
            {{ success }}
          </v-alert>

          <div class="file-input">
            <input
              type="file"
              ref="file"
              multiple
              id="file-input"
              class="file-input__input"
              @change="onFileChange"
            />
            <label class="file-input__label" for="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>တင်လိုသောပုံကိုရွေးချယ်ပါ</span>
            </label>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <center>
            <v-btn @click="uploadImage" color="warning"> ပုံတင်ပါ </v-btn>
            &nbsp;
            <v-btn
              :to="{
                name: 'MyPropertyDetail',
                params: { id: this.$route.params.propertyId },
              }"
              color="warning"
            >
              ကြော်ငြာကိုကြည့်ရန်
            </v-btn>
          </center>
        </div>
        <v-fade-transition mode="out-in">
          <UploadLoading v-show="isUpload" />

          <div class="col-md-12 col-lg-12 col-sm-12">
            <v-row>
              <v-col cols="12">
                Number Of Chosen Photos : {{ previewImages.length }}
              </v-col>
              <!-- <Loader v-show="isLoad" /> -->
              <v-col cols="6" v-for="(image, key) in previewImages" :key="key">
                <v-card v-show="!isLoad">
                  <img
                    v-bind:ref="'image'"
                    alt=""
                    src=""
                    class="grey darken-4"
                    style="width: 100%; height: 125px; object-position: center"
                  />
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      x-small
                      block
                      color="pink"
                      dark
                      @click="removeImage(image, key)"
                    >
                      Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <Loader v-show="isLoad" />
            <div v-show="!isLoad">
              <v-row v-if="status === true">
                <v-col cols="12">
                  <hr />
                  <br />
                  Number Of Uploaded Photos : {{ images.length }}
                </v-col>
                <v-col cols="6" v-for="(image, index) in images" :key="index">
                  <v-card>
                    <v-responsive :aspect-ratio="16 / 9">
                      <v-img
                        :src="IMAGE_URL + image.photo"
                        height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          x-small
                          block
                          color="pink"
                          dark
                          @click="DeleteImage(image.propertie_id)"
                        >
                          Delete
                        </v-btn>
                      </v-card-actions>
                    </v-responsive>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-fade-transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import { IMAGE_URL } from "@/use/image-url";
import Loader from "@/components/loading/photoLoading";
import UploadLoading from "@/components/loading/UploadLoading";

export default {
  name: "PhotoUpload",

  components: {
    Loader,
    UploadLoading,
  },

  data() {
    return {
      images: [],
      file: [],
      previewImages: [],
      success: "",
      error: "",
      IMAGE_URL: IMAGE_URL,
      status: false,
      isLoad: true,
      isUpload: false,
    };
  },

  methods: {
    uploadImage: function () {
      this.isUpload = true;
      // this.file = this.$refs.file.files[0];
      var totalFile = this.$refs.file.files.length;
      if (totalFile > 0) {
        this.isUpload = true;
      }
      var total = 0;
      var formData = new FormData();
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        this.file = this.$refs.file.files[i];
        let file = this.$refs.file.files[i];
        formData.append("file", file);
        HTTP.post(
          `property/process_upload/${this.$route.params.propertyId}`,
          formData,
          {
            header: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "ဓာတ်ပုံတင်ပြီးပါပြီ";
              this.error = "";
              // this.isUpload = true;
              // this.$router.push({
              //   name: "Uploadphoto",
              //   params: { propertyId: this.$route.params.propertyId },
              // });

              this.$router.push({
                name: "MyPropertyDetail",
                params: { id: this.$route.params.propertyId },
              });
            }
          })
          .catch((e) => {
            this.error = "အချက်အလက်များကို ထည့်သွင်းပါ။";
            // this.isUpload = false;
          });
      }
    },

    onFileChange(e) {
      let selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.previewImages.push(selectedFiles[i]);
      }
      this.applyImage();
    },

    removeImage(image, index) {
      console.log(this.previewImages);
      this.previewImages.splice(index, 1);
      this.applyImage();
      //this.$refs.image[index].src = "" // You are hidding the 3rd one that is now in index 1.
    },

    applyImage() {
      for (let i = 0; i < this.previewImages.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.previewImages[i]);
      }
    },

    async fetch_image() {
      HTTP.get(`property/fetchImage/${this.$route.params.propertyId}`)
        .then((response) => {
          this.images.push(...response.data.data);
          this.status = true;
          this.isLoad = false;
        })
        .catch((e) => {
          this.status = false;
          this.isLoad = true;
        });
    },

    DeleteImage: function (id) {
      HTTP.get(`property/deleteImage/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "ဖျက်ပြီးပါပြီ";
            this.error = "";
            this.images = [];
            this.fetch_image();
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
          this.success = "";
        });
    },

    fetch_image_recall: function (totalFile, upload_total) {
      // console.log(totalFile);
      // console.log(upload_total);
      if (totalFile === upload_total) {
        this.images = [];
        this.fetch_image();
      }
    },
  },

  mounted() {
    this.fetch_image();
  },
};
</script>

<style scoped>
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: #4245a8;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  width: 100%;
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
</style>