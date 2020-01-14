import auth from "~/services/http/auth";
/**
 * @author Andrews
 * Plugin observer route tem como função salvar primeira rota acessada
 * no momento da iniciação da instância do app, isso garante que ao carregar os dados a aplicação
 * volte para a rota acessada.
 */

export default ({ app, store, redirect }) => {
  app.router.afterEach((to, from) => {
    if (!process.server && to.path === "/login") {
      const { status } = auth.isTokenValid();
      if (status) {
        // eslint-disable-next-line no-undef
        redirect("/loading");
      }
    }
  });
};
