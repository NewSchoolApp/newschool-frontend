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

  const pathModule = route.path.split("/")

  if (pathModule[1] == PRIVATE_MODULES_URL.STUDENT || pathModule[1] == PRIVATE_MODULES_URL.ADMIN) {
    let session = await store.dispatch("user/validateSession", pathModule[1])
    if (!session) {
      redirect("/loading")
    }
    // Sessão válida ? redirecionando para home
    if (pathModule[1] == "login") {
      redirect(`${store.getters.roleModule}/home`)
    }
  }
}


