/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{514:function(t,e,n){"use strict";var r=n(333),o=n(339);var c=function(){return(c=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};function f(t,e,n,r){return new(n||(n=Promise))((function(o,c){function f(t){try{d(r.next(t))}catch(t){c(t)}}function l(t){try{d(r.throw(t))}catch(t){c(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(f,l)}d((r=r.apply(t,e||[])).next())}))}function l(t,body){var e,n,r,g,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return g={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function c(c){return function(f){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,n&&(r=2&c[0]?n.return:c[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;switch(n=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){o.label=c[1];break}if(6===c[0]&&o.label<r[1]){o.label=r[1],r=c;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(c);break}r[2]&&o.ops.pop(),o.trys.pop();continue}c=body.call(t,o)}catch(t){c=[6,t],n=0}finally{e=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,f])}}}function d(t){var s="function"==typeof Symbol&&Symbol.iterator,e=s&&t[s],i=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),c=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)c.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return c}var v,y=n(338),w=n(679),m=((v={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',v["not-registered"]="Firebase Installation is not registered.",v["installation-not-found"]="Firebase Installation not found.",v["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',v["app-offline"]="Could not process request. Application offline.",v["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",v),S=new y.b("installations","Installations",m);function I(t){return t instanceof y.c&&t.code.includes("request-failed")}function _(t){return"https://firebaseinstallations.googleapis.com/v1/projects/"+t.projectId+"/installations"}function C(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}function k(t,e){return f(this,void 0,void 0,(function(){var n,r;return l(this,(function(o){switch(o.label){case 0:return[4,e.json()];case 1:return n=o.sent(),r=n.error,[2,S.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function x(t){var e=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function T(t,e){var n=e.refreshToken,r=x(t);return r.append("Authorization",function(t){return"FIS_v2 "+t}(n)),r}function j(t){return f(this,void 0,void 0,(function(){var e;return l(this,(function(n){switch(n.label){case 0:return[4,t()];case 1:return(e=n.sent()).status>=500&&e.status<600?[2,t()]:[2,e]}}))}))}function D(t,e){var n=e.fid;return f(this,void 0,void 0,(function(){var e,r,body,o,c,f;return l(this,(function(l){switch(l.label){case 0:return e=_(t),r=x(t),body={fid:n,authVersion:"FIS_v2",appId:t.appId,sdkVersion:"w:0.4.19"},o={method:"POST",headers:r,body:JSON.stringify(body)},[4,j((function(){return fetch(e,o)}))];case 1:return(c=l.sent()).ok?[4,c.json()]:[3,3];case 2:return f=l.sent(),[2,{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:C(f.authToken)}];case 3:return[4,k("Create Installation",c)];case 4:throw l.sent()}}))}))}function P(t){return new Promise((function(e){setTimeout(e,t)}))}function E(t){return btoa(String.fromCharCode.apply(String,function(){for(var t=[],i=0;i<arguments.length;i++)t=t.concat(h(arguments[i]));return t}(t))).replace(/\+/g,"-").replace(/\//g,"_")}var O=/^[cdef][\w-]{21}$/;function A(){try{var t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;var e=function(t){return E(t).substr(0,22)}(t);return O.test(e)?e:""}catch(t){return""}}function N(t){return t.appName+"!"+t.appId}var B=new Map;function K(t,e){var n=N(t);L(n,e),function(t,e){var n=F();n&&n.postMessage({key:t,fid:e});M()}(n,e)}function L(t,e){var n,r,o=B.get(t);if(o)try{for(var c=d(o),f=c.next();!f.done;f=c.next()){(0,f.value)(e)}}catch(t){n={error:t}}finally{try{f&&!f.done&&(r=c.return)&&r.call(c)}finally{if(n)throw n.error}}}var V=null;function F(){return!V&&"BroadcastChannel"in self&&((V=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(t){L(t.data.key,t.data.fid)}),V}function M(){0===B.size&&V&&(V.close(),V=null)}var $,J="firebase-installations-store",z=null;function G(){return z||(z=Object(w.openDb)("firebase-installations-database",1,(function(t){switch(t.oldVersion){case 0:t.createObjectStore(J)}}))),z}function R(t,e){return f(this,void 0,void 0,(function(){var n,r,o,c,f;return l(this,(function(l){switch(l.label){case 0:return n=N(t),[4,G()];case 1:return r=l.sent(),o=r.transaction(J,"readwrite"),[4,(c=o.objectStore(J)).get(n)];case 2:return f=l.sent(),[4,c.put(e,n)];case 3:return l.sent(),[4,o.complete];case 4:return l.sent(),f&&f.fid===e.fid||K(t,e.fid),[2,e]}}))}))}function U(t){return f(this,void 0,void 0,(function(){var e,n,r;return l(this,(function(o){switch(o.label){case 0:return e=N(t),[4,G()];case 1:return n=o.sent(),[4,(r=n.transaction(J,"readwrite")).objectStore(J).delete(e)];case 2:return o.sent(),[4,r.complete];case 3:return o.sent(),[2]}}))}))}function H(t,e){return f(this,void 0,void 0,(function(){var n,r,o,c,f,d;return l(this,(function(l){switch(l.label){case 0:return n=N(t),[4,G()];case 1:return r=l.sent(),o=r.transaction(J,"readwrite"),[4,(c=o.objectStore(J)).get(n)];case 2:return f=l.sent(),void 0!==(d=e(f))?[3,4]:[4,c.delete(n)];case 3:return l.sent(),[3,6];case 4:return[4,c.put(d,n)];case 5:l.sent(),l.label=6;case 6:return[4,o.complete];case 7:return l.sent(),!d||f&&f.fid===d.fid||K(t,d.fid),[2,d]}}))}))}function Q(t){return f(this,void 0,void 0,(function(){var e,n,r;return l(this,(function(o){switch(o.label){case 0:return[4,H(t,(function(n){var r=function(t){return Y(t||{fid:A(),registrationStatus:0})}(n),o=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine){var n=Promise.reject(S.create("app-offline"));return{installationEntry:e,registrationPromise:n}}var r={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=function(t,e){return f(this,void 0,void 0,(function(){var n,r;return l(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,7]),[4,D(t,e)];case 1:return n=o.sent(),[2,R(t,n)];case 2:return I(r=o.sent())&&409===r.customData.serverCode?[4,U(t)]:[3,4];case 3:return o.sent(),[3,6];case 4:return[4,R(t,{fid:e.fid,registrationStatus:0})];case 5:o.sent(),o.label=6;case 6:throw r;case 7:return[2]}}))}))}(t,r);return{installationEntry:r,registrationPromise:o}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:W(t)}:{installationEntry:e}}(t,r);return e=o.registrationPromise,o.installationEntry}))];case 1:return""!==(n=o.sent()).fid?[3,3]:(r={},[4,e]);case 2:return[2,(r.installationEntry=o.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:e}]}}))}))}function W(t){return f(this,void 0,void 0,(function(){var e,n,r,o;return l(this,(function(c){switch(c.label){case 0:return[4,X(t)];case 1:e=c.sent(),c.label=2;case 2:return 1!==e.registrationStatus?[3,5]:[4,P(100)];case 3:return c.sent(),[4,X(t)];case 4:return e=c.sent(),[3,2];case 5:return 0!==e.registrationStatus?[3,7]:[4,Q(t)];case 6:return n=c.sent(),r=n.installationEntry,(o=n.registrationPromise)?[2,o]:[2,r];case 7:return[2,e]}}))}))}function X(t){return H(t,(function(t){if(!t)throw S.create("installation-not-found");return Y(t)}))}function Y(t){return 1===(e=t).registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e}function Z(t,e){var n=t.appConfig,r=t.platformLoggerProvider;return f(this,void 0,void 0,(function(){var t,o,c,body,f,d,h;return l(this,(function(l){switch(l.label){case 0:return t=function(t,e){var n=e.fid;return _(t)+"/"+n+"/authTokens:generate"}(n,e),o=T(n,e),(c=r.getImmediate({optional:!0}))&&o.append("x-firebase-client",c.getPlatformInfoString()),body={installation:{sdkVersion:"w:0.4.19"}},f={method:"POST",headers:o,body:JSON.stringify(body)},[4,j((function(){return fetch(t,f)}))];case 1:return(d=l.sent()).ok?[4,d.json()]:[3,3];case 2:return h=l.sent(),[2,C(h)];case 3:return[4,k("Generate Auth Token",d)];case 4:throw l.sent()}}))}))}function tt(t,e){return void 0===e&&(e=!1),f(this,void 0,void 0,(function(){var n,r,o;return l(this,(function(d){switch(d.label){case 0:return[4,H(t.appConfig,(function(r){if(!nt(r))throw S.create("not-registered");var o=r.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+36e5}(t)}(o))return r;if(1===o.requestStatus)return n=function(t,e){return f(this,void 0,void 0,(function(){var n,r;return l(this,(function(o){switch(o.label){case 0:return[4,et(t.appConfig)];case 1:n=o.sent(),o.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,P(100)];case 3:return o.sent(),[4,et(t.appConfig)];case 4:return n=o.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,tt(t,e)]:[2,r]}}))}))}(t,e),r;if(!navigator.onLine)throw S.create("app-offline");var d=function(t){var e={requestStatus:1,requestTime:Date.now()};return c(c({},t),{authToken:e})}(r);return n=function(t,e){return f(this,void 0,void 0,(function(){var n,r,o;return l(this,(function(f){switch(f.label){case 0:return f.trys.push([0,3,,8]),[4,Z(t,e)];case 1:return n=f.sent(),o=c(c({},e),{authToken:n}),[4,R(t.appConfig,o)];case 2:return f.sent(),[2,n];case 3:return!I(r=f.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,U(t.appConfig)];case 4:return f.sent(),[3,7];case 5:return o=c(c({},e),{authToken:{requestStatus:0}}),[4,R(t.appConfig,o)];case 6:f.sent(),f.label=7;case 7:throw r;case 8:return[2]}}))}))}(t,d),d}))];case 1:return r=d.sent(),n?[4,n]:[3,3];case 2:return o=d.sent(),[3,4];case 3:o=r.authToken,d.label=4;case 4:return[2,o]}}))}))}function et(t){return H(t,(function(t){if(!nt(t))throw S.create("not-registered");var e,n=t.authToken;return 1===(e=n).requestStatus&&e.requestTime+1e4<Date.now()?c(c({},t),{authToken:{requestStatus:0}}):t}))}function nt(t){return void 0!==t&&2===t.registrationStatus}function ot(t){return f(this,void 0,void 0,(function(){var e;return l(this,(function(n){switch(n.label){case 0:return[4,Q(t)];case 1:return(e=n.sent().registrationPromise)?[4,e]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}function it(t,e){return f(this,void 0,void 0,(function(){var n,r,o,c;return l(this,(function(f){switch(f.label){case 0:return n=function(t,e){var n=e.fid;return _(t)+"/"+n}(t,e),r=T(t,e),o={method:"DELETE",headers:r},[4,j((function(){return fetch(n,o)}))];case 1:return(c=f.sent()).ok?[3,3]:[4,k("Delete Installation",c)];case 2:throw f.sent();case 3:return[2]}}))}))}function at(t,e){var n=t.appConfig;return function(t,e){F();var n=N(t),r=B.get(n);r||(r=new Set,B.set(n,r)),r.add(e)}(n,e),function(){!function(t,e){var n=N(t),r=B.get(n);r&&(r.delete(e),0===r.size&&B.delete(n),M())}(n,e)}}function st(t){return S.create("missing-app-config-values",{valueName:t})}($=r.a).INTERNAL.registerComponent(new o.a("installations",(function(t){var e=t.getProvider("app").getImmediate(),n={appConfig:function(t){var e,n;if(!t||!t.options)throw st("App Configuration");if(!t.name)throw st("App Name");try{for(var r=d(["projectId","apiKey","appId"]),o=r.next();!o.done;o=r.next()){var c=o.value;if(!t.options[c])throw st(c)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e),platformLoggerProvider:t.getProvider("platform-logger")};return{app:e,getId:function(){return function(t){return f(this,void 0,void 0,(function(){var e,n,r;return l(this,(function(o){switch(o.label){case 0:return[4,Q(t.appConfig)];case 1:return e=o.sent(),n=e.installationEntry,(r=e.registrationPromise)?r.catch(console.error):tt(t).catch(console.error),[2,n.fid]}}))}))}(n)},getToken:function(t){return function(t,e){return void 0===e&&(e=!1),f(this,void 0,void 0,(function(){return l(this,(function(n){switch(n.label){case 0:return[4,ot(t.appConfig)];case 1:return n.sent(),[4,tt(t,e)];case 2:return[2,n.sent().token]}}))}))}(n,t)},delete:function(){return function(t){return f(this,void 0,void 0,(function(){var e,n;return l(this,(function(r){switch(r.label){case 0:return[4,H(e=t.appConfig,(function(t){if(!t||0!==t.registrationStatus)return t}))];case 1:if(!(n=r.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw S.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw S.create("app-offline");case 3:return[4,it(e,n)];case 4:return r.sent(),[4,U(e)];case 5:r.sent(),r.label=6;case 6:return[2]}}))}))}(n)},onIdChange:function(t){return at(n,t)}}}),"PUBLIC")),$.registerVersion("@firebase/installations","0.4.19")},679:function(t,e,n){!function(t){"use strict";function e(t){return Array.prototype.slice.call(t)}function n(t){return new Promise((function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function r(t,e,r){var o,p=new Promise((function(c,f){n(o=t[e].apply(t,r)).then(c,f)}));return p.request=o,p}function o(t,e,n){var p=r(t,e,n);return p.then((function(t){if(t)return new v(t,p.request)}))}function c(t,e,n){n.forEach((function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})}))}function f(t,e,n,o){o.forEach((function(o){o in n.prototype&&(t.prototype[o]=function(){return r(this[e],o,arguments)})}))}function l(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})}))}function d(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return o(this[e],r,arguments)})}))}function h(t){this._index=t}function v(cursor,t){this._cursor=cursor,this._request=t}function y(t){this._store=t}function w(t){this._tx=t,this.complete=new Promise((function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}}))}function m(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new w(n)}function S(t){this._db=t}c(h,"_index",["name","keyPath","multiEntry","unique"]),f(h,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),d(h,"_index",IDBIndex,["openCursor","openKeyCursor"]),c(v,"_cursor",["direction","key","primaryKey","value"]),f(v,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(t){t in IDBCursor.prototype&&(v.prototype[t]=function(){var cursor=this,e=arguments;return Promise.resolve().then((function(){return cursor._cursor[t].apply(cursor._cursor,e),n(cursor._request).then((function(t){if(t)return new v(t,cursor._request)}))}))})})),y.prototype.createIndex=function(){return new h(this._store.createIndex.apply(this._store,arguments))},y.prototype.index=function(){return new h(this._store.index.apply(this._store,arguments))},c(y,"_store",["name","keyPath","indexNames","autoIncrement"]),f(y,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),d(y,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),l(y,"_store",IDBObjectStore,["deleteIndex"]),w.prototype.objectStore=function(){return new y(this._tx.objectStore.apply(this._tx,arguments))},c(w,"_tx",["objectStoreNames","mode"]),l(w,"_tx",IDBTransaction,["abort"]),m.prototype.createObjectStore=function(){return new y(this._db.createObjectStore.apply(this._db,arguments))},c(m,"_db",["name","version","objectStoreNames"]),l(m,"_db",IDBDatabase,["deleteObjectStore","close"]),S.prototype.transaction=function(){return new w(this._db.transaction.apply(this._db,arguments))},c(S,"_db",["name","version","objectStoreNames"]),l(S,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(t){[y,h].forEach((function(n){t in n.prototype&&(n.prototype[t.replace("open","iterate")]=function(){var n=e(arguments),r=n[n.length-1],o=this._store||this._index,c=o[t].apply(o,n.slice(0,-1));c.onsuccess=function(){r(c.result)}})}))})),[h,y].forEach((function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise((function(o){n.iterateCursor(t,(function(cursor){cursor?(r.push(cursor.value),void 0===e||r.length!=e?cursor.continue():o(r)):o(r)}))}))})})),t.openDb=function(t,e,n){var p=r(indexedDB,"open",[t,e]),o=p.request;return o&&(o.onupgradeneeded=function(t){n&&n(new m(o.result,t.oldVersion,o.transaction))}),p.then((function(t){return new S(t)}))},t.deleteDb=function(t){return r(indexedDB,"deleteDatabase",[t])},Object.defineProperty(t,"__esModule",{value:!0})}(e)}}]);