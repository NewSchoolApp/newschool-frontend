(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1017:function(t,e,o){"use strict";o.r(e);var n=o(301),r=o(419),c={components:{HeaderBar:n.a,VideoPlayer:r.a},data:function(){return{thumbnail:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg",video_url:"https://www.youtube.com/embed/E2ao9bjHZlw"}},methods:{select:function(t){window.open(t,"_blank")},sendMessage:function(){window.location="https://api.whatsapp.com/send?phone=+551195154-4712&text=Olá, Gostaria de saber mais de como posso fazer uma doação para a New School."}}},l=(o(756),o(39)),d=o(758),f=o(43),v=o.n(f),h=o(325),m=o(289),_=o(295),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("HeaderBar",{attrs:{title:"Apoie a New School","back-page":!0}}),t._v(" "),o("v-container",{staticClass:"px-8"},[o("v-row",[o("h5",[t._v("Pega a visão")])]),t._v(" "),o("v-row",[o("video-player",{ref:"player",staticClass:"mt-3",attrs:{"youtube-url":t.video_url,thumbnail:t.thumbnail}})],1),t._v(" "),o("v-row",{staticClass:"align-baseline"},[o("v-icon",{attrs:{color:"#FFE470"}},[t._v("mdi-star")]),t._v(" "),o("p",{staticClass:"bank__text position__adjutstment"},[t._v("PIX: 33.793.768/0001-19")])],1),t._v(" "),o("v-row",[o("h5",[t._v("Seja um Doador")])]),t._v(" "),o("v-row",[o("p",{staticClass:"bank__text mt-2"},[t._v("\n        Seja um doador e patrocine um aluno, ajudando a ter um futuro de\n        qualidade e melhores escolhas.\n      ")])]),t._v(" "),o("v-row",[o("h5",[t._v("Seja um Patrocinador")])]),t._v(" "),o("v-row",{staticClass:"mb-10"},[o("p",{staticClass:"bank__text mt-2 "},[t._v("\n        Seja um patrocinador, ajudando a New School com o objetivo de oferecer\n        à esses jovens um futuro de qualidade e melhores escolhas.\n      ")])]),t._v(" "),o("v-row",[o("button",{staticClass:"btn-primary btn-block",on:{click:t.sendMessage}},[t._v("\n        DOE UM FUTURO\n      ")])])],1)],1)}),[],!1,null,"7fb55d5c",null);"function"==typeof d.default&&Object(d.default)(component);e.default=component.exports;v()(component,{VContainer:h.a,VIcon:m.a,VRow:_.a})},297:function(t,e,o){var content=o(303);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("79745966",content,!0,{sourceMap:!1})},301:function(t,e,o){"use strict";var n={props:["title","backPage","route"],methods:{comeBackPage:function(){this.route?this.$router.push(this.route):this.$router.back()}}},r=(o(302),o(39)),c=o(43),l=o.n(c),d=o(290),f=o(289),component=Object(r.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"head__bar"}},[e("v-btn",{staticClass:"btn-back",attrs:{text:"",icon:""},on:{click:this.comeBackPage}},[e("v-icon",[this._v("mdi-arrow-left")])],1),this._v(" "),e("h1",{staticClass:"h1__theme"},[this._v(this._s(this.title))])],1)}),[],!1,null,"7719e329",null);e.a=component.exports;l()(component,{VBtn:d.a,VIcon:f.a})},302:function(t,e,o){"use strict";var n=o(297);o.n(n).a},303:function(t,e,o){(e=o(28)(!1)).push([t.i,"*[data-v-7719e329]{font-family:Roboto,sans-serif}.h1__theme[data-v-7719e329]{font-size:1rem;line-height:1.2;font-weight:900;text-align:center;padding:0 2.5rem!important}#head__bar[data-v-7719e329]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;padding:1.5rem 0;position:relative;-webkit-box-align:center;align-items:center;background:transparent}[data-v-7719e329] .btn-back .theme--light.v-icon{color:var(--primary);font-size:35px}[data-v-7719e329] .btn-back{position:absolute;left:1rem}",""]),t.exports=e},325:function(t,e,o){"use strict";o(73),o(7),o(5),o(13),o(304),o(191);var n=o(305),r=o(135);e.a=Object(n.a)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var o,n=e.props,data=e.data,c=e.children,l=data.attrs;return l&&(data.attrs={},o=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,Object(r.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(o||[])}),c)}})},345:function(t,e,o){var content=o(395);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("7b673f7c",content,!0,{sourceMap:!1})},394:function(t,e,o){"use strict";var n=o(345);o.n(n).a},395:function(t,e,o){(e=o(28)(!1)).push([t.i,"#course-thumbnail{width:100%!important;height:auto!important;opacity:.4!important}#course-thumbnail-backgorund{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;overflow:hidden;height:100%;background-color:rgba(0,0,0,.4)}.v-progress-circular{z-index:3;position:absolute}iframe{height:100%;width:100%}.play-btn{position:absolute;font-size:45px!important;color:#fff!important}",""]),t.exports=e},419:function(t,e,o){"use strict";o(36);var n={components:{YoutubeVue:o(551).YoutubeVue},props:["youtubeUrl","thumbnail"],data:function(){return{playing:!1,playerLoading:!1}},computed:{videoUrl:function(){var t=this.youtubeUrl.split("/");return t[t.length-1]}},methods:{playVideo:function(){var t=this;this.playerLoading=!0,setTimeout((function(){t.playing=!0,setTimeout((function(){t.$refs.youtube.player.playVideo()}),100)}),500)}}},r=(o(394),o(39)),c=o(43),l=o.n(c),d=o(289),f=o(129),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.playing?o("youtube-vue",{ref:"youtube",attrs:{videoid:t.videoUrl}}):o("div",{attrs:{id:"course-thumbnail-backgorund"},on:{click:function(e){return t.playVideo()}}},[o("img",{attrs:{id:"course-thumbnail",src:t.thumbnail,alt:"imagem-curso"}}),t._v(" "),t.playerLoading?o("v-progress-circular",{attrs:{indeterminate:"",color:"white"}}):o("v-icon",{staticClass:"play-btn"},[t._v("\n      mdi-play-circle-outline\n    ")])],1)],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VIcon:d.a,VProgressCircular:f.a})},596:function(t,e,o){var content=o(757);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("d97bc58a",content,!0,{sourceMap:!1})},597:function(t,e){},756:function(t,e,o){"use strict";var n=o(596);o.n(n).a},757:function(t,e,o){(e=o(28)(!1)).push([t.i,".bank__text[data-v-7fb55d5c]{font-family:Roboto;font-style:normal;font-weight:400;font-size:12px;line-height:14px;color:#000}.position__adjutstment[data-v-7fb55d5c]{position:relative;left:13px;top:-4px}h5[data-v-7fb55d5c]{font-weight:700;color:var(--primary)}",""]),t.exports=e},758:function(t,e,o){"use strict";var n=o(597),r=o.n(n);e.default=r.a}}]);