<template>
  <v-card class="v-card-body" elevation="0" color="transparent" :tile="true">
    <n-link :to="`curso/${slug}`">
      <v-img :src="image" />
    </n-link>
    <div class="media-and-footer-container">
      <n-link :to="`curso/${slug}`" class="footer-container">
        <v-card-title :to="'/curso/' + slug">{{title}}</v-card-title>
        <div class="footer-card">
          <v-card-subtitle class="mt-0" :to="'/curso/' + slug">{{teacher}}</v-card-subtitle>
          <img src="~/assets/share.svg" width="24px" height="24px" v-on:click.stop.prevent="shareInSocialMedia($event, title, image)"/>
        </div>
      </n-link>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'courseCard',
  props: ['title', 'description', 'image', 'teacher', 'slug'],
  methods: {
    onSuccess (result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    },
    onError (msg) {
      console.log("Sharing failed with message: " + msg);
    },
    shareInSocialMedia(event, title, image) {
      console.log(event)
      event.stopPropagation();
      event.preventDefault();
      console.log(title);
      // const options = {
      //   message: 'share this', // not supported on some apps (Facebook, Instagram)
      //   subject: 'the subject', // fi. for email
      //   files: ['', ''], // an array of filenames either locally or remotely
      //   url: 'https://www.website.com/foo/#bar?a=b',
      //   chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      //   appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
      //   iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
      // };
      console.log(window.plugins.socialsharing.share('Hello World.'));
      // console.log(socialsharing)
      console.log(window.socialsharing)
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

/* .footer-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 20px;
  justify-content: space-between;
} */

/* .media-container {
  flex: 0 0 auto;
} */

/* .media-and-footer-container {
  display: flex;
  flex-direction: row;
} */

.footer-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.v-responsive.v-image {
  padding-top: 45%;
  height: 150px;
  position: relative;
  width: 100%;
  border-radius: 5px;
}

/* .v-responsive__sizer {
  padding: 0;
} */

/* .v-image__image {
  background: url('http://i.imgur.com/SrPdUD4.png') 50% 50% no-repeat;
  background-color: #000;
  position: absolute;
  width: 100%;
  height: 100%;
} */

.v-card-body {
  margin-bottom: 20px;
}

.v-card__title {
  font-weight: 700;
  font-size: .75rem;
  padding: 8px 0 0;
  line-height: 16px;
  color: #1a1a1a;
}

.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 10px;
  line-height: 11.72px;
}
</style>
