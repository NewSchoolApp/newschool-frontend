import PRIVATE_MODULES_URL from "~/routes/private";
/**
 * @author Andrews
 * Plugin observer route tem como função salvar primeira rota acessada
 * no momento da iniciação da instância do app, isso garante que ao carregar os dados a aplicação
 * volte para a rota acessada.
 */

export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    if (process.server) {
      const relativePath = to.path.split("/")[1];
      if (
        relativePath === PRIVATE_MODULES_URL.STUDENT ||
        relativePath === PRIVATE_MODULES_URL.ADMIN ||
        relativePath === "login"
      ) {
        store.dispatch("route/saveLastRouteAccess", to.path);
      }
    }
  });
};
