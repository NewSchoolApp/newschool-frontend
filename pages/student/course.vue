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
import auth from '~/services/http/auth'
import courses from '~/services/http/courses'

export default {
  mounted () {
    auth.getExternalCredentials()
      .then(({ data: { accessToken } }) => courses.getBySlug('hook-lint-jest', accessToken))
      .then(data => {
        console.log('data: ', data);
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