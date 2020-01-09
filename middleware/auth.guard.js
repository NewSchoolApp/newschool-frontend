import PRIVATE_MODULES_URL from "~/routes/private";

/**
 * @author Guilherme
 * @feature Andrews: Implementação com verificação no user store
 */

/**
 * Verificação e validação de acesso a rotas
 * @param {*} route estado de rota da aplicação 
 */
export default async function ({ route, store, redirect }) {
  const pathModule = route.path.split("/")[1]

  if (pathModule == PRIVATE_MODULES_URL.studant || pathModule == PRIVATE_MODULES_URL.admin) {
    let session = await store.dispatch("user.store/validateSession", pathModule)
    if (!session) {
      redirect("/loading")
    }
  }
}


