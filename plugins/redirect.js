import auth from "~/services/http/auth";
/**
 * @author Andrews
 * Plugin para verificar autenticidade da sessão, e redirecionamento
 * para o carregamento dos dados.
 */

export default ({ app, redirect }) => {
  app.router.afterEach((to, from) => {
    if (to.path === "/login") {
      const { status } = auth.isTokenValid();
      if (status) {
        // eslint-disable-next-line no-undef
        redirect("/loading/login");
      }
    }
  });
};
