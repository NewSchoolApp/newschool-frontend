(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{1017:function(t,e,r){"use strict";r.r(e);r(69),r(8);var n=r(3),o=r(44),c=r(302),l=r(380),d=r(665),f={components:{HeaderBar:c.a,NothingToShow:l.a,CertificateCard:d.a},data:function(){return{loading:!0,certificates:[]}},computed:{allCourses:function(){return this.$store.state.courses.all}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.getAll("".concat("api/v2/course-taken/certificate/user/").concat(t.$store.state.user.data.id));case 2:t.certificates=e.sent.data,t.certificates.forEach((function(e){var r=t.allCourses.find((function(t){return t.id==e.courseId}));e.course=r})),t.loading=!1;case 5:case"end":return e.stop()}}),e)})))()}},h=(r(794),r(39)),v=r(43),m=r.n(v),w=r(321),x=r(129),component=Object(h.a)(f,(function(){var t=this.$createElement,e=this._self._c||t;return this.loading?e("div",[e("div",{staticClass:"container-spinner"},[e("v-progress-circular",{attrs:{size:70,width:5,indeterminate:"",color:"#6600cc"}})],1)]):e("div",{attrs:{id:"page"}},[e("div",{attrs:{id:"layout-certificates"}},[e("HeaderBar",{attrs:{title:"Certificados","back-page":!0}}),this._v(" "),this.certificates.length?e("v-container",{staticClass:"container px-2"},this._l(this.certificates,(function(t){return e("div",{key:t.id,staticClass:"cards-box"},[e("certificate-card",{attrs:{certificate:t}})],1)})),0):e("NothingToShow",{attrs:{title:"Vixe :/",message:"Você ainda não tem nenhum certificado. :("}})],1)])}),[],!1,null,"2e1ba8e2",null);e.default=component.exports;m()(component,{VContainer:w.a,VProgressCircular:x.a})},296:function(t,e,r){var content=r(304);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("79745966",content,!0,{sourceMap:!1})},302:function(t,e,r){"use strict";var n={props:["title","backPage","route"],methods:{comeBackPage:function(){this.route?this.$router.push(this.route):this.$router.back()}}},o=(r(303),r(39)),c=r(43),l=r.n(c),d=r(289),f=r(288),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"head__bar"}},[e("v-btn",{staticClass:"btn-back",attrs:{text:"",icon:""},on:{click:this.comeBackPage}},[e("v-icon",[this._v("mdi-arrow-left")])],1),this._v(" "),e("h1",{staticClass:"h1__theme"},[this._v(this._s(this.title))])],1)}),[],!1,null,"7719e329",null);e.a=component.exports;l()(component,{VBtn:d.a,VIcon:f.a})},303:function(t,e,r){"use strict";var n=r(296);r.n(n).a},304:function(t,e,r){(e=r(28)(!1)).push([t.i,"*[data-v-7719e329]{font-family:Roboto,sans-serif}.h1__theme[data-v-7719e329]{font-size:1rem;line-height:1.2;font-weight:900;text-align:center;padding:0 2.5rem!important}#head__bar[data-v-7719e329]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;padding:1.5rem 0;position:relative;-webkit-box-align:center;align-items:center;background:transparent}[data-v-7719e329] .btn-back .theme--light.v-icon{color:var(--primary);font-size:35px}[data-v-7719e329] .btn-back{position:absolute;left:1rem}",""]),t.exports=e},314:function(t,e,r){"use strict";var n=r(4),o=r(2);var c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return o.default.extend({name:"proxyable",model:{prop:t,event:e},props:Object(n.a)({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:Object(n.a)({},t,(function(t){this.internalLazyValue=t}))})}();e.a=c},336:function(t,e,r){var content=r(378);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("2c88164b",content,!0,{sourceMap:!1})},356:function(t,e,r){var content=r(593);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("330a73e2",content,!0,{sourceMap:!1})},376:function(t,e,r){t.exports=r.p+"img/4c9b9bd.svg"},377:function(t,e,r){"use strict";var n=r(336);r.n(n).a},378:function(t,e,r){(e=r(28)(!1)).push([t.i,".wrapper__without__content[data-v-0abeff7d]{opacity:.5;text-align:center}.wrapper__without__content .text__without__content[data-v-0abeff7d]{color:var(--primary);text-transform:uppercase;font-size:3.5em;font-weight:400}.full__width[data-v-0abeff7d]{width:100%}",""]),t.exports=e},380:function(t,e,r){"use strict";var n={name:"NothingToShow",props:{title:String,message:String}},o=(r(377),r(39)),c=r(43),l=r.n(c),d=r(320),f=r(321),h=r(294),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("v-container",{staticClass:"wrapper__without__content ",attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("h1",{staticClass:"full__width text__without__content"},[this._v(this._s(this.title))]),this._v(" "),e("p",{staticClass:"full__width"},[this._v(this._s(this.message))])])],1)],1)],1)}),[],!1,null,"0abeff7d",null);e.a=component.exports;l()(component,{VCol:d.a,VContainer:f.a,VRow:h.a})},592:function(t,e,r){"use strict";var n=r(356);r.n(n).a},593:function(t,e,r){(e=r(28)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap);"]),e.push([t.i,"*[data-v-46591f7a]{font-family:Roboto,sans-serif}.thumb-background[data-v-46591f7a]{background-color:var(--primary);position:absolute;top:0;opacity:.4}.footer-card[data-v-46591f7a]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:end;align-items:flex-end}.v-responsive.v-image[data-v-46591f7a]{padding-top:45%;height:150px;width:100%;border-radius:5px}.v-card-body[data-v-46591f7a]{margin-bottom:20px}.v-card__title[data-v-46591f7a]{font-weight:700;font-size:.75rem;padding:8px 0 0;line-height:16px;color:#1a1a1a}.theme--light.v-card .v-card__subtitle[data-v-46591f7a]{padding:0;color:#1a1a1a;font-size:10px;line-height:11.72px}.medal[data-v-46591f7a]{position:absolute;top:0;max-width:4rem;top:50%;left:50%;-webkit-transform:translate(-50%,-65%);transform:translate(-50%,-65%)}",""]),t.exports=e},596:function(t,e,r){var content=r(795);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("3759be22",content,!0,{sourceMap:!1})},665:function(t,e,r){"use strict";var n=r(44),o={name:"CertificateCard",props:["certificate"],data:function(){return{showThumb:!0}},computed:{params:function(){return this.$route.params},idUser:function(){return this.$store.state.user.data.id},allCourses:function(){return this.$store.state.courses.all}},methods:{goToCertificate:function(t){window.location="http://newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/pagina-certificado/".concat(this.idUser,"/").concat(this.certificate.courseId,"/").concat(t)},imageLoadError:function(){this.showThumb=!1},onSuccess:function(t){var e=this;n.a.post("/api/v1/gamefication/start-event",{event:"SHARE_COURSE",rule:{courseId:this.params.idCourse,userId:this.idUser,platform:t.app}}).then((function(t){e.$notifier.showMessage({type:"success"}),$nuxt._router.push("/aluno/home")})).catch((function(){return e.$notifier.showMessage({type:"error"})}))},onError:function(t){alert("Sharing failed with message: "+t)},share:function(t,title,image){t.stopPropagation(),t.preventDefault();var e={message:"Se liga no certificado que eu ganhei, SELOKO!",subject:this.tryMessage,url:"http://newschool-ui-dev.eba-fdz8zprg.us-east-2.elasticbeanstalk.com/#/pagina-certificado/".concat(this.idUser,"/").concat(this.certificate.courseId,"/0"),chooserTitle:"Vem colar com nois!"};window.plugins.socialsharing.shareWithOptions(e,this.onSuccess,this.onError)},openCertificate:function(){this.$router.push("/pagina-certificado/".concat(this.idUser,"/").concat(this.certificate.courseId,"/2"))}}},c=(r(592),r(39)),l=r(43),d=r.n(l),f=r(327),h=r(313),v=r(320),m=r(288),w=r(515),x=r(294),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-col",{staticClass:"main-col",attrs:{align:"center"}},[n("v-card",{staticClass:"v-card-body",attrs:{elevation:"0",color:"transparent"}},[[n("v-img",{attrs:{src:t.certificate.course.capa.url}}),t._v(" "),n("v-img",{staticClass:"thumb-background",on:{click:t.openCertificate}}),t._v(" "),n("v-img",{staticClass:"medal",attrs:{contain:"",src:r(376)},on:{click:t.openCertificate}})],t._v(" "),n("div",{staticClass:"footer-card"},[n("v-row",[n("v-col",{staticClass:"pt-0",attrs:{align:"left"}},[n("v-card-title",[t._v(t._s(t.certificate.course.titulo))]),t._v(" "),n("v-card-subtitle",{staticClass:"mt-0"},[t._v(t._s(t.certificate.course.nomeDoAutor))])],1),t._v(" "),n("v-card-actions",{staticClass:"pt-0"},[n("v-icon",{staticClass:"pr-2",attrs:{color:"grey"},on:{click:function(e){return t.goToCertificate(1)}}},[t._v("mdi-download")]),t._v(" "),n("v-icon",{attrs:{color:"grey"},on:{click:function(e){return t.share(e,t.title,t.image)}}},[t._v("mdi-share-variant")])],1)],1)],1)],2)],1)}),[],!1,null,"46591f7a",null);e.a=component.exports;d()(component,{VCard:f.a,VCardActions:h.a,VCardSubtitle:h.b,VCardTitle:h.d,VCol:v.a,VIcon:m.a,VImg:w.a,VRow:x.a})},794:function(t,e,r){"use strict";var n=r(596);r.n(n).a},795:function(t,e,r){(e=r(28)(!1)).push([t.i,".cards-box[data-v-2e1ba8e2]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;max-width:700px;width:100%}.cards-box[data-v-2e1ba8e2],.container[data-v-2e1ba8e2]{margin-bottom:25px}@media(min-width:992px){#page[data-v-2e1ba8e2]{-webkit-box-pack:center;justify-content:center}#layout-certificates[data-v-2e1ba8e2],#page[data-v-2e1ba8e2]{display:-webkit-box;display:flex}#layout-certificates[data-v-2e1ba8e2]{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;max-width:700px;width:700px;padding:20px 24px 50px}}@media(min-width:992px){#page[data-v-2e1ba8e2]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}}",""]),t.exports=e}}]);