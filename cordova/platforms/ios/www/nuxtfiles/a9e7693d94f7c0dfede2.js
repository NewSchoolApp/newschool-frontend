(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{530:function(t,e,r){var content=r(676);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("15a7432b",content,!0,{sourceMap:!1})},531:function(t,e){},675:function(t,e,r){"use strict";var o=r(530);r.n(o).a},676:function(t,e,r){(e=r(28)(!1)).push([t.i,".body__loading[data-v-67664d5c]{height:100%;background:#fff}#text[data-v-67664d5c],.body__loading[data-v-67664d5c]{position:absolute;width:100%}#text[data-v-67664d5c]{top:55%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}#text p[data-v-67664d5c]{color:var(--primary);font-weight:500;font-size:medium}.gooey[data-v-67664d5c]{position:absolute;top:50%;left:50%;width:142px;height:40px;margin:-20px 0 0 -71px;background:transparent}.gooey .dot[data-v-67664d5c]{position:absolute;width:16px;height:16px;top:12px;left:15px;background:#000;border-radius:50%;-webkit-animation:dot-data-v-67664d5c 2.8s infinite;animation:dot-data-v-67664d5c 2.8s infinite}.gooey .dot[data-v-67664d5c],.gooey .dots[data-v-67664d5c]{-webkit-transform:translateX(0);transform:translateX(0)}.gooey .dots[data-v-67664d5c]{margin-top:12px;margin-left:31px;-webkit-animation:dots-data-v-67664d5c 2.8s infinite;animation:dots-data-v-67664d5c 2.8s infinite}.gooey .dots span[data-v-67664d5c]{display:block;float:left;width:16px;height:16px;margin-left:16px;background:#000;border-radius:50%}@-webkit-keyframes dot-data-v-67664d5c{50%{-webkit-transform:translateX(96px);transform:translateX(96px)}}@keyframes dot-data-v-67664d5c{50%{-webkit-transform:translateX(96px);transform:translateX(96px)}}@-webkit-keyframes dots-data-v-67664d5c{50%{-webkit-transform:translateX(-31px);transform:translateX(-31px)}}@keyframes dots-data-v-67664d5c{50%{-webkit-transform:translateX(-31px);transform:translateX(-31px)}}",""]),t.exports=e},677:function(t,e,r){"use strict";var o=r(531),n=r.n(o);e.default=n.a},958:function(t,e,r){"use strict";r.r(e);r(23),r(11),r(7),r(5),r(13);var o=r(4),n=(r(8),r(3)),d=r(110),c=r(109);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.isTokenValid();case 2:r=e.sent,o=r.status,n=r.token,o?t.loadInfoUser({token:n,route:t.route}):(localStorage.clear(),$nuxt._router.push("/login"));case 6:case"end":return e.stop()}}),e)})))()},methods:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(d.b)("user",["loadInfoUser"])),props:["route"]},v=(r(675),r(39)),m=r(677),component=Object(v.a)(l,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"body__loading"},[e("div",{staticClass:"gooey"},[e("span",{staticClass:"dot"}),this._v(" "),e("div",{staticClass:"dots"},[e("span"),this._v(" "),e("span"),this._v(" "),e("span")])]),this._v(" "),e("div",{attrs:{id:"text"}},[e("p",[this._v("Carregando seus dados...")])])])}],!1,null,"67664d5c",null);"function"==typeof m.default&&Object(m.default)(component);e.default=component.exports}}]);