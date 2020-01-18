<template>
  <v-card class="v-card-body" elevation="0" color="transparent" :tile="true">
    <n-link :to="`/curso/${slug}`">
      <v-img :src="image" />
    </n-link>
    <div class="media-and-footer-container">
      <n-link :to="`/curso/${slug}`" class="footer-container">
        <v-card-title :to="'/curso/' + slug">{{title}}</v-card-title>
        <v-card-subtitle class="mt-0" :to="'/curso/' + slug">{{teacher}}</v-card-subtitle>
      </n-link>
      <share-btn
        class="media-container"
        :url="'/curso/' + slug"
        :title="title"
        :description="description"
      />
    </div>
  </v-card>
</template>

<script>
import ShareBtn from "@/components/ShareBtn";
export default {
  name: "courseCard",
  props: ["title", "description", "image", "teacher", "slug"],
  components: {
    ShareBtn
  }
};
</script>

<style scoped>
.footer-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.media-container {
  justify-content: flex-end;
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
}

.media-and-footer-container {
  display: flex;
  flex-direction: row;
  padding: 0.5em 0;
  height: 3.5rem;
}

.v-responsive.v-image {
  padding-top: 75%;
  height: 0;
  position: relative;
  width: 100%;
}

.v-responsive__sizer {
  padding: 0;
}

.v-image__image {
  background: url("http://i.imgur.com/SrPdUD4.png") 50% 50% no-repeat;
  background-color: #000;
  position: absolute;
  width: 100%;
  height: 100%;
}

@media screen and (orientation: landscape) {
  .v-image__image {
    background: url("http://i.imgur.com/SrPdUD4.png") no-repeat;
    position: absolute;
    width: 300px;
    height: 200px;
  }

  .v-card-body {
    margin-right: 2.5em;
  }

  .v-card-body div {
    cursor: pointer;
  }

  .v-responsive.v-image {
    height: 200px;
    width: 300px;
  }

  @media (min-width: 48em) {
    .v-card-body {
      margin-right: 0;
      padding-right: 1em;
      width: 50%;
    }

    .v-responsive.v-image {
      height: 250px;
      width: 350px;
    }

    .v-image__image {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 64em) {
    .v-card-body {
      width: 25%;
      padding-right: 3em;
    }
  }

  @media (min-width: 100em) {
    .v-card-body {
      width: 20%;
      padding-right: 3em;
    }
  }
}

@media screen and (min-width: 27.5em) and (orientation: portrait) {
  .v-card-body {
    width: 50%;
    padding-right: 1em;
  }
}

.v-card-body {
  margin-bottom: 1.5em;
  align-self: stretch;
}

.v-card__title {
  font-weight: 600;
  font-size: 1em;
  padding: 5px 0 0;
  line-height: 0.8em;
  color: #1a1a1a;
  margin-bottom: 0.7rem;
}

.theme--light.v-card .v-card__subtitle {
  padding: 0;
  color: #1a1a1a;
  font-weight: 300;
  font-size: 0.9em;
  line-height: 12px;
}
</style>