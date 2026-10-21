import{r as n}from"./radix-D4tmaoiR.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),C=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,o,t)=>t?t.toUpperCase():o.toLowerCase()),c=e=>{const r=C(e);return r.charAt(0).toUpperCase()+r.slice(1)},i=(...e)=>e.filter((r,o,t)=>!!r&&r.trim()!==""&&t.indexOf(r)===o).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:t,className:a="",children:s,iconNode:u,...f},m)=>n.createElement("svg",{ref:m,...h,width:r,height:r,stroke:e,strokeWidth:t?Number(o)*24/Number(r):o,className:i("lucide",a),...f},[...u.map(([p,d])=>n.createElement(p,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(e,r)=>{const o=n.forwardRef(({className:t,...a},s)=>n.createElement(w,{ref:s,iconNode:r,className:i(`lucide-${g(c(e))}`,`lucide-${e}`,t),...a}));return o.displayName=c(e),o};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],v=y("x",b);function l(e){var r,o,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(r=0;r<a;r++)e[r]&&(o=l(e[r]))&&(t&&(t+=" "),t+=o)}else for(o in e)e[o]&&(t&&(t+=" "),t+=o);return t}function A(){for(var e,r,o=0,t="",a=arguments.length;o<a;o++)(e=arguments[o])&&(r=l(e))&&(t&&(t+=" "),t+=r);return t}export{v as X,A as c};
