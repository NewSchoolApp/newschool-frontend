<router>
    {
        path : '/loading/:route',
        props: true
    }
</router>

<script>
import { mapActions } from 'vuex';
import auth from '~/services/http/auth';

export default {
  async mounted() {
    // Hack para SafeArea. Optei por manipular o DOM diretamente para
    // Não precisar modificar todas as telas
    if(window.cordova?.platformId == "ios") {
      const layout = document.getElementById("__layout");
      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", "__statusBarIos");
      newDiv.style.height = "32px";
      newDiv.style.width = "200vw";
      newDiv.style.position = "fixed";
      newDiv.style.top = "0";
      newDiv.style.left = "0";
      newDiv.style.zIndex = "10";
      newDiv.style.backgroundColor = "white";
      layout.parentNode.insertBefore(newDiv, layout);
      layout.style.paddingTop = "32px";
    }
    const { status, token } = await auth.isTokenValid();
    if (status) {
      this.loadInfoUser({ token, route: this.route });
    } else {
      localStorage.clear();
      // eslint-disable-next-line no-undef
      $nuxt._router.push('/login');
    }
  },
  methods: {
    ...mapActions('user', ['loadInfoUser']),
  },
  props: ['route'],
};
</script>
