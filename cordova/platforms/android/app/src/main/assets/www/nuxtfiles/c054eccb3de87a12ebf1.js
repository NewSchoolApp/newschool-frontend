(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{333:function(t,e,o){"use strict";var n=o(39),r=o(92);e.a={update:function(form){var t=r.a.getInfoAuth().accessToken;return n.a.put("api/v1/user/me",form,{headers:{Authorization:"".concat(t)}})},updatePass:function(form){var t=r.a.getInfoAuth().accessToken;return n.a.put("api/v1/user/me/change-password",form,{headers:{Authorization:"".concat(t)}})}}},334:function(t,e,o){var content=o(430);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(21).default)("fdfa12da",content,!0,{sourceMap:!1})},335:function(t,e){},428:function(t,e,o){t.exports=o.p+"img/acfb19d.svg"},429:function(t,e,o){"use strict";var n=o(334);o.n(n).a},430:function(t,e,o){(e=o(20)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Montserrat:400,500,900&display=swap);"]),e.push([t.i,"*[data-v-98e47bd0]{font-family:Montserrat,Helvetica,Arial,sans-serif!important}.flex[data-v-98e47bd0]{-webkit-animation:intro .3s backwards;animation:intro .3s backwards;-webkit-animation-delay:.35s;animation-delay:.35s}.layout[data-v-98e47bd0]{background:#fff!important}.spiner-container[data-v-98e47bd0]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;height:100vh}.page-title[data-v-98e47bd0]{font-size:16px;font-weight:900;line-height:19px;text-align:center;text-transform:uppercase;color:#60c}.relative-col[data-v-98e47bd0]{position:relative}[data-v-98e47bd0] .btn-back{position:absolute;left:0;top:0;margin-top:3px}.img-fluid[data-v-98e47bd0]{display:block;margin:0 auto;width:375px;max-width:100%}[data-v-98e47bd0] .theme--light.v-btn:before{background-color:transparent}[data-v-98e47bd0] .theme--light.v-text-field{margin-top:0}[data-v-98e47bd0] .theme--light.v-input:not(.v-input--is-disabled) input{font-size:12px;color:#60c}[data-v-98e47bd0] .theme--light.v-text-field:not(.v-input--has-state)>.v-input__control>.v-input__slot:hover:before{border-color:#60c}[data-v-98e47bd0] .theme--light.v-icon,[data-v-98e47bd0] .theme--light.v-label{font-size:12px;font-weight:600;line-height:15px;color:#aa56ff}[data-v-98e47bd0] .btn-back .theme--light.v-icon{color:#60c;font-size:25px}[data-v-98e47bd0] .theme--light.v-icon{font-size:20px}[data-v-98e47bd0] .change-btn{margin-top:20px;width:100%;box-shadow:0 4px 5px grey!important}[data-v-98e47bd0] .v-text-field{margin:0 6%!important}[data-v-98e47bd0] .v-btn__content{color:#fff;font-size:12px;font-weight:900;line-height:15px}[data-v-98e47bd0] .theme--light.v-text-field>.v-input__control>.v-input__slot:before{border-color:#aa56ff}[data-v-98e47bd0] .v-text-field.v-input--has-state>.v-input__control>.v-input__slot:before{border-color:#ff5252}[data-v-98e47bd0] .v-messages__message{color:#ff5252;font-size:12px;margin-left:5px}.hide-form[data-v-98e47bd0]{-webkit-animation:down .3s forwards;animation:down .3s forwards}.error-form[data-v-98e47bd0]{-webkit-animation:nono .3s,intro paused;animation:nono .3s,intro paused}.change-status[data-v-98e47bd0]{margin-top:60px;font-size:18px;line-height:22px;text-align:center;color:#60c}",""]),t.exports=e},431:function(t,e,o){"use strict";var n=o(335),r=o.n(n);e.default=r.a},502:function(t,e,o){"use strict";o.r(e);o(92);var n=o(333),r={name:"changePassword",data:function(){return{status:!0,loading:!1,showPass:String,showNewPass:String,showConfirmNewPass:String,isChanged:!1,snackbar:!1,token:"",form:{password:"",newPassword:"",confirmNewPassword:""},nameRules:[function(t){return!!t||"Digite seu nome"}],passwordRules:[function(t){return!!t||"Digite a senha"},function(t){return t&&t.length>=6||"A senha deve ter no mínimo 6 caractéres"}],emailRules:[function(t){return!!t||"Digite o e-mail"},function(t){return/.+@.+\..+/.test(t)||"E-mail inválido"}]}},methods:{switchPassword:function(){var t=this;this.$refs.form.validate()?(this.animateForm(!0),n.a.updatePass(this.form).then((function(e){t.loading=!1,t.isChanged=!0,setTimeout((function(){t.gotoHome()}),1500)})).catch((function(e){setTimeout((function(){t.loading=!1,t.snackbar=!0}),500),console.error(e)}))):this.animateForm(!1)},animateForm:function(t){var e=this;t?(this.$refs.flex.classList.add("hide-form"),document.querySelector("html").style.overflow="hidden",setTimeout((function(){e.loading=!0}),300)):(this.$refs.flex.classList.add("error-form"),setTimeout((function(){e.$refs.flex.classList.remove("error-form")}),500)),document.querySelector("html").style.overflow="scroll"},goBack:function(){$nuxt._router.push("/aluno/alterar")},gotoHome:function(){$nuxt._router.push("/aluno/home")}},computed:{confirmPasswordRules:function(){var t=this;return[function(t){return!!t||"Confirme a senha"},function(){return t.form.confirmNewPassword===t.form.newPassword||"As senhas devem ser idênticas."}]}}},c=(o(429),o(32)),l=o(431),d=o(36),f=o.n(d),m=o(256),v=o(300),h=o(295),w=o(357),x=o(487),k=o(252),P=o(314),_=o(106),y=o(301),C=o(304),N=o(296),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{"justify-center":""}},[t.loading?n("div",{staticClass:"spiner-container"},[n("v-progress-circular",{attrs:{size:70,width:5,indeterminate:""}})],1):n("v-flex",{ref:"flex",attrs:{xs10:"",sm8:"",md6:""}},[n("v-container",[n("v-row",[n("v-col",{staticClass:"relative-col",attrs:{cols:"12"}},[n("v-btn",{staticClass:"btn-back",attrs:{text:"",icon:""},on:{click:t.goBack}},[n("v-icon",[t._v("mdi-arrow-left")])],1),t._v(" "),n("h2",{staticClass:"page-title"},[t._v("Alterar Senha")])],1)],1),t._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("img",{staticClass:"img-fluid",attrs:{src:o(428)}})])],1),t._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[t.isChanged?n("div",[n("p",{staticClass:"change-status"},[t._v("Senha alterada com sucesso!")])]):n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[n("v-text-field",{attrs:{color:"#60c",label:"Senha antiga *",name:"password",rules:t.passwordRules,type:t.showPass?"password":"text","append-icon":t.showPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return t.showPass=!t.showPass}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),t._v(" "),n("v-text-field",{attrs:{color:"#60c",label:"Nova senha *",rules:t.passwordRules,type:t.showNewPass?"password":"text","append-icon":t.showNewPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return t.showNewPass=!t.showNewPass}},model:{value:t.form.newPassword,callback:function(e){t.$set(t.form,"newPassword",e)},expression:"form.newPassword"}}),t._v(" "),n("v-text-field",{attrs:{color:"#60c",label:"Confirmar nova senha *",rules:t.confirmPasswordRules,type:t.showConfirmNewPass?"password":"text","append-icon":t.showConfirmNewPass?"mdi-eye-off":"mdi-eye",required:""},on:{"click:append":function(){return t.showConfirmNewPass=!t.showConfirmNewPass}},model:{value:t.form.confirmNewPassword,callback:function(e){t.$set(t.form,"confirmNewPassword",e)},expression:"form.confirmNewPassword"}}),t._v(" "),n("v-btn",{staticClass:"change-btn",attrs:{color:"#60c",dark:"",block:"",depressed:"",large:""},on:{click:t.switchPassword}},[t._v("Alterar Senha")])],1),t._v(" "),n("v-snackbar",{attrs:{color:"error",timeout:5e3,top:!0,right:!0},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            Erro! Sua senha antiga está correta?\n            "),n("v-btn",{attrs:{color:"#FFF",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("Fechar")])],1)],1)],1)],1)],1)],1)}),[],!1,null,"98e47bd0",null);"function"==typeof l.default&&Object(l.default)(component);e.default=component.exports;f()(component,{VBtn:m.a,VCol:v.a,VContainer:h.a,VFlex:w.a,VForm:x.a,VIcon:k.a,VLayout:P.a,VProgressCircular:_.a,VRow:y.a,VSnackbar:C.a,VTextField:N.a})}}]);