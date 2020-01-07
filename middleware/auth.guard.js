/**
 * @author Guilherme
 */
export default function ({ route }, {store}) {
  const pathParts = route.path.split('/')

  // if (pathParts[1] === 'admin' || pathParts[1] === 'aluno') {
    store.commit('validateSessionUser', route)
  // }
  return true
}
