(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{1023:function(t,e,n){"use strict";n.r(e);var o={components:{HeaderBar:n(302).a},data:function(){return{start:!0,vestTypes:["Administração, negócios e serviços","Arte e Design","Ciências Biológicas e da Terra","Análise e Desenvolvimento de Sistemas","Ciências Sociais e Humanas","Comunicação e Informação","Engenharia e Produção","Saúde e Bem-estar"],accept:!0}},methods:{goBack:function(){$nuxt._route.push("/aluno/home")},submit:function(){window.location="http://www.isemear.org.br/processo-seletivo/"}}},r=(n(892),n(39)),c=n(894),l=n(43),f=n.n(l),d=n(289),m=n(320),v=n(294),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-col",{attrs:{id:"main-col"}},[o("HeaderBar",{attrs:{title:"Instituto Semear",route:"/aluno/home"}}),t._v(" "),[o("v-col",[o("v-col",{staticClass:"px-0 pb-0",attrs:{align:"center"}},[o("p",{staticClass:"p-info"},[t._v("\n          Mano, você pode receber apoio financeiro por meio de uma Bolsa de\n          Estudo, orientação por meio de um Programa de Mentoria ou acesso à\n          Rede de Contatos do Instituto, que reúne desde jovens na mesma\n          situação a profissionais de sucesso em diversas áreas. Bora lá?\n        ")]),t._v(" "),o("img",{staticClass:"logo-img",attrs:{src:n(616)}})])],1),t._v(" "),o("v-row",{staticClass:"base"},[t.accept?o("v-btn",{staticClass:"btn-block btn-new-primary btn-shadow my-10",attrs:{loading:t.loading},on:{click:t.submit}},[t._v("\n        Bora lá no site\n      ")]):t._e()],1)]],2)}),[],!1,null,"2a6b2908",null);"function"==typeof c.default&&Object(c.default)(component);e.default=component.exports;f()(component,{VBtn:d.a,VCol:m.a,VRow:v.a})},296:function(t,e,n){var content=n(304);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("79745966",content,!0,{sourceMap:!1})},302:function(t,e,n){"use strict";var o={props:["title","backPage","route"],methods:{comeBackPage:function(){this.route?this.$router.push(this.route):this.$router.back()}}},r=(n(303),n(39)),c=n(43),l=n.n(c),f=n(289),d=n(288),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"head__bar"}},[e("v-btn",{staticClass:"btn-back",attrs:{text:"",icon:""},on:{click:this.comeBackPage}},[e("v-icon",[this._v("mdi-arrow-left")])],1),this._v(" "),e("h1",{staticClass:"h1__theme"},[this._v(this._s(this.title))])],1)}),[],!1,null,"7719e329",null);e.a=component.exports;l()(component,{VBtn:f.a,VIcon:d.a})},303:function(t,e,n){"use strict";var o=n(296);n.n(o).a},304:function(t,e,n){(e=n(28)(!1)).push([t.i,"*[data-v-7719e329]{font-family:Roboto,sans-serif}.h1__theme[data-v-7719e329]{font-size:1rem;line-height:1.2;font-weight:900;text-align:center;padding:0 2.5rem!important}#head__bar[data-v-7719e329]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;padding:1.5rem 0;position:relative;-webkit-box-align:center;align-items:center;background:transparent}[data-v-7719e329] .btn-back .theme--light.v-icon{color:var(--primary);font-size:35px}[data-v-7719e329] .btn-back{position:absolute;left:1rem}",""]),t.exports=e},320:function(t,e,n){"use strict";n(23),n(11),n(73),n(35),n(40);var o=n(4),r=(n(42),n(191),n(32),n(7),n(5),n(13),n(66),n(190),n(2)),c=n(135),l=n(6);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=["sm","md","lg","xl"],v=m.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{}),h=m.reduce((function(t,e){return t["offset"+Object(l.x)(e)]={type:[String,Number],default:null},t}),{}),y=m.reduce((function(t,e){return t["order"+Object(l.x)(e)]={type:[String,Number],default:null},t}),{}),x={col:Object.keys(v),offset:Object.keys(h),order:Object.keys(y)};function w(t,e,n){var o=t;if(null!=n&&!1!==n){if(e){var r=e.replace(t,"");o+="-".concat(r)}return"col"!==t||""!==n&&!0!==n?(o+="-".concat(n)).toLowerCase():o.toLowerCase()}}var O=new Map;e.a=r.default.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},v),{},{offset:{type:[String,Number],default:null}},h),{},{order:{type:[String,Number],default:null}},y),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,data=e.data,r=e.children,l=(e.parent,"");for(var f in n)l+=String(n[f]);var d=O.get(l);return d||function(){var t,e;for(e in d=[],x)x[e].forEach((function(t){var o=n[t],r=w(e,t,o);r&&d.push(r)}));var r=d.some((function(t){return t.startsWith("col-")}));d.push((t={col:!r||!n.cols},Object(o.a)(t,"col-".concat(n.cols),n.cols),Object(o.a)(t,"offset-".concat(n.offset),n.offset),Object(o.a)(t,"order-".concat(n.order),n.order),Object(o.a)(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),O.set(l,d)}(),t(n.tag,Object(c.a)(data,{class:d}),r)}})},616:function(t,e,n){t.exports=n.p+"img/b037bfc.svg"},627:function(t,e,n){var content=n(893);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("7223954c",content,!0,{sourceMap:!1})},628:function(t,e){},892:function(t,e,n){"use strict";var o=n(627);n.n(o).a},893:function(t,e,n){(e=n(28)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);"]),e.push([t.i,"*[data-v-2a6b2908]{font-family:Roboto;letter-spacing:0}body[data-v-2a6b2908]{position:relative}#main-col[data-v-2a6b2908]{padding-top:16px;height:100%}.p-info[data-v-2a6b2908]{font-size:16px;font-weight:400;line-height:24px;padding-bottom:64px;text-align:left}.logo-img[data-v-2a6b2908]{padding-bottom:30px}.input-label[data-v-2a6b2908]{margin-bottom:2px;font-size:14px;font-weight:400;letter-spacing:0;color:var(--primary)}.accept__text[data-v-2a6b2908]{font-size:10px;text-decoration:underline;text-align:center}.base[data-v-2a6b2908]{padding:5px 24px}",""]),t.exports=e},894:function(t,e,n){"use strict";var o=n(628),r=n.n(o);e.default=r.a}}]);