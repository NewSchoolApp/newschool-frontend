(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{1029:function(t,e,o){"use strict";o.r(e);o(145),o(8);var n=o(3),r=(o(66),o(14),o(36),o(32),o(510)),c=o.n(r),l=o(44),d={components:{SocialSharing:c.a},data:function(){return{dialog:"none",bindedClass:"none",postBody:{rating:"",feedback:""}}},computed:{activeDialog:{get:function(){return this.dialog},set:function(t){1==this.$route.params.lateFeedback&&"none"===t?$nuxt._router.replace("/aluno/meus-cursos"):this.dialog=t}},idUser:function(){return this.$store.state.user.data.id},nameUser:function(){return this.$store.state.user.data.name.split(" ")[0]},courseId:function(){return this.$store.state.courses.current.id},courseTitle:function(){return this.$store.state.courses.current.title},courseSlug:function(){return this.$route.params.courseSlug}},mounted:function(){2===Number(this.$route.params.lateFeedback)&&(this.activeDialog="start")},methods:{gotoCertificate:function(){$nuxt._router.push("/aluno/certificado-info/".concat(this.idUser,"/").concat(this.courseId))},gotoCourse:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("courses/refreshMyCourses");case 2:$nuxt._router.push("/aluno/curso/".concat(t.convertToSlug(t.courseTitle)));case 3:case"end":return e.stop()}}),e)})))()},onSuccess:function(t){var e=this;l.a.post("/api/v1/gamefication/start-event",{event:"SHARE_COURSE",rule:{courseId:this.courseId,userId:this.idUser,platform:t.app}}).then((function(t){e.$notifier.showMessage({type:"success"}),$nuxt._router.push("/aluno/home")})).catch((function(){return e.$notifier.showMessage({type:"error"})}))},onError:function(t){alert("Sharing failed with message: "+t)},share:function(t,title,image){t.stopPropagation(),t.preventDefault();var e={message:"Se liga no certificado que eu ganhei, SELOKO!",subject:this.tryMessage,url:"https://newschoolapp.com.br/#/pagina-certificado/".concat(this.idUser,"/").concat(this.courseId,"/0"),chooserTitle:"Vem colar com nois!"};window.plugins.socialsharing.shareWithOptions(e,this.onSuccess,this.onError)},submitRating:function(){var t=this;this.postBody.rating?this.postBody.rating>7?this.activeDialog="good":this.activeDialog="bad":(this.bindedClass="error-form",setTimeout((function(){t.bindedClass=""}),500))},postFeedback:function(){this.postBody.rating&&l.a.post("".concat("/api/v2/course-taken/nps/user/").concat(this.idUser,"/course/").concat(this.courseId),this.postBody)},convertToSlug:function(t){t=(t=t.replace(/^\s+|\s+$/g,"")).toLowerCase();for(var e="ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;",i=0,o=e.length;i<o;i++)t=t.replace(new RegExp(e.charAt(i),"g"),"aaaaaeeeeeiiiiooooouuuunc------".charAt(i));return t=t.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")},goToMyCertificates:function(){this.$router.replace("/aluno/certificados")}}},v=(o(913),o(39)),f=o(915),m=o(43),h=o.n(m),_=o(289),x=o(320),w=o(288),k=o(515),y=o(975),C=o(976),S=o(294),$=o(977),z=o(354),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"page"}},[n("v-col",{attrs:{id:"main-col"}},[n("v-row",{attrs:{align:"start",justify:"end"}},[n("v-icon",{staticStyle:{"justify-content":"flex-end","padding-bottom":"10px"},attrs:{color:"white",dark:""},on:{click:function(e){t.activeDialog="start"}}},[t._v("\n        mdi-close-circle\n      ")])],1),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("v-col",[n("img",{attrs:{src:o(611),alt:"vencedor"}}),t._v(" "),n("div",{staticClass:"score"},[n("strong",[t._v("+ 30 NC")])])]),t._v(" "),n("v-col",{staticClass:"pad0"},[n("h1",{staticClass:"white-info"},[t._v("Parabéns "+t._s(t.nameUser)+"!!")]),t._v(" "),n("p",{staticClass:"white-info low-wheight"},[t._v("\n          O seu curso foi concluído com sucesso!\n        ")])])],1)],1),t._v(" "),n("v-col",{attrs:{align:"center","align-self":"baseline"}},[n("p",{staticClass:"share-info"},[t._v("\n      Compartilhe seu certificado, para cada rede social compartilhada. (+ 1\n      NC)\n    ")]),t._v(" "),n("div",{staticClass:"btn__container"},[n("button",{staticClass:"btn-block btn-primary",on:{click:function(e){return t.share(e,t.title,t.image)}}},[t._v("\n        COMPARTILHAR\n      ")])]),t._v(" "),n("small",{staticClass:"view-certificate",on:{click:function(e){return t.gotoCertificate()}}},[t._v("Visualizar o certificado")])]),t._v(" "),"start"==t.activeDialog?n("v-col",{staticClass:"dialogCol"},[n("v-icon",{staticStyle:{"justify-content":"flex-end","padding-bottom":"10px"},attrs:{color:"#6600cc",dark:""},on:{click:function(e){return t.goToMyCertificates()}}},[t._v("\n      mdi-close-circle\n    ")]),t._v(" "),n("p",{attrs:{align:"end"}},[t._v("\n      1 de 2\n    ")]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("p",{staticClass:"giant"},[t._v("Ganhe")]),t._v(" "),n("p",{staticClass:"giant"},[t._v("+ 5 NC")])]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("strong",[t._v("Diz aí!")]),t._v(" "),n("p",[t._v("De 0 a 10, quanto você indicaria este curso para um amigo?")])]),t._v(" "),n("v-radio-group",{class:t.bindedClass,attrs:{row:""}},t._l(10,(function(e){return n("v-radio",{key:e.id,attrs:{label:e.toString(),value:e},on:{mousedown:function(o){t.postBody.rating=e}}})})),1),t._v(" "),n("v-spacer"),t._v(" "),n("v-row",{staticStyle:{"padding-bottom":"0"},attrs:{align:"end"}},[n("v-btn",{staticClass:"btn-block btn-primary baseline",on:{click:t.submitRating}},[t._v("\n        Próximo\n      ")])],1)],1):t._e(),t._v(" "),"good"==t.activeDialog?n("v-col",{staticClass:"dialogCol"},[n("v-icon",{staticStyle:{"justify-content":"flex-end","padding-bottom":"10px"},attrs:{color:"#6600cc",dark:""},on:{click:function(e){return t.gotoCourse()}}},[t._v("\n      mdi-close-circle\n    ")]),t._v(" "),n("p",{attrs:{align:"end"}},[t._v("\n      2 de 2\n    ")]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("p",{staticClass:"giant"},[t._v("Oba!!")])]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("p",[t._v("Caso queira, fale um pouco mais sobre sua nota!")])]),t._v(" "),n("v-textarea",{attrs:{outlined:"",placeholder:"Seu comentário"},model:{value:t.postBody.feedback,callback:function(e){t.$set(t.postBody,"feedback",e)},expression:"postBody.feedback"}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-row",{staticStyle:{"padding-bottom":"0"},attrs:{align:"end"}},[n("v-btn",{staticClass:"btn-block btn-primary baseline",on:{click:function(e){t.postFeedback(),t.activeDialog="end"}}},[t._v("\n        Próximo\n      ")])],1)],1):t._e(),t._v(" "),"bad"==t.activeDialog?n("v-col",{staticClass:"dialogCol"},[n("v-icon",{staticStyle:{"justify-content":"flex-end","padding-bottom":"10px"},attrs:{color:"#6600cc",dark:""},on:{click:function(e){return t.gotoCourse()}}},[t._v("\n      mdi-close-circle\n    ")]),t._v(" "),n("p",{attrs:{align:"end"}},[t._v("\n      2 de 2\n    ")]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("p",{staticClass:"giant"},[t._v("Hum...")])]),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("p",[t._v("O que faria você aumentar a nota escolhida?")])]),t._v(" "),n("v-textarea",{attrs:{outlined:"",placeholder:"Seu comentário"},model:{value:t.postBody.feedback,callback:function(e){t.$set(t.postBody,"feedback",e)},expression:"postBody.feedback"}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-row",{staticStyle:{"padding-bottom":"0"},attrs:{align:"end"}},[n("v-btn",{staticClass:"btn-block btn-primary baseline",on:{click:function(e){t.postFeedback(),t.activeDialog="end"}}},[t._v("\n        Próximo\n      ")])],1)],1):t._e(),t._v(" "),"end"==t.activeDialog?n("v-col",{staticClass:"dialogCol"},[n("v-img",{attrs:{src:o(912)}}),t._v(" "),n("v-col",{attrs:{align:"center"}},[n("strong",{staticStyle:{"font-size":"24px"}},[t._v(" Obrigado!!!")]),t._v(" "),n("p",[t._v("Sua avaliação é muito importante!")])]),t._v(" "),n("v-spacer"),t._v(" "),n("v-row",{staticStyle:{"padding-bottom":"0"},attrs:{align:"end"}},[n("v-btn",{staticClass:"btn-block btn-primary baseline",on:{click:function(e){return t.gotoCourse()}}},[t._v("\n        Finalizar\n      ")])],1)],1):t._e()],1)}),[],!1,null,"cd3b2e64",null);"function"==typeof f.default&&Object(f.default)(component);e.default=component.exports;h()(component,{VBtn:_.a,VCol:x.a,VIcon:w.a,VImg:k.a,VRadio:y.a,VRadioGroup:C.a,VRow:S.a,VSpacer:$.a,VTextarea:z.a})},611:function(t,e,o){t.exports=o.p+"img/eec6aee.svg"},639:function(t,e,o){var content=o(914);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("8d25d1f8",content,!0,{sourceMap:!1})},640:function(t,e){},912:function(t,e,o){t.exports=o.p+"img/cfd06f1.png"},913:function(t,e,o){"use strict";var n=o(639);o.n(n).a},914:function(t,e,o){(e=o(28)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap);"]),e.push([t.i,"*[data-v-cd3b2e64]{font-family:Roboto,sans-serif}p[data-v-cd3b2e64]{font-weight:500}h1[data-v-cd3b2e64]{color:var(--primary);font-weight:600;font-size:1.4rem;text-align:center;padding:.7rem}strong[data-v-cd3b2e64]{font-size:20px;font-weight:900}#page[data-v-cd3b2e64]{position:relative;padding-bottom:0!important;align-self:center}#main-col[data-v-cd3b2e64],#page[data-v-cd3b2e64]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%;width:100%}#main-col[data-v-cd3b2e64]{padding:20px;background-color:var(--primary)}.dialogCol[data-v-cd3b2e64]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);height:100%;width:100%;padding:20px 16px 30px;background-color:#fff;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.giant[data-v-cd3b2e64]{font-size:48px;font-weight:900;color:#000;line-height:45px}.container__screen[data-v-cd3b2e64]{position:absolute;width:100%;height:100%;top:0;left:0}.error-form[data-v-cd3b2e64]{-webkit-animation:nono .3s,intro paused;animation:nono .3s,intro paused}[data-v-cd3b2e64] .row{-webkit-box-pack:center;justify-content:center;padding-bottom:10px;margin:0}[data-v-cd3b2e64] .col{flex-basis:auto!important}@media (min-width:700px){#main-col[data-v-cd3b2e64],#page[data-v-cd3b2e64]{max-width:700px!important}}[data-v-cd3b2e64] fieldset{border-color:rgba(0,0,0,.1);border-radius:0}[data-v-cd3b2e64] .v-input textarea{color:#000!important}[data-v-cd3b2e64] ::-webkit-input-placeholder{font-size:12px;color:rgba(0,0,0,.5)!important}[data-v-cd3b2e64] ::-moz-placeholder{font-size:12px;color:rgba(0,0,0,.5)!important}[data-v-cd3b2e64] :-ms-input-placeholder{font-size:12px;color:rgba(0,0,0,.5)!important}[data-v-cd3b2e64] ::-ms-input-placeholder{font-size:12px;color:rgba(0,0,0,.5)!important}[data-v-cd3b2e64] ::placeholder{font-size:12px;color:rgba(0,0,0,.5)!important}[data-v-cd3b2e64] .v-radio{margin-right:0!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}[data-v-cd3b2e64] .v-input--radio-group__input{-webkit-box-pack:justify;justify-content:space-between;padding:0 15px}[data-v-cd3b2e64] .v-radio .v-label{color:#000!important}[data-v-cd3b2e64] .v-input--selection-controls__input{margin-right:0!important}.white-info[data-v-cd3b2e64]{color:#fff!important}.score[data-v-cd3b2e64]{margin-top:8px;height:34.8px;width:96px;border-radius:20px;background-color:#ededed;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.pad0[data-v-cd3b2e64]{padding:0}.low-wheight[data-v-cd3b2e64]{font-weight:400}.icons[data-v-cd3b2e64]{width:65%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;justify-content:space-around}[data-v-cd3b2e64] .icon,[data-v-cd3b2e64] .v-icon{border:none!important;outline:none!important}.share-info[data-v-cd3b2e64]{margin-top:32px}.share-info[data-v-cd3b2e64],.view-certificate[data-v-cd3b2e64]{font-size:12px;font-weight:400;line-height:16px;letter-spacing:0}.view-certificate[data-v-cd3b2e64]{color:#a3a3a3}.btn__container[data-v-cd3b2e64]{text-align:center}",""]),t.exports=e},915:function(t,e,o){"use strict";var n=o(640),r=o.n(n);e.default=r.a}}]);