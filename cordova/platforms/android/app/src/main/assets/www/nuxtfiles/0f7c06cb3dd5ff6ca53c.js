(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{587:function(e,t,o){var content=o(763);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(29).default)("5f70c137",content,!0,{sourceMap:!1})},588:function(e,t){},761:function(e,t,o){e.exports=o.p+"img/06c8dcd.svg"},762:function(e,t,o){"use strict";var n=o(587);o.n(n).a},763:function(e,t,o){(t=o(28)(!1)).push([e.i,".flex[data-v-f59c31ae]{-webkit-animation:intro .3s backwards;animation:intro .3s backwards;-webkit-animation-delay:.35s;animation-delay:.35s}.layout[data-v-f59c31ae]{background:#fff!important}.page-title[data-v-f59c31ae]{font-size:20px;font-weight:900;line-height:24px;text-transform:uppercase;color:var(--primary);width:100%}.logo-container[data-v-f59c31ae]{display:-webkit-box;display:flex;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:start;align-items:flex-start}.logo-container img[data-v-f59c31ae]{width:48px}.v-form[data-v-f59c31ae]{width:100%}[data-v-f59c31ae] .theme--light.v-icon{color:var(--primary)}[data-v-f59c31ae] .v-btn{margin-top:15px}[data-v-f59c31ae] .v-card__actions{padding:0}.v-list-item .v-list-item__subtitl[data-v-f59c31ae],[data-v-f59c31ae] .v-list-item .v-list-item__title{color:var(--primary);font-size:14px}[data-v-f59c31ae] .v-messages__message{color:#ff5252;font-size:14px;margin-left:5px}.login-link[data-v-f59c31ae]{font-size:14px;color:var(--primary)}.hide-form[data-v-f59c31ae]{-webkit-animation:down .3s forwards;animation:down .3s forwards}.error-form[data-v-f59c31ae]{-webkit-animation:nono .3s,intro paused;animation:nono .3s,intro paused}",""]),e.exports=t},764:function(e,t,o){"use strict";var n=o(588),r=o.n(n);t.default=r.a},977:function(e,t,o){"use strict";o.r(t);o(8);var n=o(3),r=o(109),c=o(25),l=o(32),f={data:function(){return{title:"Cadastro",status:!0,loading:!1,isLoading:!1,showPass:String,showConfirmPass:String,snackbar:!1,snackbarText:"",schools:[],snackbarStatus:"",profile:["Aluno","Ex-Aluno","Universitário","Pai","Investidor","Outros"],form:{name:"",email:"",password:"",profile:"",confirmPassword:"",schooling:"",institutionName:"",role:"STUDENT"},nameRules:[function(e){return!!e||"O campo não pode estar em branco"}],passwordRules:[function(e){return!!e||"Digite a senha"},function(e){return e&&e.length>=6||"A senha deve ter no mínimo 6 caractéres"}],emailRules:[function(e){return!!e||"Digite o e-mail"},function(e){return/.+@.+\..+/.test(e)||"E-mail inválido"}]}},computed:{confirmPasswordRules:function(){var e=this;return[function(e){return!!e||"Confirme a senha"},function(){return e.form.password===e.form.confirmPassword||"As senhas devem ser idênticas."}]}},methods:{submit:function(){var e=this;if(this.$refs.form.validate()){var t=Object.assign({},this.form),o=t.profile;t.profile={Aluno:"STUDENT","Ex-Aluno":"EX_STUDENT","Universitário":"UNIVERSITY",Pai:"FATHER",Investidor:"INVESTOR",Outros:"OTHERS"}[o];var n=this.$route.params.inviteKey?this.$route.params.inviteKey:null;delete t.confirmPassword,this.animateForm(!0),this.loadClientCredentials().then((function(o){var c=o.data.accessToken;r.a.signUp(t,c,n).then((function(t){e.loading=!1,e.confirmSnackbar("Cadastro efetuado! ;)","success"),setTimeout((function(){e.gotoLogin()}),2500)})).catch((function(t){setTimeout((function(){e.loading=!1}),500),console.error(t)}))})).catch((function(){$nuxt._router.push("/login")}))}else this.animateForm(!1)},searchTimeOut:function(e){var t=this;e?(this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout((function(){t.getSchool(e)}),800)):this.schools=[]},getSchool:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(e){o.next=3;break}return t.schools=[],o.abrupt("return");case 3:if(!t.isLoading){o.next=5;break}return o.abrupt("return");case 5:t.isLoading=!0,t.loadClientCredentials().then((function(o){var n=o.data.accessToken;l.a.get("".concat("api/v1/school","?name=").concat(e),{headers:{Authorization:"Bearer ".concat(n)}}).then((function(o){o.data.length||(t.isLoading=!1,t.schools.unshift(e.toUpperCase())),o.data.forEach((function(e){return t.schools.push(e.nome)})),t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))}));case 7:case"end":return o.stop()}}),o)})))()},animateForm:function(e){var t=this;e?(this.$refs.flex.classList.add("hide-form"),document.querySelector("html").style.overflow="hidden",setTimeout((function(){t.loading=!0}),300)):(this.$refs.flex.classList.add("error-form"),setTimeout((function(){t.$refs.flex.classList.remove("error-form")}),500)),document.querySelector("html").style.overflow="scroll"},showPassword:function(){"mdi-eye"===this.eyeIcon?this.eyeIcon="mdi-eye-off":this.eyeIcon="mdi-eye"},showConfirmPassword:function(){"mdi-eye"===this.eyeIcon2?this.eyeIcon2="mdi-eye-off":this.eyeIcon2="mdi-eye"},gotoLogin:function(){$nuxt._router.push("/login")},confirmSnackbar:function(text,e){this.snackbarText=text,this.snackbarStatus=e,this.snackbar=!0},loadClientCredentials:function(){return c.a.getExternalCredentials()}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:"Cadastra-se no aplicativo da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro."}]}}},d=(o(762),o(39)),m=o(764),h=o(43),v=o.n(h),w=o(589),x=o(288),k=o(381),y=o(315),C=o(322),_=o(326),T=o(318),P=o(129),S=o(294),E=o(526),L=o(340),R=o(334),component=Object(d.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{"align-center":"","justify-center":""}},[e.loading?n("v-progress-circular",{attrs:{size:70,width:5,indeterminate:""}}):n("v-flex",{ref:"flex",attrs:{xs10:"",sm8:"",md6:""}},[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"logo-container"},[n("img",{attrs:{src:o(761),alt:"castor"}})])])],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("h1",{staticClass:"page-title"},[e._v("Cadastro")])])],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[n("v-text-field",{attrs:{rules:e.nameRules,placeholder:"Digite seu nome",label:"Qual é o seu nome?",name:"name",required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),e._v(" "),n("v-text-field",{attrs:{placeholder:"Digite seu e-mail",rules:e.emailRules,label:"E o seu e-mail?",name:"email",required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),n("v-select",{attrs:{placeholder:"Selecione o seu perfil!",items:e.profile,label:"Qual é o seu perfil?",required:""},model:{value:e.form.profile,callback:function(t){e.$set(e.form,"profile",t)},expression:"form.profile"}}),e._v(" "),"Aluno"===this.form.profile?n("v-autocomplete",{attrs:{items:e.schools,"hide-no-data":"","hide-selected":"",loading:e.isLoading,placeholder:"Digite o nome da sua escola",label:"Onde estuda?"},on:{keyup:function(t){return e.searchTimeOut(t.target.value)}},model:{value:e.form.institutionName,callback:function(t){e.$set(e.form,"institutionName",t)},expression:"form.institutionName"}}):e._e(),e._v(" "),n("v-text-field",{attrs:{placeholder:"Digite sua senha",label:"Crie sua senha",name:"password",rules:e.passwordRules,type:e.showPass?"password":"text","append-icon":e.showPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return e.showPass=!e.showPass}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),n("v-text-field",{attrs:{placeholder:"Confirme sua senha",rules:e.confirmPasswordRules,type:e.showConfirmPass?"password":"text","append-icon":e.showConfirmPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return e.showConfirmPass=!e.showConfirmPass}},model:{value:e.form.confirmPassword,callback:function(t){e.$set(e.form,"confirmPassword",t)},expression:"form.confirmPassword"}}),e._v(" "),n("v-btn",{staticClass:"btn-block btn-primary",on:{click:e.submit}},[e._v("\n              Cadastrar\n            ")])],1)],1),e._v(" "),n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("a",{staticClass:"login-link",on:{click:e.gotoLogin}},[e._v("Ops, já tenho conta")])]),e._v(" "),n("v-snackbar",{attrs:{color:e.snackbarStatus,timeout:5e3,top:!0,right:!0},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n          "+e._s(e.snackbarText)+"\n          "),n("v-btn",{attrs:{color:"#FFF",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("Fechar")])],1)],1)],1)],1)],1)}),[],!1,null,"f59c31ae",null);"function"==typeof m.default&&Object(m.default)(component);t.default=component.exports;v()(component,{VAutocomplete:w.a,VBtn:x.a,VCol:k.a,VContainer:y.a,VFlex:C.a,VForm:_.a,VLayout:T.a,VProgressCircular:P.a,VRow:S.a,VSelect:E.a,VSnackbar:L.a,VTextField:R.a})}}]);