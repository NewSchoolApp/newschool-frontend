(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1010:function(t,e,n){"use strict";n.r(e);n(740),n(18),n(19),n(5),n(14),n(8);var r=n(3),o=n(109),c=n(25),l=(n(33),{data:function(){return{status:!0,loading:!0,showPass:!1,title:"Entrar",email:"",emailRules:[function(t){return!!t||"Digite o e-mail"},function(t){return/.+@.+\..+/.test(t)||"E-mail inválido"}],password:"",passwordRules:[function(t){return!!t||"Digite a senha"},function(t){return t&&t.length>=6||"A senha deve ter no mínimo 6 caracteres"}]}},mounted:function(){this.loginSocialReturn()},methods:{loadClientCredentials:function(){return c.a.getExternalCredentials()},googleLogin:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=new t.$fireModule.auth.GoogleAuthProvider,t.$fireModule.auth().signInWithPopup(n).then((function(e){var n=e.additionalUserInfo.profile,c={name:n.name,email:"a"+n.email,password:n.id,profile:"OTHERS",schooling:"",institutionName:"",role:"STUDENT"};t.loadClientCredentials().then(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.data.accessToken,t.next=3,o.a.signUp(c,n,null);case 3:t.sent;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 2:case"end":return e.stop()}}),e)})))()},submit:function(){var t=this;event.preventDefault(),this.$refs.form.validate()?(this.animateForm(!0),o.a.login(this.email,this.password).then((function(){$nuxt._router.push("/loading/login")})).catch((function(e){console.log("Login err:",e),t.$notifier.showMessage({type:"error",message:"Usuário ou senha incorretos!"}),t.loading=!1}))):this.animateForm(!1)},head:function(){return{title:this.title}},animateForm:function(t){var e=this;t?(this.$refs.flex.classList.add("hide-form"),document.querySelector("html").style.overflow="hidden",setTimeout((function(){e.loading=!0}),300)):(this.$refs.flex.classList.add("error-form"),setTimeout((function(){e.$refs.flex.classList.remove("error-form")}),500))},loginSocialReturn:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$auth.loggedIn){e.next=3;break}return t.loading=!1,e.abrupt("return");case 3:if(n=t.$auth.strategy.name,e.prev=4,"facebook"!==n){e.next=11;break}return r=t.getFacebookCredentials(),e.next=9,o.a.loginFacebook(r);case 9:e.next=15;break;case 11:if("google"!==n){e.next=15;break}return c=t.getGoogleCredentials(),e.next=15,o.a.loginGoogle(c);case 15:$nuxt._router.push("/loading/login"),e.next=23;break;case 18:e.prev=18,e.t0=e.catch(4),t.loading=!1,console.log("Social login return err:",err),t.$notifier.showMessage({type:"error",message:"Falha ao tentar entrar com "+n+"."});case 23:case"end":return e.stop()}}),e,null,[[4,18]])})))()},loginSocial:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!window.hasOwnProperty("cordova")){n.next=16;break}return console.log("You're on a mobile device"),n.prev=2,n.next=5,o.a.nativeFacebookLogin();case 5:return r=n.sent,n.next=8,o.a.loginFacebook(r);case 8:$nuxt._router.push("/loading/login"),n.next=15;break;case 11:n.prev=11,n.t0=n.catch(2),console.log("Social login err:",err),e.$notifier.showMessage();case 15:return n.abrupt("return");case 16:e.loading=!0,e.$auth.loginWith(t);case 18:case"end":return n.stop()}}),n,null,[[2,11]])})))()},getFacebookCredentials:function(){return{id:this.$store.state.auth.user.id,email:this.$store.state.auth.user.email,name:this.$store.state.auth.user.name,birthday:this.$store.state.auth.user.birthday}},getGoogleCredentials:function(){return{email:this.$store.state.auth.user.email,email_verified:this.$store.state.auth.user.email_verified.toString(),family_name:this.$store.state.auth.user.family_name,given_name:this.$store.state.auth.user.given_name,locale:this.$store.state.auth.user.locale,name:this.$store.state.auth.user.name,picture:this.$store.state.auth.user.picture,sub:this.$store.state.auth.user.sub}}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:"Entre no aplicativo da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro."}]}}}),d=(n(741),n(39)),f=n(743),m=n(43),v=n.n(m),h=n(289),k=n(320),w=n(321),x=n(332),y=n(337),_=n(288),$=n(322),C=n(129),R=n(294),E=n(331),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("div",{staticClass:"bg"}),t._v(" "),t.loading?r("div",[r("div",{staticClass:"container-spinner"},[r("v-progress-circular",{attrs:{size:70,width:5,indeterminate:"",color:"#fff"}})],1)]):r("v-flex",{ref:"flex",attrs:{role:"main",xs10:"",sm8:"",md4:""}},[r("div",{staticClass:"bg-symbol"},[r("img",{attrs:{src:n(564),alt:"New Schoool logo"}})]),t._v(" "),r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12"}}),t._v(" "),r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{dark:"",color:"#fff",rules:t.emailRules,label:"Email","data-vv-name":"email",required:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit()}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),r("v-text-field",{attrs:{dark:"",color:"#fff",rules:t.passwordRules,label:"Senha","data-vv-name":"password",type:t.showPass?"text":"password","append-icon":t.showPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return t.showPass=!t.showPass},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit()}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"btn-block btn-primary btn-white",on:{click:t.submit}},[t._v("\n              Entrar\n            ")])],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"btn-block btn-transparent",attrs:{to:"/cadastro"}},[t._v("\n            Cadastrar\n          ")])],1),t._v(" "),r("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[r("v-btn",{attrs:{text:"",color:"white"},on:{click:function(e){return t.loginSocial("facebook")}}},[r("v-icon",{attrs:{dark:"",left:""}},[t._v("mdi-facebook")]),t._v("Entrar com Facebook\n          ")],1)],1),t._v(" "),r("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[r("v-btn",{attrs:{text:"",small:"",color:"#fff",to:"/esqueci-minha-senha"}},[t._v("Esqueceu sua senha?")])],1)],1)],1)],1)],1)}),[],!1,null,"3d29102c",null);"function"==typeof f.default&&Object(f.default)(component);e.default=component.exports;v()(component,{VBtn:h.a,VCol:k.a,VContainer:w.a,VFlex:x.a,VForm:y.a,VIcon:_.a,VLayout:$.a,VProgressCircular:C.a,VRow:R.a,VTextField:E.a})},548:function(t,e,n){t.exports=n.p+"img/3c8a959.png"},564:function(t,e,n){t.exports=n.p+"img/4fd7b31.svg"},565:function(t,e,n){var content=n(742);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("a1415c1c",content,!0,{sourceMap:!1})},566:function(t,e){},741:function(t,e,n){"use strict";var r=n(565);n.n(r).a},742:function(t,e,n){var r=n(28),o=n(347),c=n(548);e=r(!1);var l=o(c);e.push([t.i,".bg[data-v-3d29102c]{width:100%;height:100%;position:fixed;top:0;background:url("+l+");background-size:cover;background-position:50%}.v-card__title[data-v-3d29102c]{-webkit-box-pack:center;justify-content:center}.v-form[data-v-3d29102c]{width:100%}.container-spinner[data-v-3d29102c],.flex[data-v-3d29102c]{z-index:2}.flex[data-v-3d29102c]{-webkit-animation:intro .3s backwards;animation:intro .3s backwards;-webkit-animation-delay:.35s;animation-delay:.35s}.layout[data-v-3d29102c]{background:#60c!important}.bg-symbol[data-v-3d29102c]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.bg-symbol img[data-v-3d29102c]{width:40%}.hide-form[data-v-3d29102c]{-webkit-animation:down .3s forwards;animation:down .3s forwards}.error-form[data-v-3d29102c]{-webkit-animation:nono .3s,intro paused;animation:nono .3s,intro paused}.theme--light.v-text-field>.v-input__control>.v-input__slot[data-v-3d29102c]:before{border-color:#c58aff}.theme--light.v-input:not(.v-input--is-disabled) input[data-v-3d29102c],.theme--light.v-input:not(.v-input--is-disabled) textarea[data-v-3d29102c],.theme--light.v-label[data-v-3d29102c]{color:#c58aff}[data-v-3d29102c] .v-card__title+.v-card__text{text-align:center}[data-v-3d29102c] .v-input input{color:#fff!important}[data-v-3d29102c] .v-label{font-weight:500!important;color:hsla(0,0%,100%,.7)!important}.v-text-field[data-v-3d29102c]{border-color:hsla(0,0%,100%,.7)!important}[data-v-3d29102c] input:-webkit-autofill{-webkit-transition:background-color 9999s ease-in-out 0s;transition:background-color 9999s ease-in-out 0s;-webkit-text-fill-color:#fff!important}",""]),t.exports=e},743:function(t,e,n){"use strict";var r=n(566),o=n.n(r);e.default=o.a}}]);