<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down'),
    }"
  >
    <Loader v-show="isLoad" />
    <v-card v-show="!isLoad" elevation="24" max-width="444" class="mx-auto">
      <v-alert dense outlined type="success" v-if="success" style="margin: 2px">
        {{ success }}
      </v-alert>

      <v-alert dense outlined type="error" v-if="error" style="margin: 2px">
        {{ error }}
      </v-alert>

      <v-system-bar lights-out></v-system-bar>
      <v-carousel
        :continuous="true"
        :show-arrows="true"
        hide-delimiters
        height="300"
      >
        <v-carousel-item
          v-for="(propertyPhoto, index) in propertyPhotos"
          :key="index"
        >
          <router-link
            :to="{
              name: 'PropertyImage',
              params: { id: $route.params.id },
            }"
          >
            <img
              :src="propertyPhoto.image_url + propertyPhoto.photo"
              alt="Property Image"
              style="
                width: 100%;
                height: auto;
                object-fit: cover;
                object-position: center;
              "
            />
          </router-link>
        </v-carousel-item>
      </v-carousel>

      <v-alert outlined color="warning" style="margin: 2px">
        <div>
          <span style="font-size: 12px">
            {{ propertyDetail.title_mm }}
          </span>
        </div>
      </v-alert>

      <div style="padding: 5px; background-color: #af742e" class="card-panel">
        <center>
          <v-btn
            class="ma-1"
            plain
            @click="AddFavorites(propertyDetail.sale_id)"
          >
            <span style="color: white">
              {{
                setLanguage == true
                  ? "Add your favourite property"
                  : "အနှစ်သက်ဆုံးစာရင်းထဲထည့်ပါ"
              }}
            </span>
          </v-btn>
        </center>
      </div>

      <div
        style="padding: 5px; background-color: #f0963e"
        class="card-panel"
        v-if="propertyDetail.installment === 'Yes'"
      >
        <span style="color: white">
          <v-icon left class="material-icons" style="color: white">
            attach_money
          </v-icon>
          ဘဏ်အရစ်ကျဖြင့် ရနိုင်ပါသည်
        </span>
      </div>

      <v-list class="transparent">
        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "AD Number" : "ကြော်ငြာနံပါတ်" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.ad_number }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Price" : "စျေးနှုန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.price }}
            {{
              propertyDetail.price_type == "MMK(Lakhs)" ? "သိန်း(ကျပ်)" : "USD"
            }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Area" : "အကျယ်အဝန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.area }}
            {{ propertyDetail.area_type }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Type" : "အမျိုးအစား" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_type_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Region" : "တိုင်း၊ ပြည်နယ်" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.region_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Township" : "မြို့နယ်" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.townships_mm }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Status" : "ပြင်ဆင်ပြီးမပြီ" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.property_status }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.shrine_room">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Shrine room" : "ဘုရားခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.shrine_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Bedroom" : "အိပ်ခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.rooms == "" ? "0" : propertyDetail.rooms }}
            ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Master Bedroom" : "Master Bedroom" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{
              propertyDetail.masterbathroom == ""
                ? "0"
                : propertyDetail.masterbathroom
            }}
            ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.dining_room">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Dining Room" : "ထမင်းစားခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.dining_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Living Room" : "ဧည့်ခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.living_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Bathroom" : "ရေချိုးခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.bathroom == "" ? "0" : propertyDetail.bathroom }}
            ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.other_room">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Other Room" : "အခြားအခန်း" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.other_room }} ခန်း
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.floor">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Floor" : "အလွှာ" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.floor }} လွှာ
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.year_built">
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Building Year" : "တည်ဆောက်သည့်ခုနှစ်" }}
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-right"
            style="font-size: 13px; color: #0f4c8c; font-weight: bold"
          >
            {{ propertyDetail.year_built }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.swimming_pool"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Swimming Pool" : "ရေကူးကန်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.securit">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "24 hrs Security" : " ၂၄ နာရီလုံခြုံရေး" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.air_conditioning"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Air conditioning" : "လေအေးပေးစနစ်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.wifi">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px"> Wifi </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.balcony">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Balcony" : "လသာဆောင်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.dishwasher">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Dishwasher" : "ပန်းကန်ဆေးစက်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.generator">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Generator" : "မီးစက်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.near_church">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Near Church" : "ဘုရားကျောင်းအနီး" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.garden">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Garden" : "ဥယျာဉ်တော်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.gym">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "GYM" : "အားကစားရုံ" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.lift">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Lift" : "ဓါတ်လှေခါး" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.play_ground">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Play Ground" : "ကစားကွင်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.cctv">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px"> CCTV </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.car_parking">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            Car Parking
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          style="min-height: 30px"
          v-if="propertyDetail.mountain_view"
        >
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Mountain View" : "တောင်တန်းရှုခင်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.pagoda_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Pagoda View" : "ဘုရားစေတီများ" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.sea_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Sea View" : "ပင်လယ်မြင်ကွင်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.lake_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Lake View" : "အိုင်မြင်ကွင်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.city_view">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "City View" : "မြို့မြင်ကွင်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.showroom">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Showroom" : "အရောင်းပြခန်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.restaurant">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Restaurant" : "စားသောက်ဆိုင်" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.office">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Office" : "ရုံးခန်း" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="min-height: 30px" v-if="propertyDetail.warehouse">
          <v-icon left class="material-icons" style="color: black">
            check_circle_outline
          </v-icon>
          <v-list-item-title style="font-size: 13px">
            {{ setLanguage == true ? "Warehouse" : "ဂိုဒေါင်" }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <div
        style="padding: 5px; background-color: #af742e; text-align: center"
        class="card-panel"
      >
        <span style="color: white; font-size: 12px" v-if="setLanguage == true">
          Posted On
          {{ propertyDetail.post_upload_date }}
        </span>
        <span style="color: white; font-size: 12px" v-if="setLanguage == false">
          {{ propertyDetail.post_upload_date }}
          တွင်ကြော်ငြာတင်ခဲ့သည်
        </span>
        <hr />
        <span style="color: white; font-size: 12px" v-if="setLanguage == true">
          Views
          {{ propertyDetail.viewer_count }}
        </span>

        <span style="color: white; font-size: 12px" v-if="setLanguage == false">
          ဤအိမ်ခြံမြေကို
          {{ propertyDetail.viewer_count }}
          ကြိမ် ကြည့်ရှု့ပြီ
        </span>
      </div>

      <v-alert text color="white">
        <p style="color: #f0963e">
          {{ setLanguage == true ? "Description" : "အကြောင်းအရာ" }}
        </p>
        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
        <v-row align="center" no-gutters>
          <v-col class="grow">
            <p
              style="font-size: 12px; color: black"
              v-html="propertyDetail.description_mm"
            ></p>
            <div></div>
          </v-col>
        </v-row>
      </v-alert>

      <v-card-title
        class="warr darken-2"
        style="line-height: 1rem; background-color: #af742e"
      >
        <span class="white--text" style="font-size: 13px">
          {{
            propertyDetail.user_info_id == 0
              ? "TatNayWonProperty.com"
              : propertyDetail.company_name
          }}
        </span>
        <span class="white--text" style="font-size: 10px">
          သင်သိလိုသော အကြောင်းအရာများအတွက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်
        </span>
      </v-card-title>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-phone</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <v-dialog transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="warning" v-bind="attrs" v-on="on" x-small>
                    ဆက်သွယ်ရန် ဖုန်းနံပါတ်
                  </v-btn>
                </template>

                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="warning" dark small>
                      <span style="font-size: 11px"
                        >ကြော်ငြာနံပါတ် {{ propertyDetail.ad_number }} အတွက်
                        ဆက်သွယ်ရန် ဖုန်းနံပါတ်</span
                      >
                    </v-toolbar>
                    <v-card-text>
                      <div
                        class="pa-2"
                        v-if="propertyDetail.contact_number != NULL"
                      >
                        <a
                          v-for="ph in propertyDetail.contact_number.split(',')"
                          :href="`tel:${ph}`"
                          style="color: black; text-decoration: none"
                        >
                          {{ ph }} <br />
                        </a>
                      </div>

                      <div v-else>
                        <div
                          class="pa-2"
                          v-if="propertyDetail.user_info_id == 0"
                        >
                          <a
                            v-for="ph in tatnaywon.phone.split(',')"
                            :href="`tel:${ph}`"
                            style="color: black; text-decoration: none"
                          >
                            {{ ph }} <br />
                          </a>
                        </div>
                        <div class="pa-2" v-else>
                          <a
                            v-for="ph in propertyDetail.phone.split(',')"
                            :href="`tel:${ph}`"
                            style="color: black; text-decoration: none"
                          >
                            {{ ph }} <br />
                          </a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn color="primary" x-small>
                {{
                  propertyDetail.user_info_id == 0
                    ? tatnaywon.address
                    : propertyDetail.address
                }}
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item v-if="propertyDetail.user_info_id != 0">
          <v-list-item-action>
            <v-icon>mdi-office-building-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                color="success"
                x-small
                :to="{
                  name: 'agentDetail',
                  params: { id: propertyDetail.user_id },
                }"
              >
                ဤကုမ္ပဏီ၏ Page ကို အသေးစိတ်ကြည့်ရန်
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <AgentRequestInquiry :userId="propertyDetail.user_info_id" />

      <div id="create">
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-account-circle </v-icon>
            </v-btn>
          </template>

          <v-dialog transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="indigo" v-bind="attrs" v-on="on">
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </template>

            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="warning" dark small>
                  <span style="font-size: 11px"
                    >ကြော်ငြာနံပါတ် {{ propertyDetail.ad_number }} အတွက်
                    ဆက်သွယ်ရန် ဖုန်းနံပါတ်</span
                  >
                </v-toolbar>
                <v-card-text>
                  <div
                    class="pa-2"
                    v-if="propertyDetail.contact_number != NULL"
                  >
                    <a
                      v-for="ph in propertyDetail.contact_number.split(',')"
                      :href="`tel:${ph}`"
                      style="color: black; text-decoration: none"
                    >
                      {{ ph }} <br />
                    </a>
                  </div>
                  <div v-else>
                    <div class="pa-2" v-if="propertyDetail.user_info_id == 0">
                      <a
                        v-for="ph in tatnaywon.phone.split(',')"
                        :href="`tel:${ph}`"
                        style="color: black; text-decoration: none"
                      >
                        {{ ph }} <br />
                      </a>
                    </div>
                    <div class="pa-2" v-else>
                      <a
                        v-for="ph in propertyDetail.phone.split(',')"
                        :href="`tel:${ph}`"
                        style="color: black; text-decoration: none"
                      >
                        {{ ph }} <br />
                      </a>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>

          <v-btn
            fab
            dark
            small
            color="gray"
            @click="share(propertyDetail.sale_id)"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>

          <v-btn fab dark small color="red" @click="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
    </v-card>
  </div>
</template>

<script>
import { HTTP } from "@/use/http-common";
import Loader from "@/components/Loader";
import { APP_BASE_URL } from "@/use/image-url";
import AgentRequestInquiry from "@/components/AgentRequestInquiry";

export default {
  name: "PropertyDetail",

  components: {
    Loader,
    AgentRequestInquiry,
  },

  data() {
    return {
      setLanguage: false,
      isLoad: true,
      propertyDetail: {},
      propertyPhotos: [],
      tatnaywon: {},
      APP_BASE_URL: APP_BASE_URL,

      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",

      tnwuserdatastore: {},
      loggedIn: false,
      success: "",
      error: "",
    };
  },

  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },

  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
      if (direction) {
        if (direction === "Right") {
          this.$router.go(-1);
        }
      }
    },

    AddFavorites: function (id) {
      if (this.loggedIn) {
        var userId = this.tnwuserdatastore.user_id;
        HTTP.get(`favorites/addfavorites/${id}/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              this.success = "အနှစ်သက်ဆုံးစာရင်းထဲသို့ ထည့်သွင်းပြီးပါပြီ";
            }
          })
          .catch((e) => {
            this.error =
              "အနှစ်သက်ဆုံးစာရင်းထဲသို့ ထည့်ရန် သင့် Account သို့ Login ဝင်ရောက်ရန် လိုအပ်သည်";
          });
      } else {
        this.error =
          "အနှစ်သက်ဆုံးစာရင်းထဲသို့ ထည့်ရန် သင့် Account သို့ Login ဝင်ရောက်ရန် လိုအပ်သည်";
      }
    },

    share(id) {
      navigator
        .share({
          title: "tatnaywonproperty.com",
          url: APP_BASE_URL + "propertydetail/index/" + id,
        })
        .then((_) => console.log("Yay, you shared it :)"))
        .catch((error) =>
          console.log("Oh noh! You couldn't share it! :'(\n", error)
        );
    },
  },

  created() {
    HTTP.get(`property/detail/${this.$route.params.id}`)
      .then((response) => {
        this.propertyDetail = response.data.data;
        this.propertyPhotos.push(...response.data.photo);
        this.tatnaywon = response.data.tatnaywon;
        this.isLoad = false;
      })
      .catch((e) => {
        this.isLoad = true;
      });

    let tnwuserstore = localStorage.getItem("tnwuserstore");
    this.tnwuserdatastore = JSON.parse(tnwuserstore);

    let auth = localStorage.getItem("tnwauth");
    if (auth) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    let language = localStorage.getItem("language");
    if (language) {
      this.setLanguage = true;
    } else {
      this.setLanguage = false;
    }
  },
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
