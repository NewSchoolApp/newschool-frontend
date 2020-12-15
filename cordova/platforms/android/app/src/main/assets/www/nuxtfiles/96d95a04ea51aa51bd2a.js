(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1033:function(t,e,n){"use strict";n.r(e);n(8);var o=n(3),r=n(44),c=n(302),l=n(305),d={components:{HeaderBar:c.a,NavigationBar:l.a},data:function(){return{title:"Gerenciar meus cursos",sendCourse:!1,status:!0,loading:!1,snackbar:!1,snackbarText:"",snackbarStatus:"",rules:[function(t){return!!t||"Obrigatório"}]}},head:function(){return{title:this.title}},methods:{submit:function(){var t=this;this.$refs.form.validate()?(this.course.authorId="null",r.a.put("/api/v2/course",this.course.id,this.course).then((function(e){t.loading=!1,t.sendCourse=!0,t.confirmSnackbar("Curso salvo!","success"),t.$store.commit("courses/setCurrent",e.data),t.gotoAddClass(e.data.id)})).catch((function(e){t.confirmSnackbar("Ocorreu um erro ao cadastrar o curso.","error"),setTimeout((function(){t.loading=!1}),500),console.error(e)}))):this.animateForm(!1)},animateForm:function(t){var e=this;t?(this.$refs.flex.classList.add("hide-form"),document.querySelector("html").style.overflow="hidden",setTimeout((function(){e.loading=!0}),300)):(this.$refs.flex.classList.add("error-form"),setTimeout((function(){e.$refs.flex.classList.remove("error-form")}),500)),document.querySelector("html").style.overflow="scroll"},gotoAddClass:function(t){this.sendCourse?$nuxt._router.push("/admin/course/".concat(t,"/lesson/new")):this.confirmSnackbar("Você precisa salvar o curso antes de adicionar uma aula","error")},confirmSnackbar:function(text,t){this.snackbarText=text,this.snackbarStatus=t,this.snackbar=!0}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.store,t.data,n=t.params,e.next=3,r.a.getById("/api/v2/course",n.id);case 3:return o=e.sent,e.next=6,r.a.getById("/api/v2/lesson/course",n.id);case 6:return c=e.sent,e.abrupt("return",{course:o.data,lessons:c.data});case 8:case"end":return e.stop()}}),e)})))()}},m=(n(937),n(39)),f=n(939),v=n(43),h=n.n(v),x=n(289),k=n(320),w=n(321),_=n(332),y=n(337),C=n(322),O=n(294),j=n(974),$=n(331),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"page"}},[n("HeaderBar",{attrs:{title:"Gerenciar Meus Cursos","back-page":!0}}),t._v(" "),n("v-layout",{attrs:{"align-center":"","justify-center":""}},[n("v-flex",{staticStyle:{"text-align":"-webkit-left"},attrs:{xs10:"",sm8:"",md4:""}},[n("v-container",[n("v-row",[n("v-col",[n("h3",[t._v("Curso")]),t._v(" "),n("v-form",{ref:"form",attrs:{"lazy-validation":""}},[n("v-text-field",{attrs:{rules:t.rules,label:"Título *",name:"title",required:""},model:{value:t.course.title,callback:function(e){t.$set(t.course,"title",e)},expression:"course.title"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.rules,label:"Descrição *",name:"description",required:""},model:{value:t.course.description,callback:function(e){t.$set(t.course,"description",e)},expression:"course.description"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.rules,label:"Professor *",name:"authorName",required:""},model:{value:t.course.authorName,callback:function(e){t.$set(t.course,"authorName",e)},expression:"course.authorName"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.rules,label:"Biografia do Professor *",name:"authorDescription",required:""},model:{value:t.course.authorDescription,callback:function(e){t.$set(t.course,"authorDescription",e)},expression:"course.authorDescription"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.rules,type:"number",label:"Carga Horária *",name:"workload",required:""},model:{value:t.course.workload,callback:function(e){t.$set(t.course,"workload",e)},expression:"course.workload"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.rules,label:"URL da Imagem do Curso",name:"thumbUrl",required:""},model:{value:t.course.thumbUrl,callback:function(e){t.$set(t.course,"thumbUrl",e)},expression:"course.thumbUrl"}}),t._v(" "),n("resources-list",{attrs:{name:"Aula",resources:t.lessons,redirect:"true",path:"lesson"}}),t._v(" "),t.lessons.length?t._e():n("span",{staticClass:"new-lessons-span"},[t._v("Favor, adicionar uma aula")]),t._v(" "),n("v-btn",{staticClass:"btn-block btn-primary",on:{click:t.submit}},[t._v("\n                Salvar\n              ")])],1)],1)],1)],1)],1),t._v(" "),n("v-snackbar",{attrs:{color:t.snackbarStatus,timeout:5e3,top:!0,right:!0},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n          "+t._s(t.snackbarText)+"\n          "),n("v-btn",{attrs:{color:"#FFF",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("Fechar")])],1),t._v(" "),n("client-only",[n("navigation-bar")],1)],1)],1)}),[],!1,null,"90113dee",null);"function"==typeof f.default&&Object(f.default)(component);e.default=component.exports;h()(component,{VBtn:x.a,VCol:k.a,VContainer:w.a,VFlex:_.a,VForm:y.a,VLayout:C.a,VRow:O.a,VSnackbar:j.a,VTextField:$.a})},296:function(t,e,n){var content=n(304);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("79745966",content,!0,{sourceMap:!1})},298:function(t,e,n){var content=n(307);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("3e471d94",content,!0,{sourceMap:!1})},299:function(t,e,n){var content=n(309);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("f0f029ce",content,!0,{sourceMap:!1})},302:function(t,e,n){"use strict";var o={props:["title","backPage","route"],methods:{comeBackPage:function(){this.route?this.$router.push(this.route):this.$router.back()}}},r=(n(303),n(39)),c=n(43),l=n.n(c),d=n(289),m=n(288),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"head__bar"}},[e("v-btn",{staticClass:"btn-back",attrs:{text:"",icon:""},on:{click:this.comeBackPage}},[e("v-icon",[this._v("mdi-arrow-left")])],1),this._v(" "),e("h1",{staticClass:"h1__theme"},[this._v(this._s(this.title))])],1)}),[],!1,null,"7719e329",null);e.a=component.exports;l()(component,{VBtn:d.a,VIcon:m.a})},303:function(t,e,n){"use strict";var o=n(296);n.n(o).a},304:function(t,e,n){(e=n(28)(!1)).push([t.i,"*[data-v-7719e329]{font-family:Roboto,sans-serif}.h1__theme[data-v-7719e329]{font-size:1rem;line-height:1.2;font-weight:900;text-align:center;padding:0 2.5rem!important}#head__bar[data-v-7719e329]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;padding:1.5rem 0;position:relative;-webkit-box-align:center;align-items:center;background:transparent}[data-v-7719e329] .btn-back .theme--light.v-icon{color:var(--primary);font-size:35px}[data-v-7719e329] .btn-back{position:absolute;left:1rem}",""]),t.exports=e},305:function(t,e,n){"use strict";n(189),n(23),n(11),n(7),n(13),n(36),n(5);var o=n(4),r=n(311),c=n.n(r),l=n(110),d=n(109);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={data:function(){return{menu:[{id:1,label:"Meu Perfil",icon:"mdi-account",link:"/aluno/perfil"},{id:2,label:"Meus Cursos",icon:"mdi-library",link:"/aluno/meus-cursos"},{id:3,label:"Meus Certificados",icon:"mdi-school",link:"/aluno/certificados"},{id:4,label:"Ranking",icon:"mdi-trophy",link:"/aluno/ranking"},{id:5,label:"O que é a new school?",icon:"mdi-library-books",link:"/sobre"},{id:6,label:"Cola com Nóix",icon:"mdi-gesture-double-tap",link:"/contribua"},{id:7,label:"Apoie a new school",icon:"mdi-volume-high",link:"/construindo"},{id:8,label:"Fale com a gente",icon:"mdi-phone-message-outline",link:"/contato"}]}},methods:f(f({},Object(l.b)("user",["clearInfoUser"])),{},{closeMenu:function(){document.getElementById("menu-btn").click()},logout:function(){var t=this;this.logoutSocial().then((function(){$nuxt._router.push("/login"),localStorage.clear(),t.clearInfoUser()}))},pushAdminOnlyOptions:function(){"ADMIN"===this.$store.state.user.data.role&&(this.menu[1].link="/admin/listar-cursos",this.menu.push({id:9,label:"Dashboard",icon:"mdi-chart-bar",link:"/admin/dashboard"}))},logoutSocial:function(){return this.$auth.loggedIn?this.$auth.logout():Promise.resolve()}}),computed:{user:function(){return this.$store.state.user.data}},mounted:function(){d.a.isTokenValid().status&&(this.auth=!0,this.pushAdminOnlyOptions())},filters:{simplifyName:function(t){if(!t)return"";return t.split(" ").length>2?/^(\S*\s+\S+).*/.exec(t)[1]:t}},components:{Avatar:c.a}},h=(n(306),n(39)),x=n(43),k=n.n(x),w=n(289),_=n(288),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-page",attrs:{id:"page"}},[n("main",[n("section",{attrs:{id:"info"}},[n("div",{attrs:{id:"avatar"}},[n("div",{staticClass:"flex-center border-profile-photo"},[n("div",{staticClass:"flex-center profile-container"},[t.user.photo?n("img",{attrs:{src:t.user.photo}}):n("avatar",{attrs:{username:t._f("simplifyName")(t.user.name),size:90}})],1)])]),t._v(" "),n("div",{staticClass:"flex-center",attrs:{id:"flex-info-user"}},[n("h1",[t._v(t._s(t.user.name))]),t._v(" "),n("p",[t._v(t._s(t.user.type))]),t._v(" "),n("v-btn",{attrs:{id:"btnLogout",small:"",outlined:"",color:"error",width:"80px"},on:{click:t.logout}},[t._v("Sair")])],1),t._v(" "),n("div",{attrs:{id:"close"}},[n("v-icon",{attrs:{id:"close-btn",color:"primary"},on:{click:function(e){return t.closeMenu()}}},[t._v("mdi-close-circle")])],1)])]),t._v(" "),n("section",{staticClass:"menu-list"},t._l(t.menu,(function(e){return n("router-link",{key:e.id,staticClass:"item-menu",attrs:{tag:"div",to:e.link},nativeOn:{click:function(e){return t.closeMenu()}}},[n("div",[n("v-icon",{attrs:{color:"primary"}},[t._v(t._s(e.icon))])],1),t._v(" "),n("p",{staticClass:"text-menu"},[t._v(t._s(e.label))])])})),1)])}),[],!1,null,"373fe020",null),y=component.exports;k()(component,{VBtn:w.a,VIcon:_.a});var C={components:{SideMenu:y},data:function(){return{viewMenu:!1,auth:!1,menu:[{id:1,name:"Início",icon:"mdi-home-outline",link:"/aluno/home"},{id:2,name:"Perfil",icon:"mdi-account-outline",link:"/aluno/perfil"},{id:3,name:"Meus Cursos",icon:"mdi-library",link:"/aluno/meus-cursos"},{id:4,name:"Certificados",icon:"mdi-school-outline",link:"/aluno/certificados",class:""}]}},mounted:function(){d.a.isTokenValid().status&&(this.auth=!0,this.changeRoutingIfAdmin())},methods:{setViewMenu:function(){this.viewMenu=!this.viewMenu},changeRoutingIfAdmin:function(){"ADMIN"===this.$store.state.user.data.role&&(this.menu[0].link="/admin/home",this.menu[1].link="/admin/perfil",this.menu[2].link="/admin/listar-cursos",this.menu[3].link="/admin/certificados")}}},O=(n(308),n(1040)),j=Object(h.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.auth?n("div",[n("side-menu",{directives:[{name:"show",rawName:"v-show",value:t.viewMenu,expression:"viewMenu"}],staticClass:"intro-transition"}),t._v(" "),n("v-bottom-navigation",{attrs:{"scroll-target":"#page",fixed:"","scroll-threshold":"500",color:"write",horizontal:""}},[t._l(t.menu,(function(e){return n("v-btn",{key:e.id,staticClass:"btn-fixed menu__bottom",class:e.class,attrs:{to:e.link},on:{click:function(e){t.viewMenu=!1}}},[n("span",[t._v(t._s(e.name))]),t._v(" "),n("v-icon",[t._v(t._s(e.icon))])],1)})),t._v(" "),n("v-btn",{staticClass:"btn-fixed",attrs:{id:"menu-btn"},on:{click:t.setViewMenu}},[n("span",[t._v("Outros")]),t._v(" "),n("v-icon",[t._v("mdi-apps")])],1)],2)],1):t._e()}),[],!1,null,"7d2ee64a",null);e.a=j.exports;k()(j,{VBottomNavigation:O.a,VBtn:w.a,VIcon:_.a})},306:function(t,e,n){"use strict";var o=n(298);n.n(o).a},307:function(t,e,n){(e=n(28)(!1)).push([t.i,".container-page[data-v-373fe020]{z-index:2}#btnLogout[data-v-373fe020]{margin-top:5px}.mdi-close-circle[data-v-373fe020]:before{color:var(--primary);position:absolute;right:22px;top:33px}.container-page>main[data-v-373fe020]{-webkit-box-pack:justify;justify-content:space-between;padding:.5rem;margin-top:1rem;width:100%}#info[data-v-373fe020],.container-page>main[data-v-373fe020]{display:-webkit-box;display:flex}#avatar[data-v-373fe020]{margin-right:1rem}.text-menu[data-v-373fe020]{text-transform:uppercase}.mdi-library-books[data-v-373fe020]:before{content:url(https://api.iconify.design/mdi-library-books.svg?color=rgb%28105%2C0%2C204%29&height=24);vertical-align:-.125em}h1[data-v-373fe020]{font-size:1rem;font-weight:500;color:#000;text-transform:capitalize}.menu-list[data-v-373fe020]{max-width:500px}.container-page[data-v-373fe020]{background-color:#fff;position:fixed;width:100%;height:100%;top:0;left:0}.row[data-v-373fe020]{margin-left:0}#close-btn[data-v-373fe020]{cursor:pointer;font-size:30px}#flex-info-user[data-v-373fe020]{-webkit-box-pack:start;justify-content:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:baseline;align-items:baseline}.flex-center[data-v-373fe020]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.border-profile-photo[data-v-373fe020]{height:95px;width:95px;border:1px solid #60c;border-radius:50px}.profile-container[data-v-373fe020]{width:85px;height:85px;border-radius:50px;overflow:hidden}.profile-container img[data-v-373fe020]{width:100%}.item-menu[data-v-373fe020]{width:100%;padding:13px;border-bottom:1px solid #e8e8e8;-webkit-box-align:center;align-items:center;color:var(--primary)!important;cursor:pointer}.item-menu[data-v-373fe020],.item-menu div[data-v-373fe020]{display:-webkit-box;display:flex}.item-menu div[data-v-373fe020]{width:50px;-webkit-box-pack:center;justify-content:center;margin-right:2rem}.item-menu[data-v-373fe020]:hover{background-color:#e8d1ff}.col-flex-center[data-v-373fe020]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:baseline;align-items:baseline}p[data-v-373fe020]{margin-bottom:0!important}h4[data-v-373fe020]{font-weight:600}@media(min-width:600px){#info[data-v-373fe020],.menu-list[data-v-373fe020]{margin:0 auto}}",""]),t.exports=e},308:function(t,e,n){"use strict";var o=n(299);n.n(o).a},309:function(t,e,n){(e=n(28)(!1)).push([t.i,"[data-v-7d2ee64a] .v-item-group.v-bottom-navigation--horizontal .v-btn>.v-btn__content{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.v-icon[data-v-7d2ee64a]{margin-right:0!important;padding-top:5px}#page[data-v-7d2ee64a]{margin-bottom:5rem!important}.btn-fixed[data-v-7d2ee64a]{height:100%!important}.intro-transition[data-v-7d2ee64a]{-webkit-animation-name:intro;animation-name:intro;-webkit-animation-duration:.2s;animation-duration:.2s}[data-v-7d2ee64a] .v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content{color:var(--primary)}.mdi-library[data-v-7d2ee64a]:before{content:url(https://api.iconify.design/ic:outline-local-library.svg?color=rgb%28112%2C112%2C112%29&height=24);vertical-align:-.125em}[data-v-7d2ee64a] .v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content .mdi-library:before{content:url(https://api.iconify.design/ic:outline-local-library.svg?color=rgb%28102%2C0%2C204%29&height=24);vertical-align:-.125em}span[data-v-7d2ee64a]{font-size:8px;font-weight:400;color:#737373;margin-top:5px}[data-v-7d2ee64a] .v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content span{color:var(--primary)}@media (max-width:375px){.v-btn[data-v-7d2ee64a]{min-width:55px!important;font-size:.6rem!important}}@media (max-width:415px){.v-btn[data-v-7d2ee64a]{font-size:.65rem!important}}.remove-certificates[data-v-7d2ee64a]{display:none}",""]),t.exports=e},649:function(t,e,n){var content=n(938);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("ad740d9c",content,!0,{sourceMap:!1})},650:function(t,e){},937:function(t,e,n){"use strict";var o=n(649);n.n(o).a},938:function(t,e,n){(e=n(28)(!1)).push([t.i,".v-input[data-v-90113dee]{width:90%;height:50px}.v-input input[data-v-90113dee]{color:none}[data-v-90113dee] .v-messages__message{text-align:right;margin-top:-.3em}",""]),t.exports=e},939:function(t,e,n){"use strict";var o=n(650),r=n.n(o);e.default=r.a}}]);