(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{1026:function(t,e,n){"use strict";n.r(e);var o=n(44),c={computed:{user:function(){return this.$store.state.user.data},idUser:function(){return this.$store.state.user.data.id}},methods:{onSuccess:function(t){var e=this;o.a.post("/api/v1/gamefication/start-event",{event:"SHARE_APP",rule:{userId:this.idUser,platform:t.app}}).then((function(t){e.$notifier.showMessage({type:"success"}),$nuxt._router.push("/aluno/home")})).catch((function(){return e.$notifier.showMessage({type:"error"})}))},onError:function(t){alert("Sharing failed with message: "+t)},shareInSocialMedia:function(t,title,image){t.stopPropagation(),t.preventDefault();var e={message:"Vem colar com nois, aqui na New School!",subject:"Faça seu cadastro e vem aprender com a gente",url:"newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/cadastro/".concat(this.user.inviteKey),chooserTitle:"Compartilhe seu URL de convite"};window.plugins.socialsharing.shareWithOptions(e,this.onSuccess,this.onError)},goBack:function(){this.$router.back()}}},r=(n(897),n(39)),d=n(899),f=n(43),l=n.n(f),h=n(288),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"notification__content"},[o("div",{attrs:{id:"close"}},[o("v-icon",{attrs:{id:"close-btn",color:"primary"},on:{click:t.goBack}},[t._v("mdi-close-circle")])],1),t._v(" "),o("div",{staticClass:"bg__fire"}),t._v(" "),o("div",{staticClass:"notification"},[o("img",{staticClass:"notification__image",attrs:{src:n(613),alt:""}})]),t._v(" "),t._m(0),t._v(" "),o("div",{staticClass:"share__achievement"},[o("p",[t._v("Ganhe 1 NC cada vez que 3 amigos se cadastrarem na New School.")]),t._v(" "),o("div",{staticClass:"btn__container"},[o("button",{staticClass:"btn-block btn-primary",on:{click:function(e){return t.shareInSocialMedia(e,t.title,t.image)}}},[t._v("\n        COMPARTILHAR\n      ")])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"messages"},[e("h1",{staticClass:"message"},[this._v("\n      Ganhe pontos!\n    ")])])}],!1,null,"d3f622c2",null);"function"==typeof d.default&&Object(d.default)(component);e.default=component.exports;l()(component,{VIcon:h.a})},613:function(t,e,n){t.exports=n.p+"img/26ddc60.svg"},628:function(t,e,n){var content=n(898);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("76d6ff48",content,!0,{sourceMap:!1})},629:function(t,e){},897:function(t,e,n){"use strict";var o=n(628);n.n(o).a},898:function(t,e,n){(e=n(28)(!1)).push([t.i,"#close-btn[data-v-d3f622c2]{position:absolute;right:20px;top:50px;cursor:pointer;font-size:30px}.mdi-close-circle[data-v-d3f622c2]:before{color:var(--primary);width:20px;height:20px;z-index:9999999}.notification[data-v-d3f622c2]{width:193px;height:193px;margin:40% auto 10%}.messages[data-v-d3f622c2]{padding:0 2em}.message[data-v-d3f622c2]{font-size:20px;color:#1a1a1a;z-index:9999;margin-top:5%;font-weight:900;text-align:center}.share__achievement p[data-v-d3f622c2]{font-size:12px;text-align:center;margin-top:16px;font-size:16px;font-weight:400}.btn__container[data-v-d3f622c2]{text-align:center}.btn-block[data-v-d3f622c2]{width:90%;margin:15% auto;padding:5px auto;font-size:16px;font-weight:700}h3[data-v-d3f622c2]{font-weight:900;font-size:1em;line-height:normal;color:var(--primary)}h3[data-v-d3f622c2],h4[data-v-d3f622c2]{text-align:center}h4[data-v-d3f622c2]{font-weight:500;padding-top:1em;color:#656565;font-size:14px}.notification__image[data-v-d3f622c2]{position:absolute;left:-12px;top:10%;z-index:999;width:100%;max-height:280px}@media (min-width:480px){.notification__content[data-v-d3f622c2]{top:0;height:100vh}.messages[data-v-d3f622c2]{margin-top:-12%}.notification__image[data-v-d3f622c2]{top:10%}.btn-block[data-v-d3f622c2]{width:96%;padding:5px auto}#page[data-v-d3f622c2]{height:100vh;overflow:hidden}}",""]),t.exports=e},899:function(t,e,n){"use strict";var o=n(629),c=n.n(o);e.default=c.a}}]);