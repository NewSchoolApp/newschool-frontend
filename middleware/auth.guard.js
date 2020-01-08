import PRIVATE_MODULES_URL from "~/routes/private";
import auth from "../services/http/auth";

/**
 * @author Guilherme
 */

/**
 * Verificação e validação de acesso a rotas
 * @param {*} route estado de rota da aplicação 
 */
export default async function ({ route, store }) {

  const pathModule = route.path.split("/")[1]

  if (pathModule == PRIVATE_MODULES_URL.studant || pathModule == PRIVATE_MODULES_URL.admin) {
    let session = await store.dispatch("user.store/validateSession", pathModule)

    if (!session) {
      auth.isTokenValid()
    }
  }
}

