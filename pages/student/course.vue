<template>
  <div v-if="loading">
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
  <not-found v-else-if="notFound" />
  <div v-else-if="!notFound">
    <div id="page">
      HTML aqui!
      <p>Course {{ course.title }}</p>
      <p>id: {{ course.id }}</p>
      <p>authorId: {{ course.authorId }}</p>
      <p>description: {{ course.description }}</p>
      <p>slug: {{ course.slug }}</p>
      <p>thumbUrl: {{ course.thumbUrl }}</p>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>


<router>
  {
    path : "aluno/curso"
    name : "aluno-curso"
  }
</router>

<script>
import NotFound from '../public/404.vue'
import NavigationBar from '~/components/NavigationBar.vue'
import courses from '~/services/http/courses'

export default {
  components: {
    NavigationBar,
    NotFound,
  },
  data() {
    return {
      loading: true,
      notFound: false,
      course: null,
    }
  },
  mounted() {
    const { slug } = this.$route.params
    courses
      .getBySlug(slug)
      .then(({ data }) => {
        const { id, authorId, description, slug, thumbUrl, title } = data
        this.course = { id, authorId, description, slug, thumbUrl, title }
        this.loading = false
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.notFound = true
          this.loading = false
          return
        }
        // eslint-disable-next-line no-console
        console.error(error)
      })
  },
}
</script>

<style scoped></style>
