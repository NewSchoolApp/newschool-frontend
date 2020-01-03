import PRIVATE_MODULES_URL from "~/routes/private"

/**
 * @author Andrews 
 */

/**
 * Verificação e validação de acesso a rotas
 * @param {*} route estado de rota da aplicação 
 */

export default function ({ route }) {
  if (route.path.includes(PRIVATE_MODULES_URL.studant) || route.path.includes(PRIVATE_MODULES_URL.admin)) {
    validateUser();
  } else {
    return true
  }
};

/**
 * 
 */
function validateUser() {

};

