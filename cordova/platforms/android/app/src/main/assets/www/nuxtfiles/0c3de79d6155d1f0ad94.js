(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1038:function(t,e,r){"use strict";r.r(e);var o=r(305),n=r(302),l=r(678),c={components:{NavigationBar:o.a,HeaderBar:n.a},data:function(){return{title:"Crie uma Parte",status:!0,submited:!1,loading:!1,snackbar:!1,snackbarText:"",snackbarStatus:"",part:{title:"",description:"",youtubeUrl:"",vimeoUrl:"",lessonId:""},titleRules:[function(title){return!!title||"Digite um título"}],videoUrlRules:[function(video){return!!video||"Insira o link do vídeo"}]}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:"Ajude a espalhar o conhecimento criando uma Parte de um Curso da New School - Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro."}]}},created:function(){this.part.lessonId=this.$route.params.lessonId,this.courseId=this.$route.params.courseId},methods:{submit:function(){var t=this;this.$refs.part.validate()?(this.animateForm(!0),l.a.createPart(this.part).then((function(e){t.loading=!1,t.showConfirmSnack("Parte criada! ;)","success"),t.submited=!0,$nuxt._router.push("/admin/course/".concat(t.courseId,"/lesson/").concat(t.part.lessonId,"/part/").concat(e.data.id,"/test/new"))})).catch((function(t){console.error(t)}))):this.animateForm(!1)},animateForm:function(t){var e=this;t?(this.$refs.flex.classList.add("hide-form"),document.querySelector("html").style.overflow="hidden",setTimeout((function(){e.loading=!0}),300)):(this.$refs.flex.classList.add("error-form"),setTimeout((function(){e.$refs.flex.classList.remove("error-form")}),500)),document.querySelector("html").style.overflow="scroll"},showConfirmSnack:function(text,t){this.snackbarText=text,this.snackbarStatus=t,this.snackbar=!0}}},d=(r(951),r(39)),v=r(953),m=r(43),f=r.n(m),h=r(289),k=r(320),x=r(321),_=r(332),w=r(337),y=r(322),$=r(294),F=r(976),S=r(331),U=r(354),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"flex",attrs:{id:"page"}},[r("HeaderBar",{attrs:{title:"Gerenciar Meus Cursos","back-page":!0}}),t._v(" "),r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{staticStyle:{"text-align":"-webkit-left"},attrs:{xs10:"",sm8:"",md4:""}},[r("v-container",[r("v-row",[r("v-col",[r("h3",[t._v("Parte")]),t._v(" "),r("v-form",{ref:"part",staticClass:"part-form",attrs:{"lazy-validation":""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[r("v-text-field",{attrs:{rules:t.titleRules,"margin-bottom":!t.titleRules,label:"Título",required:""},model:{value:t.part.title,callback:function(e){t.$set(t.part,"title",e)},expression:"part.title"}}),t._v(" "),r("v-textarea",{attrs:{label:"Descrição",rows:"1",required:""},model:{value:t.part.description,callback:function(e){t.$set(t.part,"description",e)},expression:"part.description"}}),t._v(" "),r("v-text-field",{attrs:{rules:t.videoUrlRules,label:"Link do youtube",required:""},model:{value:t.part.youtubeUrl,callback:function(e){t.$set(t.part,"youtubeUrl",e)},expression:"part.youtubeUrl"}}),t._v(" "),r("v-text-field",{attrs:{rules:t.videoUrlRules,label:"Link do vimeo",required:""},model:{value:t.part.vimeoUrl,callback:function(e){t.$set(t.part,"vimeoUrl",e)},expression:"part.vimeoUrl"}})],1),t._v(" "),r("resources-list",{attrs:{name:"Teste",resources:[],redirect:t.submited,path:"test"}}),t._v(" "),r("span",{staticClass:"new-tests-span"},[t._v("Favor, adicionar um teste")]),t._v(" "),r("v-btn",{staticClass:"btn-block btn-primary",on:{click:t.submit}},[t._v("\n              Salvar\n            ")])],1)],1)],1)],1),t._v(" "),r("v-snackbar",{attrs:{color:t.snackbarStatus,timeout:5e3,top:!0,right:!0},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n      "+t._s(t.snackbarText)+"\n      "),r("v-btn",{attrs:{color:"#FFF",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("Fechar")])],1),t._v(" "),r("client-only",[r("navigation-bar")],1)],1)],1)}),[],!1,null,"1e224460",null);"function"==typeof v.default&&Object(v.default)(component);e.default=component.exports;f()(component,{VBtn:h.a,VCol:k.a,VContainer:x.a,VFlex:_.a,VForm:w.a,VLayout:y.a,VRow:$.a,VSnackbar:F.a,VTextField:S.a,VTextarea:U.a})},656:function(t,e,r){var content=r(952);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("b123d1b8",content,!0,{sourceMap:!1})},657:function(t,e){},951:function(t,e,r){"use strict";var o=r(656);r.n(o).a},952:function(t,e,r){(e=r(28)(!1)).push([t.i,".v-input[data-v-1e224460]{width:90%;height:50px}.v-input input[data-v-1e224460]{color:none}[data-v-1e224460] .v-messages__message{text-align:right;margin-top:-.3em}",""]),t.exports=e},953:function(t,e,r){"use strict";var o=r(657),n=r.n(o);e.default=n.a}}]);