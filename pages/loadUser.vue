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
