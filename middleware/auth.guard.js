import { PRIVATE_MODULES_URL } from "~/routes/private";
import { HYBRID_ROUTES } from "~/routes/private";

/**
 * @author Guilherme
 * @feature Andrews: Implementação com verificação no user store
 */

/**
 * Verificação e validação de acesso a rotas
 * @param {*} route estado de rota da aplicação
 */
export default async function ({ route, store, redirect }) {
  const pathModule = route.path.split("/");

  if (route.pathFull !== "/loading" && !HYBRID_ROUTES.includes(route.name)) {

    if (
      pathModule[1] === PRIVATE_MODULES_URL.STUDENT ||
      pathModule[1] === PRIVATE_MODULES_URL.ADMIN
    ) {
      const { validRole, session } = await store.dispatch(
        "user/validateSession",
        pathModule[1]
      );
      if (!session) {
        redirect(`/loading/${route.name}`);
      } else if (!validRole) {
        redirect(`/login`);
      }
    }
  }
}
