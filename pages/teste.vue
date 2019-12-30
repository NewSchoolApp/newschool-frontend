<template>
  <div>
    <!--
      quote: só para facebook.
      hashtags: só para twitter e facebook, o facebook só usa a primeira
     -->
    <ShareBtn
      url="https://newschool.com"
      title="NewSchool"
      description="Essa é a newschool"
      quote="Aprendizado pra geral"
      hashtags="newschool,legal"
      twitterUser="jonathanpauluze"
      media="seila"
    />
  </div>
</template>

<script>
import ShareBtn from '@/components/ShareBtn';
export default {
  components: {
    ShareBtn
  }
}
</script>

<style>

</style>
