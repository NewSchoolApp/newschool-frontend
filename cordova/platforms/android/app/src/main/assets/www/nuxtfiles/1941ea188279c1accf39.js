/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{995:function(e,t,n){"use strict";n.r(t);var r=n(337),o=function(e,b){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,b){e.__proto__=b}||function(e,b){for(var p in b)b.hasOwnProperty(p)&&(e[p]=b[p])})(e,b)};function c(e,t,n,r){return new(n||(n=Promise))((function(o,c){function l(e){try{d(r.next(e))}catch(e){c(e)}}function f(e){try{d(r.throw(e))}catch(e){c(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,f)}d((r=r.apply(e,t||[])).next())}))}function l(e,body){var t,n,r,g,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return g={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function c(c){return function(l){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,n&&(r=2&c[0]?n.return:c[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;switch(n=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){o.label=c[1];break}if(6===c[0]&&o.label<r[1]){o.label=r[1],r=c;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(c);break}r[2]&&o.ops.pop(),o.trys.pop();continue}c=body.call(e,o)}catch(e){c=[6,e],n=0}finally{t=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}}var f=n(345),d={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},h=function(e){function t(code,n,details){var r=e.call(this,n)||this;return Object.setPrototypeOf(r,t.prototype),r.code=code,r.details=details,r}return function(e,b){function t(){this.constructor=e}o(e,b),e.prototype=null===b?Object.create(b):(t.prototype=b.prototype,new t)}(t,e),t}(Error);var v=function(){function e(e,t){var n=this;this.auth=null,this.messaging=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then((function(e){return n.auth=e}),(function(){})),this.messaging||t.get().then((function(e){return n.messaging=e}),(function(){}))}return e.prototype.getAuthToken=function(){return c(this,void 0,void 0,(function(){var e;return l(this,(function(t){switch(t.label){case 0:if(!this.auth)return[2,void 0];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return(e=t.sent())?[2,e.accessToken]:[2,void 0];case 3:return t.sent(),[2,void 0];case 4:return[2]}}))}))},e.prototype.getInstanceIdToken=function(){return c(this,void 0,void 0,(function(){return l(this,(function(e){if(!(this.messaging&&"Notification"in self&&"granted"===Notification.permission))return[2,void 0];try{return[2,this.messaging.getToken()]}catch(e){return[2,void 0]}return[2]}))}))},e.prototype.getContext=function(){return c(this,void 0,void 0,(function(){var e,t;return l(this,(function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return e=n.sent(),[4,this.getInstanceIdToken()];case 2:return t=n.sent(),[2,{authToken:e,instanceIdToken:t}]}}))}))},e}();function m(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}var y=function(){function e(){}return e.prototype.encode=function(data){var e=this;if(null==data)return null;if(data instanceof Number&&(data=data.valueOf()),"number"==typeof data&&isFinite(data))return data;if(!0===data||!1===data)return data;if("[object String]"===Object.prototype.toString.call(data))return data;if(Array.isArray(data))return data.map((function(t){return e.encode(t)}));if("function"==typeof data||"object"==typeof data)return m(data,(function(t){return e.encode(t)}));throw new Error("Data cannot be encoded in JSON: "+data)},e.prototype.decode=function(e){var t=this;if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var n=Number(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map((function(e){return t.decode(e)})):"function"==typeof e||"object"==typeof e?m(e,(function(e){return t.decode(e)})):e},e}();var w=function(){function e(e,t,n,r,o){var c=this;void 0===r&&(r="us-central1"),this.app_=e,this.fetchImpl=o,this.serializer=new y,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(c.deleteService())}},this.contextProvider=new v(t,n),this.cancelAllRequests=new Promise((function(e){c.deleteService=function(){return e()}}));try{var l=new URL(r);this.customDomain=l.origin,this.region="us-central1"}catch(e){this.customDomain=null,this.region=r}}return Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),e.prototype._url=function(e){var t=this.app_.options.projectId;return null!==this.emulatorOrigin?this.emulatorOrigin+"/"+t+"/"+this.region+"/"+e:null!==this.customDomain?this.customDomain+"/"+e:"https://"+this.region+"-"+t+".cloudfunctions.net/"+e},e.prototype.useEmulator=function(e,t){this.emulatorOrigin="http://"+e+":"+t},e.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},e.prototype.httpsCallable=function(e,t){var n=this;return function(data){return n.call(e,data,t||{})}},e.prototype.postJSON=function(e,body,t){return c(this,void 0,void 0,(function(){var n,r;return l(this,(function(o){switch(o.label){case 0:t["Content-Type"]="application/json",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,this.fetchImpl(e,{method:"POST",body:JSON.stringify(body),headers:t})];case 2:return n=o.sent(),[3,4];case 3:return o.sent(),[2,{status:0,json:null}];case 4:r=null,o.label=5;case 5:return o.trys.push([5,7,,8]),[4,n.json()];case 6:return r=o.sent(),[3,8];case 7:return o.sent(),[3,8];case 8:return[2,{status:n.status,json:r}]}}))}))},e.prototype.call=function(e,data,t){return c(this,void 0,void 0,(function(){var n,body,r,o,c,f,v,m,y,w,N;return l(this,(function(l){switch(l.label){case 0:return n=this._url(e),data=this.serializer.encode(data),body={data:data},r={},[4,this.contextProvider.getContext()];case 1:return(o=l.sent()).authToken&&(r.Authorization="Bearer "+o.authToken),o.instanceIdToken&&(r["Firebase-Instance-ID-Token"]=o.instanceIdToken),c=t.timeout||7e4,f=function(e){var t,n=new Promise((function(n,r){t=setTimeout((function(){r(new h("deadline-exceeded","deadline-exceeded"))}),e)}));return{timer:t,promise:n}}(c),v=f.timer,m=f.promise,[4,Promise.race([E(v,this.postJSON(n,body,r)),m,E(v,this.cancelAllRequests)])];case 2:if(!(y=l.sent()))throw new h("cancelled","Firebase Functions instance was deleted.");if(w=function(e,t,n){var code=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),r=code,details=void 0;try{var o=t&&t.error;if(o){var c=o.status;if("string"==typeof c){if(!d[c])return new h("internal","internal");code=d[c],r=c}var l=o.message;"string"==typeof l&&(r=l),void 0!==(details=o.details)&&(details=n.decode(details))}}catch(e){}return"ok"===code?null:new h(code,r,details)}(y.status,y.json,this.serializer))throw w;if(!y.json)throw new h("internal","Response is not valid JSON object.");if(void 0===(N=y.json.data)&&(N=y.json.result),void 0===N)throw new h("internal","Response is missing data field.");return[2,{data:this.serializer.decode(N)}]}}))}))},e}();function E(e,t){return c(this,void 0,void 0,(function(){var n;return l(this,(function(r){switch(r.label){case 0:return[4,t];case 1:return n=r.sent(),clearTimeout(e),[2,n]}}))}))}var N,I,O;N=r.a,I=fetch.bind(self),O={Functions:w},N.INTERNAL.registerComponent(new f.a("functions",(function(e,t){var n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),o=e.getProvider("messaging");return new w(n,r,o,t,I)}),"PUBLIC").setServiceProps(O).setMultipleInstances(!0)),r.a.registerVersion("@firebase/functions","0.6.1")}}]);