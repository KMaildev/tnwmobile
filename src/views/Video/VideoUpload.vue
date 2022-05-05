<template>
  <div>
    <v-container>
      <v-card style="padding: 12px">
        <h4 class="font-weight-light black--text mb-2">
          ကြော်ငြာအတွက် Video တင်ရန်
        </h4>
      </v-card>
      <br />

      <v-row align="center" justify="space-around">
        <div class="col-md-12">
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
              id="file-input"
              class="file-input__input"
              accept="video/*"
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
              <span>တင်လိုသော Video ကိုရွေးချယ်ပါ</span>
            </label>
            <p v-show="isUploadStatus" style="color: red">
              Please select a file less than 100mb
            </p>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <center>
            <v-btn
              @click="uploadImage"
              color="warning"
              v-show="isUploadStatus == false"
            >
              တင်ပါ
            </v-btn>
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
          <br />
          <UploadLoading v-show="isUpload" />

          <div class="col-md-12 col-lg-12 col-sm-12" v-if="propertyVideo.video">
            <iframe
              width="100%"
              height="auto"
              :src="IMAGE_URL + propertyVideo.video"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <v-btn
              x-small
              block
              color="pink"
              dark
              @click="DeleteVideo(propertyVideo.sale_id)"
            >
              Delete Video
            </v-btn>
          </div>
        </div>
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
  name: "VideoUpload",

  components: {
    Loader,
    UploadLoading,
  },

  data() {
    return {
      file: [],
      success: "",
      error: "",
      IMAGE_URL: IMAGE_URL,
      isUpload: false,
      isUploadStatus: false,
      propertyVideo: {},
    };
  },

  methods: {
    uploadImage: function () {
      this.isUpload = true;
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
          `video_upload/process_upload_video/${this.$route.params.propertyId}`,
          formData,
          {
            header: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((response) => {
            if (response.status === 200) {
              this.success = "Video တင်ပြီးပါပြီ";
              this.error = "";
              this.$router.push({
                name: "MyPropertyDetail",
                params: { id: this.$route.params.propertyId },
              });
            }
          })
          .catch((e) => {
            this.error = "အချက်အလက်များကို ထည့်သွင်းပါ။";
          });
      }
    },

    onFileChange(e) {
      var MAX_FILE_SIZE = 100 * 1024 * 1024; // 5MB
      var fileSize = e.target.files[0].size;
      if (fileSize >= MAX_FILE_SIZE) {
        console.log("Please select a file less than 100mb");
        this.isUploadStatus = true;
      } else {
        console.log("Ok");
        this.isUploadStatus = false;
      }
    },

    async fetch_video() {
      HTTP.get(`video_upload/fetchvideo/${this.$route.params.propertyId}`)
        .then((response) => {
          this.propertyVideo = response.data.data;
        })
        .catch((e) => {});
    },

    DeleteVideo: function (id) {
      HTTP.get(`video_upload/deletevideo/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.success = "ဖျက်ပြီးပါပြီ";
            this.error = "";
            this.fetch_video();
          }
        })
        .catch((e) => {
          this.error = "မအောင်မြင်ပါ";
          this.success = "";
        });
    },
  },

  mounted() {
    this.fetch_video();
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