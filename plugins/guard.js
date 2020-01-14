import PRIVATE_MODULES_URL from "~/routes/private";
import auth from '~/services/http/auth'
/**
 * @author Andrews
 * Plugin guard route, verificação client-side.
 */

export default ({ app, store }) => {

    app.router.afterEach(async (to, from) => {
        console.log("to", to)
        console.log("from", from)
        if (!process.server) {
            if (to.path == PRIVATE_MODULES_URL.STUDENT || to.path == PRIVATE_MODULES_URL.ADMIN || to.path == "/login") {
                console.log(to.path)
                let session = await store.dispatch("user/validateSession", to.path)
                if (!session) {
                    const { status, token } = await auth.isTokenValid()
                    if (status) {
                        store.dispatch("user/loadInfoUser", { token, route: from.path })
                    } else {
                        localStorage.clear();
                        $nuxt._router.push('/login')
                    }
                }
            }

        }

    })
}