export default (ctx, inject) => {
    const { app } = ctx
  
    const cordovaApp = {
      // Application Constructor
      initialize() {
        document.addEventListener(
          'deviceready',
          this.onDeviceReady.bind(this),
          false
        )
      },
  
      // deviceready Event Handler
      //
      // Bind any cordova events here. Common events are:
      // 'pause', 'resume', etc.
      onDeviceReady() {
        /**
         * initialize all different stuff here:
         * e.g.
         *  - sentry
         *  - firebase
         *  - adjust
         *  - push notifications
         *  - fabric
         *  - custom url schema
         *  - facebook
         *  - universal links
         *  - google analytics
         *  - ...
         *
         *  context to "app" is avaialble, but beware only the app scope of a plugin (which means if any other plugin
         *  extends the app scope, it could be that it is not available yet)
         */    
        try {
          this.initStatusBar()
        } catch (err) {
          // console.error('status bar failed', err)
        }
  
        try {
          this.initWKWebView()
        } catch (err) {
          // console.error('init WKWebView failed', err)
        }
  
        try {
          this.initCustomUrlScheme()
        } catch (err) {}
      },
  
      initCustomUrlScheme() {
        window.handleOpenURL = url => {
          alert('DeepLink: ' + url)
        }
      },
  
      initStatusBar() {
        window.StatusBar.overlaysWebView(false)
        window.StatusBar.backgroundColorByHexString('#009896')
      },
  
      initWKWebView() {
        /* window.WkWebView.allowsBackForwardNavigationGestures(false)
        EventBus.$on('OpenInsidePages', count => {
          if (count > 0) {
            window.WkWebView.allowsBackForwardNavigationGestures(true)
          } else {
            window.WkWebView.allowsBackForwardNavigationGestures(false)
          }
        }) */
      },
    }
  
    cordovaApp.initialize()
  
    // patch redirect url for cordova - removes "formatUrl" call because it add "//" to the path
    app.context.redirect = (status, path, query) => {
      if (!status) {
        return
      }
  
      app.context._redirected = true
      // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })
      let pathType = typeof path
      if (
        typeof status !== 'number' &&
        (pathType === 'undefined' || pathType === 'object')
      ) {
        query = path || {}
        path = status
        pathType = typeof path
        status = 302
      }
      if (pathType === 'object') {
        path = app.router.resolve(path).href
      }
      // "/absolute/route", "./relative/route" or "../relative/route"
      if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
        app.context.next({
          path: path,
          query: query,
          status: status
        })
      } else {
        // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
  
        // path = formatUrl(path, query) removed
  
        window.location.replace(path)
      }
    }
  }