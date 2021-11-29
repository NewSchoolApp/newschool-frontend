<template>
  <div class="sections white--text">
    <h2 class="font-weight-medium mb-3">{{ title }}</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
      prev-icon="mdi-arrow-left"
      next-icon="mdi-arrow-right"
      hide-arrows
      light
      width="100%"
    >
      <v-slide-item
        v-for="course in courses"
        :key="course.id"
        v-slot:default="{ active, toggle }"
      >
        <v-hover v-slot:default="{ hover }">
          <CourseCard
            :course="course"
            :hover="true"
            :active="active"
            :toggle="toggle" />
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import CourseCard from "@/components/netflix/CourseCard.vue";

export default {
  components: {
    CourseCard
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    courses: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    model: null,
    showLoading: true,
  }),
  mounted() {
    this.showLoading = false;
  },
  methods: {},
};
</script>

<style scoped>
.v-img {
  object-fit: contain;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.sections {
  margin-top: 10px;
}

h1,
h2,
h3,
h4,
.font-weight-medium {
  color: var(--primary) !important;
}

::v-deep .theme--light.v-icon {
  color: #6600cc;
}
</style>
