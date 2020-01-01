<template>
  <div>
    <div id="page">
      <!-- HTML aqui! -->
      <p>course page</p>
    </div>
    <client-only>
      <navigation-bar />
    </client-only>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
import courses from '~/services/http/courses'

export default {
  mounted () {
    courses.getBySlug('hook-lint-jest')
      .then(({data}) => {
        const {id, authorId, description, slug, thumbUrl, title } = data;
        console.log('data: ', data)
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  },
  components: {
    NavigationBar
  }
}
</script>

<style>

</style>