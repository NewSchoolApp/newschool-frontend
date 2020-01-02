import auth from '../services/http/auth'

export default function({ route }) {
  const pathParts = route.path.split('/')

  if (pathParts[1] === 'admin' || pathParts[1] === 'student') {
    auth.isTokenValid()
  }
}
